const CustomImageBanner = ({ children }: any) => {
  return (
    <div className="h-screen bg-orange-100 flex flex-row items-center justify-center">
      {children}
    </div>
  );
};
export default CustomImageBanner;
