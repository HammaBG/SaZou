import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import jewelryImage from "../../assets/jewelry1.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
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
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <div className="md:w-1/2 mr-8">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome Back!</h1>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-pink-500"
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded-full w-full transition duration-300 hover:bg-pink-600"
                        >
                            {isLoading ? <Loader /> : "Sign In"}
                        </button>
                    </form>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            New Customer?{" "}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                className="text-pink-500 hover:underline"
                            >
                                Register Now
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

export default Login;
