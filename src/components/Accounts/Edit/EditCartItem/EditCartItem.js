/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const EditCartItem = ({ item, getModifiedItem }) => {
  const [modifyItem, setModifyItem] = useState({
    item: item.item,
    itemQuantity: item.itemQuantity,
    itemUnitPrice: item.itemUnitPrice,
    itemDiscount: item.itemDiscount,
    total: parseInt(item.total),
  });

  useEffect(()=> getModifiedItem(modifyItem), [modifyItem])

  const handleUpdateChange = (e) => {
    e.preventDefault();

    const editItem = { ...modifyItem };

    if (e.target.name === "updateItem") {
      editItem.item = e.target.value;
    } else if (e.target.name === "updateQuantity") {
      editItem.itemQuantity = e.target.value;
    } else if (e.target.name === "updateUnitPrice") {
      editItem.itemUnitPrice = e.target.value;
    } else if (e.target.name === "updateDiscount") {
      editItem.itemDiscount = e.target.value;
    } else if (e.target.name === "updateTotal") {
      editItem.total = e.target.value;
    }

    console.log(editItem);

    setModifyItem(editItem);
  };


  console.log(modifyItem);

  return (
    <div>
      <div className="w-full flex flex-wrap">
        <div className="w-1/3 mr-.5 mt-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={modifyItem.item}
            name={`updateItem`}
            onChange={(e) => handleUpdateChange(e)}
            className="p-1 border border-gray-200 rounded mb-3"
          />
        </div>

        <div className="w-1/3 mr-.5 mt-2">
          <label htmlFor="">Quantity</label>
          <input
            type="text"
            value={modifyItem.itemQuantity}
            name={`updateQuantity`}
            onChange={(e) => handleUpdateChange(e)}
            className="p-1  border border-gray-200 rounded mb-3"
          />
        </div>
        <div className="w-1/3 mr-.5 mt-2">
          <label htmlFor="">Unit Price</label>
          <input
            type="text"
            value={modifyItem.itemUnitPrice}
            name={`updateUnitPrice`}
            onChange={(e) => handleUpdateChange(e)}
            className="p-1 border border-gray-200 rounded mb-3"
          />
        </div>
        <div className="w-1/3 mr-.5">
          <label htmlFor="">Discount %</label>
          <input
            type="text"
            value={modifyItem.itemDiscount}
            name={`updateDiscount`}
            onChange={(e) => handleUpdateChange(e)}
            className="p-1 border border-gray-200 rounded mb-3"
          />
        </div>
        <div className="w-1/3 mr-.5">
          <label htmlFor="">Total</label>
          <input
            type="text"
            value={
              modifyItem.itemDiscount > 0
                ? modifyItem.itemQuantity * modifyItem.itemUnitPrice -
                  (modifyItem.itemQuantity *
                    modifyItem.itemUnitPrice *
                    modifyItem.itemDiscount) /
                    100
                : modifyItem.itemQuantity * modifyItem.itemUnitPrice
            }
            name={`updateTotal`}
            className="p-1 border border-gray-200 rounded mb-3"
          />
        </div>
      </div>
    </div>
  );
};

export default EditCartItem;
