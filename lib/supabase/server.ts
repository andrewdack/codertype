import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies(); // give access to request cookies
    // how to read write auth cookies
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // read cookies from request
                getAll() { return cookieStore.getAll(); },
                // writes cookies to the response
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set({
                                name,
                                value,
                                ...options,
                            });
                        });
                    }
                    catch {

                    }
                }
            }
        }
    );


}