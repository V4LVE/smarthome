# SmartHome Control Platform

A modern, full-featured smart home automation platform built with Next.js, featuring real-time device control, telemetry monitoring, and intelligent automation. Control curtains, monitor environmental conditions, and manage your smart home from an intuitive web interface.

## 🌟 Features

- **Smart Curtain Control** — Open/close curtains individually or by room, with scene-based global control
- **Real-time Telemetry** — Monitor temperature and humidity across rooms with live dashboards
- **MQTT Integration** — Reliable device communication via HiveMQ Cloud
- **Authentication** — Secure email/password authentication with role-based access control
- **Dark Mode** — Beautiful light and dark theme support
- **Responsive Design** — Fully responsive interface using HeroUI components and Tailwind CSS
- **Alarm System** — Set and manage home automation alarms
- **User Profiles** — Manage user settings and preferences
- **Role-Based Access** — Admin panel for user management and system configuration

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **UI Framework** | HeroUI v3, Tailwind CSS 4 |
| **Charts** | Recharts |
| **Backend** | Next.js API Routes (Server Actions) |
| **Database** | PostgreSQL with Drizzle ORM |
| **Authentication** | Better Auth with email/password |
| **Device Communication** | MQTT (HiveMQ Cloud) |

## 📂 Project Structure

```
smarthome/
├── app/                          # Next.js app router directory
│   ├── api/                      # API routes and auth endpoints
│   ├── components/               # Reusable React components
│   ├── curtains/                 # Curtain control feature
│   ├── dashboard/                # Telemetry dashboard & charts
│   ├── alarm/                    # Alarm management
│   ├── profile/                  # User profile page
│   ├── signin/                   # Sign in page
│   ├── signup/                   # Sign up page
│   └── layout.tsx                # Root layout
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Better Auth configuration
│   ├── auth-client.ts            # Client-side auth utilities
│   ├── dbClient.ts               # PostgreSQL database connection
│   └── alert-manager.ts          # Alert system utilities
├── services/                     # Backend services
│   ├── mqttService.ts            # MQTT client and connections
│   ├── curtainService.ts         # Curtain control logic
│   ├── alarmService.ts           # Alarm management
│   └── requireRole.ts            # Role-based access control
├── schemas/                      # Data validation schemas
│   ├── auth-schema.ts            # Authentication schemas
│   └── telemetrySchema.ts        # Telemetry data schemas
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+ (LTS recommended)
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or cloud)
- **MQTT Broker** (HiveMQ Cloud credentials)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/smarthome

# MQTT Configuration
MQTT_HOST=your-hivemq-instance.s1.eu.hivemq.cloud
MQTT_PORT=8884
MQTT_USERNAME=your_username
MQTT_PASSWORD=your_password

# Better Auth Configuration
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_TRUST_HOST=http://localhost:3000
```

### Installation

1. **Clone the repository**
	```bash
	git clone <repository-url>
	cd smarthome
	```

2. **Install dependencies**
	```bash
	npm install
	```

3. **Set up the database**
	```bash
	# Run database migrations
	npm run db:push
	```

4. **Start the development server**
	```bash
	npm run dev
	```

5. **Open in browser**
	Navigate to `http://localhost:3000` and create your account

## 📖 Usage Guide

### Dashboard
- View real-time telemetry data (temperature, humidity)
- Select time intervals to analyze trends
- Visual charts for environmental monitoring

### Curtain Control
- **Individual Control** — Open/close specific curtains per room
- **Scene Control** — Apply global scenes (e.g., "Open All", "Close All")
- **Real-time Status** — See current temperature and humidity for each room

### Alarm Management
- Set up automated alarms
- Configure alarm triggers based on telemetry data
- Manage alarm notifications

### User Profile
- Update account settings
- Manage authentication preferences
- View account information

## 🔧 Available Scripts

### Development
```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build for production
npm run start         # Start production server
```

### Code Quality
```bash
npm run lint          # Run ESLint on the codebase
```

### Database
```bash
npm run db:push       # Sync schema with database
npm run db:studio     # Open Drizzle Studio
```

## 🔐 Authentication

The application uses **Better Auth** for secure authentication:
- Email/password registration and login
- Role-based access control (Admin, User)
- Session management
- Protected API routes

### Protected Routes
Routes requiring authentication are wrapped with role checks:
```typescript
import { requireRole } from '@/services/requireRole';

export async function GET(req: Request) {
  const session = await requireRole('admin');
  // Protected logic
}
```

## 📡 MQTT Device Communication

Smart devices communicate via MQTT topics:

```
curtains/{curtain-id}     # Curtain control commands (OPEN/CLOSE)
telemetry/{device-id}    # Temperature & humidity readings
alarm/{alarm-id}         # Alarm triggers and responses
```

The MQTT service automatically:
- Reconnects on disconnect
- Handles message buffering
- Logs connection events

## 🎨 UI Components

The project uses **HeroUI v3** components (Button, Card, Chip, Alert, etc.) styled with Tailwind CSS 4:
- Custom gradient backgrounds
- Smooth hover states and transitions
- Full dark mode support
- Accessible focus states

## 📊 Data & Charts

Telemetry data is visualized using **Recharts**:
- Temperature trends over time
- Humidity patterns
- Customizable time intervals (1H, 6H, 24H, 7D, 30D)

## 🐛 Troubleshooting

### Development server won't start
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Run migrations: `npm run db:push`

### MQTT connection fails
- Check HiveMQ credentials in `.env.local`
- Verify internet connection
- Check firewall allows port 8884

### Authentication issues
- Clear browser cookies
- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_TRUST_HOST` matches your domain

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# Environment variables needed in Vercel:
DATABASE_URL
BETTER_AUTH_SECRET
MQTT_HOST
MQTT_USERNAME
MQTT_PASSWORD
```

### Deploy to Custom Server

```bash
# Build and start
npm run build
npm start
```

## 📝 Development Workflow

### Adding New Features

1. **New Page** — Create in `app/` folder using Next.js conventions
2. **New Component** — Add to `app/components/` with TypeScript types
3. **New Service** — Create in `services/` folder for business logic
4. **New Schema** — Add validation in `schemas/` folder
5. **Database Changes** — Update schema, then run `npm run db:push`

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind utilities for styling
- Keep components focused and reusable

## 📦 Dependencies Overview

- **next** — React framework
- **react** — UI library
- **drizzle-orm & pg** — Database ORM and driver
- **better-auth** — Authentication
- **mqtt** — MQTT client
- **@heroui/react** — UI component library
- **recharts** — Charting library
- **tailwindcss** — Utility-first CSS

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Submit a pull request

## 📄 License

[MIT]

## 📧 Support & Contact

For issues, questions, or feature requests, please open an issue in the repository or contact the development team.
