import { addProductAxios, updateProductAxios } from "../../api/index";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../../styles/form.css";

export function ProductForm({ addProduct, updaterProduct, id }) {
  const { updateProducts } = useContext(AppContext);
  let token = sessionStorage.getItem("token")
  const [error, setError] = useState(null)

  async function handleSubmitProduct(e) {
    e.preventDefault()
    const form = document.querySelector("#form-product")
    const name = document.querySelector("#name").value;
    const category = document.querySelector("#category").value;
    const price = document.querySelector("#price").value;
    const imageURL = document.querySelector("#image").value;
    const productObj = {
      name,
      category,
      price,
      imageURL
    }
    form.reset()

    if(name === "" || price === "" || imageURL === ""){
      setError("You Must Fill All camps");
      return
    }
    
    try {
      if(addProduct){
        const product = await addProductAxios(token, productObj)
        await updateProducts()
      }else if(updaterProduct){
        const product = await updateProductAxios(token, id, productObj)
        
      }

    } catch (err) {
      console.log('Un error ha ocurrido')
    }

  }
  return (
    <div className="form-add-products w-25 content-form">
      <form className="form card p-2 mx-2 w-100" id="form-product" onSubmit={handleSubmitProduct} onChange={()=> setError(null)}>
        {
          error ? <div className="bg-danger p-2 text-white text-center">{error}</div> : null
        }
        <div className="form-group">
          <label htmlFor="name">Name Product</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Name Product"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="Laptop">Laptop</option>
            <option value="Celular">Celular</option>
            <option value="reloj">Smart Watch</option>
            <option value="Teclados">Piano</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            className="form-control"
            placeholder="Image URL"
          />
        </div>
        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
}
