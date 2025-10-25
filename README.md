# React TicketApp - HNG13 Task

## Project Description
This is the **React version** of the Ticket Management Web Application for the HNG13 Frontend Task.  
The app allows users to manage tickets with full CRUD operations and includes authentication, dashboard, and responsive design.

---

## Task Requirements

**Core Features:**

1. **Landing Page**
   - Display app name, catchy description, and CTA buttons ("Login" and "Get Started").
   - Hero section with wavy background (SVG or CSS clip-path).
   - Decorative circles and card-style sections.
   - Max-width 1440px, responsive layout.
   - Footer consistent across all pages.

2. **Authentication Screen**
   - Login and Signup pages with form validation.
   - Inline error messages and toast notifications.
   - Simulated authentication using `localStorage`, mock API, or JSON server.
   - Redirect to Dashboard after successful login.

3. **Dashboard**
   - Summary stats: Total tickets, Open tickets, Resolved tickets.
   - Navigation to Ticket Management.
   - Logout button clears session and redirects to login.

4. **Ticket Management Screen (CRUD)**
   - Create, Read, Update, Delete tickets.
   - Form validation and real-time feedback.
   - Status field: `open` (green), `in_progress` (amber), `closed` (gray).

---

**Rules of Engagement:**

- **Data Validation:** `title` and `status` are mandatory.  
- **Error Handling:** Invalid inputs, unauthorized access, network/API errors must show friendly messages.  
- **Security:** Protected routes using `ticketapp_session` in `localStorage`.  
- **Layout & Design:** Max-width 1440px, responsive, accessible, semantic HTML, focus states.  

---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/<USERNAME>/react-ticketapp.git
cd react-ticketapp

# Install dependencies
npm install

# Start development server
npm run dev
