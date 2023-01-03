import { Link } from "react-router-dom";
import { DeleteButton } from "./admin/DeleteButton";

function ProductCard(props) {
  const { _id, name, category, price, imageURL, createdAt } = props.item;
  const user = JSON.parse(sessionStorage.getItem("user"));
  

  return (
    <div className="product card p-2">
      <img src={imageURL} alt={category} />
      <h3>
        {name}
      </h3>
      <span>category: {category}</span>
      <p>{price}</p>
      <div className="buttons">
        {/* {isAdmin ? <DeleteButton id={_id} /> : null} */}
        {user
          ? user.roles
              .map((role) => role.name === "admin")
              .filter((role) => role)[0]
            ? <DeleteButton id={_id}/>
            : null
          : null}
      </div>
    </div>
  );
}

export default ProductCard;
