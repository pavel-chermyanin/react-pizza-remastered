import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={index === value ? "active" : ""}
              onClick={() => onClickCategory(index)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
