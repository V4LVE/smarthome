import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getHandlers() {
	const { auth } = await import("@/lib/auth");
	return toNextJsHandler(auth);
}

export async function GET(request: Request) {
	const { GET: handleGet } = await getHandlers();
	return handleGet(request as never);
}

export async function POST(request: Request) {
	const { POST: handlePost } = await getHandlers();
	return handlePost(request as never);
}