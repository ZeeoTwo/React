import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const Zadanie: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<User | null>(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetch("http://localhost:12000/api/zadanie_03")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (index: number) => {
    setEditMode(index);
    const userToEdit = users[index];
    userToEdit.id = index;
    setEditedData({ ...userToEdit });
  };

  const handleAccept = () => {
    if (editedData) {
      // Send PUT request to update user data on the server
      console.log(editedData);
      axios
        .put(
          `http://localhost:12000/api/zadanie_03/${editedData.id}`,
          editedData
        )
        .then((res) => {
          const updatedUsers = [...users];
          updatedUsers[editedData.id] = editedData;
          setUsers(updatedUsers);
        })
        .catch((err) => console.error(err));

      setEditMode(null);
      setEditedData(null);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedData(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: event.target.value,
      });
    }
  };

  const handleDelete = (index: number) => {
    axios
      .delete(`http://localhost:12000/api/zadanie_03/${index}`)
      .then((res) => {
        // Remove the deleted user from the local state
        const updatedUsers = users.filter((user, i) => i !== index);
        setUsers(updatedUsers);
      })
      .catch((err) => console.error(err));
  };

  const handleAddUser = (a: boolean) => {
    setAddingUser(a);
  };

  const handleInputChangeNewUser = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewUser({
      ...newUser,
      [field]: event.target.value,
    });
  };

  const handleCancelAddUser = () => {
    setAddingUser(false);
    setNewUser({ id: 0, firstName: "", lastName: "" });
  };

  const handleAcceptAddUser = () => {
    if (newUser.firstName && newUser.lastName) {
      axios
        .post("http://localhost:12000/api/zadanie_03", newUser)
        .then((res) => {
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          setAddingUser(false);
          setNewUser({ id: 0, firstName: "", lastName: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      {addingUser ? (
        <button onClick={() => handleAddUser(false)}>Anuluj dodawanie</button>
      ) : (
        <button onClick={() => handleAddUser(true)}>
          Dodaj nowego użytkownika
        </button>
      )}

      {addingUser && (
        <div>
          <input
            type="text"
            placeholder="Imię"
            value={newUser.firstName}
            onChange={(e) => handleInputChangeNewUser(e, "firstName")}
          />
          <input
            type="text"
            placeholder="Nazwisko"
            value={newUser.lastName}
            onChange={(e) => handleInputChangeNewUser(e, "lastName")}
          />
          <button onClick={handleAcceptAddUser}>Dodaj</button>
          <button onClick={handleCancelAddUser}>Anuluj</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => (
            <tr key={index}>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={editedData?.firstName}
                    onChange={(e) => handleInputChange(e, "firstName")}
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={editedData?.lastName}
                    onChange={(e) => handleInputChange(e, "lastName")}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editMode === index ? (
                  <>
                    <button onClick={handleAccept}>Akceptuj</button>
                    <button onClick={handleCancel}>Anuluj</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edytuj</button>
                    <button onClick={() => handleDelete(index)}>Usuń</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Zadanie;
