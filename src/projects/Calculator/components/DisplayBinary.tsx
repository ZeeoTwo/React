import Container from "./Container";

interface DisplayBinaryProps {
  content: number;
}

const DisplayBinary = ({ content }: DisplayBinaryProps) => {
  return (
    <div className="DisplayBinary">
      <Container
        width={400}
        height={70}
        name="BIN"
        content={content.toString(2)}
      ></Container>
    </div>
  );
};

export default DisplayBinary;
