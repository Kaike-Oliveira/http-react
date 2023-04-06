// CSS
import './App.css';

// React
import { useState, useEffect } from "react";

// Coleta a url na qual fara o fetch
const url = "http://localhost:3000/products";

function App() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// 1 - restoring data
    const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchData();
    }, []);


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// 2 - add products
const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
        name,
        price,
    };

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    });


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// 3 - dynamic loading
    const addedProduct = await res.json();

    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    setName("");
    setPrice("");

};

    return (
        <div className="App">
          <h1>Lista de Produtos</h1>
            <ul className="list">
                {products.map((product) => (
                    <li key={product.id}>{product.name} - R${product.price}</li>
                ))}
            </ul>
            <div className="add-product">
                <form onSubmit={handleSubmit}>
                    <label className="name-input">
                        Nome:
                        <input
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className="price-input">
                        Preço:
                        <input
                            type="number"
                            value={price}
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <input
                        type="submit"
                        value="Adicionar"
                    />
                </form>
            </div>
        </div>
    );
}

export default App;
