const BASE_URL = "http://localhost:5000/api/products";

export const fetchProductsApi = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const addProductApi = async (product) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error("Не вдалося додати продукт");
  return response.json();
};

export const deleteProductApi = async (id) => {
  const response = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Не вдалося видалити продукт");
  return response.json();
};

export const updateProductApi = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Не вдалося оновити продукт");
  }
  return response.json();
};
