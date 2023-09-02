import ProfileContent from "../components/ProfileTabloide";
import PageContainer from "../components/containers/PageContainer";
import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";

const ProfilePage = () => {
  return (
    <PageContainer title={"Profile"}>
      <ProfileContent />
    </PageContainer>
  );
};
export default ProfilePage;
