import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

// Initialize authentication with the provided configuration
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // Check if the user is logged in by verifying if the auth object exists in the request
  const isLoggedIn = !!req.auth;

  // Check if the route is related to API authentication
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Check if the route is a public route
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  // Check if the route is an authentication route (e.g., login or signup pages)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Check if the current route is the blog page (for public access)
  const isBlogPage = publicRoutes.includes("/blog");

  // Check if the current route is related to courses
  const isCourseRoutes = nextUrl.pathname.startsWith("/courses");

  // Check if the route is under the /admin path
  // const isAdminRoutes = nextUrl.pathname.startsWith("/admin");
  // const isTutorRoute = nextUrl.pathname.startsWith("/tutor");
  // const isStudentRoute = nextUrl.pathname.startsWith("/student")

  // If the route is related to API authentication, allow it to proceed
  if (isApiAuthRoutes) {
    return;
  }

  // If the user is already logged in and tries to access an auth route, redirect to the default page
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // If the route is an admin route and the user is logged in
  // if (isAdminRoutes && isLoggedIn){
  //  // Check if the logged-in user is an ADMIN
  //  if (req.auth?.user?.name !== 'ADMIN'){

  //  // If not an ADMIN, redirect to the unauthorized page
  // return Response.redirect(new URL('/unauthorized', nextUrl));
  //  }
  //  return;
  // }

  // If the user is not logged in and tries to access a protected route (not public, not courses, not blog)
  if (!isLoggedIn && !isPublicRoutes && !isCourseRoutes && !isBlogPage) {
    let callBackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callBackUrl += nextUrl.search;
    }

    // Encode the callback URL and redirect to the login page with the callback URL as a query parameter
    const encodedCallBackUrl = encodeURIComponent(callBackUrl);
    return Response.redirect(
      new URL(`/login?callBackUrl=${encodedCallBackUrl}`, nextUrl)
    );
  }

  // Allow the request to proceed if no conditions above were met
  return;
});

// Configuration for the middleware to match all routes except static files and Next.js internals
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
