# Manita de Gato — Appointment Booking System

A Minimum Viable Product (MVP) for digital appointment scheduling, built to replace manual, message-based coordination. Clients can view real-time availability and book services directly, while an automated WhatsApp bridge handles confirmation without friction.

---

## Features

**Smart Booking Engine**
Validates real-time availability to prevent double-booking and schedule collisions before any appointment is confirmed.

**WhatsApp Bridge**
Upon booking, the client is redirected to WhatsApp with a pre-filled message containing their appointment details, eliminating the need for manual follow-up.

**Admin Dashboard**
A private control panel to visualize daily appointments, update statuses (Pending, Confirmed, Canceled), and block specific days or holidays.

**Data Validation**
Zod schemas on the backend enforce data integrity and prevent malformed entries from reaching the database.

---

## Screenshots

### Client View (Booking Interface)

![Agenda — Desktop](./docs/agenda_desktop.png)
![Agenda — Mobile](./docs/agenda_mobile.png)

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React (Next.js App Router)              |
| Styling    | Tailwind CSS + shadcn/ui                |
| Backend    | Next.js Route Handlers (REST API)       |
| Database   | PostgreSQL via Supabase                 |
| Validation | Zod                                     |

---

## Local Development

### Prerequisites

- Node.js 18+
- pnpm
- A Supabase project with a PostgreSQL database

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jota-ato/manita-de-gato
   cd manita-de-gato
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**

   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.