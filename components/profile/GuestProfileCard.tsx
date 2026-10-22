
const GuestProfileCard = () => {
  return (
		<div className="bg-white rounded-3xl p-5 shadow-xs border border-muted-text/15 flex items-center justify-between relative">
			<div className="flex items-center gap-1 min-w-0">
				<div className="w-16 h-16 overflow-hidden flex items-center justify-center">
					<img
						src={"/assets/GuestAvatar.png"}
						alt={"Guest Avatar"}
						className="w-20 h-20 object-cover"
					/>
				</div>
				<div className="min-w-0 max-w-[80%] flex flex-col ">
					<h2 className="text-lg font-bold text-dark-text truncate">Guest</h2>
					<p className="text-sm text-muted-text font-medium">
						You's browsing as a guest
					</p>
				</div>
			</div>
		</div>
	);
}

export default GuestProfileCard