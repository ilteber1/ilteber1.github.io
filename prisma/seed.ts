import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      password: 'hashed_password_here', // Replace with actual hashed password
    },
  });

  const business = await prisma.user.create({
    data: {
      name: 'Business User',
      email: 'business@example.com',
      role: 'BUSINESS',
      password: 'hashed_password_here', // Replace with actual hashed password
    },
  });

  // Create test subscription
  await prisma.subscription.create({
    data: {
      user: { connect: { id: business.id } },
      stripeCustomerId: 'cus_test123',
      stripeSubId: 'sub_test123',
      status: 'active',
      priceId: 'price_test123',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  // Create test chat
  const chat = await prisma.chat.create({
    data: {
      business: { connect: { id: business.id } },
      resolved: false,
    },
  });

  // Create test messages
  await prisma.message.create({
    data: {
      chat: { connect: { id: chat.id } },
      sender: { connect: { id: business.id } },
      role: 'USER',
      content: 'Hello, I need help with my subscription.',
    },
  });

  await prisma.message.create({
    data: {
      chat: { connect: { id: chat.id } },
      role: 'AI',
      content: 'Hi! How can I assist you today?',
    },
  });

  // Create test theme
  await prisma.theme.create({
    data: {
      user: { connect: { id: business.id } },
      color: '#2563eb',
      greeting: 'Welcome to our support!',
    },
  });

  // Create test analytics
  await prisma.analytics.create({
    data: {
      business: { connect: { id: business.id } },
      chats: 1,
      messages: 2,
      satisfactionAvg: 4.5,
      resolutionTimeAvg: 10.5,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 