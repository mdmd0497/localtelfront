import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API;

export const Users = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [account, setAccount] = useState("");
  const [accountData, setAccountData] = useState([]);

  const [editing, setEditing] = useState(false);

  const getAccount = async (account) => {
    try {
      const res = await fetch(`${API}/consultaccount/${account}`);
      const data = await res.json();
      console.log([data["data"]]);
      setAccountData([data["data"]]);
    } catch (error) {
      console.error("Error en la conexión con la API", error);
    }
  };

  const editUser = async (account) => {
    const res = await fetch(`${API}/consultaccount/${account}`);
    const data = await res.json();
    setEditing(true);

    // Reset
    setName([data["data"]["name"]]);
    setValue([data["data"]["value"]]);
    setAccount([data["data"]["account"]]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      if (name && value) {
        try {
          const response = await fetch(`${API}/account`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              value: value,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert(
              JSON.stringify(
                "los datos del usuario son: " +
                  " cuenta: " +
                  data["data"]["account"] +
                  " nombre: " +
                  data["data"]["name"] +
                  " valor: " +
                  data["data"]["value"]
              )
            );
          } else {
            console.error("Error al obtener los datos");
          }
        } catch (error) {
          console.error("Error en la conexión con la API", error);
        }
      }
    } else {
      const res = await fetch(`${API}/updatevalue`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account:account,
          value:value,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
    }

    if (account) {
      getAccount(account);
    } else {
      alert(JSON.stringify("no puede consultar datos vacios "));
    }
    setName("");
    setValue("");
  };
  useEffect(() => {
    // Realizar alguna acción cuando tramosData se actualice, si es necesario
  }, [accountData]);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Creación de cuenta</h3>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              id="exampleInputacount"
              placeholder="Name"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Value
            </label>
            <input
              type="number"
              required
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="form-control"
              id="exampleInputValue"
              placeholder="Value"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Consultar Cuentas</h3>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Account
            </label>
            <input
              type="text"
              required
              onChange={(e) => setAccount(e.target.value)}
              value={account}
              className="form-control"
              id="exampleInputacount"
              placeholder="Account"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Consultar
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cuenta</th>
              <th>Valor</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {accountData.map((cliente) => (
              <tr key={cliente.account}>
                <td>{cliente.name}</td>
                <td>{cliente.account}</td>
                <td>{cliente.value}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => editUser(cliente.account)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
