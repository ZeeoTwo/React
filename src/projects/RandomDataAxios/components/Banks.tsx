import React from "react";

interface Bank {
  id: number;
  bank_name: string;
  account_number: string;
  iban: string;
  routing_number: string;
  swift_bic: string;
}

interface BanksProps {
  data: Bank[];
}

const Banks: React.FC<BanksProps> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Bank Name</th>
          <th>Account Number</th>
          <th>IBAN</th>
          <th>Routing Number</th>
          <th>SWIFT/BIC</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bank, idx) => (
          <tr key={bank.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{bank.bank_name}</td>
            <td className="border border-black p-2">{bank.account_number}</td>
            <td className="border border-black p-2">{bank.iban}</td>
            <td className="border border-black p-2">{bank.routing_number}</td>
            <td className="border border-black p-2">{bank.swift_bic}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Banks;
