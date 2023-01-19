import { useEffect, useRef, useState } from "react";
import "./App.css";

// const url = "https://dummyjson.com/products/search?q="

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const lastcall = useRef(null);

  // console.log(search);

  // const onSubmit = useCallback((id) => {
  //   fetch(`https://dummyjson.com/products/search?q=${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.products);
  //     });
  // }, []);

  // staleUpdate

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data.products);
        });
    }, 1000);
    return () => clearTimeout(debounce);
  }, [search]);

  console.log(products);
  return (
    <div className="App">
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <p>----------------------------</p>
      {products.length > 0 ? (
        products.map((product) => {
          return <p key={product.id}>{product.title}</p>;
        })
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default App;
