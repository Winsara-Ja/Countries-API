# WorldExplorer - Modern Countries App

A modern, responsive React application that allows users to explore information about countries worldwide. Built with React, TypeScript, and Tailwind CSS.

![WorldExplorer Screenshot](https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🌍 Browse all countries with a modern, responsive interface
- 🔍 Search countries by name
- 🌐 Filter countries by region
- 🎨 Dark/Light mode support
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🧪 Comprehensive test coverage

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest & React Testing Library
- Axios
- React Router DOM
- Lucide React (for icons)

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/world-explorer.git
   cd world-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Lint code

## Project Structure

```
src/
├── components/
│   ├── countries/      # Country-related components
│   ├── filters/        # Search and filter components
│   └── Header.tsx      # App header component
├── pages/              # Page components
├── __tests__/         # Test files
│   ├── components/     # Component tests
│   └── setup/         # Test setup files
├── App.tsx            # Main App component
└── main.tsx           # Application entry point
```

## Testing

The project includes comprehensive tests using Vitest and React Testing Library. Tests are organized in the `src/__tests__` directory, mirroring the structure of the source code.

To run tests:

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by [REST Countries API](https://restcountries.com/)
- Icons from [Lucide React](https://lucide.dev/)