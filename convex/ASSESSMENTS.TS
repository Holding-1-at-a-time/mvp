// File: convex/assessments.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { handleError } from "./utils/errorHandling";

export const createAssessment = mutation({
    args: {
        organizationId: v.id("organizations"),
        clientId: v.id("users"),
        vehicleType: v.string(),
        condition: v.string(),
        images: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            const assessmentId = await ctx.db.insert("assessments", {
                ...args,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            return assessmentId;
        } catch (error) {
            handleError(error, "createAssessment");
        }
    },
});

export const getAssessmentsByOrganization = query({
    args: { organizationId: v.id("organizations") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("assessments")
            .withIndex("by_organization", (q) =>
                q.eq("organizationId", args.organizationId)
            )
            .collect();
    },
});

// Add more assessment-related functions as needed