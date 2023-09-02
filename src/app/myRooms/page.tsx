import GuestRooms from "../components/GuestRooms";
import UserRooms from "../components/UserRooms";
import PageContainer from "../components/containers/PageContainer";
import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
const MyRoomsPage = () => {
  return (
    <PageContainer title={"My Rooms"}>
      <div className="flex flex-col sm:flex-row w-full h-full sm:h-1/2">
        <div className="flex flex-col bg-indigo-900 w-full items-center justify-evenly">
          <SecondaryTitle>Yours</SecondaryTitle>
          <UserRooms />
        </div>
        <div className="flex flex-col bg-indigo-900 w-full items-center justify-evenly">
          <SecondaryTitle>Invited</SecondaryTitle>
          <GuestRooms />
        </div>
      </div>
    </PageContainer>
  );
};
export default MyRoomsPage;
