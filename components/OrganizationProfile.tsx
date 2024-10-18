/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 18/10/2024 - 01:14:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
import { OrganizationProfile as ClerkOrganizationProfile } from "@clerk/nextjs";

/**
 * OrganizationProfile
 *
 * Renders the Organization Profile page of the Clerk Next.js integration.
 *
 * @remarks
 *
 * This component renders the Organization Profile page of the Clerk Next.js integration.
 * The page is styled according to the appearance prop and is accessible at the path specified
 * in the path prop.
 *
 */
export default function OrganizationProfile() {
    return (
        <ClerkOrganizationProfile
            appearance={{
                elements: {
                    rootBox: "w-full max-w-2xl mx-auto",
                    card: "bg-white shadow-md rounded-lg overflow-hidden",
                    navbar: "bg-primary text-white p-4",
                    navbarButton: "bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100",
                }
            }}
            routing="path"
            path="/organization-profile"
        />
    );
}