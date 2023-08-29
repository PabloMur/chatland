const PageContainer = ({ children }: any) => {
  return (
    <div className="h-screen w-full bg-indigo-950 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default PageContainer;
