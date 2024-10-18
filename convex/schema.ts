// File: convex/schema.ts
import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    logoUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    organizationId: v.id("organizations"),
    role: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  assessments: defineTable({
    organizationId: v.id("organizations"),
    clientId: v.id("users"),
    vehicleType: v.string(),
    condition: v.string(),
    images: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_organization", ["organizationId"]),

  quotes: defineTable({
    organizationId: v.id("organizations"),
    assessmentId: v.id("assessments"),
    price: v.number(),
    services: v.array(v.string()),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_organization", ["organizationId"]),

  appointments: defineTable({
    organizationId: v.id("organizations"),
    quoteId: v.id("quotes"),
    clientId: v.id("users"),
    detailerId: v.id("users"),
    startTime: v.number(),
    endTime: v.number(),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_organization", ["organizationId"]),

  feedback: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    appointmentId: v.optional(v.id("appointments")),
    assessmentId: v.optional(v.id("assessments")),
    rating: v.number(),
    comment: v.string(),
    createdAt: v.number(),
  }).index("by_organization", ["organizationId"]),
});