interface MessageProps {
  text: string;
  isOwner: boolean;
  isNew: boolean;
}

const Owner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="p-1 pr-3 flex justify-end">
      <div className="bg-orange-50 max-w-sm p-3 rounded-3xl rounded-br-none shadow-3xl">
        <p className="text-indigo-900">{text}</p>
      </div>
    </div>
  );
};

const Guest: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="p-1 pl-3 flex justify-start">
      <div className="bg-indigo-900 w-fit p-3 rounded-full rounded-bl-none shadow-3xl">
        <p className="text-orange-50">{text}</p>
      </div>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ text, isOwner, isNew }) => {
  return isOwner ? <Owner text={text} /> : <Guest text={text} />;
};

export default Message;
