import SecondaryTitle from "@/components/ui/Titles/SecondaryTitles";
import { ReactNode } from "react";
interface PageContainerProps {
  title?: string;
  children: ReactNode; // Indica que children es opcional
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative">
      {title ? <SecondaryTitle>{title}</SecondaryTitle> : <></>}
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
export default PageContainer;
