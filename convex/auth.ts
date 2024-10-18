/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 02:00:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// File: convex/auth.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handleError } from "./utils/errorHandling";
import { Context } from "vm";
import { Id } from "./_generated/dataModel";
export const createTenant = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        logoUrl: v.optional(v.string()),
        adminClerkId: v.string(),
        adminName: v.string(),
        adminEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (userIdentity === null) {
            throw new Error("Not authenticated");
        }
        try {
            return await ctx.db.insert("organizations", {
                            name: args.name,
                            slug: args.slug,
                            logoUrl: args.logoUrl,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                        });
        }
        catch (error) {
            handleError(error, "createTenant");
        }
    },
});

export const getUserRoleAndPermissions = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.db
                .query("users")
                .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
                .first();

            if (!user) {
                throw new Error("User not found");
            }

            const rolePermissions = {
                admin: [
                    "org:admin",
                    "org:settings:manage",
                    "org:analytics:manage",
                    "org:invoices:read",
                    "org:invoice:manage",
                    "org:assessments:manage",
                    "org:assessment:read",
                    "org:quotes:read",
                    "org:quotes:manage",
                    "org:sys_domains:manage",
                    "org:sys_domains:read",
                    "org:sys_memberships:manage",
                    "org:sys_memberships:read",
                    "org:sys_profile:delete",
                    "org:sys_profile:manage",
                    "org:invoice:pay",
                ],
                client: [
                    "org:client",
                    "org:invoices:read",
                    "org:assessment:read",
                    "org:quotes:read",
                    "org:sys_memberships:read",
                    "org:invoice:pay",
                ],
                detailer: [
                    "org:member",
                    "org:invoices:read",
                    "org:invoice:manage",
                    "org:assessments:manage",
                    "org:assessment:read",
                    "org:quotes:read",
                    "org:quotes:manage",
                    "org:sys_memberships:read",
                    "org:invoice:pay",
                ],
            };

            return {
                role: user.role,
                permissions: rolePermissions[user.role as keyof typeof rolePermissions],
            };
        } catch (error) {
            handleError(error, "getUserRoleAndPermissions");
        }
    },
});

export const addUserToOrganization = mutation({
    args: {
        userId: v.id('users'),
        name: v.string(),
        email: v.string(),
        organizationId: v.id("organizations"),
        role: v.string(),
    },
    handler: async (ctx: Context, args: {
            userId: Id<'users'>;
            name: string;
            email: string;
            organizationId: Id<'organizations'>;
            role: 'admin' | 'client' | 'detailer';
        }): Promise<Id<'users'>> => {
        try {
            return await ctx.db.insert("users", {
                            userId: args.userId,
                            name: args.name,
                            email: args.email,
                            organizationId: args.organizationId,
                            role: args.role,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                        });
        } catch (error) {
            handleError(error, "addUserToOrganization");
        }
    },

});

export const updateUserRole = mutation({
    args: {
        userId: v.id("users"),
        newRole: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            await ctx.db.patch(args.userId, {
                role: args.newRole,
                updatedAt: Date.now(),
            });
        } catch (error) {
            handleError(error, "updateUserRole");
        }
    },
});