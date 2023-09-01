const PageContainer = ({ title, children }: any) => {
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center">
      <div>{title}</div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
export default PageContainer;
