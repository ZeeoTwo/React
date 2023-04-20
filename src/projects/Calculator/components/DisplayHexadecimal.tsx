import Container from "./Container";

interface DisplayHexadecimalProps {
  content: number;
}

const DisplayHexadecimal = ({
  content,
}: DisplayHexadecimalProps): JSX.Element => {
  return (
    <div className="DisplayHexadecimal">
      <Container
        width={400}
        height={70}
        name="HEX"
        content={`0x${content.toString(16).toUpperCase()}`}
      ></Container>
    </div>
  );
};

export default DisplayHexadecimal;
