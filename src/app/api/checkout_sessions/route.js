import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authClient } from "@/lib/auth-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { data: session } = await authClient.getSession({
            fetchOptions: {
                headers: {
                    cookie: req.headers.get("cookie") || "",
                },
            },
        });

        console.log("stripe session:", session)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }

        // 2. Parse property data from the request body
        const { propertyId, title, rent, rentType, image, durationType } = await req.json();

        if (!propertyId || !rent || !durationType) {
            return NextResponse.json({ error: "Missing required property data." }, { status: 400 });
        }

        // 3. Create Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: session.user.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: title,
                            images: image ? [image] : [],
                            description: `Booking for property ID: ${propertyId} (${rentType})`,
                        },
                        unit_amount: Math.round(rent * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&title=${encodeURIComponent(title)}&amount=${rent}&id=${propertyId}`,
            cancel_url: `${req.nextUrl.origin}/canceled?id=${propertyId}`,
            metadata: {
                userId: session.user.id,
                propertyId: propertyId,
                durationType: durationType,
            },
        });

        // 4. Return the checkout URL
        return NextResponse.json({ url: checkoutSession.url });
    } catch (err) {
        console.error("Stripe Session Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}