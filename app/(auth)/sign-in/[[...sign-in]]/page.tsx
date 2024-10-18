/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:20:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
import { SignIn } from '@clerk/nextjs'

/**
 * Renders the SignIn component from Clerk.
 *
 * This component serves as the default export for the sign-in page,
 * providing the user interface for user authentication.
 */
export default function Page() {
    return <SignIn />
}