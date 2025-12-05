import { ReactNode } from "react";

export const SectionCard = ({ title, children, onAction }: { title: string, children: ReactNode, onAction?: () => void }) => (
    <div className="relative md:flex-row gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {onAction && (
            <button
                type="button"
                onClick={onAction}
                aria-label={`Ver ${title}`}
                className="absolute right-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition"
            >
                {/* ícono ojo simple */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm text-slate-700 hidden sm:inline">Ver planes</span>
            </button>
        )}
        <h2 className="text-2xl font-semibold text-blue-900 text-center pb-2 border-b border-gray-200">
            {title}
        </h2>
        <div className="mt-4">
            {children}
        </div>
    </div>
)