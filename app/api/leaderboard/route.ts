import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const language = searchParams.get("language");
    const mode = searchParams.get("mode");
    const limit = Number(searchParams.get("limit") ?? 50);

    const supabase = await createClient();

    let query = supabase
        .from("results")
        .select("user_id, wpm, accuracy, language, mode, created_at")
        .order("wpm", { ascending: false })
        .limit(limit);

    if (language) query = query.eq("language", language);
    if (mode) query = query.eq("mode", mode);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json(data);
}
