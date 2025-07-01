# Personal Portfolio Website

A modern, interactive portfolio website built with Next.js, Three.js, and Framer Motion. The website features a beautiful UI with dynamic animations, interactive 3D elements, and responsive design.

## Features

- 🎨 Modern UI/UX with smooth animations using Framer Motion
- 🌟 Interactive 3D background elements with Three.js
- 📱 Fully responsive design
- ⚡️ Built with performance in mind
- 🎯 Custom cursor effects and hover animations
- 🎭 Dynamic content management
- 🔥 Built with modern tech stack

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js
- **State Management:** React Context
- **Package Manager:** pnpm
- **Architecture:** Monorepo using Turborepo
- **UI Components:** shadcn/ui

## Project Structure

```
apps/
  web/                   # Main portfolio website
    components/          # React components
      animations/        # Animation components
      home/             # Home page components
      layouts/          # Layout components
    app/                # Next.js app directory
    assets/            # Static assets
    hooks/             # Custom React hooks
    lib/               # Utility functions

packages/
  ui/                  # Shared UI components
  eslint-config/       # Shared ESLint configs
  typescript-config/   # Shared TypeScript configs
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd whoami
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Adding UI Components

To add shadcn/ui components, run:

```bash
pnpm dlx shadcn@latest add <component-name> -c apps/web
```

Components will be added to `packages/ui/src/components`.

### File Structure Best Practices

- Place page-specific components in `apps/web/components`
- Use `packages/ui` for shared, reusable components
- Keep animations in `components/animations`
- Store static assets in `apps/web/assets`

## Building for Production

```bash
# Build all packages and applications
pnpm build

# Build only the web application
pnpm build --filter=web
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
