import React, { useEffect, useState } from "react";

const Lines: React.FC = () => {
  const [itemsInCart, setItemsInCart] = useState<number | typeof NaN>(
    Number.NaN
  );
  const [lines, setLines] = useState<Array<Array<number>>>([
    [],
    [],
    [],
    [],
    [],
  ]);

  const onCheckout = () => {
    let smallestAmoutOfItems = Number.POSITIVE_INFINITY;
    let smallestLineIndex = -1;
    // Loop through all lines,
    // find the smallest one,
    // add the itemsInCart to that line

    lines.forEach((line, i) => {
      const totalInLine = line.reduce((a, b) => a + b, 0);
      //! I had to read about reduce, and how it works
      //? At first i used a for loop to loop through the array, and sum it
      if (totalInLine < smallestAmoutOfItems) {
        smallestAmoutOfItems = totalInLine;
        smallestLineIndex = i;
      }
    });

    // console.log(smallestLineIndex);

    const newLines = [...lines];
    newLines[smallestLineIndex] = [...newLines[smallestLineIndex], itemsInCart];
    setLines(newLines);
  };

  // This is mine UseEffect for decrementing
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLines(prevLines =>
  //       prevLines.map(line => {
  //         if (line.length > 0) {
  //           const firstItem = line[0];
  //           if (firstItem > 0) {
  //             const newLine = [...line];
  //             newLine[0] = firstItem - 1;
  //             return newLine;
  //           } else {
  //             return line.slice(1);
  //           }
  //         } else {
  //           return line;
  //         }
  //       })
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // This is the one used in video
  // Cleaver Slice and filter usage

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((item) => item > 0)
        )
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <input
          key={"ItemInput"}
          type="number"
          required
          value={isNaN(itemsInCart) ? "" : itemsInCart} // Are You happy now React?? :/
          onChange={(e) => {
            setItemsInCart(e.currentTarget.valueAsNumber);
            // console.log(e.currentTarget.valueAsNumber);
          }}
        />
        <button onClick={onCheckout}>Checkout</button>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div id={"Lines"} className="flex flex-row justify-center gap-7">
        {lines.map((people, i) => (
          <div key={i} className="flex flex-col rounded border p-4 text-center">
            <div className="">Line: {i}</div>
            <div className="flex-col divide-y-2">
              {people.map((person, j) => (
                <div className="flex flex-col" key={j}>
                  {person}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Lines;
