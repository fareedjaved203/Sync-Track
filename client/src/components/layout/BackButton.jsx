import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BackButton = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleBack = () => {
    if (user?.data?.user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
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
        zIndex: "50",
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
