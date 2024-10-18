import { OrganizationSwitcher } from "@clerk/nextjs";

export default function OrganizationSwitcherComponent() {
    return (
        <OrganizationSwitcher
            appearance={{
                elements: {
                    rootBox: "flex items-center justify-center",
                    organizationSwitcherTrigger: "bg-white text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                }
            }}
            createOrganizationMode="modal"
            hidePersonal={true}
            afterCreateOrganizationUrl="/dashboard"
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl="/dashboard"
        />
    );
}