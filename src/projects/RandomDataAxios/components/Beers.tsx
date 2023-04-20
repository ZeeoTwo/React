import React from "react";

type Beer = {
  id: number;
  brand: string;
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: number;
  alcohol: number;
  blg: number;
};

type BeersProps = {
  data: Beer[];
};

const Beers: React.FC<BeersProps> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Brand</th>
          <th>Name</th>
          <th>Style</th>
          <th>Hop</th>
          <th>Yeast</th>
          <th>Malts</th>
          <th>IBU</th>
          <th>Alcohol</th>
          <th>BLG</th>
        </tr>
      </thead>
      <tbody>
        {data.map((beer, idx) => (
          <tr key={beer.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{beer.brand}</td>
            <td className="border border-black p-2">{beer.name}</td>
            <td className="border border-black p-2">{beer.style}</td>
            <td className="border border-black p-2">{beer.hop}</td>
            <td className="border border-black p-2">{beer.yeast}</td>
            <td className="border border-black p-2">{beer.malts}</td>
            <td className="border border-black p-2">{beer.ibu}</td>
            <td className="border border-black p-2">{beer.alcohol}</td>
            <td className="border border-black p-2">{beer.blg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Beers;
