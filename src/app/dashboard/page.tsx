export const dynamic = 'force-dynamic';
export const revalidate = 0;

import BentoContainer from "@/components/dashboard/home/BentoContainer";

export default function page() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <BentoContainer />
        </div>
    )
}