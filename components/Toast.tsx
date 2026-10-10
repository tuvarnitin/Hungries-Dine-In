type Props = {
	message: string | null;
};

export default function Toast({ message }: Props) {
	if (!message) return null;

	return (
		<div className="fixed top-5 z-50 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-medium animate-bounce">
			<span>{message}</span>
		</div>
	);
}
