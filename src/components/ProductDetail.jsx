import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { productService } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Đang tải sản phẩm...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-6">Sản phẩm này có thể đã bị xóa hoặc không tồn tại</p>
          <Link to="/products" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
            ← Quay lại Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + change)));
  };

  const handleAddToCart = () => {
    actions.addToCart(product.id, quantity, product.price);
    alert(`✅ Đã thêm ${quantity} ${product.title} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    actions.addToCart(product.id, quantity, product.price);
    navigate('/cart');
  };

  const allImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Trang chủ</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">Sản phẩm</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
              <img 
                src={allImages[selectedImage]} 
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-24 object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Brand Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {product.brand}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl text-yellow-500 mr-2">⭐</span>
                  <span className="text-xl font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">{product.stock} có sẵn</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">Đã bán: {product.minimumOrderQuantity || 100}+</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg font-bold">
                      -{product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Còn hàng - Sẵn sàng giao</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Hết hàng</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Số lượng:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-700"
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center py-2 border-0 focus:outline-none font-semibold"
                      min="1" 
                      max={product.stock} 
                    />
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Còn lại: {product.stock} sản phẩm</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  🛒 Thêm vào giỏ hàng
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  ⚡ Mua ngay
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-gray-600 font-semibold">Giao hàng nhanh</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">✅</div>
                  <p className="text-xs text-gray-600 font-semibold">Chính hãng 100%</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🔄</div>
                  <p className="text-xs text-gray-600 font-semibold">Đổi trả 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button 
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === 'specifications' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                📋 Thông số kỹ thuật
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === 'reviews' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                ⭐ Đánh giá
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === 'shipping' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('shipping')}
              >
                🚚 Vận chuyển & Đổi trả
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-700">Thương hiệu:</span>
                    <span className="ml-2 text-gray-900">{product.brand}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-700">Danh mục:</span>
                    <span className="ml-2 text-gray-900">{product.category}</span>
                  </div>
                  {product.weight && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <span className="font-semibold text-gray-700">Khối lượng:</span>
                      <span className="ml-2 text-gray-900">{product.weight}g</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <span className="font-semibold text-gray-700">Kích thước:</span>
                      <span className="ml-2 text-gray-900">
                        {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                      </span>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-700">SKU:</span>
                    <span className="ml-2 text-gray-900">{product.sku}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-700">Bảo hành:</span>
                    <span className="ml-2 text-gray-900">{product.warrantyInformation || '12 tháng'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá khách hàng</h3>
                
                {/* Rating Summary */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 mb-8 text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{product.rating}</div>
                  <div className="text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-600">Dựa trên đánh giá của khách hàng</p>
                </div>

                {/* Reviews List */}
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {review.reviewerName[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 font-bold mr-1">{review.rating}</span>
                            <span className="text-yellow-500">⭐</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-gray-600">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Chính sách vận chuyển & đổi trả</h3>
                
                <div className="space-y-6">
                  {/* Shipping Policy */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                      <span className="mr-2">🚚</span> Vận chuyển
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Miễn phí vận chuyển cho đơn hàng trên $100</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Giao hàng nhanh trong 2-3 ngày làm việc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Đóng gói cẩn thận, bảo vệ sản phẩm tốt nhất</span>
                      </li>
                    </ul>
                  </div>

                  {/* Return Policy */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
                      <span className="mr-2">🔄</span> Đổi trả
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Đổi trả miễn phí trong vòng 30 ngày</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Sản phẩm phải còn nguyên tem, hộp, chưa qua sử dụng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Hoàn tiền 100% nếu sản phẩm lỗi từ nhà sản xuất</span>
                      </li>
                    </ul>
                  </div>

                  {/* Warranty */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-purple-900 mb-3 flex items-center">
                      <span className="mr-2">🛡️</span> Bảo hành
                    </h4>
                    <p className="text-gray-700">
                      {product.warrantyInformation || 'Bảo hành chính hãng 12 tháng tại tất cả các trung tâm bảo hành toàn quốc.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;