import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import {
    useGetSubCategoriesQuery,
} from  "../../redux/api/subCategoryApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setsubCategory] = useState("");

    const [quantity, setQuantity] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [gender, setGender] = useState(""); // Add state for the 'For' field
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();
    const { data: subcategories } = useGetSubCategoriesQuery();

    console.log(subcategories)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("countInStock", stock);
            // productData.append("For", gender); 
            productData.append("subCategory", subcategory); // Add the 'For' field to the FormData

            const { data } = await createProduct(productData);

            if (data.error) {
                toast.error("Product create failed. Try Again.");
            } else {
                toast.success(`${data.name} is created`);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error("Product create failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>

                    {imageUrl && (
                        <div className="text-center">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="block mx-auto max-h-[200px]"
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : "text-black"}
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="price">Price</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="quantity">Quantity</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="description" className="my-5">
                            Description
                        </label>
                        <textarea
                            type="text"
                            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="stock">Count In Stock</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category</label> <br />
                                <select
                                    placeholder="Choose Category"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {
                                category != ""  && (
                                    <div>
                                    <label htmlFor="category">Sub Category</label> <br />
                                    <select
                                        placeholder="Choose Category"
                                        className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                        value={subcategory}
                                        onChange={(e) => setsub(e.target.value)}
                                    >
                                        <option value="">Select Sub category</option>
                                        {subcategories?.filter((item)=>  item.parentCategory._id === category).map((cc) => (
                                            <option key={cc._id} value={cc._id}>
                                                {cc.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                )
                            }
                       
                        </div>

                        <div>
                            <label htmlFor="gender">For</label> <br />
                            <select
                                placeholder="Choose Gender"
                                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">For</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="couples">Couples</option>
                                <option value="Astrological Sign">Astrological Sign</option>
                            </select>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
