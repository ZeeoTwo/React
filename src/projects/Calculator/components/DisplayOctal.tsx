import Container from "./Container";

interface DisplayOctalProps {
  content: number;
}

const DisplayOctal = (props: DisplayOctalProps) => {
  const { content } = props;

  return (
    <div className="DisplayOctal">
      <Container
        width={400}
        height={70}
        name="OCT"
        content={content.toString(8)}
      ></Container>
    </div>
  );
};

export default DisplayOctal;
