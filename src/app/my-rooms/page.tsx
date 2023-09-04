import GuestRooms from "@/components/GuestRooms";
import UserRooms from "@/components/UserRooms";
import PageContainer from "@/components/containers/PageContainer";
import SecondaryTitle from "@/components/ui/Titles/SecondaryTitles";
const MyRoomsPage = () => {
  return (
    <PageContainer title={"My Rooms"}>
      <div className="flex flex-col sm:flex-row h-full p-3 gap-3">
        <div className="flex flex-col w-full  items-center justify-evenly">
          <div className="w-full grid place-items-center rounded-xl bg-black">
            <SecondaryTitle>Yours</SecondaryTitle>
          </div>
          <div className="h-full w-full">
            <UserRooms />
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-evenly">
          <div className="w-full grid place-items-center bg-indigo-900 rounded-xl">
            <SecondaryTitle>Invited</SecondaryTitle>
          </div>
          <div className="h-full w-full">
            <GuestRooms />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default MyRoomsPage;
