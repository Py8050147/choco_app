# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

- **Dev server**: `npm run dev` (runs with turbopack on port 3000)
- **Build**: `npm run build`
- **Lint**: `npm lint`
- **Database**: 
  - Generate migrations: `npm run db:generate`
  - Run migrations: `npm run db:run`

## Project Overview

Choco is a Next.js-based e-commerce platform with an admin dashboard and customer-facing store. It uses PostgreSQL for data persistence, Drizzle ORM for database access, and NextAuth for authentication (Google provider).

### Core Tech Stack

- **Framework**: Next.js 16.3 with turbopack (dev/build)
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: NextAuth 4.24 (Google OAuth)
- **UI**: Radix UI components with Tailwind CSS
- **Forms**: React Hook Form + Zod for validation
- **State Management**: Zustand for client-side stores, TanStack Query for server state
- **Image Handling**: ImageKit integration for product images
- **Payment**: Razorpay integration

### Architecture

**App Structure**:
- `src/app/(client)/` — Customer-facing pages (store, product detail, account, checkout)
- `src/app/admin/` — Protected admin dashboard (products, inventory, orders, delivery persons, warehouses)
- `src/app/api/` — API routes handling business logic

**Data Layer**:
- `src/lib/db/schema.ts` — Drizzle ORM schema (users, products, orders, warehouses, inventories, deliveryPersons)
- `src/http/api.ts` — Axios client with centralized API functions
- `src/http/client.ts` — Axios instance configuration

**State & Stores**:
- `src/store/` — Zustand stores for products, inventory, warehouses, delivery persons
- Each store manages CRUD operations and maintains local cache

**Validation**:
- `src/lib/validators/` — Zod schemas for form validation (products, orders, inventory, warehouses, delivery persons)

**Authentication**:
- `src/lib/auth/authOptions.ts` — NextAuth configuration with Google provider
- User roles: `customer` (default), `admin` (set via auth)
- `src/providers/auth-provider.tsx` — Session provider wrapper

**UI Components**:
- `src/components/ui/` — Reusable Radix UI-based components (dialog, form, table, button, etc.)
- `src/app/admin/_components/` — Admin-specific components (data-table, forms, dialogs)
- `src/app/(client)/_components/` — Client-facing components (header, hero, products, footer)

### Key Configuration

**Next.js**:
- `output: 'standalone'` for Docker containerization
- Server Actions enabled with encryption (NEXT_SERVER_ACTIONS_ENCRYPTION_KEY)
- Remote image patterns configured for ImageKit (ik.imagekit.io)

**Database**:
- PostgreSQL connection via `DATABASE_URL` env var
- Schema in `src/lib/db/schema.ts`
- Migrations stored in `drizzle/` directory

**API Base**:
- Client API calls use `NEXT_PUBLIC_BACKEND_URL` env var (via `src/http/api.ts`)
- All API routes are in `src/app/api/` using Next.js route handlers

### Data Flow

1. **Admin Operations**: Forms (React Hook Form) → Zustand store → API call → Database
2. **Customer Shopping**: Browse products → Add to cart (Zustand) → Checkout (Razorpay) → Order created in DB
3. **Orders**: Customer places order → Admin dashboard shows order → Admin assigns delivery person → Status updates

### Environment Variables

Required:
- `DATABASE_URL` — PostgreSQL connection string
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` — Server action encryption
- `NEXT_PUBLIC_BACKEND_URL` — API base URL (exposed to client)
- `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_URL_ENDPOINT` — ImageKit config (optional)

### Important Patterns

**API Routes**: Handle authorization via NextAuth session, return JSON. Example pattern in `src/app/api/products/route.ts`.

**Forms**: Use React Hook Form with Zod for validation. Dialog/Sheet wrappers handle form UI.

**Database Queries**: Use Drizzle ORM methods like `.insert()`, `.select()`, `.update()`, `.delete()` with `.returning()` for consistency.

**Admin Protection**: Check user role (`user.role === 'admin'`) in API routes before responding.

**Image Uploads**: Use FormData for product images; ImageKit handles remote storage and optimization.
