import { BrowserRouter as Router } from "react-router-dom";
import ComponentRoutes from "./routes/ComponentRoutes";

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
