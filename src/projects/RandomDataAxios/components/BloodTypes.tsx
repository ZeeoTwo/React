import React from "react";

interface Bloodtype {
  id: number;
  uid: string;
  type: string;
  rh_factor: string;
  group: string;
}

interface BloodtypesProps {
  data: Bloodtype[];
}

const Bloodtypes: React.FC<BloodtypesProps> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Id</th>
          <th>UID</th>
          <th>Type</th>
          <th>RH Factor</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bloodtype, idx) => (
          <tr key={bloodtype.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{bloodtype.id}</td>
            <td className="border border-black p-2">{bloodtype.uid}</td>
            <td className="border border-black p-2">{bloodtype.type}</td>
            <td className="border border-black p-2">{bloodtype.rh_factor}</td>
            <td className="border border-black p-2">{bloodtype.group}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Bloodtypes;
