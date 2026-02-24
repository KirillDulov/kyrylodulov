import { useState } from "react";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, description, image, category }),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.message || "Помилка при додаванні продукту");
        } else {
            alert("Продукт додано успішно!");
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Додати продукт</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Завантаження..." : "Додати продукт"}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AddProductForm;