import React from "react";

interface ContainerProps {
  width: number;
  height: number;
  name: string;
  content: string;
}

const Container: React.FC<ContainerProps> = ({
  width,
  height,
  name,
  content,
}) => {
  const base_style = { width: width + "px", height: height + "px" };

  return (
    <div className="Container flex justify-center ">
      <div
        className="m-2 rounded-lg border border-black border-opacity-50 bg-slate-100 shadow-xl"
        style={base_style}
      >
        <div className="my-4 flex w-full pl-4 text-xl">
          <div className="flex w-1/4">
            <h1>{name}</h1>
          </div>
          <div className="w-3/4">
            <h1 className="text-left">{content}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
