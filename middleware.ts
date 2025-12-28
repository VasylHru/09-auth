import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  if (!accessToken) {
    if (refreshToken) {
      const response = await checkServerSession();
      const setCookie = response.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          };

          if (parsed.accessToken) {
            cookieStore.set("accessToken", parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            cookieStore.set("refreshToken", parsed.refreshToken, options);
          }
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/profile", request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};
