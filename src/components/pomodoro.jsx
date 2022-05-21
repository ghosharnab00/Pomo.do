import React, { useState } from "react";

function Dpp() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
      <div>
    <input 
      type="text"
      name="name"
      onChange={handleChange}
      value={name} />
      {name}
      </div>
  );
}

export default Dpp;