# Project Documentation

## Prerequisites

Before running this project, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed. You can download and install it from the official Node.js website.

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/): The project uses npm for package management by default, but you can also use yarn if you prefer. Make sure you have one of these package managers installed.

- [Git](https://git-scm.com/): You'll need Git installed on your system to clone the project repository from GitHub.

## Technologies Used

This project was built using the following technologies:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A fast build tool for modern web development.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- [React Router](https://reactrouter.com/): A library for handling routing in React applications.
- [Axios](https://axios-http.com/): A library for making HTTP requests.
- [React Query](https://react-query.tanstack.com/): A library for managing and caching server state in React applications.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:** &nbsp;

git clone https://github.com/1LE00/frontend-assignment.git

cd your-repository

2. **Install Dependencies:** &nbsp;

npm install

3. **Run the Development Server:** &nbsp;

npm run dev

This will start the development server. Your app will be accessible at `http://localhost:5173/`. If it's a different port see the message in the terminal.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the code using ESLint.
- `npm run preview`: Runs a local server to preview the production build.

## Folder Structure

The project has the following folder structure:

- `public`: Contains static assets that will be served as-is by Vite.
- `src`: Contains the application source code.
- `index.html`: The main HTML file.
- `main.js`: The entry point for the React application.
- `App.js`: The main React component.
- `vite.config.js`: The Vite configuration file. It controls Vite's build and development settings. You can customize Vite's behavior using this file.
- `tailwind.config.js`: The Tailwind CSS configuration file. It allows you to customize Tailwind CSS settings, such as colors, fonts, and more.
- `postcss.config.js`: The PostCSS configuration file. PostCSS is used by Vite to process CSS. You can configure PostCSS plugins and options in this file.
- `package.json`: The npm package file that lists all project dependencies and scripts.
- `package-lock.json` or `yarn.lock`: Lock files that ensure consistent installations of project dependencies.
