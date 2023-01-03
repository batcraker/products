import axios from "axios";
import config from "../config";

let url = config.HOST

export const getProductsAxios = async () => {
  return await axios.get(`${url}/api/products`);
};

export const getProductByIdAxios = async (id) => {
  return await axios.get(`${url}/api/products/${id}`)
}

export const addProductAxios = async (token, product) => {
  return await axios({
    url:`${url}/api/products`,
    method: "post",
    headers: {
      "x-access-token": token,
    },
    data: product,
  });
};

export const updateProductAxios = async (token, id, product) => {
    return await axios({
        url:`${url}/api/products/${id}`,
        method:'put',
        headers:{
            'x-access-token':token
        },
        data:product
    })
}

export const deleteProductAxios = async (token, id) => {
    return await axios({
        url:`${url}/api/products/${id}`,
        method:'delete',
        headers:{
            'x-access-token':token
        }
    })
}