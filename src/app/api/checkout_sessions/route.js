import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { propertyId, title, rent, rentType, image, durationType, userEmail, userId } = await req.json();

        if (!userEmail || !userId) {
            return NextResponse.json(
                { error: "Unauthorized. User session data is missing." },
                { status: 401 }
            );
        }

        if (!propertyId || !rent || !durationType) {
            return NextResponse.json(
                { error: "Missing required property data." },
                { status: 400 }
            );
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: title,
                            images: image ? [image] : [],
                            description: `Booking for property ID: ${propertyId} (${rentType})`,
                        },
                        unit_amount: Math.round(rent * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&title=${encodeURIComponent(title)}&amount=${rent}&id=${propertyId}`,
            cancel_url: `${req.nextUrl.origin}/canceled?id=${propertyId}`,
            metadata: {
                userId: userId,
                propertyId: propertyId,
                durationType: durationType,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (err) {
        console.error("Stripe Session Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}