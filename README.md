# SHRN - Frontend

A modern, minimal, and powerful URL shortener frontend built with Next.js, Tailwind CSS, and Recharts.

![SHRN Screenshot](https://via.placeholder.com/800x400?text=SHRN+Dashboard+Preview)

## 🚀 Features

- **Authentication**: Secure user Sign Up and Sign In flows efficiently managed with JWT.
- **Dashboard**: Centralized hub to manage all your short links.
- **Link Creation**: Create short links instantly with optional expiration dates.
- **Analytics**: Visualize click data by Browser, Device, and Country using interactive charts.
- **Modern UI**: Clean, minimal light theme with a focus on usability and performance.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: React Icons
- **Charts**: [Recharts](https://recharts.org/)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Runtime**: Bun

## 📂 Project Structure

```bash
frontend/
├── app/                  # Application routes and pages (App Router)
│   ├── auth/             # Authentication pages (signin, signup)
│   ├── dashboard/        # Protected dashboard page
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific widgets (Charts, CreateLink)
│   └── ui/               # Core UI elements (Button, Input, Modals)
├── context/              # React Context (AuthContext)
├── lib/                  # Utilities and API configuration
└── public/               # Static assets
```

## ⚡ Getting Started

### Prerequisites

- **Bun** (v1.0 or later) or Node.js
- Backend server running on port `4000`

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/shrn-v3.git
    cd shrn-v3/frontend
    ```

2.  Install dependencies:

    ```bash
    bun install
    ```

3.  Set up environment variables (if needed, defaults usually work for local dev).

4.  Run the development server:

    ```bash
    bun dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Authentication

The application uses token-based authentication.

- **Sign Up**: Creates a new user account.
- **Sign In**: Retrieves a JWT token which is stored in `localStorage`.
- **Route Protection**: The `/dashboard` route is protected; unauthenticated users are redirected to the sign-in page.

## 📊 Analytics

Each link has a dedicated analytics view showing:

- **Total Clicks**: Aggregate click count.
- **Charts**: Visual breakdown by:
  - Browsers (Chrome, Firefox, etc.)
  - Devices (Desktop, Mobile, etc.)
  - Countries

## 🎨 Design System

The project strictly follows a **Minimal Light Theme**:

- **Colors**: Slate/Gray scale for text, White backgrounds, Subtle borders.
- **Typography**: Geist Sans & Mono.
- **Components**: Custom-built accessible components (Buttons, Inputs, Modals).

---

Built with ❤️ for SHRN.