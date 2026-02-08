# ShiftMaster App

Employee shift management application built with Next.js 15.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Production Build

Build and start the production server:
```bash
npm run build
npm run start
```

## Deployment on Render

This application is configured for deployment on Render using the `render.yaml` blueprint.

### Environment Variables

Add the following environment variables in the Render dashboard as needed:
- Add your environment variables here (database URLs, API keys, etc.)

The application will automatically build and start using the scripts defined in `package.json`.

## Tech Stack

- **Next.js 15.1.0** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF + jspdf-autotable** - PDF generation
- **Lucide React** - Icon library
