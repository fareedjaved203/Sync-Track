import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import MainLayout from "../../layout/MainLayout";

const VideoRoom = () => {
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const appID = 1540553196;
    const serverSecret = "6978fba5642ecd844f24565464326a72";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "fareed javed"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http:localhost:5173/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
    });
  };
  return (
    <MainLayout>
      <div>
        <div ref={myMeeting} />
      </div>
    </MainLayout>
  );
};

export default VideoRoom;
