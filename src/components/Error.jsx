import React from "react";
import WindowDimensions from "../Utils/WindowDimension";

function Error() {
    height=WindowDimensions().height-20;
    width=WindowDimensions().width-20;
  return (
    <div>
        <img src="../assets/notfound" class="h-[height] w-[width]"></img>        
    </div>
  );
}

export default Error;