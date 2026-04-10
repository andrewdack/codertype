import { createClient } from "./server";

// use in server components and api routes only
export async function getUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
