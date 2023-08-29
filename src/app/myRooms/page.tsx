import PageContainer from "../components/containers/PageContainer";
import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
const MyRoomsPage = () => {
  return (
    <PageContainer>
      <SecondaryTitle>My Rooms</SecondaryTitle>;
      <div className="flex bg-indigo-900 w-full items-center justify-evenly">
        <SecondaryTitle>Yours</SecondaryTitle>
        <SecondaryTitle>Invited</SecondaryTitle>
      </div>
    </PageContainer>
  );
};
export default MyRoomsPage;
