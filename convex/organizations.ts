/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:42:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// File: convex/organizations.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createOrganization = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        logoUrl: v.optional(v.string()),
    },
        /**
         * @description      : This mutation creates a new organization.
         * @param            : The mutation takes an object with the following properties:
         *                      - name (string): The name of the new organization.
         *                      - slug (string): The slug for the new organization.
         *                      - logoUrl (string|undefined): The url of the logo for the new organization.
         * @returns          : The newly created organization.
         * @throws           : If the user is not authenticated.
         */
    handler: async (ctx, args) => {
<<<<<<< HEAD
            const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("organizations", {
            name: args.name,
            slug: args.slug,
            logoUrl: args.logoUrl,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
=======
        try {
            const organizationId = await ctx.db.insert("organizations", {
                name: args.name,
                slug: args.slug,
                logoUrl: args.logoUrl,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            return organizationId;
        } catch (error) {
            handleError(error, "createOrganization");
        }
>>>>>>> 7e0094da4ed66d3db659a24faa511afe47ed4331
    },
});

export const getOrganizationBySlug = query({
    args: { slug: v.string() },
        /**
         * @description      : This query fetches an organization by its slug.
         * @param            : The query takes an object with the following properties:
         *                      - slug (string): The slug of the organization to fetch.
         * @returns          : The organization matching the given slug, or null if none exists.
         * @throws           : If the user is not authenticated.
         */
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (userIdentity === null) {
            throw new Error("Not authenticated");
        }
        return await ctx.db.query("organizations")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

// Add more organization-related functions as needed