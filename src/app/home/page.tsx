"use client";
import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
import Options from "../components/ui/Options";
import PageContainer from "../components/containers/PageContainer";
import { useRecoilValue } from "recoil";
import { userEmailAtom } from "@/lib/atoms/atoms";

const HomePage = () => {
  console.log(useRecoilValue(userEmailAtom));

  return (
    <PageContainer>
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <SecondaryTitle>Welcome</SecondaryTitle>
        <Options></Options>
      </div>
    </PageContainer>
  );
};
export default HomePage;
