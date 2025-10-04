import { Loader2 } from "lucide-react";

export const LoadingOverlay = () => (
		<div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
			<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
		</div>
	);