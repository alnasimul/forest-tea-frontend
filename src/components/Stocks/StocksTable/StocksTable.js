import React from 'react';
import TableData from './TableData/TableData';

const StocksTable = ({stocks}) => {
    return (
        <table className='table-auto border-b-0 border-t  border-x border-gray-300 text-sm text-gray-600 rounded'>
            <thead className='bg-gray-200'>
                <tr>
                    <th className='px-6'>Serial</th>
                    <th className='px-6'>Date</th>
                    <th className='px-6'>Name</th>
                    <th className='px-6'>Category</th>
                    <th className='px-6'>Selling (Unit Price)</th>
                    <th className='px-6'>Available Stocks</th>
                    <th className='px-6'>Buying (Unit Price)</th>
                    <th className='px-6'>Grand Total</th>
                    <th className='px-6'>Paid</th>
                    <th className='px-6'>Due</th>
                    <th className='px-6'>Actions</th>
                </tr>
            </thead>
            <tbody className='text-md font-bold'>
                {
                    stocks.map((stockItem, index) => <TableData key={stockItem.id} stockItem={stockItem} index={index}/>)
                }
            </tbody>
        </table>
    );
};

export default StocksTable;