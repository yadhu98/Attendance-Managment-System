# Attendance Managment System

# Attendance Management System Requirements

**Date:** April 2, 2025  
**Author:** [Your Name]  
**Version:** 1.0  
**Purpose:** Define the functional and non-functional requirements for an attendance management system for a music, art, and dance school, ensuring scalability and extensibility.

---

## 1. Overview
The Attendance Management System (AMS) is a web application designed to manage courses, users (Super Admin, Teachers, Students), attendance, fees, salaries, coupons, and invitations for a music, art, and dance school. It operates in two phases:
- **Phase 1:** Super Admin controls all actions, including attendance marking with teacher assignment.
- **Phase 2:** Teachers gain authentication to mark attendance themselves.

The system must be scalable to handle thousands of users, with modular design and efficient data management.

---

## 2. User Roles
1. **Super Admin**
   - Full control over the system.
   - Creates/manages courses, teachers, students, coupons, fees, and invitations.
   - Marks attendance and assigns teachers (Phase 1).
   - Tracks teacher salaries and student payments.

2. **Teachers**
   - Phase 1: No login; Super Admin assigns them to attendance slots.
   - Phase 2: Login enabled; mark attendance for their students directly.
   - Tracked for salary based on classes taught and students handled.

3. **Students**
   - Login to view attendance and (if enabled) invite others.
   - Pay registration and course fees, tracked by admin.

---

## 3. Functional Requirements

### 3.1 Course Management
- **Description:** Super Admin creates and edits courses with customizable fees and slots per cycle.
- **User Stories:**
  - As an admin, I can create a course with a name, fee, and slot count so students can enroll.
  - As an admin, I can edit a course to update its details anytime.
  - As an admin, I can search courses by name to find them quickly.
- **Features:**
  - Create/edit courses (e.g., "Dance", 1000 INR, 5 slots).
  - Search courses by name.

### 3.2 User Management
- **Description:** Super Admin manages teachers and students; students have login access.
- **User Stories:**
  - As an admin, I can create a teacher with assigned courses.
  - As an admin, I can create a student with login credentials and enroll them in courses.
  - As an admin, I can search teachers/students by name.
  - As an admin, I can filter students with dues to follow up on payments.
- **Features:**
  - Create/edit teachers (Phase 1: no auth; Phase 2: with auth).
  - Create students with username/password, courses, and fees.
  - Search teachers/students by name.
  - Filter students by due status.

### 3.3 Slot & Attendance Management
- **Description:** Tracks attendance with customizable slots per course cycle.
- **User Stories:**
  - As an admin (Phase 1), I can mark a student’s attendance slot and select the teacher who taught it.
  - As a teacher (Phase 2), I can mark attendance for my students without selecting myself.
  - As a student, I can view my attendance slots for all enrolled courses.
- **Features:**
  - Custom slots per course (e.g., 5 for Dance).
  - Phase 1: Admin marks slots with teacher dropdown.
  - Phase 2: Teachers mark slots, auto-assigned.
  - Slot statuses: green (paid), orange (due), red (due filled), filled (attended).
  - Students view attendance.

### 3.4 Salary Management
- **Description:** Tracks teacher workload and salary status for automation.
- **User Stories:**
  - As an admin, I can see how many classes and students a teacher has handled for salary calculation.
  - As an admin, I can mark a teacher’s salary as paid or pending.
  - As an admin, I can filter teachers by salary status (paid/pending).
- **Features:**
  - Track classes taught and students per teacher.
  - Calculate salary (manual input or formula-based).
  - Mark salary as paid/pending.
  - Filter teachers by salary status.

### 3.5 Coupon Management
- **Description:** Admin creates one-time-use coupons for fees.
- **User Stories:**
  - As an admin, I can create a coupon for registration, course fees, or both.
  - As an admin, I can search coupons by code.
  - As an admin, I can apply a coupon when creating a student.
- **Features:**
  - Create/edit coupons (type: registration/course/both, course-specific).
  - One-time use per user.
  - Search coupons by code.

### 3.6 Fee Management
- **Description:** Tracks student payments and due status.
- **User Stories:**
  - As an admin, I can set a customizable registration fee for a student.
  - As an admin, I can update course fees and mark payments or dues.
  - As an admin, I can see a student’s total due amount.
- **Features:**
  - One-time registration fee (customizable).
  - Course fees per cycle, updated anytime.
  - Due tracking (green/orange/red slots).

### 3.7 Payment Activity Tracker
- **Description:** Logs all payment-related actions.
- **User Stories:**
  - As an admin, I can log a payment for a student or teacher salary.
  - As an admin, I can view payment history for a user.
  - As an admin, I can search payments by user name or type.
- **Features:**
  - Log payments (registration, course, salary).
  - View/search payment history.

### 3.8 Invitation Management
- **Description:** Students invite others with admin-defined offers.
- **User Stories:**
  - As a student, I can generate an invite code (if enabled) to share with others.
  - As an admin, I can enable/disable invitations and set offers.
  - As an admin, I can search invitations by code.
- **Features:**
  - Enable/disable invitation feature.
  - Generate/redeem invite codes with discounts.
  - Search invitations.

---

## 4. Non-Functional Requirements
1. **Scalability:**
   - Support 10,000+ users with efficient database queries (indexed fields).
   - Modular backend (separate routes/controllers) and frontend (reusable components).
   - Pagination for search/filter APIs to handle large datasets.
   - Configurable via environment variables (e.g., DB URL, slot defaults).

2. **Performance:**
   - API response time < 500ms for typical queries.
   - Use caching (e.g., Redis) for frequent searches if needed.

3. **Security:**
   - JWT-based authentication for all roles.
   - Role-based access control (e.g., admin-only APIs).
   - Passwords hashed (e.g., bcrypt).

4. **Usability:**
   - Responsive UI for desktop/mobile.
   - Intuitive search/filter interfaces.

5. **Maintainability:**
   - Well-documented code and APIs.
   - Versioned APIs (e.g., `/api/v1/`) for future updates.

---

## 5. Scalability Considerations
- **Database:** Use MongoDB with indexes on `name`, `username`, `code`, etc., for fast searches. Shard collections (e.g., `Users`) for large-scale growth.
- **Backend:** RESTful APIs with versioning and load balancer support (e.g., via Heroku).
- **Frontend:** Reusable components (e.g., `Table`, `SearchBar`) and centralized API service for easy updates.
- **Deployment:** Cloud-based (Heroku/Netlify) with auto-scaling; add caching layer (Redis) for high traffic.
- **Future Expansion:** Multi-school support via tenant ID in schemas.

---

## 6. Assumptions
- Initial deployment is for one school; multi-school support is a future feature.
- Salary calculation is manual (admin inputs amount); automation is a future enhancement.
- Phase 1 is prioritized; Phase 2 (teacher auth) is prepped but not fully active.
- Payment gateway integration is out of scope for MVP.

---

## 7. Deliverables
- **Requirements Document:** This file (`Requirements.md`).
- **Next Steps:** Database design, API spec, UI wireframes (Week 1).

---

## 8. Glossary
- **Slot:** A single class attendance marker (e.g., 5 slots = 5 classes per cycle).
- **Cycle:** A set of slots for a course, requiring fee payment to renew.
- **Due:** Unpaid fees, tracked with orange/red slots.
- **MVP:** Minimum Viable Product, covering Phase 1 with Phase 2 prep.

---
