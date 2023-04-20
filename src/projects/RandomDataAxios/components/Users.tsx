import React from "react";

interface UserData {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
}

interface UsersProps {
  data: UserData[];
}

const Users: React.FC<UsersProps> = ({ data }) => {
  // console.log(data);
  return (
    <table className="border border-black p-2">
      <thead className="border border-black p-2">
        <tr>
          <th>LP</th>
          <th>Id</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Username</th>
          <th>Dender</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          return (
            <tr className="border border-black p-2" key={row.id}>
              <td className="border border-black p-2">{idx + 1}</td>
              <td className="border border-black p-2">{row.id}</td>
              <td className="border border-black p-2">
                <img src={row.avatar} height={40} width={40} alt="avatar" />
              </td>
              <td className="border border-black p-2">{row.first_name}</td>
              <td className="border border-black p-2">{row.last_name}</td>
              <td className="border border-black p-2">{row.username}</td>
              <td className="border border-black p-2">{row.gender}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
