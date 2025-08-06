# EPM Invoice Management App

A modern React application for EPM invoice management, built with TypeScript and Vite.

## Features

- ⚡ **Fast Development** - Built with Vite for lightning-fast HMR
- 🎯 **TypeScript** - Full type safety and better developer experience
- 🎨 **Modern UI** - Beautiful EPM-branded design with green color scheme
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔧 **ESLint** - Code quality and consistency
- 🖼️ **SVG Images** - High-quality vector graphics for all illustrations and icons

## Prerequisites

Before running this project, make sure you have Node.js installed on your system:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── images/              # SVG images and icons
│   ├── epm-logo.svg     # EPM company logo
│   ├── city-skyline.svg # Hero illustration
│   ├── notification-icon.svg # Benefits icons
│   ├── history-icon.svg
│   ├── email-icon.svg
│   ├── pdf-icon.svg
│   ├── afinia-logo.svg  # Partner company logos
│   ├── chec-logo.svg
│   ├── edeq-logo.svg
│   ├── essa-logo.svg
│   └── cens-logo.svg
├── App.tsx              # Main application component
├── App.css              # Application styles
├── main.tsx             # Application entry point
├── index.css            # Global styles
└── vite-env.d.ts        # TypeScript declarations
```

## Features Implemented

### Header Section
- Green navigation bar with EPM branding
- Accessibility controls (text size adjustment)
- Language selector
- Help link

### Hero Section
- Main call-to-action with "Consulta y paga tus facturas de EPM"
- Beautiful city skyline illustration with:
  - Buildings and cityscape
  - Trees and green areas
  - Wind turbine
  - Electric charging station
  - Bicycle rider
  - Laptop user

### Benefits Section
- Four benefit cards with custom icons:
  - Notification alerts
  - Payment history
  - Email delivery
  - PDF downloads

### Partner Companies
- Five partner company logos:
  - Afinia
  - CHEC
  - EDEQ
  - ESSA
  - CENS

### Footer
- Regulatory information
- Terms and conditions
- Copyright notice

### Accessibility Features
- Text size controls (A-, A+)
- Responsive design for all screen sizes
- Semantic HTML structure
- Alt text for all images

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with responsive design
- **SVG** - Vector graphics for illustrations and icons

## Customization

- Edit `src/App.tsx` to modify the main component
- Update `src/App.css` to change the styling
- Replace images in `src/images/` with your own assets
- Modify `vite.config.ts` for build configuration

## License

This project is open source and available under the [MIT License](LICENSE). 