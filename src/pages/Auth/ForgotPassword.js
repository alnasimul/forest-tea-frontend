import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../helpers/loginManager';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const onSubmit = data => {
        resetPassword(data.email)
        .then(data => {
            setMessage(data)
        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '150px'}}>
                <div className="col-md-4 rounded shadow p-5" >
                    <Link to='/login'>
                        <button className="text-indigo-400 hover:text-indigo-500"> {`<<<`} Go back to login</button>
                        <br />
                    </Link>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="" className='my-2'> <strong>Email</strong> </label>
                            <input className='form-control' placeholder='Please enter your email to reset password' required {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                            {errors.email && <span className="text-danger">This field is required and try again with valid email address.</span>}
                        </div>
                        <div className="form-group mt-2">
                            <input type="submit" value={`Send`} className="bg-black text-white font-bold p-2 rounded" />
                        </div>
                    </form>
                    { message && <p className='text-green-700 mt-3'> {message} </p>}
                </div>
               
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;