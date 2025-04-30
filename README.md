# Campus Connect - QuickPens Campus Connect

A platform connecting students with academic writers for campus assignments.

## Features

- User authentication (Writer/Buyer modes)
- Assignment posting system for buyers
- Assignment listing and filtering for writers
- College-specific assignment matching
- Status tracking (Available/Claimed/Completed)

## Tech Stack

- **Frontend**: React + TypeScript
- **UI Framework**: shadcn-ui + Tailwind CSS
- **Backend**: Supabase (Authentication + Database)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Madvith-d/quickpens-campus-connect.git
cd quickpens-campus-connect
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── lib/             # Utility functions and configurations
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Database Schema

The application uses Supabase with the following tables:

### assignments
- id (uuid)
- topic (text)
- subject (text)
- description (text)
- college_slug (text)
- deadline (timestamp)
- estimated_pages (integer)
- contact_details (text)
- status (text)
- created_by (uuid)
- created_at (timestamp)
- updated_at (timestamp)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
