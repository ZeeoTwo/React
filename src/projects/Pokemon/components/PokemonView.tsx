import { useRef, useState } from "react";
import Tile from "./tile";
import Button from "./toggle_button.js";

import pokedex_data from "../assets/pokedex.json";
import types_data from "../assets/types.json";

interface Pokemon {
  id: number;
  name: {
    english: string;
  };
  type: string[];
}

const PokemonView: React.FC = () => {
  const pokedex: Pokemon[] = pokedex_data;
  const types: { english: string; chinese: string; japanese: string }[] =
    types_data;
  const [data, setdata] = useState<Pokemon[]>(pokedex);
  const [name, setName] = useState<boolean>(false);
  const filter_input = useRef<HTMLInputElement>(null);

  const handle_filter_input = (): void => {
    const value: string = filter_input.current?.value ?? "";
    if (value === "") {
      setdata(pokedex);
    } else {
      let f_p = data.filter((element) => {
        const pokemon_name = element.name.english.toLowerCase();
        return pokemon_name.includes(value);
      });
      setdata(f_p);
    }
  };
  const filter_by_type = (prop: { t: string; s: boolean }) => {
    if (prop.s) {
      let t_data = data.filter((element) => {
        const pok_t = element.type;
        return pok_t.includes(prop.t);
      });

      setdata(t_data);
    } else {
      setdata(pokedex);
    }
  };
  const filter_by_id = () => {
    const pokemons = [...data];
    pokemons.reverse();
    setdata(pokemons);
  };
  const filter_name = () => {
    const pokemons = [...data];
    if (!name) {
      const tmp = pokemons.sort((a, b) =>
        a.name.english > b.name.english
          ? 1
          : b.name.english > a.name.english
          ? -1
          : 0
      );
      setName(!name);
      setdata(tmp);
    } else {
      setName(!name);
      setdata(pokedex);
    }
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-center">
          <input
            ref={filter_input}
            type="text"
            onChange={handle_filter_input}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <Button text="Sort By Id" props={filter_by_id} />
        <Button text="Sort By Name" props={filter_name} />
      </div>
      <div className="flex justify-center">
        {types.map((type) => {
          const tmp = type.english;
          return <Button key={tmp} text={tmp} props={filter_by_type} />;
        })}
      </div>
      <div className=" flex flex-wrap">
        {data.map((item) => {
          return <Tile key={item.id} id={item.id} name={item.name.english} />;
        })}
      </div>
    </div>
  );
};
export default PokemonView;
