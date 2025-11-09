import { ReactNode } from "react";

export const SectionCard = ({title,children}: {title: string, children: ReactNode}) => (
    <div className=" md:flex-row gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-900 text-center pb-2 border-b border-gray-200">
            {title}
        </h2>
        <div className="mt-4">
            {children}
        </div>
    </div>
)