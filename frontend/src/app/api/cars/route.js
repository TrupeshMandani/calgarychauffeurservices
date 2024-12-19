// src/app/api/cars/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Ensure your .env.local contains this URI

export async function GET() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("chauffeurServices"); // Adjust the DB name if needed
    const carsCollection = db.collection("cars");

    const cars = await carsCollection.find().toArray();

    client.close();

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
