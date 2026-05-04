import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const language = searchParams.get("language") || null;
    const mode = searchParams.get("mode") || null;
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_leaderboard", {
        lang: language,
        mode_filter: mode,
        lim: limit,
    });

    if (error) {
        console.error("leaderboard error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
