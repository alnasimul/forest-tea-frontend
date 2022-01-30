import React from 'react';

const SearchedItems = ({item, selectProduct}) => {
    return (
        <ul>
           <li className='hover:bg-gray-300 rounded hover:p-1 cursor-pointer' onClick={() => selectProduct(item)}>{item.productNameWithCategory}</li> 
        </ul>
    );
};

export default SearchedItems;