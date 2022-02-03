import React from "react";

const Categories = ({ categories, filterItems }) => {
    return (
        <div className="btn-container">
            <button
                className="filter-btn"
                onClick={() => filterItems("all")}
            ></button>
            {categories &&
                categories.length > 0 &&
                categories.map((category, index) => {
                    return (
                        <button
                            key={index}
                            className="filter-btn"
                            onClick={() => filterItems(category)}
                        >
                            {category}
                        </button>
                    );
                })}
        </div>
    );
};

export default Categories;
