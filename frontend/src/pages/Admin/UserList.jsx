import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

const Userlist = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableFirstname, setEditableFirstname] = useState("");
    const [editableLastname, setEditableLastname] = useState("");
    const [editableAddress, setEditableAddress] = useState("");
    const [editablePhone, setEditablePhone] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");


    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure")) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    const toggleEdit = (id, firstname, lastname,email,phoneNumber,address) => {
        setEditableUserId(id);
        setEditableFirstname(firstname);
        setEditableLastname(lastname);
        setEditableUserEmail(email);
        setEditablePhone(phoneNumber);
        setEditableAddress(address);
    };

    const updateHandler = async (id) => {
        try {
          await updateUser({
            userId: id,
            firstname: editableFirstname,
            lastname: editableLastname,
            email: editableUserEmail,
            address: editableAddress,
            phoneNumber : editablePhone,
          });
          setEditableUserId(null);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };







    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    {/* <AdminMenu /> */}
                    <table className="w-full md:w-4/5 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">FIRSTNAME</th>
                                <th className="px-4 py-2 text-left">LASTNAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">PHONE NUMBER</th>
                                <th className="px-4 py-2 text-left">ADDRESS</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableFirstname}
                                                    onChange={(e) => setEditableFirstname(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.firstname}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.firstname, user.lastname , user.email ,user.phoneNumber ,user.address)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableLastname}
                                                    onChange={(e) => setEditableLastname(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.lastname}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.firstname, user.lastname , user.email ,user.phoneNumber ,user.address)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserEmail}
                                                    onChange={(e) => setEditableUserEmail(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.firstname, user.lastname , user.email ,user.phoneNumber ,user.address)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editablePhone}
                                                    onChange={(e) => setEditablePhone(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.phoneNumber}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.firstname, user.lastname , user.email ,user.phoneNumber ,user.address)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableAddress}
                                                    onChange={(e) => setEditableAddress(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.address}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.firstname, user.lastname , user.email ,user.phoneNumber ,user.address)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )
            }
        </div >
    );
};

export default Userlist
