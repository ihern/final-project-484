// import React, { useState } from 'react';
// import React from 'react';
// import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { supabase } from './lib/supabaseClient';


const PersonalSurvey = () => {

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
                <form action="">
                    <div className="row g-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                        </div>
                    </div>
                    <div className="row g-3 py-4">
                        <div className="col">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4"/>
                        </div>
                        <div className="col">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4"/>
                        </div>
                    </div>
                </form>
                <hr />
                <p>
                    Answer questions based on the most accurate description 
                    of yourself!
                </p>
                </div>

                <hr />

                <form className="px-4" action="">
                    <p className="text-center"><strong>Fun Fact 1:</strong></p>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" aria-label="First name" />
                    </div>

                    <hr />
                    <p className="text-center"><strong>Fun Fact 2:</strong></p>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" aria-label="First name" />
                    </div>

                    <hr />

                    <p className="text-center"><strong>Fun Fact 3:</strong></p>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" aria-label="First name" />
                    </div>

                    <hr />

                    <p className="text-center"><strong>Fun Fact 4:</strong></p>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" aria-label="First name" />
                    </div>

                    <hr />

                    <p className="text-center"><strong>Fun Fact 5:</strong></p>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Answer" aria-label="First name" />
                    </div>

                </form>
            </div>
            <div className="card-footer text-end">
                <button type="button" className="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
    </div>
  );
};

export default PersonalSurvey;