import React, { useState } from 'react';
import axios from 'axios';
function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        // Perform signup logic here with form data
        // For demonstration purposes, you can console log the form data
        const formData = {
            name : name.toLowerCase(),
            email : email.toLowerCase(),
            phoneNumber : phone.toLowerCase(),
            password : password,
            gender : gender.toLowerCase()
        };
        console.log("Sign up form data:", formData);
        axios.post("https://mindwellnesspro.onrender.com/register" ,formData ).then(res=>{
            alert(res.data.message);
        }).catch(err=>{
            alert("user cannot be added");
        })
        // Reset form fields after signup
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        alert('Signup successful!');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("https://mindwellnesspro.onrender.com/login", {
            email: email.toLowerCase(),
            password: password
          });
      
          if (response.status === 200) {
            sessionStorage.setItem('auth', true);
            sessionStorage.setItem("user" , response.data.admin.name);
            sessionStorage.setItem("adminID" , response.data.admin._id);
            sessionStorage.setItem("superAdmin" , response.data.admin.superAdmin);
            window.location.href = '/admin';
            alert(response.data.message);
          } else if (response.status === 401) {
            alert("Invalid password");
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              alert("Invalid password");
            } else {
              alert("User doesn't have authorization to log in as admin");
            }
          } else {
            console.error('Login failed:', error);
            alert("Something went wrong during login");
          }
        }
      };
      
    const handleFormSubmit = isSignUp ? handleSignUp : handleLogin;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="  lg:w-96 md:w-96 sm:w-96 p-6 bg-white rounded-lg shadow-xl" onSubmit={handleFormSubmit}>
                {isSignUp && (
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* Phone Number */}
                {isSignUp &&  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>}
                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* Confirm Password */}
                {isSignUp && (
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}
                {/* Gender */}
                {isSignUp && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <div className="mt-2">
                            <div>
                                <label htmlFor="male" className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        id="male"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <span className="ml-2">Male</span>
                                </label>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="female" className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>
                <p className="mt-4 text-sm">
                    {isSignUp ? 'Already a member? ' : 'Not a member? '}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Login' : 'Signup'}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
