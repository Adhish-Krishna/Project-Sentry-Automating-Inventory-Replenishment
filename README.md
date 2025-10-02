# Project Sentry - Automating Inventory Replenishment

An event-driven inventory replenishment system built with Node.js, TypeScript, MongoDB, and Apache Kafka. This system automates the entire inventory replenishment workflow from alert raising to delivery confirmation through microservices architecture.

## 📋 Overview

Project Sentry automates inventory replenishment by implementing an event-driven architecture that handles:
- **Stock Alert Management**: Automated alerts when inventory levels are low
- **Transfer Order Creation**: Automatic order generation based on warehouse availability
- **Shipment Tracking**: Real-time shipment status updates
- **Delivery Confirmation**: Final delivery confirmation and status updates

## 🏗️ Architecture

The system follows an event-driven microservices architecture using Apache Kafka for message streaming:

![API and Data Schema](./assets/api-and-data-schema.png)

### Event Flow
1. **Stage 1: Raising Stock Alert** → Produces to `transfer-order` topic
2. **Stage 2: Transfer Create Order** → Produces to `shipment` topic  
3. **Stage 3: Shipment** → Produces to `delivery` topic
4. **Stage 4: Confirm Delivery** → Final status update

## 🛠️ Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MongoDB
- **Message Broker**: Apache Kafka

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Compose
- npm or yarn

### Option 1: Running Everything in Docker (Recommended)

#### 1. Start all services using Docker Compose
```bash
# Build all services
docker-compose build

# Start all the services
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f backend
```

**Note**: The application will run on `http://localhost:3003`

### Option 2: Running Backend Locally (Development)

#### 1. Start only MongoDB and Kafka in Docker
```bash
docker-compose up mongo broker -d
```

#### 2. Setup and run the backend locally
```bash
# Install dependencies
npm install

# Setup environment variables for local development
cp .env.template .env

# Start the development server
npm run dev
```

**Note**: The application will run on `http://localhost:3003`

### 3. Populate the warehouse with sample items

Choose the appropriate command based on your terminal:

#### Using PowerShell (Recommended for Windows):
```powershell
$body = @'
{
    "items":[
        {
            "item_name": "Zara Oversized Blazer",
            "quantity":150,
            "price":79,
            "description":"Black oversized blazer with shoulder pads"
        },
        {
            "item_name": "H&M Skinny Jeans",
            "quantity":200,
            "price":29,
            "description":"High-waisted skinny fit denim jeans"
        },
        {
            "item_name": "Forever 21 Crop Top",
            "quantity":180,
            "price":12,
            "description":"Basic cotton crop top in various colors"
        },
        {
            "item_name": "Shein Maxi Dress",
            "quantity":120,
            "price":24,
            "description":"Floral print summer maxi dress"
        },
        {
            "item_name": "Urban Outfitters Mom Jeans",
            "quantity":100,
            "price":69,
            "description":"Vintage-style high-waisted mom jeans"
        }
    ]
}
'@

Invoke-RestMethod -Uri "http://localhost:3003/api/warehouse/additems" -Method POST -Body $body -ContentType "application/json"
```

#### Using Command Prompt or Git Bash:
```bash
curl -X POST http://localhost:3003/api/warehouse/additems ^
-H "Content-Type: application/json" ^
-d "{\"items\":[{\"item_name\":\"Zara Oversized Blazer\",\"quantity\":150,\"price\":79,\"description\":\"Black oversized blazer with shoulder pads\"},{\"item_name\":\"H&M Skinny Jeans\",\"quantity\":200,\"price\":29,\"description\":\"High-waisted skinny fit denim jeans\"},{\"item_name\":\"Forever 21 Crop Top\",\"quantity\":180,\"price\":12,\"description\":\"Basic cotton crop top in various colors\"},{\"item_name\":\"Shein Maxi Dress\",\"quantity\":120,\"price\":24,\"description\":\"Floral print summer maxi dress\"},{\"item_name\":\"Urban Outfitters Mom Jeans\",\"quantity\":100,\"price\":69,\"description\":\"Vintage-style high-waisted mom jeans\"}]}"
```

#### Using Unix/Linux/macOS Terminal:
```bash
curl -X POST http://localhost:3003/api/warehouse/additems \
-H "Content-Type: application/json" \
-d '{"items":[{"item_name":"Zara Oversized Blazer","quantity":150,"price":79,"description":"Black oversized blazer with shoulder pads"},{"item_name":"H&M Skinny Jeans","quantity":200,"price":29,"description":"High-waisted skinny fit denim jeans"},{"item_name":"Forever 21 Crop Top","quantity":180,"price":12,"description":"Basic cotton crop top in various colors"},{"item_name":"Shein Maxi Dress","quantity":120,"price":24,"description":"Floral print summer maxi dress"},{"item_name":"Urban Outfitters Mom Jeans","quantity":100,"price":69,"description":"Vintage-style high-waisted mom jeans"}]}'
```


