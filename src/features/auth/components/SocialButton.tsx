import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SocialButtonConfig } from '../types/socialButtons.type';
import { useNavigate } from 'react-router-dom';

interface SocialButtonProps {
	config: SocialButtonConfig;
	onClick: (type: string) => void;
	className?: string;
}


export function SocialButton({ config, onClick, className }: SocialButtonProps) {
	const navigate = useNavigate();

	return (
		<Button
			type="button"
			variant="outline"
			onClick={() => {
				onClick(config.name.toLowerCase())
				navigate('/seguridad')
			}}
			className={cn(
				'h-12 font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group',
				config.bgColor,
				config.textColor,
				config.borderColor,
				'border-2 shadow-lg hover:shadow-xl backdrop-blur-sm',
				className
			)}
		>
			<div className="absolute inset-0 travel-shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
			<div className="flex items-center justify-center space-x-3 relative z-10">
				{config.icon}
				<span>{config.copy}</span>
			</div>
		</Button>
	);
}
