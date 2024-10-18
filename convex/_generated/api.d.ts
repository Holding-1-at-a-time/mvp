/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ASSESSMENTS from "../ASSESSMENTS.js";
import type * as myFunctions from "../myFunctions.js";
import type * as organizations from "../organizations.js";
import type * as USERS from "../USERS.js";
import type * as utils_errorHandling from "../utils/errorHandling.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ASSESSMENTS: typeof ASSESSMENTS;
  myFunctions: typeof myFunctions;
  organizations: typeof organizations;
  USERS: typeof USERS;
  "utils/errorHandling": typeof utils_errorHandling;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
