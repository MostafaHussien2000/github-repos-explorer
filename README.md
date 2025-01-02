# GitHub Repositories Explorer

## Project Overview

GitHub Repositories Explorer is a modern web application that allows users to browse, view, and interact with GitHub repositories. Built with React and powered by Supabase, this application provides an intuitive interface for exploring repository details, comments, and more.

## Features

- View detailed information about GitHub repositories
- Browse repositories for a specific user
- Add and manage comments on repositories
- Responsive and modern UI design
- Authentication support

## Technologies Used

- React (v18.3.1)
- React Router (v7.1.1)
- Radix UI Themes
- Supabase
- Vite

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-repos-explorer.git
   cd github-repos-explorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables: Create a `.env` file in the project root and add the following:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Project Structure

- `src/components/`: Reusable React components.
- `src/pages/`: Main page components
- `src/utils/`: Utility functions and helpers
- `src/supabase/`: Supabase configuration.
- `src/App.js`: Main application component.

### Contact

Mostafa Hussien - [mabozeed70@gmail.com](mailto:mabozeed70@gmail.com)
