import {Schema} from 'mongoose';
import mongoose from 'mongoose';

const warehouseSchema = new Schema({
    item_name: {type:String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String}
});

const warehouseModel = mongoose.model("warehouse", warehouseSchema);

export default warehouseModel;
