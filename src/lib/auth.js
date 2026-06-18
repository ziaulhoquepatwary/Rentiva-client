import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },

    database: mongodbAdapter(db, {
        client
    }),

    session: {
        fields: {
            user: ["role", "status", "phone", "address", "bio", "lastActionDate"]
        }
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "" // admin, owner, tenant
            },
            status: {
                type: "string",
                defaultValue: "pending" // pending, approved, rejected
            },
            phone: {
                type: "string",
                defaultValue: ""
            },
            address: {
                type: "string",
                defaultValue: ""
            },
            bio: {
                type: "string",
                defaultValue: ""
            },
            lastActionDate: {
                type: "date",
                defaultValue: new Date()
            }
        }
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});