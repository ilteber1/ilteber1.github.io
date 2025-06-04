import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { chatId, message } = await req.json();

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });

  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }

  const userMessage = await prisma.message.create({
    data: {
      chatId,
      role: 'USER',
      content: message,
    },
  });

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful customer support assistant.' },
      ...chat.messages.map((msg) => ({ role: msg.role.toLowerCase(), content: msg.content })),
      { role: 'user', content: message },
    ],
  });

  const aiMessage = await prisma.message.create({
    data: {
      chatId,
      role: 'AI',
      content: aiResponse.choices[0].message.content,
    },
  });

  return NextResponse.json({ userMessage, aiMessage });
} 