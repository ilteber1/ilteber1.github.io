# AI Support SaaS Platform

A modern, responsive SaaS platform for AI-powered customer support, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🤖 AI-powered customer support
- 💳 Subscription management with Stripe
- 🔐 Authentication with NextAuth.js
- 📊 Admin dashboard
- 📱 Responsive design
- 🌐 Multi-language support
- 📈 Analytics and reporting

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Deployment**: GitHub Pages

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ilteber1/ai-support-saas.git
   cd ai-support-saas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL="your_database_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   OPENAI_API_KEY="your_openai_api_key"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

### Manual Deployment

To deploy manually:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Environment Variables

Set the following environment variables in your GitHub repository secrets:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `NEXTAUTH_SECRET`: A random string for NextAuth.js
- `NEXTAUTH_URL`: Your application URL
- `DATABASE_URL`: Your database connection string
- `OPENAI_API_KEY`: Your OpenAI API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
