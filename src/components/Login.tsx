import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/loginStyle.css';
import { supabase } from "@/supabase";

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/client/dashboard`,
              },
          })

          if(!error) {
                console.log("HERE", location.origin)
                console.log('Login successful: ', data);
          } else {
                setError('Login failed. Please check your email and password.');
                console.error('Login failed: ', error);
          }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: user_data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if(error) { // didnt log in
                setError('Login failed. Please check your email and password.');
                console.log('Login failed: ', error);
            } else {    // logged in
                console.log(user_data.user.id);
                const { data, error } = await supabase
                    .from('profile')
                    .select('role')
                    .eq('id', user_data.user.id);
                if(error) {
                    console.log('Error getting profile data: ', error);
                }
                else {
                    console.log('queried data', data[0].role);
                    if(data[0].role === 'client') {
                        navigate('/client/dashboard');
                    }
                    else if(data[0].role === 'admin') {
                        navigate('/admin/dashboard');
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <div className='bg-secondary-subtle d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <div className='p-5'>
            <h1 className='logoFont'>Media Naranja Speed Dating</h1>
            <h3>A refreshing way of meeting people</h3>
            <button onClick={handleGoogleSignIn} className="btn btn-primary m-2 align-items-center">Sign in with Google</button>
        </div>



        <form className='shadow rounded-2' onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Type Here" 
                    aria-label="Email" 
                    aria-describedby="basic-addon1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Type Here" 
                    aria-label="Email" 
                    aria-describedby="basic-addon1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
            <div className='d-flex flex-column'>
                <button type="submit" className="btn btn-primary m-2">Login</button>
                <hr className="hr hr-blurry" />
                <Link to="/signup" className="btn btn-success m-2">Create new account</Link>
            </div>
        </form>
        <footer className="mt-auto">
            <button>
                <Link to="/mvp">Checkpoint 1 MVP</Link>
            </button>
        </footer>
    </div>
  );
};

export default Login;