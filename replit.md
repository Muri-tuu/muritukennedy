# Kennedy Muritu Portfolio Website

## Overview

This is a fully responsive portfolio website for Kennedy Muritu, a Mechatronics Engineering student. The website showcases his projects, services, and professional background through a modern, dark-themed interface. Built as a single-page application with smooth scrolling navigation between sections including Home, About, Projects, Services, and Contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom dark theme configuration and CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design system
- **Animations**: Framer Motion for smooth transitions, fade-ins, and scroll-triggered animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Icons**: Font Awesome and Lucide React for iconography

### Component Structure
- **Modular Sections**: Each major section (Hero, About, Projects, Services, Contact) is a separate component
- **Reusable UI**: Comprehensive component library including buttons, cards, navigation, forms, and overlays
- **Responsive Design**: Mobile-first approach with responsive grid layouts and adaptive navigation
- **Accessibility**: Proper semantic HTML structure with ARIA labels and keyboard navigation support

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Storage Interface**: Abstracted storage layer with in-memory implementation and extensible interface for future database integration
- **Development Tools**: Hot module replacement via Vite integration in development mode
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations
- **Current Schema**: Basic user management with username/password fields and UUID primary keys

### Build and Development
- **Development**: Vite dev server with HMR and TypeScript checking
- **Production Build**: Optimized client bundle with server-side rendering preparation
- **Asset Management**: Static asset serving with proper caching headers
- **Environment**: Environment variable configuration for database connections

### Styling System
- **Design Tokens**: CSS custom properties for consistent theming
- **Typography**: Inter for body text, Playfair Display for headings
- **Color Palette**: Dark theme with blue accent colors and proper contrast ratios
- **Component Variants**: Class Variance Authority for systematic component styling
- **Responsive Breakpoints**: Mobile-first responsive design with Tailwind breakpoints

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Unstyled, accessible component primitives
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Font Awesome**: Icon library for social media and UI icons
- **Google Fonts**: Custom typography (Inter and Playfair Display)

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL
- **Drizzle Kit**: Database schema management and migrations
- **Neon Database**: Serverless PostgreSQL database service
- **Zod**: Schema validation library

### Server and API
- **Express.js**: Web application framework for Node.js
- **TanStack Query**: Data fetching and caching for React
- **Connect PG Simple**: PostgreSQL session store for Express

### Assets and Media
- **Profile Images**: Personal photos and project screenshots stored in attached_assets
- **Educational Logos**: Institution branding (Kagumo High School, DirectEd, Murang'a University)
- **Project Assets**: Screenshots and icons for portfolio projects

### External Services
- **WhatsApp API**: Direct messaging integration for client communication
- **Google Drive**: Resume hosting and file sharing
- **Social Media**: Integration with GitHub, LinkedIn, Instagram, X (Twitter), and TikTok profiles