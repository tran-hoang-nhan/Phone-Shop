import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">📧 Đăng ký nhận tin</h3>
              <p className="text-blue-100">Nhận thông tin ưu đãi và sản phẩm mới nhất</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="px-6 py-3 rounded-l-lg w-full md:w-80 focus:outline-none text-gray-900"
              />
              <button className="bg-gray-900 text-white px-8 py-3 rounded-r-lg font-semibold hover:bg-gray-800 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">📱</span> THN STORE
            </h3>
            <p className="mb-4 text-sm leading-relaxed">
              Cửa hàng điện thoại và phụ kiện công nghệ hàng đầu Việt Nam. 
              Chất lượng - Uy tín - Giá tốt nhất.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white text-lg">f</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <span className="text-white text-lg">📷</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <span className="text-white text-lg">▶</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-white text-lg">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Đơn hàng của tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span className="text-sm">123 Nguyễn Huệ, Quận 1, TP.HCM, Việt Nam</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+84123456789" className="hover:text-white transition-colors">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <a href="mailto:contact@thnstore.com" className="hover:text-white transition-colors">
                  contact@thnstore.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">⏰</span>
                <span className="text-sm">8:00 - 22:00 (Hàng ngày)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center mb-6">
            <h4 className="text-white text-lg font-semibold mb-4">Phương thức thanh toán</h4>
            <div className="flex justify-center items-center space-x-6 flex-wrap">
              <div className="bg-white px-4 py-2 rounded-lg mb-2">
                <span className="text-blue-600 font-bold text-lg">💳 VISA</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg mb-2">
                <span className="text-red-600 font-bold text-lg">💳 Mastercard</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg mb-2">
                <span className="text-blue-800 font-bold text-lg">🔵 PayPal</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg mb-2">
                <span className="text-gray-800 font-bold text-lg">💵 COD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            © {currentYear} <span className="text-white font-semibold">THN STORE</span>. 
            All rights reserved. Made with <span className="text-red-500">❤️</span> in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
