import { OrganizationProfile as ClerkOrganizationProfile } from "@clerk/nextjs";

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