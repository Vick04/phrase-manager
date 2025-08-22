# Phrase List manager

## 🚀 Introduction

This project is a simple spa to add, find and delete short phrases.

## 📦 Tech Stack

- Node 22.15.0
- Vite 7.1.0
- React 19.1
- Typescript 5.8
- Material UI 7.3
- Tailwind css 4.1
- Vitest 3.2.4
- React testing library 16.3.0

## 📑 Scripts

**Run project**

```bash
npm run dev
```

**Test**

```bash
npm run test
```

**Test coverage**

```bash
npm run coverage
```

**Eslint**

```bash
npm run lint
```

**Prettier**

```bash
npm run format
```

## 🛠️ Installation

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Run development server:**

    ```bash
    npm run dev
    ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:5173/)

## 📏 Project architecture

This is a SPA project that uses Vite + Typescript, with a flexible structure that allows it to be transformed into an MPA. It uses Tailwind CSS for layout and Material UI for complex display components (e.g., Dialogs). It uses Vitest + React Testing Library for unit and integration testing. The folders are organized as follows:

- Assets: All style files, fonts, and multimedia.
- Components: Custom components reusable throughout the app.
- Constants: Necessary constant values.
- Hooks: Custom hooks that can be used throughout the app.
- Pages: Home page and future navigable pages.
- Types: Custom types that represent the business domain.

If necessary, the pages can have their own Components, Hooks, and Types folders, improving the domain definition.
