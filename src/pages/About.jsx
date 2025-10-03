import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: '👥', value: '50,000+', label: 'Khách hàng tin tưởng' },
    { icon: '📱', value: '10,000+', label: 'Sản phẩm chính hãng' },
    { icon: '⭐', value: '4.8/5', label: 'Đánh giá trung bình' },
    { icon: '🏪', value: '20+', label: 'Chi nhánh toàn quốc' }
  ];

  const team = [
    { name: 'Nguyễn Văn A', role: 'CEO & Founder', avatar: '👨‍💼' },
    { name: 'Trần Thị B', role: 'CTO', avatar: '👩‍💻' },
    { name: 'Lê Văn C', role: 'Marketing Director', avatar: '👨‍💼' },
    { name: 'Phạm Thị D', role: 'Customer Service Manager', avatar: '👩‍💼' }
  ];

  const values = [
    {
      icon: '✅',
      title: 'Chất lượng',
      description: '100% sản phẩm chính hãng, cam kết nguồn gốc xuất xứ rõ ràng'
    },
    {
      icon: '💰',
      title: 'Giá tốt nhất',
      description: 'Giá cạnh tranh nhất thị trường với nhiều chương trình ưu đãi'
    },
    {
      icon: '🚚',
      title: 'Giao hàng nhanh',
      description: 'Giao hàng toàn quốc, nhanh chóng và an toàn'
    },
    {
      icon: '🔄',
      title: 'Đổi trả dễ dàng',
      description: 'Chính sách đổi trả linh hoạt trong 30 ngày'
    },
    {
      icon: '🛡️',
      title: 'Bảo hành uy tín',
      description: 'Bảo hành chính hãng tại tất cả các trung tâm toàn quốc'
    },
    {
      icon: '💬',
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn nhiệt tình, chuyên nghiệp luôn sẵn sàng hỗ trợ'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">📱 Về chúng tôi</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            THN STORE - Cửa hàng điện thoại và phụ kiện công nghệ hàng đầu Việt Nam. 
            Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chính hãng với giá tốt nhất.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📖 Câu chuyện của chúng tôi</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-blue-600">THN STORE</span> được thành lập vào năm 2015 
                với mục tiêu trở thành địa chỉ mua sắm điện thoại và phụ kiện công nghệ uy tín nhất tại Việt Nam.
              </p>
              <p>
                Bắt đầu từ một cửa hàng nhỏ tại Quận 1, TP.HCM, chúng tôi đã không ngừng phát triển và mở rộng 
                với hơn 20 chi nhánh trên toàn quốc, phục vụ hàng chục ngàn khách hàng mỗi tháng.
              </p>
              <p>
                Với đội ngũ nhân viên nhiệt tình, am hiểu sản phẩm và luôn đặt khách hàng lên hàng đầu, 
                chúng tôi tự hào là đối tác tin cậy của các thương hiệu điện thoại hàng đầu thế giới như 
                Apple, Samsung, Xiaomi, OPPO, và nhiều thương hiệu khác.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
            <p className="text-gray-700 leading-relaxed">
              Mang đến cho mọi người những sản phẩm công nghệ chất lượng cao với giá cả hợp lý nhất, 
              kèm theo dịch vụ chăm sóc khách hàng xuất sắc. Chúng tôi tin rằng công nghệ phải được 
              tiếp cận dễ dàng và mang lại giá trị thực sự cho cuộc sống.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
            <p className="text-gray-700 leading-relaxed">
              Trở thành hệ thống bán lẻ điện thoại và phụ kiện công nghệ số 1 Việt Nam vào năm 2030. 
              Chúng tôi hướng tới việc xây dựng một nền tảng mua sắm trực tuyến và offline liền mạch, 
              mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💎 Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">👥 Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-6xl shadow-lg">
                  {member.avatar}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Trở thành khách hàng của chúng tôi ngay hôm nay! 🎉</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất thị trường
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/products" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              🛍️ Mua sắm ngay
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              📞 Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
