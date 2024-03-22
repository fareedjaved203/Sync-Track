import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${value}`);
  };
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Join</button>
    </div>
  );
};

export default Home;
