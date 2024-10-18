// File: convex/users.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        organizationId: v.id("organizations"),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("users", {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return userId;
    },
});

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

// Add more user-related functions as needed