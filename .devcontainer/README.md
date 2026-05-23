# Byly Blog - Dev Container Setup

## 📦 Dev Containers Configuration

This directory contains the configuration for VS Code Dev Containers, which provides a consistent development environment for the Byli Blog project.

### ✨ Features

- **Node.js 18**: Latest LTS version with npm
- **Angular CLI**: Pre-installed globally
- **VS Code Extensions**:
  - Angular Language Service
  - Prettier
  - ESLint
  - Git Lens
  - Docker extension
- **Ports Forwarded**:
  - `4200` - Angular Development Server
  - `9876` - Karma Test Runner

### 🚀 Getting Started

1. **Install Dev Containers Extension**:
   - Open VS Code
   - Go to Extensions → Search for "Dev Containers"
   - Install the official Microsoft "Dev Containers" extension

2. **Open in Container**:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Linux/Windows)
   - Type "Dev Containers: Reopen in Container"
   - Select it and wait for the container to build

3. **Start Development**:
   ```bash
   cd app
   npm start
   ```

   - The app will be available at `http://localhost:4200`

### 📋 Available Commands

From the `app` directory inside the container:

```bash
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Watch mode
npm test           # Run unit tests
npm run ng -- help # Angular CLI help
```

### 🔧 Customization

Edit `.devcontainer/devcontainer.json` to:

- Add more VS Code extensions (in `customizations.vscode.extensions`)
- Change Node.js version (modify the `VARIANT` arg)
- Add environment variables
- Forward additional ports
- Install additional system packages in the Dockerfile

### 📖 Resources

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Angular Documentation](https://angular.io/docs)
- [Node.js Documentation](https://nodejs.org/docs/)
