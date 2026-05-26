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

![Agenda — Desktop](https://private-user-images.githubusercontent.com/187909310/592685708-2cee3ce0-8571-44af-8b62-85cbc33b0233.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3ODQ4NjgsIm5iZiI6MTc3ODc4NDU2OCwicGF0aCI6Ii8xODc5MDkzMTAvNTkyNjg1NzA4LTJjZWUzY2UwLTg1NzEtNDRhZi04YjYyLTg1Y2JjMzNiMDIzMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTE0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUxNFQxODQ5MjhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hYTQ1NjA3M2QwYWVmNjdkMzUwMWQxYjEyMDlhZTk2NmVhYjJkZWEyYmYyNDM5OTc1MDc5ZmMwM2FhN2IwZDhjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.pfrYZs3JTfab1dvtIUB118c65ZXYHPyYOd7ybXNH_Ik)
![Agenda — Mobile](https://private-user-images.githubusercontent.com/187909310/592686250-d77eaebc-edce-43ab-a313-909fed27c284.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzk4MDgyOTcsIm5iZiI6MTc3OTgwNzk5NywicGF0aCI6Ii8xODc5MDkzMTAvNTkyNjg2MjUwLWQ3N2VhZWJjLWVkY2UtNDNhYi1hMzEzLTkwOWZlZDI3YzI4NC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUyNlQxNTA2MzdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jMjU1YzllODg1NzUwMTQ2OTEwMGE0MDAyZThmZTQyOGFiZjJlNGY1MzAxYzY2MDlhYmZjYzZlZTQ1ZjVlOTNmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.YP84ciKDck6lCKc_t30tSphffXZ3_MnZBRIPOXuU87k)

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