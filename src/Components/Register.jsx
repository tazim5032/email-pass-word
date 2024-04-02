import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../firebase.config";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        //reset error
        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one upper case letter');
            return;
        }
        else if (!accepted) {
            setRegisterError('Please Accept Our Terms and Conditions.');
            return;
        }


        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setSuccess('Registration Successfull!!')

                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() =>{
                    console.log('Profile Updated!')
                })
                .catch(error =>{
                    console.log(error);
                })
                //verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        // Email verification sent!
                        alert('Please check your email and verify your account!')
                    });

            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }
    return (
        <div className="">
            <div className="mx-auto bg-yellow-100 md:w-1/2 rounded-2xl">
                <h1 className="text-3xl text-center text-green-500 pt-2">Please Register</h1>
                <form onSubmit={handleRegister}
                    className="p-4 text-center">

                    <input className="my-2 p-2 w-3/4" type="text" name="name" placeholder="Your Name" id="" required />
                    <br />
                    
                    <input className="my-2 p-2 w-3/4" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />


                    <div className="relative">
                        <input className="p-2 w-3/4"

                            type={showPassword ? "text" : "password"}

                            name="password"
                            placeholder="Password" id=""

                            required />

                        <span className="absolute top-1/3 right-24 ml-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <IoEyeOffSharp /> : <IoEye />
                            }
                        </span>
                    </div>


                    <br />

                    <div className="">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept Our <a href="">Terms and Conditions</a> </label>
                    </div>

                    <br />
                    <input className="btn btn-secondary my-2 p-2 rounded-xl w-3/4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
                <div className="flex justify-center">
                    <p>Already have an account? Please <Link className="text-green-500" to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;