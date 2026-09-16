# 🍫 Choco - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with Next.js 16, featuring a customer store and comprehensive admin dashboard. Designed with best practices in Docker, authentication, and state management.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-0.35-yellow)](https://orm.drizzle.team)
[![Docker](https://img.shields.io/badge/Docker-29.7-blue?logo=docker)](https://docker.com)

## ✨ Features

### 🛒 Customer Store

- Product browsing with CDN-powered images via ImageKit
- Google OAuth authentication with NextAuth.js
- Secure checkout with Razorpay payment integration
- Order history and tracking
- Responsive design with Tailwind CSS

### 👨‍💼 Admin Dashboard

- Complete product management (CRUD operations)
- Real-time order tracking and status updates
- Inventory management across warehouses
- Delivery person assignment system
- Interactive data tables with TanStack Table

### 🛠️ Technical Highlights

- **Multi-stage Docker builds** - Production-optimized images (~150MB)
- **Type-safe full-stack** - End-to-end TypeScript with Zod validation
- **Modern state management** - Zustand + TanStack Query
- **Server Actions enabled** - Reduced client-side JavaScript
- **Performance optimized** - Turbopack for development, ImageKit for images

## 🏗️ Architecture

```mermaid
graph TB
    A[Next.js App Router] --> B[Frontend UI]
    A --> C[API Routes]

    B --> D[Cusomter Store]
    B --> E[Admin Dashboard]

    C --> F[Authentication]
    C --> G[Product Management]
    C --> H[Order Processing]

    F --> I[PostgreSQL via Drizzle]
    G --> I
    H --> I

    J[Docker Container] --> A
    J --> K[Environment Variables]

    L[ImageKit CDN] --> M[Image Storage]
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker & Docker Compose
- PostgreSQL database (or Supabase)

### Development Setup

1. **Clone and install dependencies**

```bash
git clone https://github.com/pankaj-yadav73/choco.git
cd choco
npm install
```

2. **Configure environment**

```bash
cp .env.example .env
# Fill in your environment variables in .env
```

3. **Run development server**

```bash
npm run dev
```

4. **Access the application**

- Customer store: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin
- API documentation: Available in the codebase

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Rebuild with no cache
docker-compose build --no-cache

# View logs
docker logs choco-choco-app-1 -f

# Stop containers
docker-compose down
```

## 📁 Project Structure

```
choco/
├── src/
│   ├── app/
│   │   ├── (client)/           # Customer-facing pages
│   │   ├── admin/              # Admin dashboard pages
│   │   └── api/                # REST API endpoints
│   ├── lib/
│   │   ├── db/                 # Database schema and connection
│   │   ├── auth/               # NextAuth configuration
│   │   └── validators/         # Zod validation schemas
│   ├── http/                   # API client configuration
│   ├── store/                  # Zustand state stores
│   └── components/             # Reusable UI components
├── Dockerfile                  # Multi-stage build configuration
├── docker-compose.yml          # Service orchestration
└── drizzle.config.ts           # Database migrations
```

## 🛠️ Tech Stack

| Layer         | Technology               | Purpose                                       |
| ------------- | ------------------------ | --------------------------------------------- |
| **Frontend**  | Next.js 16 + React 19    | SSR/SSG with App Router                       |
| **Styling**   | Tailwind CSS + Radix UI  | Utility-first styling + accessible components |
| **Database**  | PostgreSQL + Drizzle ORM | Type-safe database operations                 |
| **Auth**      | NextAuth.js              | Google OAuth with session management          |
| **Forms**     | React Hook Form + Zod    | Type-safe form validation                     |
| **State**     | Zustand + TanStack Query | Client + server state management              |
| **Images**    | ImageKit                 | CDN with automatic optimization               |
| **Container** | Docker                   | Production-ready deployment                   |
| **Payments**  | Razorpay                 | Secure payment processing                     |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Application
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000/api"
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="your-encryption-key"

# Image Storage
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-public-key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-endpoint"
IMAGEKIT_PRIVATE_KEY="your-private-key"  # Server-only
```

## 📊 Database Schema

The application uses PostgreSQL with the following core tables:

- **users** - User accounts with role-based permissions
- **products** - Product catalog with pricing and images
- **orders** - Customer orders with status tracking
- **warehouses** - Inventory storage locations
- **inventories** - Stock management across warehouses
- **deliveryPersons** - Delivery personnel assignment

## 🐳 Docker Best Practices

This project implements several Docker production best practices:

1. **Multi-stage builds** - Separate build and runtime stages
2. **Non-root user** - Container runs as `nextjs` user (UID 1001)
3. **Standalone output** - Minimal production image with only necessary files
4. **Build vs runtime env vars** - Proper separation of configuration
5. **Health checks** - Container orchestration readiness

## 🧪 Development Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database migrations
npm run db:generate    # Generate migration files
npm run db:run         # Run migrations
```

## 🎯 API Endpoints

| Method  | Endpoint              | Description              |
| ------- | --------------------- | ------------------------ |
| `GET`   | `/api/products`       | List all products        |
| `POST`  | `/api/products`       | Create new product       |
| `GET`   | `/api/products/[id]`  | Get single product       |
| `POST`  | `/api/orders`         | Create new order         |
| `GET`   | `/api/orders`         | List all orders (admin)  |
| `PATCH` | `/api/orders/status`  | Update order status      |
| `GET`   | `/api/orders/history` | Get user's order history |

## 🏆 Key Features Demonstrated

### 1. **Production-Ready Docker Setup**

- Multi-stage builds reducing image size by 85%
- Proper environment variable management
- Security best practices (non-root user)

### 2. **Type-Safe Full-Stack**

- End-to-end TypeScript
- Zod validation on both client and server
- Drizzle ORM with autocomplete queries

### 3. **Modern Authentication**

- Google OAuth with NextAuth.js
- Role-based access control (customer/admin)
- Secure session management

### 4. **Performance Optimizations**

- Image optimization via ImageKit CDN
- Server Actions reducing client bundle
- Turbopack for faster development

## 📸 Screenshots

_(Add your screenshots here)_

- Customer product page
- Admin dashboard
- Order management interface
- Docker build output

## 📚 Learning Resources

This project demonstrates:

- Next.js App Router patterns
- Docker containerization best practices
- Full-stack TypeScript development
- Modern authentication flows
- Production deployment considerations

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Docker Registry

```bash
# Build and push to registry
docker build -t yourusername/choco .
docker push yourusername/choco
```

### Traditional Hosting

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Pankaj Yadav**

- GitHub: [@Py8050147](https://github.com/Py8050147)
- Portfolio: [Your Portfolio Link]
- LinkedIn: [https://www.linkedin.com/in/pankaj-kumar-a08b921b2/]

---

## 💡 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [ImageKit](https://imagekit.io)

---

⭐ **Star this repo if you found it helpful!** ⭐
