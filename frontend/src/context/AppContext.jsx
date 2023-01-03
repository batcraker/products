import { createContext, useEffect, useState } from "react";
import { deleteProductAxios, getProductsAxios } from "../api/index";
import { signinAxios, signupAxios } from "../api/auth";
import axios from "axios";

import config from "../config";

export const AppContext = createContext();

export function AppContextProvider(props) {
  let [products, setProducts] = useState([]);
  let [user, setUser] = useState(null);
  let [isAdmin, setIsAdmin] = useState(false);
  let [token, setToken] = useState("");

  useEffect(() => {
    async function updaterProducts() {
      setProducts(await (await getProductsAxios()).data.products);
    }

    updaterProducts();
  }, []);

  async function updateProducts() {
    setProducts((await getProductsAxios()).data.products)
  }

  async function deleteProducts(_token, _id) {
    const deleted = await deleteProductAxios(_token, _id);
    await updateProducts();
  }

  function setMainUser(userObj) {
    setUser(userObj);
  }

  function setMainToken(token) {
    setToken(token);
  }

  return (
    <AppContext.Provider
      value={{
        products,
        updateProducts,
        deleteProducts,
        user,
        setMainUser,
        token,
        setMainToken,
        isAdmin,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
