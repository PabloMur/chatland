const PageContainer = ({ children }: any) => {
  return (
    <div className="min-h-screen w-full bg-indigo-950 grid place-items-center">
      {children}
    </div>
  );
};
export default PageContainer;
