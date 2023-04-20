interface Props {
  width: number;
  height: number;
  content: string;
}

const Display: React.FC<Props> = ({ width, height, content }) => {
  const base_style = { width: width + "px", height: height + "px" };

  return (
    <div className="flex justify-center">
      <div
        className="m-2 rounded-lg border border-black border-opacity-50 bg-slate-100 shadow-xl"
        style={base_style}
      >
        <div className="my-4 flex text-xl">
          <div className="float-right w-full pr-4">
            <h1 className="text-right">{content}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
