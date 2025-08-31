# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Drilling Data Dashboard

## Overview

This is a comprehensive drilling data management and visualization application built for the oil and gas industry. The system enables users to upload, analyze, and visualize well data through an interactive dashboard interface. It features real-time data monitoring, AI-powered chat assistance, and detailed analytics for drilling operations.

The application follows a full-stack architecture with a React frontend and Express.js backend, designed to handle complex drilling datasets and provide actionable insights through data visualization and intelligent recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/UI components built on Radix UI primitives with Tailwind CSS styling
- **State Management**: TanStack Query for server state management and data fetching
- **Data Visualization**: Recharts library for interactive charts and graphs
- **File Processing**: XLSX library for Excel file parsing and CSV processing capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Development Server**: Vite for fast development builds and hot module replacement
- **API Design**: RESTful endpoints following standard HTTP conventions
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting for scalable cloud deployment
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Drizzle Kit for database schema versioning and deployment
- **Local Storage**: Browser localStorage for client-side data persistence and caching
- **Memory Storage**: In-memory storage class for development and testing scenarios

### Database Schema Design
- **Users Table**: Authentication and user management with unique username constraints
- **Wells Table**: Core well information including depth, status, formation, and ROP metrics
- **Well Data Table**: Detailed drilling measurements with foreign key relationships to wells
- **Validation**: Zod schemas for runtime type checking and data validation

### Authentication and Authorization
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Security**: Environment-based configuration for database credentials
- **Data Validation**: Input sanitization using Zod schemas on both client and server

### File Upload and Processing
- **Supported Formats**: Excel (.xlsx) and CSV file upload capabilities
- **Client-Side Processing**: Browser-based file parsing to reduce server load
- **Data Transformation**: Automatic conversion of raw data to standardized well data format
- **Progress Tracking**: Real-time upload progress indicators with user feedback

### Data Visualization Components
- **Chart Types**: Line charts for depth vs measurement analysis, scatter plots for data correlation
- **Interactive Features**: Responsive charts with tooltips, zoom capabilities, and data filtering
- **Chart Configuration**: Customizable chart styling with theme-aware color schemes
- **Real-Time Updates**: Dynamic chart updates based on data changes and user selections

### AI Chat Integration
- **Conversational Interface**: Simulated AI assistant for well data analysis and insights
- **Context Awareness**: AI responses tailored to specific well data and drilling metrics
- **Query Processing**: Pattern matching for common drilling industry questions and terminology

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with automatic scaling
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Connect-pg-simple**: PostgreSQL session store for Express applications

### UI and Styling
- **Shadcn/UI**: Pre-built component library with accessibility features
- **Radix UI**: Unstyled, accessible UI primitives for complex interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Comprehensive icon library with consistent styling

### Data Processing and Visualization
- **Recharts**: React charting library built on D3.js for interactive visualizations
- **XLSX**: Client-side Excel file processing and data extraction
- **Date-fns**: Modern date utility library for time-based data manipulation

### Development and Build Tools
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **TypeScript**: Static type checking for enhanced code reliability
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **Replit Integration**: Platform-specific plugins for development environment optimization

### Validation and Forms
- **Zod**: Runtime type validation with TypeScript integration
- **React Hook Form**: Performant form library with validation support
- **Hookform Resolvers**: Integration layer between React Hook Form and validation libraries

### State Management and API
- **TanStack Query**: Powerful data synchronization for React applications
- **Wouter**: Minimalist routing library for single-page applications
- **Nanoid**: URL-safe unique string ID generator for client-side operations
    },
  },
])
```
