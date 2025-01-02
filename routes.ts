/**
 * These routes doesn't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/register",
  "/new-verification",
  "/privacy-policy",
  "/terms-of-use",
  "/api/chat",
  "/blog",
];

/**
 * These are array of routes that requires authentication
 * These routes wil redirect logged in users to /courses
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/sign-up",
  "/error",
  "/reset",
  "/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
