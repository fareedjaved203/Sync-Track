import { BrowserRouter as Router } from "react-router-dom";
import ComponentRoutes from "./components/ComponentRoutes";

const App = () => {
  return (
    <>
      <Router>
        <ComponentRoutes />
      </Router>
    </>
  );
};

export default App;
