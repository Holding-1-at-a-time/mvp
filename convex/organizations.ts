// File: convex/organizations.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handleError } from "./utils/errorHandling";


export const createOrganization = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        logoUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const organizationId = await ctx.db.insert("organizations", {
            name: args.name,
            slug: args.slug,
            logoUrl: args.logoUrl,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return organizationId;
    },
});

export const getOrganizationBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("organizations")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

// Add more organization-related functions as needed