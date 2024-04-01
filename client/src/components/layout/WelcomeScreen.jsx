import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const userName = user?.data?.user?.name;

  const greeting = () => {
    const hour = currentDate.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <MainLayout>
      <div className="flex h-screen items-start justify-center mt-5">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">
            {day} {month}
          </div>
          <div className="text-4xl font-bold">
            {greeting()}, {userName}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WelcomeScreen;
