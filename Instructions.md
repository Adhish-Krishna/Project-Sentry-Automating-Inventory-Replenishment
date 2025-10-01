# **Project Sentry - Automating Inventory Replenishment**

## **Part I: Project Brief & Your Assignment**
### 1.1 Project Scenario: UrbanStyle Apparel
For this assignment, you will be the lead engineering team for UrbanStyle Apparel, a fast-fashion retailer with a central distribution warehouse and numerous city-based storefronts. UrbanStyle's competitive edge is its ability to keep popular items in stock.

Their current inventory management is manual. Store managers physically count stock and email replenishment requests to the central warehouse. This process is slow, prone to human error, and often results in stockouts of popular items or overstocking of slow-moving ones. This inefficiency directly impacts sales and customer satisfaction.

Your mission is to design and implement Project Sentry: a backend platform that automates the inventory replenishment process, ensuring that stores receive the right stock at the right time.

### 1.2 The Core Problem: A Replenishment Lifecycle
To succeed, you must automate the four critical stages of UrbanStyle's stock replenishment workflow. Your primary task is to translate this business process into a robust system driven by REST APIs.

#### Stage 1: Low-Stock Alert
The process begins when the Point-of-Sale (POS) system at a retail store detects that an item's quantity has fallen below its pre-defined reorder threshold. This event must trigger an automated alert in the new system, formally logging that a specific product at a specific store needs replenishment. A unique replenishment_id must be generated to track this request.

#### Stage 2: Transfer Order Creation
Upon receiving the low-stock alert, the system must automatically create a stock transfer order. This order instructs the central warehouse to prepare a specific quantity of the item for shipment to the requesting store. The system must confirm that the warehouse has sufficient stock to fulfill the request and update the status to "PENDING_PICKING".


#### Stage 3: Shipment from Warehouse
A warehouse operator picks and packs the items for the transfer order. Once the package is ready and handed off to the logistics carrier, the operator updates the system. This action must generate a tracking number and update the transfer order's status to "IN_TRANSIT", signaling that the stock is on its way to the store.

#### Stage 4: Stock Received at Store
The shipment arrives at the retail store. A store employee scans the package, confirming its receipt. This final action updates the system to mark the transfer order as "COMPLETED". The store's inventory level for the received item is then automatically updated, officially closing the replenishment loop.

### 1.3 Technical & Architectural Requirements
As you design the architecture for Project Sentry, you must adhere to the following core principles:

The Digital Thread: You must maintain a single source of truth for every replenishment order. From the initial alert to final receipt, a single, evolving digital record must exist in your database. This record should be progressively enriched with new information. You must use a MongoDB database to maintain this digital thread.

Traceability and Unique Identification: Every major artifact—replenishment requests, transfer orders, and shipments—must have its own unique, system-generated identifier.
Real-Time Stateful Awareness: The platform must operate as a state machine. Every replenishment order must have a clear status (e.g., ALERT_RAISED, PENDING_PICKING, IN_TRANSIT, COMPLETED). Your services are responsible for correctly transitioning the order through the lifecycle. You are also requested to chain the stages using Kafka topics.

### 1.4 Your Assignment Deliverables
Your task is to design and implement the core backend services for Project Sentry. Specifically, you must deliver the following:
REST API Design: A complete set of REST API endpoints that model the four stages of the replenishment lifecycle.
Backend Implementation: The server-side logic for each API endpoint.

Database Persistence: A data layer using MongoDB that correctly implements the "Digital Thread" requirement.
State and ID Management: Ensure your implementation correctly generates unique identifiers and accurately updates the order's status field at each stage.

Orchestration using Kafka topics: Each stage should pass on the payload to a kafka topic which triggers the next stage.
