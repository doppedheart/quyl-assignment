# Quyl Assignment

A full-stack web application created as part of a technical assessment, showcasing skills in React, TailwindCSS, Supabase, Prisma, and state management with Redux.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Deployment](#deployment)
- [Assessment Criteria](#assessment-criteria)
- [Contact](#contact)

## Project Overview

This project replicates a Figma design, implementing a responsive UI and complete CRUD functionality. It highlights a developer's proficiency in creating reusable components, managing global state, and integrating a backend with a Supabase database.

## Features

- **Frontend**:

  - Responsive design based on a Figma file.
  - Component reusability for cards, sections, and navigation.
  - TailwindCSS and Shadcn for styling.

- **Backend**:

  - Database integration using Supabase.
  - CRUD operations handled via Prisma ORM and API routes.

- **State Management**:
  - Global state management using Redux or Zustand.
  - Efficient data fetching, updating.

## Technologies Used

- **Frontend**: React, TailwindCSS, Shadcn
- **Backend**: Node.js, Prisma, Supabase
- **State Management**: Redux
- **Deployment**: Vercel, AWS EC2(backend)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Supabase account and project

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with your Supabase project URL and API keys.
   ```env
   DATABASE_URL=<your supabase database url>
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Deployment

- **Frontend**: Deployed on Vercel with environment variables configured.
- **Backend**: Deployed over AWS ec2 with supabase database.

## Contact

For any questions or feedback, please contact:

- Name: Anurag Agarwal
- Email: anuragagarwal530@gmail.com
- GitHub: [Anurag Agarwal](https://github.com/doppedheart)
