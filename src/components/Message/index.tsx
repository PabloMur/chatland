interface MessageProps {
  text: string;
  isOwner: boolean;
  isNew: boolean;
}

const Owner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-end px-4 py-1">
      <div
        className="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl rounded-br-md"
        style={{
          background: "linear-gradient(135deg, #a855f7, #7c3aed)",
          boxShadow: "0 2px 12px rgba(168,85,247,0.25)",
        }}
      >
        <p className="text-sm leading-relaxed text-white">{text}</p>
      </div>
    </div>
  );
};

const Guest: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-start px-4 py-1">
      <div
        className="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl rounded-bl-md"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "#f4f4f8" }}>{text}</p>
      </div>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ text, isOwner }) => {
  return isOwner ? <Owner text={text} /> : <Guest text={text} />;
};

export default Message;
