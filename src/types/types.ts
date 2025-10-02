export enum order_status{
    "ALERT_RAISED"="ALERT_RAISED",
    "PENDING_PICKING"="PENDING_PICKING",
    "IN_TRANSIT"="IN_TRANSIT",
    "COMPLETED"="COMPLETED"
}
export interface RequiredItem{
    item_id: string,
    quantity: number
}

export interface AlertBody{
    store_id: string,
    required_items: RequiredItem[]
}

export interface OrderCreationBody{
    replenishment_id: string,
    store_id: string,
    required_items: RequiredItem[]
}

export interface ConfirmOderBody{
    replenishment_id: string
}

export interface WarehouseItems{
    item_name: string,
    quantity: number,
    price: number,
    description?: string
}

export interface AddItemsBody{
    items: WarehouseItems[]
}

export enum Topics{
    "api2"="transfer_order",
    "api3"="shipment",
    "api4"="delivery"
}




