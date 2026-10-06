
const BowlIllustraion = () => {
  return (
		<div className="w-48 h-44 flex items-center justify-center">
			<svg
				viewBox="0 0 200 180"
				className="w-full h-full drop-shadow-sm"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Bowl Base Line */}
				<line
					x1="64"
					y1="140"
					x2="136"
					y2="140"
					stroke="#062E1B"
					strokeWidth="4"
					strokeLinecap="round"
				/>
				{/* Bowl Body Exterior */}
				<path
					d="M45 80C45 118 73 140 100 140C127 140 155 118 155 80H45Z"
					fill="#FAF6F0"
					stroke="#062E1B"
					strokeWidth="4"
				/>
				{/* Bowl Interior (Coral Red Accent) */}
				<path
					d="M48 80C48 112 72 134 100 134C128 134 152 112 152 80H48Z"
					fill="#E06B5B"
					stroke="#062E1B"
					strokeWidth="4"
				/>
				{/* Bowl Rim */}
				<ellipse
					cx="100"
					cy="80"
					rx="54"
					ry="12"
					fill="#FAF6F0"
					stroke="#062E1B"
					strokeWidth="4"
				/>
				{/* Spoon */}
				<path
					d="M115 50L158 20C163 15 170 22 165 27L125 72"
					stroke="#062E1B"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="#FAF6F0"
				/>
				<ellipse
					cx="118"
					cy="63"
					rx="9"
					ry="7"
					transform="rotate(45 118 63)"
					fill="#FAF6F0"
					stroke="#062E1B"
					strokeWidth="3"
				/>
				{/* Details on Bowl */}
				<path
					d="M60 95C60 95 65 110 75 118"
					stroke="#062E1B"
					strokeWidth="3"
					strokeLinecap="round"
					opacity="0.4"
				/>
			</svg>
		</div>
	);
}

export default BowlIllustraion