import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function Account() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>{user.email}</p>
    </div>
  )
}