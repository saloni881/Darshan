# Technical Architecture – DarshanEase

## 1. Architectural Overview

DarshanEase is designed as a three-tier full-stack MERN application that ensures modularity, scalability, and secure data management. The system separates concerns across presentation, application, and data layers.

### Architecture Layers

1. Presentation Layer – React.js (Frontend UI)
2. Application Layer – Node.js + Express.js (Backend API & Business Logic)
3. Data Layer – MongoDB (Persistent Data Storage)

Client (Browser)
      ↓
React.js Frontend
      ↓ (REST API via Axios)
Express.js Server (Node.js)
      ↓
Authentication & Role Middleware
      ↓
MongoDB Database (Mongoose ODM)

This layered approach ensures clear responsibility separation and maintainable code structure.

## 2. Architectural Pattern

The system follows:
- MVC (Model–View–Controller) Pattern
- RESTful API Architecture
- Role-Based Access Control (RBAC)
- Modular Backend Structure

### MVC Mapping
- Model → Mongoose Schemas (User, Temple, Slot, Booking, Donation)
- View → React Components and Pages
- Controller → Express Route Controllers handling business logic

## 3. Frontend Architecture

The frontend is built using React.js with a component-based architecture.

### Key Characteristics

- Reusable UI components
- Page-level routing using React Router
- Axios for API communication
- Context API for global authentication state
- Role-based UI rendering

User Action
   ↓
React Component
   ↓
Axios API Request
   ↓
Backend Response
   ↓
UI State Update

The frontend handles validation, protected routes, and responsive layouts.

## 4. Backend Architecture

The backend is built using Node.js and Express.js with a modular folder structure.

### Request Processing Flow

Route → Controller → Business Logic → Model → Database

### Core Modules
- Authentication Module
- Temple Management Module
- Darshan Slot Management Module
- Booking Module
- Donation Module
- Admin & Organizer Management Module

Each module is independently structured with dedicated routes, controllers, and models.

## 5. Authentication & Authorization

DarshanEase implements JWT-based authentication and role-based authorization.

### Authentication Flow

1. User submits credentials.
2. Password verified using bcrypt.
3. JWT token generated.
4. Token returned to client. 
5. Token attached in request header for protected routes.

Header Format:

Authorization: Bearer <JWT_TOKEN>

### Role-Based Access Control

Roles implemented:

- USER
- ORGANIZER
- ADMIN

Middleware validates:
- Token authenticity
- User role
- Route access permission

This ensures secure access to sensitive operations.

## 6. Database Architecture

The application uses MongoDB with Mongoose ODM for schema modeling and relationship management.

### Collections

- Users – Authentication and role information
- Temples – Temple details and organizer reference
- DarshanSlots – Slot timings, capacity, and availability
- Bookings – User-slot relationship and booking records
- Donations – Temple donation records

Relationship Structure

User → Booking → DarshanSlot → Temple

Indexes are applied on frequently queried fields such as:
- userId
- templeId
- slotId

This improves query performance and scalability.

## 7. Booking System Architecture

The booking system is designed to ensure data consistency and prevent overbooking.

### Booking Flow

1. User selects temple and slot.
2. Backend validates:
- Authentication status
- Slot availability
- Seat capacity

3. Available seats are updated.
4. Booking record is created.
5. Confirmation response is returned.

This controlled flow prevents unauthorized access and seat conflicts.

## 8. API Design

All APIs follow REST principles:

- Proper HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Standard HTTP status codes
- Centralized error handling

Example Endpoints:

POST   /api/auth/login
GET    /api/temples
POST   /api/slots
POST   /api/bookings
DELETE /api/bookings/:id

## 9. Security Architecture

- Password hashing using bcrypt
- JWT-based stateless authentication
- Role validation middleware
- Protected routes
- Environment variable configuration
- Centralized error handling middleware
- CORS configuration for controlled acces

## 10. Scalability & Maintainability

The architecture ensures:
- Clear separation of concerns
- Modular codebase
- Independent feature expansion
- Stateless authentication for horizontal scaling
- Optimized database queries through indexing

# Entity Relationship Diagram

![ER Diagram](docs/er-diagram.png)
