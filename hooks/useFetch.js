import { useContext, useState } from "react";
import * as CONST from "../constants/constants";
import { AuthContext } from "../context/AuthContext";

export default function useFetch() {
  const { isAuth } = useContext(AuthContext);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function HTTP(path, method, body) {
    if (!isAuth) return setError("User not provided! Log in Again");

    try {
      setLoading(true);
      const res = await fetch(CONST.BACKEND + path, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          token: isAuth.jwt,
          User: isAuth.login,
        },
      });
      if (!res.ok) {
        return setError("Someting is wrong :C");
      }
      if (res.status === 400) return setError("Someting is wrong :C");
      const data = await res.json();

      if (data == undefined) {
        return setError("Someting is wrong :C");
      }
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  }

  return { HTTP, error, data, loading };
}
