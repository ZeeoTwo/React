import {
  users,
  addresses,
  banks,
  appliances,
  beers,
  blood_types,
  credit_cards,
} from "./api/randomData";
import React, { useRef, useState } from "react";
import Users from "./components/Users";
import Addresses from "./components/Adresses";
import Banks from "./components/Banks";
import Equipment from "./components/Equipment";
import Beers from "./components/Beers";
import Bloodtypes from "./components/BloodTypes";
import CreditCards from "./components/CreditCards";

type CategoryType = keyof typeof categoryMap;

interface CategoryMap {
  [category: string]: (size: number) => any;
}

const categoryMap: CategoryMap = {
  users: users,
  addresses: addresses,
  banks: banks,
  appliances: appliances,
  beers: beers,
  blood_types: blood_types,
  credit_cards: credit_cards,
};

const RandomDataAxios: React.FC = () => {
  const category = useRef<CategoryType>(0);
  const size = useRef<number>(0);
  const [data, setData] = useState<any>(null);
  const [components, setComponents] = useState<JSX.Element | null>(null);

  const handleClick = () => {
    const fetchData = categoryMap[category.current];

    if (!fetchData || typeof fetchData !== "function") {
      console.log("No category selected");
      setComponents(null);
      return;
    }

    fetchData(size.current)
      .then((res: { data: any }) => {
        const newData = !Object.prototype.hasOwnProperty.call(
          res.data,
          "length"
        )
          ? [res.data]
          : res.data;
        setData(newData);

        const componentMap: Record<CategoryType | "null", JSX.Element> = {
          users: <Users data={newData} />,
          addresses: <Addresses data={newData} />,
          banks: <Banks data={newData} />,
          appliances: <Equipment data={newData} />,
          beers: <Beers data={newData} />,
          blood_types: <Bloodtypes data={newData} />,
          credit_cards: <CreditCards data={newData} />,
          null: <p>Wrong Data Size</p>,
        };

        if (size.current != null) {
          setComponents(componentMap[category.current]);
        } else {
          setComponents(componentMap["null"]);
        }
      })
      .catch((err: any) => {
        // console.log(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    category.current = e.target.value as CategoryType;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (!isNaN(input)) {
      size.current = input;
    } else {
      size.current = null!;
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <select name="Category" id="Category" onChange={handleChange}>
          <option value="">Select An Option</option>
          <option value="users">Users</option>
          <option value="addresses">Addresses</option>
          <option value="banks">Banks</option>
          <option value="appliances">Appliances</option>
          <option value="beers">Beers</option>
          <option value="blood_types">Blood Types</option>
          <option value="credit_cards">Credit Cards</option>
        </select>

        <input
          type="text"
          placeholder="Data Size"
          onChange={handleInputChange}
        />

        <button onClick={handleClick}>Get Data</button>
      </div>
      <div className="mt-5 flex justify-center">{components}</div>
    </>
  );
};
export default RandomDataAxios;
