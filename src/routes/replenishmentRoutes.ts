import express from 'express';
import { confirmDelivery, createOrder, raiseAlert, shipOrder } from '../controllers/replenishmentController.js';

const replenishmentRouter = express.Router();

replenishmentRouter.post("/alert", raiseAlert);
replenishmentRouter.post("/createorder", createOrder);
replenishmentRouter.post("/ship", shipOrder);
replenishmentRouter.post("/confirm", confirmDelivery);

export default replenishmentRouter;
