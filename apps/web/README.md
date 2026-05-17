# Help-X Web Dashboard

React + Tailwind CSS dashboard for Help-X emergency operations.

## Pages

- `/login` - Operator login screen.
- `/dashboard` - Command center overview with metrics, alerts, countdown, and response pipeline.
- `/alerts` - Active emergency alerts with AI confidence and escalation rules.
- `/vehicles` - Vehicle and IoT device monitoring.
- `/gps` - GPS tracking view with map placeholder.
- `/hospitals` - Hospital notification and trauma capacity panel.
- `/police` - Police dispatch coordination panel.

## Structure

```text
src/
  components/common     Reusable cards, badges, page headers, countdown, alert cards
  components/layout     Sidebar, top navbar, application frame
  data                  Mock dashboard data until backend integration
  features/auth         Login page
  features/dashboard    Main dashboard page
  features/incidents    Active alert workflow
  features/vehicles     Vehicle monitoring workflow
  features/map          GPS tracking workflow
  features/notifications Hospital notification workflow
  features/dispatch     Police dispatch workflow
  services              API and Socket.IO clients
  styles                Tailwind and global CSS
```

## Run

```bash
npm install
npm run dev
```

The UI is currently wired with mock operational data and is ready to connect to the Help-X backend APIs and Socket.IO events.
