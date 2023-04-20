import React, { useState } from "react";

interface ButtonProps {
  text: string;
  props: (arg: { t: string; s: boolean }) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const [state, toggled] = useState(false);
  const clicked = () => {
    const new_value = !state;
    toggled(new_value);
    props.props({ t: props.text, s: new_value });
  };

  return (
    <div>
      <button
        type="button"
        onClick={clicked}
        className={`${
          state ? "bg-slate-600 shadow-lg" : ""
        } m-1 rounded-md bg-slate-400 p-1 shadow-md shadow-black transition-all duration-300`}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
