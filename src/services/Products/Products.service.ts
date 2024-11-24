import { fakeStoreApi } from "../api";

export const getAllProducts = async (
  limit = 15,
  sort = "asc",
  categories = []
) => {
  try {
    let response;

    if (categories.length > 0) {
      //Fake Store Api Doesn't Support Multiple Categories Feature at single call, Therefore, calling api for all categories.
      const promises = categories.map((category: any) =>
        fakeStoreApi.get(
          `/products/category/${category.value}?limit=${limit}&sort=${sort}`
        )
      );
      const responses = await Promise.all(promises);
      const allProducts = responses.flatMap((response) => response.data);

      return allProducts;
    } else {
      response = await fakeStoreApi.get(
        `/products?limit=${limit}&sort=${sort}`
      );
    }

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching all products", error);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    if (!id) return null;
    const response = await fakeStoreApi.get(`/products/${id}`);

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product", error);
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fakeStoreApi.get(`/products/categories`);

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching all categories", error);
    return null;
  }
};
