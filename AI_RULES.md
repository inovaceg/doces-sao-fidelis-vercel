# AI Rules for Doces São Fidélis Application

This document outlines the core technologies used in this application and provides guidelines for using specific libraries to maintain consistency and best practices.

## Tech Stack Overview

*   **Framework**: Next.js for building the web application, handling routing, server-side rendering, and API routes.
*   **Language**: TypeScript for all application code, ensuring type safety and better maintainability.
*   **Styling**: Tailwind CSS for all styling, providing a utility-first approach for responsive and consistent designs.
*   **UI Components**: shadcn/ui, built on top of Radix UI primitives, for a consistent and accessible component library.
*   **Database & Authentication**: Supabase for backend services, including database management and user authentication.
*   **Form Management**: React Hook Form for efficient and flexible form handling, paired with Zod for schema validation.
*   **Image Uploads**: Vercel Blob for storing and serving images, integrated via a dedicated API route.
*   **Notifications**: Sonner for elegant and accessible toast notifications to provide user feedback.
*   **Icons**: Lucide React for a comprehensive set of customizable SVG icons.
*   **Utility Functions**: `clsx` and `tailwind-merge` are used via the `cn` utility for conditionally applying and merging Tailwind CSS classes.

## Library Usage Rules

To ensure consistency and maintainability, please adhere to the following rules when developing:

*   **Next.js**: All new pages, API routes, and server-side logic must be implemented using Next.js features.
*   **TypeScript**: Write all new code in TypeScript. Avoid using plain JavaScript.
*   **Tailwind CSS**: All styling must be done using Tailwind CSS utility classes. Do not introduce new custom CSS files or inline styles unless absolutely necessary for a specific, isolated case (and justify it).
*   **shadcn/ui**: Prioritize using existing shadcn/ui components from the `components/ui/` directory. If a required component is not available, create a new component in `src/components/` using Tailwind CSS and, if applicable, Radix UI primitives, rather than modifying existing shadcn/ui files.
*   **React Hook Form & Zod**: For any new forms, use `react-hook-form` for state management and `zod` for defining validation schemas.
*   **Supabase**: All database interactions and authentication logic should use the Supabase client (`@/lib/supabase/client` for client-side, `@/lib/supabase/server` for server-side).
*   **Vercel Blob**: For image uploads, utilize the existing `/api/upload` route which integrates with Vercel Blob.
*   **Sonner**: Use `sonner` for all toast notifications to inform users about actions or events.
*   **Lucide React**: All icons should be imported and used from the `lucide-react` library.
*   **`cn` Utility**: Always use the `cn` function from `@/lib/utils` for combining and conditionally applying Tailwind CSS classes.