# GhadeerFit Frontend

Frontend application for the GhadeerFit video streaming platform. Built with Next.js 14, TypeScript, Tailwind CSS, and React Query.

## Features

- **Video Listing**: Display videos in a YouTube-style grid layout with embedded players
- **Notification System**: Bell icon with dropdown showing recent notifications
- **Notification Detail View**: Full page view with rich text content support
- **Category Filtering**: Filter videos by categories
- **Banner Carousel**: Display banner images with navigation
- **Search Functionality**: Search videos by title
- **Mobile Responsive**: Optimized for all screen sizes using Tailwind CSS
- **Modern UI**: Built with shadcn-ui components for a clean, professional look
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Internationalization**: Support for multiple languages (English, Arabic)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui (Radix UI)
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Video Player**: React YouTube
- **Internationalization**: i18next & react-i18next

## Prerequisites

Before you begin, ensure you have the following installed:

### For Docker (Recommended)
- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)

### For Local Development
- **Node.js** (v18 or higher)
- **npm** or **yarn**

## Quick Start with Docker 🐳 (Recommended)

The easiest way to run the frontend is using Docker:

```bash
# Start frontend service
docker-compose up --build

# Or using Make
make dev-build
```

Access the application:
- **Frontend**: http://localhost:3000

**Note**: Make sure the backend API is running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone git@github.com:muhammadfayyaz3/ghadeerfit-frontend.git
cd ghadeerfit-frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or use the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Update the URL to match your backend API endpoint.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Docker Deployment 🐳

### Quick Start

```bash
# Development mode with hot reload
docker-compose up --build

# Production mode
docker-compose -f docker-compose.prod.yml up --build -d
```

### Using Makefile Commands

```bash
make help              # Show all available commands
make dev              # Start development environment
make dev-build        # Build and start development
make dev-detached     # Start in detached mode
make prod             # Start production environment
make prod-build       # Build and start production
make prod-detached    # Start production in detached mode
make stop             # Stop all containers
make stop-volumes     # Stop and remove volumes
make clean            # Remove all containers, volumes, and images
make logs             # View logs
make logs-frontend    # View frontend logs
make shell-frontend   # Open shell in frontend container
make restart          # Restart all services
make ps               # Show running containers
make build            # Build all images
make build-frontend   # Build frontend image only
```

### Docker Services

- **frontend**: Next.js application with hot reload

### Useful Commands

```bash
# View logs
docker-compose logs -f

# Access frontend shell
docker-compose exec frontend sh

# Restart service
docker-compose restart frontend

# Stop and remove everything
docker-compose down -v
```

## Project Structure

```
frontend/
├── app/                    # Next.js app router
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Video listing page
│   │   └── notifications/ # Notification pages
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # React Query provider
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn-ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── header.tsx        # Main navigation header
│   ├── video-card.tsx    # Video card component
│   ├── notification-bell.tsx
│   ├── banner-carousel.tsx
│   ├── category-filter.tsx
│   └── search-bar.tsx
├── contexts/             # React contexts
│   └── video-player-context.tsx
├── lib/                  # Utility functions
│   ├── api.ts           # API client
│   ├── i18n.ts          # i18n configuration
│   └── utils.ts         # Utility functions
├── messages/            # Translation files
│   ├── en.json
│   └── ar.json
├── public/              # Static assets
│   └── logo.png
├── docker-compose.yml   # Docker development setup
├── docker-compose.prod.yml # Docker production setup
├── Dockerfile           # Docker image configuration
├── Makefile             # Make commands
├── setup.sh             # Setup script
└── package.json
```

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5001/api` |

**Note**: All environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Features in Detail

### Video Management
- Videos are displayed in a responsive grid layout
- Each video card shows an embedded YouTube player
- Automatic video ID extraction from various YouTube URL formats
- Support for video descriptions
- Category-based filtering

### Notification System
- Bell icon in header shows notification count
- Dropdown displays 5 most recent notifications
- Click any notification to view full details
- Dedicated notifications page for complete list
- Rich text support for notification descriptions

### Category Filtering
- Filter videos by categories
- Multiple category selection
- Clear filter option
- Category badges on video cards

### Banner Carousel
- Display banner images in a carousel
- Navigation arrows and indicators
- Clickable banners with custom links
- Responsive design

### Search Functionality
- Real-time search as you type
- Search videos by title
- Clear search option

### Mobile Responsiveness
- Responsive navigation header
- Grid layout adapts from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly UI elements
- Optimized for various screen sizes

### Internationalization
- Support for multiple languages
- Currently supports English and Arabic
- Language switcher in header
- RTL support for Arabic

## API Integration

The frontend communicates with the backend API using Axios. The API client is configured in `lib/api.ts`.

### Available API Endpoints

- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get video by ID
- `GET /api/categories` - Get all categories
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/:id` - Get notification by ID
- `GET /api/banners` - Get active banners

## Production Build

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Build Output

The production build creates an optimized version in the `.next` directory:
- Optimized JavaScript bundles
- Static HTML pages where possible
- Optimized images and assets
- Code splitting for better performance

## Deployment

### Vercel (Recommended)

Deploy your frontend to Vercel with automatic deployments from GitHub.

**Quick Steps:**
1. Push your code to GitHub
2. Import your repository in Vercel
3. Set environment variables (especially `NEXT_PUBLIC_API_URL`)
4. Deploy

**For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

### Docker Production

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Run production container
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables for Production

Make sure to set `NEXT_PUBLIC_API_URL` to your production backend URL:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check if backend API is running
- Verify CORS settings on backend
- Check browser console for errors

### Module Not Found Errors

```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

## Styling

The project uses Tailwind CSS for styling. Custom styles are defined in:
- `app/globals.css` - Global styles and Tailwind directives
- Component-level styles using Tailwind classes

### Customization

To customize the theme, edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
    },
  },
}
```

## Internationalization

The app supports multiple languages using i18next. Translation files are located in `messages/`:

- `en.json` - English translations
- `ar.json` - Arabic translations

To add a new language:
1. Create a new JSON file in `messages/`
2. Add translations
3. Update `lib/i18n.ts` to include the new language

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

