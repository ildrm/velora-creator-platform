# Velora creator platform

A production-shaped, safe-demo MVP for a creator membership and paywalled-content marketplace. The product emphasizes discovery, clear membership value, creator operations, privacy, and explicit compliance gates.

## What is implemented

- Mobile-first fan feed with free and locked releases.
- Creator discovery, filters, profiles, membership offer, and static generation.
- Private age-assurance journey with an explicit vendor handoff boundary.
- Messaging, saved library, and creator studio experiences.
- Signed HTTP-only demo authentication with server-enforced role-based access control.
- Creator earnings, retention, content-health, readiness, and payout UI.
- Health and purpose-limited compliance-status APIs.
- Testable server-side entitlement policy for restricted viewing, monetization, publishing, and payout.
- Docker multi-stage production image and hardened Compose service.

This is a safe demo: it does not collect identity documents or card data, does not upload restricted content, and does not claim that identity, moderation, payment, reporting, or payout vendors are connected.

## Prerequisites

- Node.js 22 or newer
- npm 11 or newer
- Docker Desktop, only if you want to use the container workflow

## Run in development

From PowerShell, Command Prompt, or a terminal opened in the repository root:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Next.js will print another URL if port 3000 is already occupied.

On subsequent runs, dependencies are already installed, so only run:

```bash
npm run dev
```

Stop the development server with `Ctrl+C`.

## Run the production build locally

```bash
npm install
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000). The `start` command requires a successful build first.

To choose another port in PowerShell:

```powershell
npm run start -- -p 3003
```

On macOS or Linux, the same command works in your terminal:

```bash
npm run start -- -p 3003
```

## Run with Docker

Build and start the hardened production container:

```bash
docker compose up --build
```

Run it in the background instead:

```bash
docker compose up --build -d
```

Check application and container status:

```bash
docker compose ps
curl http://localhost:3000/api/health
```

PowerShell can use this health-check command:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

View logs or stop the project:

```bash
docker compose logs -f web
docker compose down
```

If port 3000 is already occupied, either stop that process or change the port mapping in `compose.yaml`, for example from `3000:3000` to `3005:3000`, and then open `http://localhost:3005`.

## Verify

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The verification flow is intentionally simulated. Do not enter real identity, payment, confidential, or restricted-content data.

To exercise authentication against a production server running on port 3003:

```bash
npm run test:auth
```

For another server URL, set `BASE_URL` first. In PowerShell:

```powershell
$env:BASE_URL="http://127.0.0.1:3000"
npm run test:auth
```

## Demo authentication and roles

Open `/login`, choose a role, and sign in. These accounts are synthetic and exist only to demonstrate the authorization model.

| Role | Email | Password | Protected workspace |
| --- | --- | --- | --- |
| Fan | `fan@velora.demo` | `FanDemo!2026` | Profile, messages, saved content, verification |
| Creator | `creator@velora.demo` | `CreatorDemo!2026` | Fan access plus creator studio and publishing tools |
| Moderator | `moderator@velora.demo` | `ModeratorDemo!2026` | Moderation, reports, account safety, audit access |
| Admin | `admin@velora.demo` | `AdminDemo!2026` | All workspaces, users, roles, policy, and audit access |

Sessions use an eight-hour signed, HTTP-only, SameSite cookie. The server checks the session and role before protected pages are served; hiding links in the UI is only a secondary convenience. Set a strong `AUTH_SECRET` before any non-demo deployment. Authentication refuses to sign or verify sessions with `SAFE_DEMO_MODE=false` unless that secret is present.

This demo intentionally uses fixed credentials and has no account database, registration, recovery, MFA, or password hashing. A real deployment must replace the demo credential lookup with a production identity service and retain the server-side permission checks.

## Useful routes

- `/` — fan feed
- `/login` — role-based demo sign-in
- `/discover` — creator discovery
- `/creator/mayamakes` — creator profile
- `/messages` — member messaging
- `/vault` — saved and unlocked library
- `/studio` — creator dashboard
- `/moderation` — moderator operations workspace
- `/admin` — administration workspace
- `/verify` — safe-demo age-assurance journey
- `/profile` — account and preference status
- `/safety`, `/privacy`, `/terms` — prototype policy surfaces
- `/api/health` — application health
- `/api/auth/login`, `/api/auth/session`, `/api/auth/logout` — demo session lifecycle
- `/api/compliance/status` — safe-demo gate status

## Documentation

- [Product research](docs/01-product-research.md)
- [Product requirements](docs/02-product-requirements.md)
- [User scenarios](docs/03-user-scenarios.md)
- [System architecture](docs/04-system-architecture.md)
- [Security and compliance](docs/05-security-compliance.md)
- [Data model](docs/06-data-model.md)
- [Delivery plan](docs/07-delivery-plan.md)
- [OpenAPI baseline](docs/08-openapi.yaml)

## Important boundary

No repository alone can make this category launch-ready. A real paid release requires jurisdiction- and entity-specific counsel, processor/acquirer underwriting, certified identity and safety vendors, reporting registration, staffed operations, audited financial controls, and security/privacy review. The documents explain the release gates in detail.
