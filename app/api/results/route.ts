import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();

    // verify user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { wpm, accuracy, language, mode, duration } = await request.json();

    const { error } = await supabase
        .from("results")
        .insert({ user_id: user.id, wpm, accuracy, language, mode, duration });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true }, { status: 201 });
}
