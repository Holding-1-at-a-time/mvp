/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:28:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// File: convex/users.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handleError } from "./utils/errorHandling";

export const createUser = mutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        organizationId: v.id("organizations"),
        role: v.string(),
    },
    handler: async (ctx, { clerkId, name, email, organizationId, role }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }
        try {
            const userId = await ctx.db.insert("users", {
                clerkId: clerkId,
                tokenIdentifier: identity.tokenIdentifier,
                name,
                email,
                organizationId,
                role,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            return await ctx.db.get(userId); // return the newly created user's ID
        } catch (error) {
            handleError(error, "createUser");
        }
    },
});

export const getUserByClerkId = query({
    args: {
        clerkId: v.id("users"),
        organizationId: v.id("organizations"),
        role: v.string(),
    },
    handler: async (ctx, { clerkId, organizationId, role }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        return await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .first();
    },
});

// Add more user-related functions as needed