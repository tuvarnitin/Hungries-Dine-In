import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" ;

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: ReactNode;
	loading?: boolean;
	fullWidth?: boolean;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	icon,
	loading = false,
	fullWidth = false,
	disabled,
	className = "",
	type = "button",
	...props
}: ButtonProps) {
	const variants: Record<ButtonVariant, string> = {
		primary: "bg-primary text-white hover:bg-[#043c2b] shadow-sm",
		outline: "bg-white border border-primary text-primary hover:bg-cream",
	};

	const sizes: Record<ButtonSize, string> = {
		xs: "px-2 py-2",
		sm: "px-4 py-2 text-xs",
		md: "px-4 py-2.5 text-sm",
		lg: "py-4 px-6 text-sm",
	};

	return (
		<button
			type={type}
			disabled={disabled || loading}
			className={`
				${variants[variant]}
				${sizes[size]}
				${fullWidth ? "w-full" : ""}
				rounded-full
				font-semibold
				flex
				items-center
				justify-center
				gap-2
				transition-all
				duration-200
				disabled:opacity-60
				disabled:cursor-not-allowed
				active:scale-[0.98]
				${className}
			`}
			{...props}
		>
			{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}

			<span>{children}</span>
		</button>
	);
}
