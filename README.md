# 🥗 Food Rescue Hub

**Food Rescue Hub** is a full-stack web application built to combat food waste by connecting surplus food providers (restaurants, groceries, farms) with charities and individuals. The platform provides **real-time updates**, **secure role-based access**, **geolocation search**, and **impact analytics**, making food redistribution efficient and scalable.

## 🚀 Demo

Watch the demo video to see how the Food Rescue Hub works!

[![Food Rescue Hub Demo](https://img.youtube.com/vi/hEW06p5xqGs/maxresdefault.jpg)](https://www.youtube.com/watch?v=hEW06p5xqGs)

<!-- > [Watch the Demo on YouTube](https://www.youtube.com/watch?v=your_video_id) -->

## ✨ Features

### 🔐 Secure Auth & Roles

- JWT authentication with Donor, Recipient, and Admin roles
- Role-based access control (e.g., donors can’t browse donations)

### 📦 Donation Management

- CRUD operations for donations (type, quantity, location, image)
- Real-time updates via Socket.IO (instant UI sync)

### 🧭 Smart Browsing

- Grid View (pagination) + Map View (Google Maps integration)
- Search and filters

### 📲 Real-Time Notification

- Instant notifications for claims and confirmations via Socket.IO (web) + FCM (mobile)

### 📊 Analytics Dashboard (Admin Only)

Track platform performance with charts and stats:

- Total donations & claimed rate
- Food waste reduction
- Active users
- Donation trends by time, type, and location
- Top donors & status breakdown
- Average claim time & user growth insights

### 👤 User Profile

- Users can edit their personal data
- View personal impact statistics (e.g., total donations, CO₂ saved)

### 🛠️ Advanced Tools

- Auto-Expiry: Cron jobs purge expired donations

---

## 🔄 Workflow

1️⃣ **Donors Post Surplus Food**

- Enter details (type, quantity, location) + upload images via Cloudinary
- Data stored in MongoDB via Next.js API Routes

2️⃣ **Recipients Browse & Claim**

- Explore donations via Grid or Map View with advanced filters
- Submit a claim → triggers real-time notification to donor via Socket.IO

3️⃣ **Donor Confirmation**

- Donor approves or rejects the claim
- Status is updated in MongoDB and the UI reflects the change instantly

4️⃣ **Recipient Completion**

- Recipient completes the donation → status updated in MongoDB
- All completed donations contribute to the donor's impact stats

## 🛠️ Tech Stack

### Frontend

- **Next.js** (Server-Side Rendering)
- **Tailwind CSS** + **Shadcn UI**
- **TypeScript**
- **Formik** + **Yup**

### Backend

- **Next.js API Routes** (REST logic)
- **Node.js + Socket.IO** (real-time server)
- **Yup**

### Database

- **MongoDB** + **Mongoose**

### Authentication

- **JWT Auth** + **Role-Based Access Control (RBAC)**

### Integrations

- **Google Maps API** (geocoding/maps)
- **Cloudinary** (image uploads)
- **Firebase Cloud Messaging** (push notifications)

### DevOps

- **Netlify** (CI/CD deployment)
- **Cron Jobs** (auto-deletion of expired donations)

---

## 🔄 Workflow

### Donors

1. Post food with quantity, type, location, and image.
2. Get notified of claims and confirm/decline them.

### Recipients

1. Browse donations in grid/map view.
2. Filter by distance, type, expiry.
3. Claim available items

### Admins

1. Monitor platform activity
2. View analytics and system stats.

---

## 📐 Architecture

- 🧱 **Repository Pattern** (modular code structure)
- 📦 **Layered Logic** (clear frontend/backend separation)
- ✅ **Type Safety** with TypeScript
- ⚡ **Real-Time Sync** using Socket.IO + MongoDB Change Streams
- 📅 **Agile Management** using Jira workflows

---

## 📦 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GSG-NEXT-JS-PROJECT/Food-Rescue-Hub.git
   cd Food-Rescue-Hub
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Configure Environment Variables

   Create a .env.local file in the root directory and add the following:

   ```ini
    # =============== Database Configuration ===============

    DB_PASSWORD=your_mongodb_password
    DB_URL=your_mongodb_url

    # ================== Authentication ===================

    SESSION_SECRET=your_session_secret_key

    # ================== Cloudinary Setup ==================

    CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
    NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # ================== Firebase Configuration ============

    NEXT_PUBLIC_GOOGLE_API_KEY=your_google_maps_api_key
    NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY=your_firebase_vapid_key
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
    FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email

    # ================== Email Configuration ===============

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@domain.com
    SMTP_PASS=your_email_app_password

    # ================== Real-Time Communication ===========

    NEXT_PUBLIC_SOCKET_IO_URL=http://localhost:4000
   ```

4. Start the Development Server

   ```bash
   npm run dev
   ```

5. Set Up Real-Time Socket Server
   ```bash
   cd socket-server
   npm install
   npm start
   ```

## 🤝 Contribution Guidelines

We welcome contributions! To get started:

- Fork the repository and clone it locally.
- Follow the [Getting Started](#-getting-started) steps.
- Check out [open issues](https://github.com/GSG-NEXT-JS-PROJECT/Food-Rescue-Hub/issues) or submit a new one.
- Submit pull requests with clear descriptions and adhere to our [coding standards](link-to-standards).

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
