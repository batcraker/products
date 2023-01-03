import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";




export function DeleteButton({ id }) {
  const { deleteProducts } = useContext(AppContext);
  let token = sessionStorage.getItem("token")


  

  return (
    <button className="btn btn-danger" onClick={async ()=> await deleteProducts(token, id)}>
      Delete Product
    </button>
  );
}
