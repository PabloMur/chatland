const CustomPrevFrames = ({ children }: any) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 grid place-items-center sm:flex sm:flex-row p-4">
      {children}
    </div>
  );
};
export default CustomPrevFrames;
