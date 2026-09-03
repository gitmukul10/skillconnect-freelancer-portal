# SkillConnect — Freelancer Booking Portal

SkillConnect is a responsive frontend web application that connects clients with skilled freelancers. Users can browse freelancers, search and filter talent, manage freelancer data, create project bookings, track booking status, and view project analytics through an interactive dashboard.

The project was developed as a production-style web application capstone demonstrating frontend development, responsive design, accessibility, dynamic DOM manipulation, CRUD operations, persistent client-side state, and live deployment.

## Live Demo

Add the deployed application URL here after deployment.

## Features

### Authentication Simulation

* User registration
* User login
* Persistent authentication state using Local Storage
* Protected application pages
* Logout functionality

### Freelancer Management

* Browse a dynamic freelancer catalog
* Search freelancers by name or skills
* Filter freelancers by category
* Add new freelancers
* Edit existing freelancer information
* Delete freelancers
* Persistent freelancer data using Local Storage

### Booking Management

* Book freelancers directly from the catalog
* Automatically pre-select the chosen freelancer
* Create project bookings
* Add project title, description, start date, and budget
* Track booking status
* Update booking status between Pending, Active, and Completed
* Cancel bookings
* Persistent booking data

### Dashboard

* Personalized welcome message
* Total freelancer statistics
* Active booking statistics
* Completed project statistics
* Skill category statistics
* Recent booking activity
* Interactive booking status chart
* Freelancer category analytics

### Responsive Design

The application is designed using a mobile-first responsive approach and adapts across:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

### Accessibility

The application includes accessibility-focused features such as:

* Semantic HTML structure
* Accessible form labels
* ARIA labels where appropriate
* ARIA live regions for dynamic feedback
* Keyboard-accessible controls
* Responsive layouts
* Visible focus states

## Technology Stack

* HTML5
* CSS3
* JavaScript (ES6+)
* Local Storage API
* Chart.js

## Project Architecture

```text
SkillConnect
│
├── HTML Pages
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── freelancers.html
│   └── bookings.html
│
├── CSS
│   ├── style.css
│   └── responsive.css
│
├── JavaScript
│   ├── storage.js
│   ├── auth.js
│   ├── app.js
│   ├── dashboard.js
│   ├── freelancers.js
│   └── bookings.js
│
└── Assets
    └── images
```

## Application Data Flow

```text
User Registration / Login
          ↓
Authentication State
          ↓
Protected Application Pages
          ↓
Freelancer Catalog
          ↓
Search / Filter / CRUD
          ↓
Book Freelancer
          ↓
Create Project Booking
          ↓
Local Storage Persistence
          ↓
Dashboard Statistics & Analytics
```

## CRUD Operations

The application implements Create, Read, Update, and Delete operations using dynamic JavaScript and browser Local Storage.

### Freelancer CRUD

* Create: Add a new freelancer
* Read: Display freelancers in the catalog
* Update: Edit freelancer information
* Delete: Remove a freelancer

### Booking Management

* Create: Create a new project booking
* Read: Display existing bookings
* Update: Change booking status
* Delete: Cancel a booking

## Persistent State

SkillConnect uses the browser Local Storage API to persist application data.

The following information is stored locally:

* Registered users
* Current authenticated user
* Freelancer records
* Booking records

Data remains available after refreshing the browser.

## Setup Instructions

### Option 1: Run Locally

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder.

3. Run the project using a local development server.

For example, with the VS Code Live Server extension:

* Open `index.html`
* Click **Go Live**

### Option 2: Open Directly

The project can also be opened by launching `index.html` in a browser.

## Deployment

The application can be deployed as a static website using platforms such as:

* Vercel
* Netlify
* GitHub Pages

No backend server is required because the application currently uses browser Local Storage for authentication simulation and persistent application data.

## Future Improvements

Potential future improvements include:

* Real backend authentication
* Database integration
* User profile management
* Freelancer profile pages
* Image uploads
* Booking notifications
* Payment integration
* Role-based access control
* REST API integration

## Author

Mukul

## License

This project was created for educational and internship capstone purposes.
