import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AppContext } from "../context/AppContext";
import ProductCard from "./products/ProductCard";
import { ProductForm } from "./products/ProductForm";
import "../styles/products.css";

export function Products() {
  let { products } = useContext(AppContext);
  let user = JSON.parse(sessionStorage.getItem("user"));


  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="This Page is an example of simple CRUD"
        />
      </Helmet>
      <div className="products">
        {user ? (
          user.roles
            .map((role) => role.name === "admin")
            .filter((role) => role)[0] ? (
            <ProductForm addProduct={true} updateProduct={false} id={null} />
          ) : null
        ) : null}

        <div className="products-list">
          {products.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      </div>
    </>
  );
}
