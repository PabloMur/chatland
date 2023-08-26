import PageContainer from "../components/containers/PageContainer";
import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
import UserEmail from "../components/ui/UserEmail";
import UserName from "../components/ui/UserName";
const ProfilePage = () => {
  return (
    <PageContainer>
      <SecondaryTitle>Profile</SecondaryTitle>
      <UserName />
      <UserEmail />
    </PageContainer>
  );
};
export default ProfilePage;
