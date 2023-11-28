import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '@/supabase'

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ff1, setFF1] = useState('');
    const [ff2, setFF2] = useState('');
    const [ff3, setFF3] = useState('');
    const [ff4, setFF4] = useState('');
    const [ff5, setFF5] = useState('');
    const [userRole, setRole] = useState('Client');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit called');
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({   
                email: email,
                password: password,
                options: {
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        funfact1: ff1,
                        funfact2: ff2,
                        funfact3: ff3,
                        funfact4: ff4,
                        funfact5: ff5,
                        role: userRole,
                    }
                }         
             });
            if(error) { // didnt sign up successfully
                setError('Sign up failed. Please check your email and password.');
                console.log('Sign up failed:', error);
            } else {    // signed up successfully
                console.log('Sign up successful:', data);
                navigate('/')
                // const userId = data?.user?.id; // Obtain the user's ID

                // if (!userId) {
                //     throw new Error('No user ID returned from Supabase');
                // }

                // try {
                //     const { data, error } = await supabase
                //         .from('profile')
                //         .select('role')
                //         .eq('id', userId)
                //         .single()

                //     if (error) {
                //         console.log('error', error)
                //     }

                //     const user = data?.role;
                //     console.log('Sign up successful');

                //     if(user === 'admin') {
                //         navigate('/admin');
                //     } else { navigate('/client'); }

                // } catch (error) {
                //     console.log('error', error)
                // }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='card bg-primary'>
            <div className="mx-0 mx-sm-auto card-body">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" style={{ fill: '#ff6600' }} className="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354l-1.5 1.5ZM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A23.825 23.825 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a8.827 8.827 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3Z"/>
                            </svg>
                            <p>
                                <strong>Sign Up Form</strong>
                            </p>
                            <hr />
                            <form className="px-4" action="" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="First name" 
                                            aria-label="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Last name" 
                                            aria-label="Last name" 
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 py-4">
                                    <div className="col">
                                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="inputEmail4"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="inputPassword4"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
    
                                <hr />

                                <div className="row g-3 py-4">
                                    <div className="col">
                                        <label htmlFor="roleSelect" className="form-label">Select Role</label>
                                        <select
                                            id="roleSelect"
                                            className="form-select"
                                            value={userRole}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="client">Client</option>
                                        </select>
                                    </div>
                                </div>
    
                                <p>
                                    Answer questions based on the most accurate description 
                                    of yourself!
                                </p>
    
                                <hr />
    
                                <p className="text-center"><strong>Fun Fact 1:</strong></p>
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Answer" 
                                        aria-label="First name"
                                        value={ff1}
                                        onChange={(e) => setFF1(e.target.value)} 
                                    />
                                </div>
    
                                <hr />
                                <p className="text-center"><strong>Fun Fact 2:</strong></p>
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Answer" 
                                        aria-label="First name"
                                        value={ff2}
                                        onChange={(e) => setFF2(e.target.value)} 
                                    />
                                </div>
    
                                <hr />
    
                                <p className="text-center"><strong>Fun Fact 3:</strong></p>
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Answer" 
                                        aria-label="First name" 
                                        value={ff3}
                                        onChange={(e) => setFF3(e.target.value)}
                                    />
                                </div>
    
                                <hr />
    
                                <p className="text-center"><strong>Fun Fact 4:</strong></p>
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Answer" 
                                        aria-label="First name" 
                                        value={ff4}
                                        onChange={(e) => setFF4(e.target.value)}
                                    />                        
                                </div>
    
                                <hr />
    
                                <p className="text-center"><strong>Fun Fact 5:</strong></p>
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Answer" 
                                        aria-label="First name" 
                                        value={ff5}
                                        onChange={(e) => setFF5(e.target.value)}
                                    />
                                </div>
    
                                <hr />
    
                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}
    
                                <footer className="text-end">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </footer>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Signup;