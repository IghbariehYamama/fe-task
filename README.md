# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Project Setup

1.**Install Dependencies:**

   npm install


2.**Install Material-UI:**

   npm install @mui/material @emotion/react @emotion/styled
   

3.**Run the Development Server:**

   npm run dev


## Application Functionality

This application is a basic Pokemon Pokedex built with React and Vite. It allows users to:

- **View a list of Pokemon**: Displays Pokemon cards fetched from the PokeAPI.
- **View Pokemon details**: Clicking on a Pokemon card opens a modal with detailed information.
- **Catch Pokemon**: Users can "catch" Pokemon, adding them to a favorites sidebar.
- **View favorites**: The sidebar displays all caught Pokemon, which can be clicked for detailed views.
- **Persistent storage**: Caught Pokemon are stored in local storage, preserving favorites across sessions.

