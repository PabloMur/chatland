import SecondaryTitle from "@/components/ui/Titles/SecondaryTitles";

const PageContainer = ({ title, children }: any) => {
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center">
      <SecondaryTitle>{title}</SecondaryTitle>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
export default PageContainer;
