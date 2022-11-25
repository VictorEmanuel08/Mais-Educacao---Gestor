import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { app } from "../../api/app";

export function TesteDados() {
  const [dados, setDados] = useState([]);

  const user1 = {
    id: 1,
    name: "Tulio Faria",
    hashSenha: "hashDaSenha",
  };
  const user2 = {
    id: 2,
    name: "Joao da Silva",
    hashSenha: "hashDaSenha",
  };

  const users = [user1, user2];

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        `/dadosBI/atividades/a8b56ba5-8dbb-4d51-ba74-e0c4f717081f`
      );

      setDados(response.data);
    };
    getData();
  }, []);

  const keys = ["turma"];
  const filterObject = (obj, keys) => {
    return keys
      .map((key) => ({ [key]: obj[key] }))
      .reduce((anterior, atual) => {
        return {
          ...anterior,
          ...atual,
        };
      }, {});
  };

  const filterForMap = (keys) => (obj) => filterObject(obj, keys);

  const newUsers = dados.map(filterForMap(keys));
  console.log(newUsers);

  const negateFilter = (obj, negateKeys) => {
    return Object.keys(obj)
      .filter((key) => !negateKeys.includes(key))
      .map((key) => ({ [key]: obj[key] }))
      .reduce((anterior, atual) => {
        return {
          ...anterior,
          ...atual,
        };
      }, {});
  };

  const negateFilterForMap = (negateKeys) => (obj) =>
    negateFilter(obj, negateKeys);
  console.log(dados.map(negateFilterForMap(["6º A"])));
  // console.log(negateFilterForMap(["6º A"])(dados));

  return <div>fwqrewqewer</div>;
}
