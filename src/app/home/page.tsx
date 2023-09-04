"use client";
import SecondaryTitle from "@/components/ui/Titles/SecondaryTitles";
import Options from "@/components/ui/Options";
import PageContainer from "@/components/containers/PageContainer";
import { useRecoilValue } from "recoil";
import { userEmailAtom } from "@/lib/atoms/atoms";
import GetInRoomModal from "@/components/modals/GetInRoom";

const HomePage = () => {
  console.log(useRecoilValue(userEmailAtom));

  return (
    <PageContainer title={"Welcome"}>
      <GetInRoomModal></GetInRoomModal>
      <Options></Options>
    </PageContainer>
  );
};
export default HomePage;
