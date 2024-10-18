/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:50:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// File: convex/utils/errorHandling.ts
import { ConvexError } from "convex/values";

export function handleError(error: unknown, context: string): never {  
  if (process.env.NODE_ENV === 'production') {  
    console.error(`An error occurred in ${context}`);  
  } else {  
    console.error(`Error in ${context}:`, error);  
  }  
  throw new ConvexError('An unexpected error occurred');  
}  