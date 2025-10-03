import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
// Header is provided by Layout

const Products = () => {
  const { state, actions } = useApp();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  useEffect(() => {
    if (state.products.length === 0) {
      actions.loadProducts();
    }
  }, [actions, state.products.length]);

  useEffect(() => {
    let filtered = state.products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.brand === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(term) ||
        p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(filtered);
  }, [state.products, selectedCategory, searchTerm]);

  const categories = ['all', ...new Set(state.products.map(p => p.brand))];

  const handleAddToCart = (product) => {
    actions.addToCart(product.id, 1, product.price);
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50">
  {/* Header is rendered by Layout */}
        <main className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-xl text-gray-600">Loading products...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
  {/* Header is rendered by Layout */}
      
      <main>
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchTerm ? `Kết quả tìm kiếm: "${searchTerm}"` : 'Products'}
            </h1>
            <nav className="text-sm text-gray-600">
              <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link> 
                <span className="mx-2">&gt;</span>
              <span>Products</span>
            </nav>
            {searchTerm && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    window.history.pushState({}, '', '/products');
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  ← Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchTerm && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  🔍 Tìm thấy <span className="font-bold">{filteredProducts.length}</span> sản phẩm cho "{searchTerm}"
                </p>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    <p className="text-2xl font-bold text-green-600 mb-2">${product.price}</p>
                    <p className="text-gray-500 text-sm mb-4">
                      Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock}
                      </span>
                    </p>
                    <div className="space-y-2">
                      <Link 
                        to={`/products/${product.id}`} 
                        className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center block"
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;