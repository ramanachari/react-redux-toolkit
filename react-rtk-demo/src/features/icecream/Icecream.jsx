import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./iceCreamSlice";

export const IcecreamView = () => {
  const numOfIcecreams = useSelector((state) => state.icecream.numOfIceCreams);
  const dispatch = useDispatch();
  const [iceCreams, setIceCreams] = useState(1);
  return (
    <div>
      <h2>Number of Ice creams - {numOfIcecreams}</h2>
      <input
        type="number"
        onChange={(e) => setIceCreams(e.target.value)}
        value={iceCreams}
      />
      <button onClick={() => dispatch(ordered(iceCreams))}>
        Order ice cream
      </button>
      <button onClick={() => dispatch(restocked(5))}>Restock ice cream</button>
    </div>
  );
};
