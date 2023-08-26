import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
import UserEmail from "../components/ui/UserEmail";
import UserName from "../components/ui/UserName";
const ProfilePage = () => {
  return (
    <div className="h-full w-full bg-orange-100 flex flex-col items-center justify-center">
      <SecondaryTitle>Profile</SecondaryTitle>
      <UserName />
      <UserEmail />
    </div>
  );
};
export default ProfilePage;
