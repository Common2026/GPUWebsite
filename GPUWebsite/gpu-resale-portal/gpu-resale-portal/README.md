# GPU Resale Portal

A minimal GPU rental resale portal with Stripe payments, provisioning stubs, watchdog heartbeats, and an admin dashboard.

---

## Features
- Stripe Checkout integration
- Webhook handling with signature verification
- GPU provisioning stub (replace with RunPod/Vast.ai API)
- Success and Cancel pages
- Heartbeat endpoint for watchdog agents
- Admin dashboard listing all orders and status

---

## Requirements
- Node.js 18+
- npm
- Stripe account (test mode or live)

---

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourname/gpu-resale-portal.git
   cd gpu-resale-portal

