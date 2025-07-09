// FoodCategoryCard.jsx
const FoodCategoryCard = ({ title, description, count }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="count">{count}</div>
  </div>
);

export default FoodCategoryCard;