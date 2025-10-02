import type {Request, Response} from 'express';
import replenishmentModel from '../models/replenishment.js';
import warehouseModel from '../models/warehouse.js';
import type { AlertBody, ConfirmOderBody, OrderCreationBody, RequiredItem} from '../types/types.js';
import { order_status } from '../types/types.js';
import mongoose from 'mongoose';

const raiseAlert = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {store_id, required_items} = req.body as AlertBody;
        if(!store_id && !required_items){
            res.status(400).json({"error":"Shop ID and Required Items required"});
            return;
        }
        const replenishment = await replenishmentModel.insertOne(
            {
                store_id: store_id,
                required_items: required_items
            }
        );
        res.status(201).json(
            {
                "status": order_status.ALERT_RAISED,
                "replenishment_id": replenishment._id
            }
        );
        return;
    }catch(err){
        res.status(500).json({
            "error": `Error in alert controller ${err}`
        });
        return;
    }
}

const createOrder = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {replenishment_id, store_id, required_items} = req.body as OrderCreationBody;
        if(!store_id && !required_items && !replenishment_id){
            res.status(400).json({"error":"Replenishment ID, Shop ID and Required Items are  required"});
            return;
        }
        let available_item_ids: RequiredItem[] = [];
        let unavailable_items: string[] = [];
        required_items.map(async (item) => {
            const item_in_warehouse = await warehouseModel.findOne({
                _id: item.item_id
            });
            if(item_in_warehouse!.quantity >= item.quantity){
                available_item_ids.push({item_id: item.item_id, quantity: item.quantity});
            }
            else{
                unavailable_items.push(item.item_id);
            }
        });
        if(unavailable_items.length >0){
            res.json({
                "message":"Some items are not available in the warehouse. So cannot proceed this order"
            });
            return;
        }
        const transerfer_order_id = new mongoose.Types.ObjectId();
        await replenishmentModel.updateOne(
            {
                _id: replenishment_id
            },
            {
                transfer_oder_id: transerfer_order_id,
                status: order_status.PENDING_PICKING
            }
        );
        res.status(201).json({
            "status": order_status.PENDING_PICKING,
            "replenishment_id": replenishment_id,
            "transfer_order_id":transerfer_order_id
        });
        return;
    }catch(err){
        res.status(500).json({
            "error": `Error in transer order controller ${err}`
        });
        return;
    }
}

const shipOrder = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {replenishment_id, store_id, required_items} = req.body as OrderCreationBody;
        if(!store_id && !required_items && !replenishment_id){
            res.status(400).json({"error":"Replenishment ID, Shop ID and Required Items are  required"});
            return;
        }
        const shipment_id = new mongoose.Types.ObjectId();
        await replenishmentModel.updateOne(
            {
                _id: replenishment_id
            },
            {
                shipment_id: shipment_id,
                status: order_status.IN_TRANSIT
            }
        );
        res.status(201).json({
            "status": order_status.IN_TRANSIT,
            replenishment_id: replenishment_id,
            shipment_id: shipment_id
        });
    }catch(err){
        res.status(500).json({
            "error": `Error in shipment controller ${err}`
        });
        return;
    }
}

const confirmDelivery = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {replenishment_id} = req.body as ConfirmOderBody;
        if(!replenishment_id){
            res.status(400).json({"error":"Replenishment ID is required"});
            return;
        }
        await replenishmentModel.updateOne(
            {
                _id: replenishment_id
            },
            {
                status: order_status.COMPLETED
            }
        );
        res.status(201).json(
            {
                "status": order_status.COMPLETED,
                "replenishment_id": replenishment_id
            }
        );
        return;
    }catch(err){
        res.status(500).json({
            "error": `Error in confirm delivery controller ${err}`
        });
        return;
    }
}

export {raiseAlert, createOrder, shipOrder, confirmDelivery};