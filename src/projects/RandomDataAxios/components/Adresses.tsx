import React from "react";

interface Address {
  id: number;
  street_address: string;
  secondary_address: string;
  building_number: string;
  mail_box: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  zip_code: string;
}

interface AddressesProps {
  data: Address[];
}

const Addresses: React.FC<AddressesProps> = ({ data }) => {
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>Lp</th>
          <th>Id</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {data.map((address, idx) => (
          <tr key={address.id} className="border border-black p-2">
            <td className="border border-black p-2">{idx + 1}</td>
            <td className="border border-black p-2">{address.id}</td>
            <td className="border border-black p-2">
              {address.street_address}, {address.secondary_address},{" "}
              {address.building_number}, {address.mail_box}
            </td>
            <td className="border border-black p-2">
              {address.city}, {address.zip}
            </td>
            <td className="border border-black p-2">{address.state}</td>
            <td className="border border-black p-2">{address.country}</td>
            <td className="border border-black p-2">{address.zip_code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Addresses;
