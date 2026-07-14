# Manita de Gato — Booking System

Manita de Gato's official booking platform: a scheduling application built for the business, allowing customers to book appointments online and giving the owner full control over services, pricing, and availability through a private admin dashboard.

This version (v2.0) is a full architectural rewrite of the original MVP, focused on scalability, security, and maintainability.

## What's new in v2.0

- **Migration to Drizzle ORM**: replaces the previous data access layer, bringing end-to-end type safety and more predictable queries.
- **Database change: Supabase → Neon**: serverless Postgres with better DX for serverless/edge environments and no infrastructure to maintain.
- **Feature-based architecture**: code is now organized by business domain (`appointments`, `services`, `auth`, `admin`, etc.) instead of by file type, improving cohesion and making the codebase easier to scale.
- **Authentication with Better Auth**:
  - Google OAuth login.
  - Custom sign-up, sign-in, and password-change forms.
  - User roles (`ADMIN` / customer) with Role-Based Access Control (RBAC) protecting routes and sensitive mutations.
- **Performance improvements**: static caching on routes and data that don't change frequently, reducing load times and unnecessary database queries.
- **Stronger security**: data validation with Zod, `/admin` routes protected at the middleware level, and role verification enforced at the database level.

## Problem it solves

The original MVP handled basic scheduling and WhatsApp redirection, but had important limitations:

1. **Technical debt**: the original system was built during an early learning stage, without the type safety and security guarantees the current stack provides.
2. **Hardcoded data**: services and prices lived in the frontend, so any change required editing code.
3. **Rigid time management**: there was no dynamic availability engine that accounted for each service's actual duration to prevent overlaps (e.g., a 2-hour appointment colliding with a 30-minute one).

## Product goal

Provide a modular, secure, and self-manageable platform where the owner has full control over services, pricing, and availability from a private dashboard — without depending on third-party booking platforms or a developer for day-to-day changes.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle ORM |
| Authentication | Better Auth (email/password + Google OAuth) |
| Validation | Zod |
| UI | Tailwind CSS + shadcn/ui |
| Package manager | pnpm |

## Core use cases

### Dynamic service management (Admin)
The owner can create, edit, or deactivate services (name, price, duration) from the dashboard. Changes are reflected immediately on the public booking page.

### Schedule blocking (time-off management)
The owner can block full days or specific time ranges (e.g., a lunch break or a day off). The booking engine automatically removes those slots from the options available to customers.

### Public booking with validation
Customers pick a service, see real availability (calculated from service duration and existing confirmed appointments), and fill out a Zod-validated form. On confirmation, a pre-filled WhatsApp link is generated for manual follow-up.

## Key functional requirements

**Authentication & security**
- `/admin` routes protected with Better Auth.
- RBAC: only users with the `ADMIN` role can mutate appointments, services, or business settings.
- Sign-up, sign-in, password recovery, and password-change forms.
- Google social login.

**Admin dashboard**
- Daily overview: total appointments,# Manita de Gato — Booking System

Manita de Gato's official booking platform: a scheduling application built for the business, allowing customers to book appointments online and giving the owner full control over services, pricing, and availability through a private admin dashboard.

This version (v2.0) is a full architectural rewrite of the original MVP, focused on scalability, security, and maintainability.

## What's new in v2.0

- **Migration to Drizzle ORM**: replaces the previous data access layer, bringing end-to-end type safety and more predictable queries.
- **Database change: Supabase → Neon**: serverless Postgres with better DX for serverless/edge environments and no infrastructure to maintain.
- **Feature-based architecture**: code is now organized by business domain (`appointments`, `services`, `auth`, `admin`, etc.) instead of by file type, improving cohesion and making the codebase easier to scale.
- **Authentication with Better Auth**:
  - Google OAuth login.
  - Custom sign-up, sign-in, and password-change forms.
  - User roles (`ADMIN` / customer) with Role-Based Access Control (RBAC) protecting routes and sensitive mutations.
- **Performance improvements**: static caching on routes and data that don't change frequently, reducing load times and unnecessary database queries.
- **Stronger security**: data validation with Zod, `/admin` routes protected at the middleware level, and role verification enforced at the database level.

## Problem it solves

The original MVP handled basic scheduling and WhatsApp redirection, but had important limitations:

