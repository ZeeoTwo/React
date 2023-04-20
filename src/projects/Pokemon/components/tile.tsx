import React from "react";

interface TileProps {
  id: number;
  name: string;
}

const Tile: React.FC<TileProps> = ({ id, name }) => {
  return (
    <div className="h-32 w-32">
      <img
        className="m-auto block h-[75%] w-[75%]"
        alt=""
        src={`../images/${id.toString().padStart(3, "0")}.png`}
      />
      <div className="text-center">{name}</div>
    </div>
  );
};

export default Tile;
