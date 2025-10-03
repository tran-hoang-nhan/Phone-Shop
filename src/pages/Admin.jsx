import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Admin = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('statistics');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Products State
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Orders State
  const [orders, setOrders] = useState([]);
  
  // Statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    monthlyRevenue: 0,
    todayOrders: 0,
    topBrand: '',
    averageOrderValue: 0
  });

  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'Apple',
    category: 'Smartphone',
    price: '',
    description: '',
    stock: '',
    specifications: {
      screen: '',
      os: '',
      camera: '',
      chip: '',
      ram: '',
      storage: '',
      battery: '',
      weight: ''
    }
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchProducts();
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    // Calculate comprehensive stats
    const totalRevenue = orders
      .filter(o => o.isPaid)
      .reduce((sum, order) => sum + order.totalPrice, 0);
    
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    
    // Monthly revenue (current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = orders
      .filter(o => {
        const orderDate = new Date(o.createdAt);
        return o.isPaid && 
               orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear;
      })
      .reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Today's orders
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt).toDateString();
      return orderDate === today;
    }).length;
    
    // Top brand
    const brandCounts = products.reduce((acc, p) => {
      acc[p.brand] = (acc[p.brand] || 0) + 1;
      return acc;
    }, {});
    const topBrand = Object.keys(brandCounts).length > 0
      ? Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';
    
    // Average order value
    const paidOrders = orders.filter(o => o.isPaid);
    const averageOrderValue = paidOrders.length > 0
      ? totalRevenue / paidOrders.length
      : 0;
    
    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      completedOrders,
      lowStockProducts,
      outOfStockProducts,
      monthlyRevenue,
      todayOrders,
      topBrand,
      averageOrderValue
    });
  }, [products, orders]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', productForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage({ type: 'success', text: 'Tạo sản phẩm thành công!' });
      setShowProductForm(false);
      resetProductForm();
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Có lỗi xảy ra' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/products/${editingProduct}`, productForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage({ type: 'success', text: 'Cập nhật sản phẩm thành công!' });
      setEditingProduct(null);
      setShowProductForm(false);
      resetProductForm();
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Có lỗi xảy ra' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage({ type: 'success', text: 'Xóa sản phẩm thành công!' });
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Có lỗi xảy ra' });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product._id);
    setProductForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
      specifications: product.specifications || {
        screen: '',
        os: '',
        camera: '',
        chip: '',
        ram: '',
        storage: '',
        battery: '',
        weight: ''
      }
    });
    setShowProductForm(true);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setMessage({ type: 'success', text: 'Cập nhật trạng thái thành công!' });
      fetchOrders();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Có lỗi xảy ra' });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      brand: 'Apple',
      category: 'Smartphone',
      price: '',
      description: '',
      stock: '',
      specifications: {
        screen: '',
        os: '',
        camera: '',
        chip: '',
        ram: '',
        storage: '',
        battery: '',
        weight: ''
      }
    });
  };

  // Redirect if not admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">👑 Admin Dashboard</h1>
          <p className="text-gray-600">Quản lý sản phẩm, đơn hàng và hệ thống</p>
        </div>

        {/* Stats Cards - Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Tổng sản phẩm</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
                <p className="text-blue-100 text-xs mt-2">
                  {stats.outOfStockProducts > 0 && `${stats.outOfStockProducts} hết hàng`}
                </p>
              </div>
              <div className="text-5xl opacity-20">📦</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Tổng đơn hàng</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
                <p className="text-purple-100 text-xs mt-2">Hôm nay: {stats.todayOrders}</p>
              </div>
              <div className="text-5xl opacity-20">📋</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Tổng doanh thu</p>
                <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(0)}</p>
                <p className="text-green-100 text-xs mt-2">TB: ${stats.averageOrderValue.toFixed(0)}/đơn</p>
              </div>
              <div className="text-5xl opacity-20">💰</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm mb-1">Doanh thu tháng này</p>
                <p className="text-3xl font-bold">${stats.monthlyRevenue.toFixed(0)}</p>
                <p className="text-orange-100 text-xs mt-2">
                  {stats.monthlyRevenue > 0 ? `${((stats.monthlyRevenue / stats.totalRevenue) * 100).toFixed(1)}% tổng` : 'Chưa có'}
                </p>
              </div>
              <div className="text-5xl opacity-20">📈</div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200 hover:border-yellow-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Đơn chờ xử lý</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                <p className="text-gray-500 text-xs mt-2">Cần xử lý ngay</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Đơn hoàn thành</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {stats.totalOrders > 0 ? `${((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%` : '0%'}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 hover:border-red-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tồn kho thấp</p>
                <p className="text-3xl font-bold text-red-600">{stats.lowStockProducts}</p>
                <p className="text-gray-500 text-xs mt-2">≤ 10 sản phẩm</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Thương hiệu hàng đầu</p>
                <p className="text-2xl font-bold text-blue-600">{stats.topBrand}</p>
                <p className="text-gray-500 text-xs mt-2">Nhiều sản phẩm nhất</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('statistics');
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'statistics'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📊 Thống kê
            </button>
            <button
              onClick={() => {
                setActiveTab('products');
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📱 Quản lý sản phẩm
            </button>
            <button
              onClick={() => {
                setActiveTab('orders');
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📦 Quản lý đơn hàng
            </button>
          </div>

          <div className="p-6">
            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Thống kê chi tiết</h2>
                
                {/* Revenue Statistics */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 Thống kê doanh thu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-gray-600 font-medium">Tổng doanh thu</p>
                        <span className="text-3xl">💵</span>
                      </div>
                      <p className="text-4xl font-bold text-green-600 mb-2">${stats.totalRevenue.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Từ {stats.totalOrders} đơn hàng</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-gray-600 font-medium">Doanh thu tháng này</p>
                        <span className="text-3xl">📅</span>
                      </div>
                      <p className="text-4xl font-bold text-blue-600 mb-2">${stats.monthlyRevenue.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        {stats.totalRevenue > 0 
                          ? `${((stats.monthlyRevenue / stats.totalRevenue) * 100).toFixed(1)}% tổng doanh thu` 
                          : 'Chưa có dữ liệu'}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-gray-600 font-medium">Giá trị đơn trung bình</p>
                        <span className="text-3xl">📊</span>
                      </div>
                      <p className="text-4xl font-bold text-purple-600 mb-2">${stats.averageOrderValue.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Mỗi đơn hàng</p>
                    </div>
                  </div>
                </div>

                {/* Orders Statistics */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 Thống kê đơn hàng</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📋</div>
                        <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                        <p className="text-sm text-gray-600 mt-1">Tổng đơn hàng</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="text-4xl mb-2">⏳</div>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                        <p className="text-sm text-gray-600 mt-1">Chờ xử lý</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stats.totalOrders > 0 ? `${((stats.pendingOrders / stats.totalOrders) * 100).toFixed(1)}%` : '0%'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✅</div>
                        <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                        <p className="text-sm text-gray-600 mt-1">Hoàn thành</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stats.totalOrders > 0 ? `${((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%` : '0%'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📅</div>
                        <p className="text-3xl font-bold text-blue-600">{stats.todayOrders}</p>
                        <p className="text-sm text-gray-600 mt-1">Đơn hôm nay</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date().toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inventory Statistics */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 Thống kê kho hàng</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
                        <p className="text-sm text-gray-600 mt-1">Tổng sản phẩm</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                      <div className="text-center">
                        <div className="text-4xl mb-2">❌</div>
                        <p className="text-3xl font-bold text-red-600">{stats.outOfStockProducts}</p>
                        <p className="text-sm text-gray-600 mt-1">Hết hàng</p>
                        <p className="text-xs text-gray-500 mt-1">Cần nhập thêm</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
                      <div className="text-center">
                        <div className="text-4xl mb-2">⚠️</div>
                        <p className="text-3xl font-bold text-yellow-600">{stats.lowStockProducts}</p>
                        <p className="text-sm text-gray-600 mt-1">Tồn kho thấp</p>
                        <p className="text-xs text-gray-500 mt-1">≤ 10 sản phẩm</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏆</div>
                        <p className="text-2xl font-bold text-purple-600">{stats.topBrand}</p>
                        <p className="text-sm text-gray-600 mt-1">Thương hiệu hàng đầu</p>
                        <p className="text-xs text-gray-500 mt-1">Nhiều sản phẩm nhất</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">🚀 Hành động nhanh</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.pendingOrders > 0 && (
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-4 text-left transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">Xử lý đơn hàng</p>
                            <p className="text-sm opacity-90">{stats.pendingOrders} đơn chờ</p>
                          </div>
                          <span className="text-2xl">⏳</span>
                        </div>
                      </button>
                    )}
                    
                    {stats.lowStockProducts > 0 && (
                      <button
                        onClick={() => setActiveTab('products')}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-4 text-left transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">Nhập hàng</p>
                            <p className="text-sm opacity-90">{stats.lowStockProducts} sản phẩm sắp hết</p>
                          </div>
                          <span className="text-2xl">⚠️</span>
                        </div>
                      </button>
                    )}
                    
                    <button
                      onClick={() => setActiveTab('products')}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-4 text-left transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Thêm sản phẩm mới</p>
                          <p className="text-sm opacity-90">Mở rộng danh mục</p>
                        </div>
                        <span className="text-2xl">➕</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Danh sách sản phẩm</h2>
                  <button
                    onClick={() => {
                      setShowProductForm(!showProductForm);
                      setEditingProduct(null);
                      resetProductForm();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    {showProductForm ? '❌ Hủy' : '➕ Thêm sản phẩm'}
                  </button>
                </div>

                {/* Product Form */}
                {showProductForm && (
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {editingProduct ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
                        <select
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="Xiaomi">Xiaomi</option>
                          <option value="Oppo">Oppo</option>
                          <option value="Vivo">Vivo</option>
                          <option value="Realme">Realme</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="Smartphone">Smartphone</option>
                          <option value="Accessory">Accessory</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Smartwatch">Smartwatch</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giá ($)</label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                        <input
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Đang xử lý...' : editingProduct ? 'Cập nhật' : 'Tạo sản phẩm'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProductForm(false);
                          setEditingProduct(null);
                          resetProductForm();
                        }}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                )}

                {/* Products List */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thương hiệu</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tồn kho</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-semibold">${product.price}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.stock > 10 
                                ? 'bg-green-100 text-green-800' 
                                : product.stock > 0 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              🗑️ Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh sách đơn hàng</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Mã đơn: <span className="font-semibold text-gray-900">#{order._id.slice(-8).toUpperCase()}</span></p>
                          <p className="text-sm text-gray-600">Khách hàng: <span className="font-semibold">{order.user?.name}</span></p>
                          <p className="text-sm text-gray-600">Ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">${order.totalPrice.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{order.orderItems.length} sản phẩm</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.isPaid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.isPaid ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
                        </span>
                        
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">⏳ Chờ xử lý</option>
                          <option value="processing">🔄 Đang xử lý</option>
                          <option value="shipped">🚚 Đang giao</option>
                          <option value="delivered">✅ Đã giao</option>
                          <option value="cancelled">❌ Đã hủy</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
