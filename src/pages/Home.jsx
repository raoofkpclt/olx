import Navbar from "../components/Nav";
import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../services/firebaseService";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Footer from '../components/Footer/Footer'

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }finally{
        setLoader(false)
      }
    };
    fetchProducts();
  }, []);

  if (!searchContext) return;
  const { searchQuery } = searchContext;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loader && (
          <div className="flex justify-center items-center h-150">
            <p>Loading...</p>
          </div>
        )}
        {!loader && (
          <>
            {filteredProducts.length!==0&&(
             <h2 className="text-2xl font-bold mb-4">Fresh recommendations</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts &&
                filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              {filteredProducts.length===0 && (
                <div className="w-320 h-150 flex justify-center items-center" >
                  <p>No Products found!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductGrid;