/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:21:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
import { SignUp } from '@clerk/nextjs'


/**
 * Renders the SignUp component from Clerk.
 *
 * This component serves as the default export for the sign-up page,
 * providing the user interface for user registration.
 *
 * @remarks
 *
 * The SignUp component is a pre-built component provided by Clerk
 * that renders a user interface for user registration.
 * The component is styled according to the Clerk theme and is accessible
 * at the path specified in the path prop.
 */
export default function Page() {
    return <SignUp />
}
