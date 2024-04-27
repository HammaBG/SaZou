import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import jewelryImage from "../../assets/jewelry1.jpg";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({ firstname, lastname, email, password, phoneNumber, address }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success("User successfully registered");
            } catch (err) {
                console.log(err);
                toast.error(err.data.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <div className="md:w-1/2 mr-8">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800">Register</h1>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                    placeholder="Enter First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                    placeholder="Enter Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                id="address"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded-full w-full transition duration-300 hover:bg-pink-600"
                        >
                            {isLoading ? <Loader /> : "Register"}
                        </button>
                    </form>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            Already have an account?{" "}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                className="text-pink-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src={jewelryImage}
                        alt="Jewelry"
                        className="h-auto w-full object-cover rounded-lg shadow-md border border-gray-200"
                    />
                </div>
            </section>
        </div>
    );
};

export default Register;
