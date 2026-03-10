const CustomPrevFrames = ({ children }: any) => {
  return (
    <div
      className="min-h-screen w-full flex flex-col sm:flex-row relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background glow effects */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
};
export default CustomPrevFrames;
