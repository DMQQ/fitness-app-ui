import { useContext, useEffect, useState } from "react";
import * as CONST from "../constants/constants";
import { AuthContext } from "../context/AuthContext";

export default function useGet(path, trigger = []) {
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);

   const { isAuth } = useContext(AuthContext);

   useEffect(() => {
      const abortController = new AbortController();

      if (isAuth && path && !abortController.signal.aborted) {
         (async () => {
            setLoading(true);
            try {
               const res = await fetch(CONST.BACKEND + path, {
                  method: "GET",
                  headers: {
                     User: isAuth.login,
                     token: isAuth.jwt,
                  },
               });
               if (!res.ok) throw new Error("bad response :C");
               const data = await res.json();
               if (!abortController.signal.aborted && data != null) {
                  setData(data);
                  setLoading(false);
               }
            } catch (error) {
               if (!abortController.signal.aborted && error) {
                  setError(error);
                  setLoading(false);
               }
            }
         })();
      }

      return () => abortController.abort();
   }, [path, ...trigger]);

   return { error, loading, data };
}
