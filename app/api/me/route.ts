import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") || "";

  const hasToken = cookie.includes("my-secret-token");

  console.log(hasToken , "Ddddddddddddddddddddddddddddd")

  if (hasToken) {
    return NextResponse.json({ loggedIn: true });
  } else {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
