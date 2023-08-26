import PageContainer from "../../components/containers/PageContainer";
import MessageContainer from "../../components/room/MessageContainer";
import MessageSender from "../../components/room/MessageSender";

const RoomPage = () => {
  return (
    <PageContainer>
      <MessageContainer></MessageContainer>
      <MessageSender></MessageSender>
    </PageContainer>
  );
};
export default RoomPage;
