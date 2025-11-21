# 🏛️ Architecture Documentation

## Overview

This project implements a clean, layered architecture that separates concerns and makes the codebase maintainable, testable, and scalable.

## Backend Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────────┐
│           Controllers Layer              │
│   (HTTP Request/Response Handling)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Services Layer                │
│         (Business Logic)                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Repositories Layer               │
│         (Data Access)                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Data Source                     │
│   (InMemory / PostgreSQL / etc.)        │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Controllers (`src/controllers/`)
- Handle HTTP requests and responses
- Validate input data
- Call appropriate service methods
- Format responses (success/error)
- **No business logic**

Example:
```typescript
export class ProductController {
  constructor(private productService: ProductService) {}

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await this.productService.getAllProducts();
    res.json({ success: true, data: products });
  };
}
```

#### 2. Services (`src/services/`)
- Contain business logic
- Orchestrate operations across repositories
- Validate business rules
- Transform data if needed
- **Repository-agnostic** (depends on interfaces)

Example:
```typescript
export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    // Business logic here
    return await this.productRepository.findAll();
  }
}
```

#### 3. Repositories (`src/repositories/`)
- Handle data access
- Implement data persistence
- Abstract data source details
- Implement repository interfaces

Example:
```typescript
export class InMemoryProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    // Data access implementation
  }
}
```

### Repository Pattern

The Repository Pattern is a key architectural decision that provides:

**Benefits:**
1. **Abstraction**: Business logic doesn't know about data source
2. **Testability**: Easy to mock repositories in tests
3. **Flexibility**: Swap data sources without changing business logic
4. **Maintainability**: Clear separation of concerns

**Interface Definition:**
```typescript
// src/repositories/IProductRepository.ts
export interface IProductRepository {
  findAll(filters?: object): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: CreateProductDTO): Promise<Product>;
  update(id: string, updates: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<Product[]>;
}
```

**Current Implementation: In-Memory**
```typescript
export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [...mockProducts];
  
  async findAll(): Promise<Product[]> {
    return this.products;
  }
  // ... other methods
}
```

**Future Implementation: PostgreSQL**
```typescript
export class PostgresProductRepository implements IProductRepository {
  constructor(private db: Pool) {}
  
  async findAll(): Promise<Product[]> {
    const result = await this.db.query('SELECT * FROM products');
    return result.rows;
  }
  // ... other methods
}
```

**Swapping Implementations:**

In `server.ts`, you only need to change one line:

```typescript
// Current (In-Memory)
const productRepository = new InMemoryProductRepository();

// Future (PostgreSQL) - NO OTHER CODE CHANGES NEEDED!
const productRepository = new PostgresProductRepository(dbPool);

// Services and Controllers remain unchanged
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
```

### Dependency Injection

We use constructor-based dependency injection:

```typescript
// Dependencies flow from server.ts
const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);  // Inject
const productController = new ProductController(productService);  // Inject
```

**Benefits:**
- Loose coupling
- Easy testing (inject mocks)
- Clear dependencies
- Flexibility

## Frontend Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── ProductCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ChatButton.tsx
│
├── pages/              # Page-level components
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   └── Cart.tsx
│
├── store/              # Zustand state management
│   ├── useCartStore.ts
│   ├── useUserStore.ts
│   └── useChatStore.ts
│
├── api/                # API client
│   └── client.ts
│
└── types/              # TypeScript types
    └── index.ts
```

### State Management (Zustand)

We use Zustand for lightweight, performant state management:

**Cart Store:**
```typescript
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity, size, color) => { /* ... */ },
      getTotalPrice: () => { /* ... */ },
    }),
    { name: 'cart-storage' }  // LocalStorage persistence
  )
);
```

**Usage in Components:**
```typescript
const { items, addItem, getTotalPrice } = useCartStore();
```

### API Client Pattern

Centralized API client using Axios:

```typescript
// client/src/api/client.ts
export const productApi = {
  getAll: async (filters?) => { /* ... */ },
  getById: async (id) => { /* ... */ },
  getFeatured: async () => { /* ... */ },
};

export const chatApi = {
  sendMessage: async (message, context?) => { /* ... */ },
};
```

### Component Design Principles

1. **Single Responsibility**: Each component has one job
2. **Props Interface**: Always define TypeScript interfaces
3. **Composition**: Build complex UIs from simple components
4. **Accessibility**: Use semantic HTML and ARIA labels

## Data Flow

### Frontend → Backend → Frontend

```
┌──────────────────────────────────────────────────────┐
│                     USER ACTION                       │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  React Component                      │
│              (e.g., Shop.tsx)                        │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                   API Client                          │
│         (productApi.getAll())                        │
└──────────────────────┬───────────────────────────────┘
                       │ HTTP Request
                       │
┌──────────────────────▼───────────────────────────────┐
│                   Controller                          │
│         (ProductController.getAllProducts)           │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                    Service                            │
│         (ProductService.getAllProducts)              │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  Repository                           │
│    (InMemoryProductRepository.findAll)               │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  Data Source                          │
│              (Mock Data Array)                       │
└──────────────────────┬───────────────────────────────┘
                       │
                  Response flows back up
```

## Design Patterns Used

### 1. Repository Pattern
- **Purpose**: Abstract data access
- **Location**: `server/src/repositories/`

### 2. Dependency Injection
- **Purpose**: Loose coupling, testability
- **Location**: `server/src/server.ts`

### 3. Service Layer Pattern
- **Purpose**: Business logic encapsulation
- **Location**: `server/src/services/`

### 4. Factory Pattern (Implicit)
- **Purpose**: Route creation
- **Location**: `server/src/routes/`

### 5. Observer Pattern (React)
- **Purpose**: State changes trigger re-renders
- **Location**: Zustand stores

## Testing Strategy

### Backend Testing

**Unit Tests:**
```typescript
// Test Services (mock repositories)
describe('ProductService', () => {
  it('should return all products', async () => {
    const mockRepo = { findAll: jest.fn().mockResolvedValue([]) };
    const service = new ProductService(mockRepo);
    await service.getAllProducts();
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
```

**Integration Tests:**
```typescript
// Test Controllers + Services + Repositories
describe('GET /api/products', () => {
  it('should return 200 and products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### Frontend Testing

**Component Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

## Scalability Considerations

### Backend
1. **Add Caching**: Redis for product lists
2. **Add Queue**: Bull/BullMQ for async tasks
3. **Add Rate Limiting**: Express rate limiter
4. **Database Pooling**: pg-pool for PostgreSQL
5. **Microservices**: Split into product-service, user-service, etc.

### Frontend
1. **Code Splitting**: Lazy load routes
2. **Image Optimization**: Next.js Image or similar
3. **CDN**: Serve static assets from CDN
4. **Service Worker**: PWA capabilities
5. **SSR/SSG**: Migrate to Next.js for SEO

## Security Best Practices

### Backend
- [ ] Input validation (express-validator)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (helmet.js)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] JWT authentication
- [ ] HTTPS only in production

### Frontend
- [ ] Content Security Policy
- [ ] Sanitize user input
- [ ] Secure localStorage usage
- [ ] HTTPS API calls
- [ ] Environment variables for secrets

## Performance Optimization

### Backend
- Use compression middleware
- Enable HTTP/2
- Database indexing
- Query optimization
- Caching strategies

### Frontend
- Lazy loading
- Image optimization
- Minimize bundle size
- Use CDN
- Implement virtual scrolling for large lists

---

This architecture is designed to be **maintainable**, **testable**, and **scalable** as your project grows from a graduation project to a production application.

