import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Địa chỉ',
      content: '123 Nguyễn Huệ, Quận 1, TP.HCM, Việt Nam',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📞',
      title: 'Hotline',
      content: '+84 123 456 789',
      link: 'tel:+84123456789',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'contact@thnstore.com',
      link: 'mailto:contact@thnstore.com',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '⏰',
      title: 'Giờ làm việc',
      content: '8:00 - 22:00 (Hàng ngày)',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const branches = [
    { city: 'Hà Nội', address: '456 Hoàng Quốc Việt, Cầu Giấy', phone: '024 1234 5678' },
    { city: 'Đà Nẵng', address: '789 Hùng Vương, Hải Châu', phone: '023 6789 1234' },
    { city: 'Cần Thơ', address: '321 3 Tháng 2, Ninh Kiều', phone: '029 2345 6789' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">📞 Liên hệ với chúng tôi</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Trang chủ</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Liên hệ</span>
        </nav>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-r ${info.color} p-6 text-center`}>
                <div className="text-5xl mb-2">{info.icon}</div>
                <h3 className="text-white font-bold text-lg">{info.title}</h3>
              </div>
              <div className="p-6 text-center">
                {info.link ? (
                  <a href={info.link} className="text-gray-700 hover:text-blue-600 font-semibold">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-700 font-semibold">{info.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 Gửi tin nhắn</h2>
            
            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0123 456 789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chủ đề <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="product">Thông tin sản phẩm</option>
                  <option value="order">Hỗ trợ đơn hàng</option>
                  <option value="warranty">Bảo hành</option>
                  <option value="complaint">Khiếu nại</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-xl font-semibold">Bản đồ vị trí</p>
                  <p className="text-sm text-blue-100 mt-2">Google Maps</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⏰</span> Giờ làm việc
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Thứ 2 - Thứ 6:</span>
                  <span className="text-gray-900">8:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Thứ 7 - Chủ nhật:</span>
                  <span className="text-gray-900">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-700">Ngày lễ:</span>
                  <span className="text-gray-900">9:00 - 20:00</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📱 Kết nối với chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-700 transition-colors shadow-lg">
                  f
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl hover:opacity-90 transition-opacity shadow-lg">
                  📷
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-red-700 transition-colors shadow-lg">
                  ▶
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-500 transition-colors shadow-lg">
                  🐦
                </a>
                <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-600 transition-colors shadow-lg">
                  Z
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Branches */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🏪 Chi nhánh của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📍</span> {branch.city}
                </h4>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Địa chỉ:</span> {branch.address}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Điện thoại:</span>{' '}
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:text-blue-800">
                    {branch.phone}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">💡 Câu hỏi thường gặp</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Có thể câu hỏi của bạn đã được trả lời trong phần FAQ của chúng tôi
          </p>
          <a 
            href="#faq" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Xem câu hỏi thường gặp →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
