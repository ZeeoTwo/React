import Container from "./Container";

interface DisplayDecimalProps {
  content: number;
}

const DisplayDecimal = ({ content }: DisplayDecimalProps) => {
  return (
    <div className="DisplayDecimal">
      <Container
        width={400}
        height={70}
        name="DEC"
        content={content.toString()}
      />
    </div>
  );
};

export default DisplayDecimal;
