import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_CONNECTION;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log(email)

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('Hackletter');
    const collection = database.collection('emails');

    const existingSubscriber = await collection.findOne({ email });

    if (existingSubscriber) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    await collection.insertOne({ email });

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while subscribing' }, { status: 500 });
  } finally {
    await client.close();
  }
}