import express from 'express'
import { addItemsController } from '../controllers/warehouseController.js';

const warehouseRouter = express.Router();

warehouseRouter.post('/additems', addItemsController);

export default warehouseRouter;