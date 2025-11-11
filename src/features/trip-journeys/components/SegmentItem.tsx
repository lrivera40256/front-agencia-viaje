// Renderiza un trayecto simple (Manizales -> Medellin)

import { ChevronDown, ChevronUp } from "lucide-react";
import { SegmentExpanded } from "./SegmentExpanded";
import { Segment } from "@/features/trip-form/types/segment.types";
import { motion, AnimatePresence } from "framer-motion";

interface SegmentItemProps {
	segment: Segment;
	isOpen: boolean;
	onToggle: () => void;
}

export const SegmentItem = ({ segment, isOpen, onToggle }: SegmentItemProps) => {
	return (
		<div className="border rounded-md mb-3">

			<div
				className="flex justify-between items-center cursor-pointer p-3"
				onClick={onToggle}
			>
			<span className="font-semibold py-1 pl-2 text-blue-700 bg-blue-50 rounded-md px-3 text-sm tracking-wide">
				Trayecto: {segment.cityFrom.name} → {segment.cityTo.name}
			</span>

				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					{isOpen ? <ChevronUp /> : <ChevronDown />}
				</motion.div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="p-3">
							<SegmentExpanded segment={segment} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

		</div>
	);
};

