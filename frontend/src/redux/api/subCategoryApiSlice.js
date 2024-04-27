import { apiSlice } from "./apiSlice";
import { SUBCATEGORY_URL } from "../constants"; // Assuming you have a constants file defining your API URLs

export const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: `${SUBCATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getSubCategories: builder.query({
      query: () => ({
        url: `${SUBCATEGORY_URL}`,
      }),
      providesTags: ["SubCategory"],
      keepUnusedDataFor: 5,
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `${SUBCATEGORY_URL}/${subCategoryId}`,
        method: "DELETE",
      }),
    }),
    updateSubCategory: builder.mutation({
      query: (data) => ({
        url: `${SUBCATEGORY_URL}/${data.subCategoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoryApiSlice;
