# GitHub User Search

A modern, responsive React application for searching and exploring GitHub users and their repositories. Built with TypeScript, Vite, and Tailwind CSS.

## Features

### 🔍 User Search
- Search for GitHub users by username
- Display up to 5 similar users matching your search query
- Real-time search with loading states

### 👤 User Profile Display
- View detailed user profiles including:
  - Avatar, name, and bio
  - Public repositories count
  - Followers and following count
  - Location, company, and blog information
  - GitHub profile links

### 📁 Repository Explorer
- **Expandable Repository Lists**: Click on any user in search results to expand and view their repositories
- **Repository Details**: Each repository shows:
  - Repository name with direct GitHub link
  - Description
  - Programming language
  - Star count
  - Last updated date
- **Smooth Loading States**: Immediate loading indicators when expanding repositories

### 🎨 Modern UI/UX
- Beautiful gradient design with purple/blue theme
- Responsive layout for mobile and desktop
- Smooth animations and hover effects
- Loading states and error handling
- Empty states with helpful messages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **TanStack Query** for API state management
- **Lucide React** for icons
- **GitHub REST API** for data fetching

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-search
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

3. Start the development server:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using bun
bun run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Searching for Users

1. **Enter a Username**: Type a GitHub username in the search box
2. **View Results**: Up to 5 similar users will be displayed
3. **Explore Repositories**: Click on any user card to expand and view their repositories
4. **Select a User**: Click "View Profile" to open their GitHub profile, or the user card itself to see full details

### Repository Exploration

- **Expand**: Click on any user in the search results to see their repositories
- **Repository Links**: Click on repository names to visit them on GitHub
- **Language & Stats**: View programming languages and star counts for each repository

### Navigation

- **Search Again**: Use the search box to perform new searches
- **Reset**: Search results update automatically with each new query
- **Responsive**: Works seamlessly on mobile and desktop devices

## Project Structure

```
src/
├── features/
│   ├── api/           # API functions for GitHub integration
│   ├── components/    # React components
│   │   ├── search-section.tsx    # Search input component
│   │   ├── user-list.tsx         # Expandable user list
│   │   ├── user-section.tsx      # User profile display
│   │   ├── empty-state.tsx       # Empty state component
│   │   └── error.tsx             # Error handling component
│   ├── query/         # TanStack Query hooks
│   └── types/         # TypeScript type definitions
├── constant/          # App constants and configuration
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## API Integration

The app uses the GitHub REST API v3:

- **User Search**: `GET /search/users?q={query}&per_page=5`
- **User Details**: `GET /users/{username}`
- **User Repositories**: `GET /users/{username}/repos?sort=updated&per_page=12`

No authentication required for public data access.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce the issue if applicable

---

Built with ❤️ using React and the GitHub API
