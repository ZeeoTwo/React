import React from "react";

interface EquipmentData {
  id: number;
  brand: string;
  equipment: string;
}

interface EquipmentProps {
  data: EquipmentData[];
}

const Equipment: React.FC<EquipmentProps> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Id</th>
          <th>Brand</th>
          <th>Equipment</th>
        </tr>
      </thead>
      <tbody>
        {data.map((equipment, idx) => (
          <tr key={equipment.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{equipment.id}</td>
            <td className="border border-black p-2">{equipment.brand}</td>
            <td className="border border-black p-2">{equipment.equipment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Equipment;
