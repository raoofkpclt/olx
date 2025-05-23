import React, { useContext, useState } from 'react';
import { ChevronLeft, Upload } from 'lucide-react';
import { uploadProduct } from '../services/firebaseService';
import { UserContext } from '../context/UserContext';
import { categories } from '../data/categories';
import { categoryFields } from '../data/categoryFields';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    date: '',
    category: '',
    moreInfo: {},
  });
  const [loading, setLoading] = useState(false);
  const  userContext = useContext(UserContext);
  
  if(!userContext) return;

  const {user} = userContext;

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleDynamicChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      moreInfo: { ...(prev.moreInfo || {}), [fieldId]: value },
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 4) {
      alert('Maximum 4 images allowed');
      return;
    }
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      console.log('Form Data:', formData);
      await uploadProduct(formData, images, user);
      console.log('Images:', images);
      navigate('/');
    } catch (err) {
      console.log('Error uploading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            value={formData.moreInfo[field.id] || ''}
            onChange={(e) => handleDynamicChange(field.id, e.target.value)}
            className="w-full p-3 border rounded outline-none focus:border-teal-900"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'buttons':
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleDynamicChange(field.id, option)}
                className={`px-4 py-2 rounded border ${
                  formData.moreInfo[field.id] === option
                    ? 'border-teal-900 text-teal-900'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      default:
        return (
          <input
            type="text"
            value={formData.moreInfo[field.id] || ''}
            onChange={(e) => handleDynamicChange(field.id, e.target.value)}
            className="w-full p-3 border rounded outline-none focus:border-teal-900"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button type="button" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-teal-900">POST YOUR AD</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">AD DETAILS</h2>
          <div className="mb-4">
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full p-3 border rounded outline-none focus:border-teal-900"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">SELECT CATEGORY</h2>
          <select
            value={formData.category || ''}
            onChange={(e) => {
              const selected = e.target.value;
              handleChange('category', selected);
              setSelectedCategory(selected);
            }}
            className="w-full p-3 border rounded outline-none focus:border-teal-900"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">MORE INFORMATION</h2>
            {categoryFields[selectedCategory].map((field) => (
              <div key={field.id} className="mb-6">
                <label className="block text-sm mb-2">{field.label}</label>
                {renderDynamicField(field)}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">UPLOAD IMAGES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4"
                >
                  {images[index] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload up to 4 images</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full py-3 rounded-lg transition-colors ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-teal-900 hover:bg-teal-800 text-white'
          }`}
        >
          {loading ? 'Loading...' : 'Post Ad'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
