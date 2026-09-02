import { createClient } from './server'

/**
 * Validates that the current user is authenticated AND exists in the admin_users table.
 * 
 * Use this in every administrative Server Action to prevent unauthorized users 
 * from performing mutations.
 * 
 * @returns the authenticated user object
 * @throws Error if unauthenticated or unauthorized
 */
export async function requireAdmin() {
  const supabase = await createClient()
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // 2. Verify admin role
  // This query is safe because the admin_users table has RLS,
  // but wait - the user is authenticated, so if they are in admin_users, 
  // the policy "Admins can view admins" (using is_admin()) will allow them to see it,
  // or we can simply check if a row exists.
  // Actually, since is_admin() powers the policy, if they are not an admin, 
  // this query returns 0 rows. If they are, it returns 1 row.
  const { data: adminRecord, error: adminError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (adminError || !adminRecord) {
    console.error(`User ${user.id} attempted an admin action but is not an administrator.`)
    throw new Error('Forbidden: Admin access required')
  }

  return user
}
