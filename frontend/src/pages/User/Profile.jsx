import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        setFirstname(userInfo.firstname);
        setLastname(userInfo.lastname);
        setPhoneNumber(userInfo.phoneNumber);
        setAddress(userInfo.address);
        setEmail(userInfo.email);
    }, [userInfo]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                firstname,
                lastname,
                phoneNumber,
                address,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-10">
            <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter Phone Number"
                                className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                className="form-input p-4 rounded-sm w-full border-gray-300 focus:border-pink-500"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                            >
                                Update
                            </button>
                            <Link
                                to="/user-orders"
                                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                            >
                                My Orders
                            </Link>
                        </div>
                        {loadingUpdateProfile && <Loader />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
