import React from "react";

const SearchedItems = ({ item, selectProduct }) => {
  return (
    
      <ul className="overflow-y-scroll">
        <li
          className="hover:bg-gray-300 rounded hover:p-1 cursor-pointer"
          onClick={() => selectProduct(item)}
        >
          {item.productNameWithGradeAndCategory }  <span className="bg-red-800 text-white rounded px-2 py-1 font-medium italic">{item.stock} Kg </span>
        </li>
      </ul>
  
  );
};

export default SearchedItems;
