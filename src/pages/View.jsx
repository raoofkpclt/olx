import React, { useContext, useState } from "react";
import {Heart,Share2,Phone,MapPin,Shield,Flag,ChevronLeft,ChevronRight} from "lucide-react";
import { ViewContext } from "../context/ViewContext";
import Navbar from "../components/Nav";

const ProductView = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const viewContext = useContext(ViewContext);
  
  if (!viewContext || !viewContext.view) {
    return <p>No product data found!</p>;
  }
  const { view } = viewContext;

  const product = {
    title: view.title,
    price: `₹ ${view.price}`,
    location: "EAST HILL, KOZHIKODE",
    postedDate: "Today",
    images: view.images,
    seller: view.seller || {
      name: "Unknown",
      memberSince: "N/A",
      listings: 0,
    },
    description: view.description || "No description available",
    details: view.moreInfo || {},
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-4">
                <div className="relative aspect-video">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {product.price}
                    </h1>
                    <p className="text-gray-600 mt-1">{product.title}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Share2 size={24} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Heart size={24} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {product.location}
                  </div>
                  <div>{product.postedDate}</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Seller Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold">
                        {product.seller.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.seller.name}</h3>
                      <p className="text-sm text-gray-600">
                        Member since {product.seller.memberSince}
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-800 flex items-center justify-center gap-2">
                    <Phone size={20} />
                    Show Phone Number
                  </button>
                  <button className="w-full py-3 px-4 border border-teal-700 text-teal-700 rounded-md hover:bg-teal-50">
                    Chat with Seller
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={20} className="text-teal-700" />
                  <h2 className="text-lg font-semibold">Safety Tips</h2>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Meet in a safe & public place</li>
                  <li>• Check the item before buying</li>
                  <li>• Pay only after collecting item</li>
                </ul>
                <button className="mt-4 text-teal-700 text-sm flex items-center gap-1">
                  <Flag size={16} />
                  Report this ad
                </button>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
