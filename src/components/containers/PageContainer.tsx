import { ReactNode } from "react";

interface PageContainerProps {
  title?: string;
  children: ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col sm:pl-64 pt-16 sm:pt-0" style={{ background: "#0a0a0f" }}>
      {title && (
        <div
          className="px-8 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "#f4f4f8" }}>
            {title}
          </h1>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
export default PageContainer;
