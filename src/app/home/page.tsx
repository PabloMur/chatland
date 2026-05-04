"use client";
import Options from "@/components/ui/Options";
import PageContainer from "@/components/containers/PageContainer";
import GetInRoomModal from "@/components/modals/GetInRoom";

const HomePage = () => {
  return (
    <PageContainer title="Home">
      <div className="relative flex-1 flex">
        <GetInRoomModal />
        <Options />
      </div>
    </PageContainer>
  );
};
export default HomePage;
