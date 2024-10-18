// File: convex/utils/errorHandling.ts
import { ConvexError } from "convex/values";

export function handleError(error: unknown, context: string): never {
    console.error(`Error in ${context}:`, error);

    if (error instanceof ConvexError) {
        console.warn(`ConvexError in ${context}:`, error.message);
        throw new ConvexError(`An error occurred in ${context}: ${error.message}`);
    } else if (error instanceof Error) {
        console.error(`Unexpected error in ${context}:`, error.stack);
        throw new Error(`An unexpected error occurred in ${context}`);
    } else {
        console.error(`Unknown error type in ${context}:`, error);
        throw new Error(`An unknown error occurred in ${context}`);
    }
}