import ProfileAvatar from "./ProfileAvatar";
import EditProfileButton from "./EditProfileButton";

interface ProfileCardProps {
	name: string;
	email: string;
	phone: string;
	image: string;
	onEdit?: () => void;
}

export default function ProfileCard({
	name,
	email,
	phone,
	image,
	onEdit,
}: ProfileCardProps) {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-xs border border-muted-text/15 flex items-center justify-between relative">
			<div className="flex items-center space-x-4 min-w-0">
				<ProfileAvatar
					src={image}
					alt={name}
				/>

				<div className="min-w-0">
					<h2 className="text-lg font-bold text-dark-text truncate">{name}</h2>

					<p className="text-xs text-muted-text font-medium truncate">
						{email}
					</p>

					<p className="text-xs text-muted-text font-medium">{phone}</p>
				</div>
			</div>

			<EditProfileButton onClick={onEdit} />
		</div>
	);
}
