import { supabase } from "./client";

// github sign in
export async function signInWithGithub() {
    return supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
}

// google sign in
export async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
}

// sign out
export async function signOutUser() {
    return supabase.auth.signOut();
}
