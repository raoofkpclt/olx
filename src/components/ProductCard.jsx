import {Heart} from "lucide-react"
import {ViewContext} from "../context/ViewContext"
import {useContext} from "react"
import {useNavigate} from "react-router-dom"

export const ProductCard = ({product}) => {
  const viewContext = useContext(ViewContext)
  const navigate = useNavigate()
  
  if (!viewContext) return
  const { setView } = viewContext

  const viewClick = () => {
    setView(product)
    navigate(`product/view/${product.id}`)
  };
  return (
    <div
      onClick={viewClick}
      className="bg-white border rounded hover:shadow-md cursor-pointer relative"
    >
      <div className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
        FEATURED
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title || "Product"}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-3">
        <div className="text-xl font-bold">
          ₹ {product.price ? product.price.toLocaleString() : "N/A"}
        </div>
        <h3 className="text-sm font-semibold mt-1 line-clamp-2">
          {product.title || "No Title"}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
        )}
        <div className="flex justify-between items-center mt-2">
          {<span className="text-xs text-gray-500">Nill</span>}
          {product.date && (
            <span className="text-xs text-gray-500">{product.date}</span>
          )}
        </div>
      </div>
    </div>
  )
}
