import React from 'react';
import { toast } from 'react-toastify';
import forestTeaApi from '../../../helpers/forestTeaApi';
import TableData from './TableData/TableData';
import './StocksTable.css';

const StocksTable = ({stocks}) => {
    const deleteStock = id => {
        forestTeaApi.delete(`/deleteStock/${id}`)
        .then( res => {
            if(res.data){
                toast('This item successfully delete from database')
                setTimeout(() => {
                    window.location.reload()
                },1000)
            }
        })
    }
    return (
        <>
            { stocks.length > 0 ?
                 <table className='stocksTable table-auto border-b-0 border-t  border-x border-gray-300 text-sm text-gray-600 rounded'>
                 <thead className='bg-gray-200'>
                     <tr>
                         <th className='px-6'>Serial</th>
                         <th className='px-6'>Date</th>
                         <th className='px-6'>Name</th>
                         <th className='px-6'>Grade</th>
                         <th className='px-6'>Category</th>
                         <th className='px-6'>Selling (Unit Price)</th>
                         <th className='px-6'>Buying (Unit Price)</th>
                         <th className='px-6'>Available Stocks</th>
                         <th className='px-6'>Grand Total</th>
                         <th className='px-6'>Paid</th>
                         <th className='px-6'>Due</th>
                         <th className='px-6'>Actions</th>
                     </tr>
                 </thead>
                 <tbody className='text-md font-bold'>
                     {
                         stocks.map((stockItem, index) => <TableData key={stockItem._id} stockItem={stockItem} index={index} deleteStock={deleteStock}/>)
                     }
                 </tbody>
             </table>
             : (
                <h2 className="text-2xl text-center my-20 text-red-600 italic ">
                      No records found
                </h2>
              )
            }
        </>
    );
};

export default StocksTable;