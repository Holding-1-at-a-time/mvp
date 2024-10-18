// File: convex/auth.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handleError } from "./utils/errorHandling";

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
    try {
      const organizationId = await ctx.db.insert("organizations", {
        name: args.name,
        slug: args.slug,
        logoUrl: args.logoUrl,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      await ctx.db.insert("users", {
        clerkId: args.adminClerkId,
        name: args.adminName,
        email: args.adminEmail,
        organizationId,
        role: "admin",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return organizationId;
    } catch (error) {
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
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    organizationId: v.id("organizations"),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const userId = await ctx.db.insert("users", {
        ...args,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return userId;
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