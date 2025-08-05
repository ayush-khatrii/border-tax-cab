import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: NextRequest) {
  const { amount } = await request.json();

  try {
    const order = await instance.orders.create({
      amount: Number(amount) * 100, // Converted to paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
      payment_capture: true
    });
    console.log('order created:', order);
    return NextResponse.json({
      order,
      status: 200
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({
      error: "Failed to create order",
      status: 500
    });
  }
}
