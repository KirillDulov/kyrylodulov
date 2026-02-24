import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductApi } from "../../services/fakeApi";
import { fetchProducts } from "../../features/products/productsThunks";
import "./AddProductPage.css";

export default function AddProductPage() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [isSale, setIsSale] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await addProductApi({
                name,
                price: Number(price),
                description,
                image,
                isNew,
                isSale
            });

            dispatch(fetchProducts());

            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setIsNew(false);
            setIsSale(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Додати продукт</h2>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Назва"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Ціна"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL картинки"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                    />{" "}
                    Новинка
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={isSale}
                        onChange={(e) => setIsSale(e.target.checked)}
                    />{" "}
                    Знижка
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Додаємо..." : "Додати продукт"}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}