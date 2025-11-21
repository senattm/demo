# 📡 API Documentation

Base URL: `http://localhost:3000/api`

## Product Endpoints

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (optional): Filter by category (`suits`, `dresses`, `shirts`, `accessories`)
- `featured` (optional): Filter by featured status (`true`, `false`)

**Example:**
```bash
curl http://localhost:3000/api/products?category=suits&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Tailored Midnight Blue Suit",
      "category": "suits",
      "price": 1299.00,
      "description": "Impeccably crafted Italian wool suit...",
      "images": ["url1", "url2"],
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["Midnight Blue", "Charcoal"],
      "material": "100% Italian Wool",
      "inStock": true,
      "featured": true,
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Get Product by ID
```http
GET /api/products/:id
```

**Example:**
```bash
curl http://localhost:3000/api/products/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Tailored Midnight Blue Suit",
    // ... full product details
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product with ID 999 not found"
}
```

---

### Get Featured Products
```http
GET /api/products/featured
```

**Example:**
```bash
curl http://localhost:3000/api/products/featured
```

**Response:**
```json
{
  "success": true,
  "data": [ /* array of featured products */ ],
  "count": 5
}
```

---

### Search Products
```http
GET /api/products/search?q={query}
```

**Query Parameters:**
- `q` (required): Search query

**Example:**
```bash
curl "http://localhost:3000/api/products/search?q=suit"
```

**Response:**
```json
{
  "success": true,
  "data": [ /* matching products */ ],
  "count": 3
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Search query parameter \"q\" is required"
}
```

---

## Chat Endpoints

### Get AI Stylist Recommendations
```http
POST /api/chat/recommend
```

**Request Body:**
```json
{
  "message": "I need a suit for a wedding",
  "context": {
    "budget": 2000,
    "occasion": "wedding",
    "style": "formal"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/chat/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I need a suit for a wedding",
    "context": {
      "budget": 2000,
      "occasion": "wedding",
      "style": "formal"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "For your wedding, A Tailored Midnight Blue Suit would be perfect for your executive meetings. Pair it with our Classic Oxford Dress Shirt.",
    "recommendations": ["1", "2", "4"]
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Message is required"
}
```

---

## Utility Endpoints

### Health Check
```http
GET /health
```

**Example:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "service": "Premium Fashion E-Commerce API"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200 OK`: Request succeeded
- `400 Bad Request`: Invalid request (missing parameters, validation error)
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Mock Data

The API currently uses 8 mock products:

1. **Tailored Midnight Blue Suit** - $1,299.00 (Featured)
2. **Silk Evening Gown** - $2,499.00 (Featured)
3. **Classic Oxford Dress Shirt** - $329.00
4. **Cashmere Blend Overcoat** - $1,899.00 (Featured)
5. **Velvet Cocktail Dress** - $899.00
6. **Linen Summer Shirt** - $279.00
7. **Italian Leather Belt** - $199.00
8. **Merino Wool Turtleneck** - $399.00 (Featured)

---

## CORS

CORS is enabled for all origins in development. In production, restrict to your frontend domain:

```typescript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Rate Limiting

**Not currently implemented.** For production, add rate limiting:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Authentication

**Not currently implemented.** For future JWT authentication:

```typescript
// Protected route example
app.get('/api/orders', authenticateToken, orderController.getUserOrders);
```

---

## Postman Collection

You can import these endpoints into Postman for easier testing. Create a new collection with:

**Environment Variables:**
- `base_url`: `http://localhost:3000`

**Requests:**
1. GET `{{base_url}}/health`
2. GET `{{base_url}}/api/products`
3. GET `{{base_url}}/api/products/1`
4. GET `{{base_url}}/api/products/featured`
5. GET `{{base_url}}/api/products/search?q=suit`
6. POST `{{base_url}}/api/chat/recommend`

---

## Future Enhancements

### Planned Endpoints

**User Management:**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

**Order Management:**
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

**Admin:**
- `POST /api/products` (Create)
- `PUT /api/products/:id` (Update)
- `DELETE /api/products/:id` (Delete)

**Reviews:**
- `POST /api/products/:id/reviews`
- `GET /api/products/:id/reviews`

---

For more details on the architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

