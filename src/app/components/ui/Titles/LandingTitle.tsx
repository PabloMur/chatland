const LandingTitle = ({ children }: any) => {
  return (
    <h1 className="text-5xl text-indigo-900 bg-orange-100 shadow-custom p-5 rounded-full rounded-br-none">
      {children}
    </h1>
  );
};

export default LandingTitle;
