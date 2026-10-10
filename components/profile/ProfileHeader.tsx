import { Edit3, Star } from "lucide-react";

export default function ProfileHeader() {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-xs border border-muted-text/15 flex items-center justify-between relative">
			<div className="flex items-center space-x-4">
				<div className="relative">
					<div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden border-2 border-cream">
						<img
							src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60"
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="absolute bottom-0 right-0 bg-primary text-gold rounded-full p-0.5 border-2 border-white shadow-xs">
						<Star className="w-3.5 h-3.5 fill-gold" />
					</div>
				</div>

				<div>
					<h2 className="text-lg font-bold text-dark-text">Nitin Tuvar</h2>

					<p className="text-xs text-muted-text font-medium">
						nitintuvar2003@gmail.com
					</p>

					<p className="text-xs text-muted-text font-medium">+918053445590</p>
				</div>
			</div>

			<button
				type="button"
				className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-cream hover:bg-background transition-colors text-xs font-semibold text-dark-text"
			>
				<Edit3 className="w-3.5 h-3.5" />
				<span>Edit</span>
			</button>
		</div>
	);
}
