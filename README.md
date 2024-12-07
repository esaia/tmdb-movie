# TMDB Movie App

A modern movie discovery app built using **Next.js 14** with **Server-Side Rendering (SSR)**. The app fetches movie data from the [TMDB API](https://www.themoviedb.org/) to display movies, trailers, and additional media content. It offers a clean and responsive UI with features like search, movie details, and video playback integration.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Resources](#resources)
- [Getting Started](#getting-started)

## Key Features

- **Server-Side Rendering (SSR)**: Fetch movie data on the server before rendering the page, ensuring faster load times and SEO benefits.
- **Movie Search**: Search for movies by title and filter through categories (popular, top-rated, etc.)
- **Responsive Design**: Fully responsive layout that works across desktop and mobile devices.
- **Video Playback**: Integrated YouTube trailers and video previews using `@vidstack/react`.
- **Movie Details**: View detailed information about a movie, including its cast, crew, release date, and overview.
- **Smooth UI**: Swiper-powered carousels for movie listings and categories.

---

## Tech Stack

- **Frontend**:
  - **Next.js 14**: React framework for building the app with server-side rendering (SSR) and static site generation (SSG).
  - **React 18**: Library for building UI components.
  - **Tailwind CSS**: Utility-first CSS framework for building responsive designs.
  - **Swiper**: For creating smooth carousels and sliders.
  - **@vidstack/react**: For embedding YouTube videos and other media content.
- **Backend/Service Integration**:

  - **TMDB API**: Provides movie data, trailers, and media content.

- **UI/UX**:
  - **React Icons**: A library for using icons in the app.
  - **Date-fns**: For handling date formatting and manipulation.
  - **React Detect Click Outside**: For managing UI elements that require click-outside detection.

## Resources

- [TMDB API Documentation](https://www.themoviedb.org/documentation/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [@vidstack/react Documentation](https://www.vidstack.io/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Swiper Documentation](https://swiperjs.com/)
- [AWS SDK Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)

## Getting Started

Follow the steps below to get your development environment up and running.

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tmdb-movie-app.git
cd tmdb-movie-app

npm install
# or
yarn install

NEXT_PUBLIC_TBDB_API=your_tmdb_api_key_here
NEXT_PUBLIC_TBDB=https://api.themoviedb.org/3

npm run dev
# or
yarn dev
```

## SSR Implementation

This app leverages **Server-Side Rendering (SSR)** to fetch movie data from the TMDB API before the page is rendered in the browser. This ensures:

- **Faster initial load**: Movie data is pre-fetched on the server, reducing client-side rendering time.
- **Improved SEO**: Since the data is already included in the initial HTML, search engines can index movie details for better visibility.
- **Consistent and up-to-date data**: Every request fetches fresh movie data directly from the TMDB API.

### screenshots

![App Screenshot](/readme/home.png)

![App Screenshot](/readme/slider.png)

![App Screenshot](/readme/inner.png)
