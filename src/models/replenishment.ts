import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const replenishmentSchema = new Schema({
    store_id: {type: String , required: true },
    required_items: [{
        item_id: {type: mongoose.Schema.Types.ObjectId, required: true },
        quantity : {type: Number, default: 0}
    }],
    status: {type: String},
    transfer_oder_id: {type: mongoose.Schema.Types.ObjectId},
    shipment_id: {type: mongoose.Schema.Types.ObjectId},
}, 
{
    timestamps: true
});

const replenishmentModel = mongoose.model("replenishment", replenishmentSchema);

export default replenishmentModel;