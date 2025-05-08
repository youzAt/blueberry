# Blueberry Events Platform

A React-based web application for managing and participating in events. This platform allows users to sign up for events, view event details, get tickets, and access certificates.

## Features

- User authentication via phone number (OTP) or password
- View upcoming and latest events
- Event registration with customizable signup forms
- Ticket management system
- Certificate generation and verification
- Short link support for event sharing
- Social media integration

## Technical Stack

- **Frontend**: React with TypeScript
- **API Communication**: Axios
- **Authentication**: JWT (Access & Refresh tokens)
- **Styling**: CSS module
- **State Management**: React Query for server state
- **State Management**: 
  - React Query for server state management
  - Context API for global application state
- **Build Tool**: Vite

## API Integration

The application communicates with a REST API and includes endpoints for:

- Account management (/account/*)
- Event operations (/events/*)
- Registration handling (/event/registration/*)
- Ticket management (/event/ticket/*)
- Certificate verification (/event/certificate/*)

## Authentication Flow

The platform implements a complete authentication system with:
- Phone number verification
- OTP-based login
- Password-based login
- JWT token management with auto-refresh
- Automatic token injection in API requests

## Event Management

Users can:
- View all events sorted by creation date
- View latest events sorted by registration time
- Access event details via slug or short link
- Register for events with custom form fields
- View their registered events
- Access and verify event certificates
- Download event tickets


## Short Links

Events can be shared using short links in the format: `ssceb.ir/e/{shortcode}`


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Run npm install
3. Run npm run dev
4. Open localhost port 3000 (http://localhost:3000/)





