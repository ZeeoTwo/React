import React from "react";

type Card = {
  id: number;
  uid: string;
  credit_card_number: string;
  credit_card_expiry_date: string;
  credit_card_type: string;
};

type Props = {
  data: Card[];
};

const CreditCards: React.FC<Props> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Id</th>
          <th>UID</th>
          <th>Credit Card Number</th>
          <th>Expiry Date</th>
          <th>Credit Card Type</th>
        </tr>
      </thead>
      <tbody>
        {data.map((card, idx) => (
          <tr key={card.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{card.id}</td>
            <td className="border border-black p-2">{card.uid}</td>
            <td className="border border-black p-2">
              {card.credit_card_number}
            </td>
            <td className="border border-black p-2">
              {card.credit_card_expiry_date}
            </td>
            <td className="border border-black p-2">{card.credit_card_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreditCards;
