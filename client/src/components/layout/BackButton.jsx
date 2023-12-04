import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Button
      type="primary"
      icon={<LeftOutlined />}
      onClick={handleBack}
      className="m-2"
      style={{
        backgroundColor: "#2E2E30",
        color: "white",
        fontSize: "15px",
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
