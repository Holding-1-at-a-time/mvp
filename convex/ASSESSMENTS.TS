/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:29:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
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
        /**
         * Fetch all assessments for a given organization.
         *
         * @param ctx - Convex context.
         * @param args - Arguments to the query, including `organizationId`.
         *
         * @returns A list of assessment documents, or an empty list if none exist.
         */
    handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.query("assessments")
    .withIndex("by_organization", (q) =>
        q.eq("organizationId", args.organizationId)
    )
    .collect();
        }
    }
);



// Add more assessment-related functions as needed