1. **Technical debt**: the original system was built during an early learning stage, without the type safety and security guarantees the current stack provides.
2. **Hardcoded data**: services and prices lived in the frontend, so any change required editing code.
3. **Rigid time management**: there was no dynamic availability engine that accounted for each service's actual duration to prevent overlaps (e.g., a 2-hour appointment colliding with a 30-minute one).

## Product goal

Provide a modular, secure, and self-manageable platform where the owner has full control over services, pricing, and availability from a private dashboard — without depending on third-party booking platforms or a developer for day-to-day changes.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle ORM |
| Authentication | Better Auth (email/password + Google OAuth) |
| Validation | Zod |
| UI | Tailwind CSS + shadcn/ui |
| Package manager | pnpm |

## Core use cases

### Dynamic service management (Admin)
The owner can create, edit, or deactivate services (name, price, duration) from the dashboard. Changes are reflected immediately on the public booking page.

### Schedule blocking (time-off management)
The owner can block full days or specific time ranges (e.g., a lunch break or a day off). The booking engine automatically removes those slots from the options available to customers.

### Public booking with validation
Customers pick a service, see real availability (calculated from service duration and existing confirmed appointments), and fill out a Zod-validated form. On confirmation, a pre-filled WhatsApp link is generated for manual follow-up.

## Key functional requirements

**Authentication & security**
- `/admin` routes protected with Better Auth.
- RBAC: only users with the `ADMIN` role can mutate appointments, services, or business settings.
- Sign-up, sign-in, password recovery, and password-change forms.
- Google social login.

**Admin dashboard**
- Daily overview: total appointments, estimated revenue, pending confirmations.
- Full CRUD for services (name, price, duration in minutes, active status).
- Appointment status updates (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- Blocking of full days or specific time ranges.

**Public booking engine**
- Services fetched dynamically from the database (with static caching where applicable).
- Available time slots calculated by checking confirmed appointments against service duration to prevent collisions.
- Strict validation of customer data (name, phone, email) with Zod.
- Automatic generation of a WhatsApp link with the appointment details.

## Database schema (summary)

- `users` — managed by Better Auth, includes user role.
- `services` — id, name, price, duration_minutes, is_active.
- `appointments` — id, customer_name, customer_phone, service_id, appointment_date, start_time, end_time, status.

## Running the project locally

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL (Neon), Google OAuth credentials, and BETTER_AUTH_SECRET

# Run Drizzle migrations
pnpm drizzle-kit push

# Start the development server
pnpm dev
```

## Roadmap (v3.0)

- **Payment gateway**: Stripe integration to charge an upfront deposit (e.g., 50%) to reduce no-shows.
- **Automated notifications**: WhatsApp/Twilio reminders sent 24 hours before each appointment.
- **Headless CMS**: allow the owner to publish content (blog, portfolio) without touching code.

## Author

**Julio César Zavala Blanco** — Fullstack Developer & Architect estimated revenue, pending confirmations.
- Full CRUD for services (name, price, duration in minutes, active status).
- Appointment status updates (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- Blocking of full days or specific time ranges.

**Public booking engine**
- Services fetched dynamically from the database (with static caching where applicable).
- Available time slots calculated by checking confirmed appointments against service duration to prevent collisions.
- Strict validation of customer data (name, phone, email) with Zod.
- Automatic generation of a WhatsApp link with the appointment details.

## Database schema (summary)

- `users` — managed by Better Auth, includes user role.
- `services` — id, name, price, duration_minutes, is_active.
- `appointments` — id, customer_name, customer_phone, service_id, appointment_date, start_time, end_time, status.

## Running the project locally

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL (Neon), Google OAuth credentials, and BETTER_AUTH_SECRET

# Run Drizzle migrations
pnpm drizzle-kit push

# Start the development server
pnpm dev
```

## Roadmap (v3.0)

- **Payment gateway**: Stripe integration to charge an upfront deposit (e.g., 50%) to reduce no-shows.
- **Automated notifications**: WhatsApp/Twilio reminders sent 24 hours before each appointment.
- **Headless CMS**: allow the owner to publish content (blog, portfolio) without touching code.

## Author

**Julio César Zavala Blanco** — Fullstack Developer & Architect