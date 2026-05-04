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

// manual sign in
export async function signInWithEmail({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    return supabase.auth.signInWithPassword({ email, password });
}

// manual sign up, add username as well
export async function signUpWithEmail({
    email,
    password,
    username,
}: {
    email: string;
    password: string;
    username: string;
}) {
    return supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
    });
}

// sign out
export async function signOutUser() {
    return supabase.auth.signOut();
}
