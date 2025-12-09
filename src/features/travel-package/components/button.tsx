export function Button({ children, onClick, className }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 rounded-lg transition-colors ${className}`}
		>
			{children}
		</button>
	);
}
