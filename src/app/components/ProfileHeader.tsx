import { useUser } from "../../contexts/UserContext";

export function ProfileHeader() {
  const { avatarUrl, email, emailVerified, name } = useUser()

  return (
    <div className="px-5">
      <img
        className="img-profile"
        height={100}
        width={100}
        src={avatarUrl}
      />
      <p className="h4 mt-3">{name}</p>
      <p>{email}</p>
      <p>{emailVerified ? 'E-mail verificado' : 'E-mail não verificado'}</p>
      <hr />
    </div>
  );
}
