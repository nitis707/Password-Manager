"use server";

import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expiry: string;
  cvv: number;
}

interface Password {
  url: string;
  username: string;
  password: string;
}

export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let cards: Card[] = [];
  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || [];
    cards.push({ cardNo, expiry, cvv });
  }

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards,
    },
  });

  return NextResponse.json({ success: true });
}

export async function addWebServer(
  url: string,
  username: string,
  password: string,
  userId: string
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let passwords: Password[] = [];
  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords || [];
    passwords.push({ url, username, password });
  }

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords,
    },
  });

  return NextResponse.json({ success: true });
}
