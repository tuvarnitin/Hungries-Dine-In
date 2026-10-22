"use client";

import { Bell } from "lucide-react";
import { ReactNode, useState } from "react";

type ProfileActionCardProps = {
	Icon: any;
	color: string;
	bg: string;
	title: string;
	subTitle: string;
	button: ReactNode;
	disabled: boolean;
};

export default function ProfileActionCard({
	Icon,
	bg,
	color,
	title,
	subTitle,
	button,
	disabled,
}: ProfileActionCardProps) {
	return (
		<div className={`flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-muted-text/15 ${disabled && "opacity-50 pointer-events-none"}`}>
			<div className="flex items-center space-x-3.5 min-w-0">
				<div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}>
					{Icon}
				</div>

				<div className="min-w-0">
					<h4 className="text-sm font-bold text-dark-text">{title}</h4>

					<p className="text-xs text-muted-text">{subTitle}</p>
				</div>
			</div>

			{button}
		</div>
	);
}
