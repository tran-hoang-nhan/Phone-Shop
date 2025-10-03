# 📱 Phone Shop - E-Commerce Platform

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

Nền tảng thương mại điện tử bán điện thoại di động hiện đại với giao diện đẹp mắt, tính năng đầy đủ và hiệu suất cao.

## ✨ Tính năng chính

### 👥 Người dùng
- ✅ Đăng ký/Đăng nhập tài khoản
- ✅ Quên mật khẩu & Reset password qua email
- ✅ Xem danh sách sản phẩm với bộ lọc và tìm kiếm
- ✅ Chi tiết sản phẩm với gallery ảnh & thông số kỹ thuật
- ✅ Giỏ hàng với cập nhật số lượng
- ✅ Thanh toán đơn hàng
- ✅ Xem lịch sử đơn hàng
- ✅ Quản lý thông tin cá nhân
- ✅ Đánh giá sản phẩm (UI)

### 👑 Admin
- ✅ Dashboard với thống kê chi tiết
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng & cập nhật trạng thái
- ✅ Thống kê doanh thu theo tháng
- ✅ Cảnh báo tồn kho thấp
- ✅ Phân tích thương hiệu

### 🎨 Giao diện
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern UI với Glassmorphism
- ✅ Gradient backgrounds & animations
- ✅ Loading states & error handling
- ✅ Toast notifications

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 19.1.1** - UI Library
- **Vite 7.1.7** - Build tool & Dev server
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling (Tailwind-inspired)

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.x
- MongoDB >= 5.x
- npm hoặc yarn

### 1. Clone repository
```bash
git clone https://github.com/tran-hoang-nhan/Phone-Shop.git
cd Phone-Shop
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

### 3. Cấu hình Backend
Tạo file `.env` trong thư mục `backend`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/phoneShop
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=Phone Shop <noreply@phoneShop.com>

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 4. Cài đặt Frontend
```bash
cd ../
npm install
```

### 5. Khởi chạy MongoDB
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongodb
```

### 6. Tạo tài khoản Admin
```bash
cd backend
node createAdmin.js
```

**Thông tin đăng nhập Admin:**
- Email: `admin@thnstore.com`
- Password: `admin123`

### 7. Chạy ứng dụng

**Backend:**
```bash
cd backend
npm start
```
Server chạy tại: http://localhost:5000

**Frontend:**
```bash
cd ../
npm run dev
```
Ứng dụng chạy tại: http://localhost:5173

## 📂 Cấu trúc thư mục

```
Phone-Shop/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── productRoutes.js      # Product routes
│   │   └── orderRoutes.js        # Order routes
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── adminMiddleware.js    # Admin role check
│   ├── utils/
│   │   └── sendEmail.js          # Email utility
│   ├── createAdmin.js            # Admin creation script
│   ├── server.js                 # Express server
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Navigation header
│   │   ├── Footer.jsx            # Site footer
│   │   ├── Layout.jsx            # Main layout wrapper
│   │   ├── ProductCard.jsx       # Product card component
│   │   ├── ProductDetail.jsx     # Product detail page
│   │   └── ProtectedRoute.jsx    # Route protection
│   ├── pages/
│   │   ├── Home.jsx              # Homepage
│   │   ├── Products.jsx          # Product listing
│   │   ├── Cart.jsx              # Shopping cart
│   │   ├── Checkout.jsx          # Checkout page
│   │   ├── Profile.jsx           # User profile
│   │   ├── Orders.jsx            # Order history
│   │   ├── Admin.jsx             # Admin dashboard
│   │   ├── About.jsx             # About us page
│   │   ├── Contact.jsx           # Contact page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── ForgotPassword.jsx    # Forgot password
│   │   └── ResetPassword.jsx     # Reset password
│   ├── contexts/
│   │   ├── AuthContext.jsx       # Authentication context
│   │   └── AppContext.jsx        # Global app state
│   ├── services/
│   │   ├── authService.js        # Auth API calls
│   │   ├── productService.js     # Product API calls
│   │   └── orderService.js       # Order API calls
│   ├── models/
│   │   └── CartModel.js          # Cart business logic
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── public/                       # Static assets
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register        # Đăng ký tài khoản mới
POST   /api/auth/login           # Đăng nhập
GET    /api/auth/me              # Lấy thông tin user hiện tại
PUT    /api/auth/updateprofile   # Cập nhật thông tin
POST   /api/auth/forgotpassword  # Gửi email reset password
PUT    /api/auth/resetpassword/:resettoken  # Reset password
```

### Products
```
GET    /api/products             # Lấy danh sách sản phẩm
GET    /api/products/:id         # Chi tiết sản phẩm
POST   /api/products             # Tạo sản phẩm (Admin)
PUT    /api/products/:id         # Cập nhật sản phẩm (Admin)
DELETE /api/products/:id         # Xóa sản phẩm (Admin)
```

### Orders
```
GET    /api/orders               # Lấy đơn hàng (User: của mình, Admin: tất cả)
GET    /api/orders/:id           # Chi tiết đơn hàng
POST   /api/orders               # Tạo đơn hàng mới
PUT    /api/orders/:id/status    # Cập nhật trạng thái (Admin)
PUT    /api/orders/:id/pay       # Cập nhật thanh toán
```

## 👤 Vai trò người dùng

### User (Khách hàng)
- Xem và mua sản phẩm
- Quản lý giỏ hàng
- Theo dõi đơn hàng
- Cập nhật thông tin cá nhân

### Admin (Quản trị viên)
- Tất cả quyền của User
- Quản lý sản phẩm
- Quản lý đơn hàng
- Xem thống kê hệ thống

## 📊 Thống kê Admin

Dashboard Admin cung cấp:
- 💰 **Doanh thu**: Tổng, theo tháng, giá trị đơn trung bình
- 📦 **Đơn hàng**: Tổng số, chờ xử lý, hoàn thành, hôm nay
- 📱 **Kho hàng**: Tổng sản phẩm, hết hàng, tồn kho thấp
- 🏆 **Phân tích**: Thương hiệu hàng đầu, xu hướng bán hàng

## 🎯 Tính năng nổi bật

### 1. Hiệu suất cao
- ⚡ React useMemo & useCallback optimization
- 🔄 Lazy loading cho images
- 📦 Code splitting với React.lazy
- 🚀 Fast refresh với Vite

### 2. Bảo mật
- 🔐 JWT authentication với httpOnly cookies
- 🔒 Password hashing với bcrypt
- 🛡️ Protected routes
- ✅ Input validation
- 🚫 XSS protection

### 3. Trải nghiệm người dùng
- 📱 Mobile-first responsive design
- 🎨 Modern UI/UX với animations
- ⚡ Real-time cart updates
- 🔔 Toast notifications
- 💾 LocalStorage persistence

## 🚀 Deployment

### Backend (Node.js)
Có thể deploy trên:
- Heroku
- Render
- Railway
- DigitalOcean
- AWS EC2

### Frontend (React)
Có thể deploy trên:
- Vercel (Recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Database (MongoDB)
- MongoDB Atlas (Cloud)
- Self-hosted MongoDB

## 🐛 Xử lý lỗi thường gặp

### 1. Port 5000 đã được sử dụng
```bash
# Windows PowerShell
$processId = (Get-NetTCPConnection -LocalPort 5000).OwningProcess
Stop-Process -Id $processId -Force

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### 2. MongoDB connection failed
- Kiểm tra MongoDB đang chạy: `mongod --version`
- Kiểm tra connection string trong `.env`
- Restart MongoDB service

### 3. CORS errors
- Kiểm tra `CLIENT_URL` trong backend `.env`
- Đảm bảo cors middleware được cấu hình đúng

## 📝 Scripts

### Backend
```bash
npm start          # Chạy server
npm run dev        # Chạy với nodemon (auto-restart)
node createAdmin.js # Tạo admin user
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Tran Hoang Nhan**
- GitHub: [@tran-hoang-nhan](https://github.com/tran-hoang-nhan)

## 🙏 Cảm ơn

Cảm ơn các thư viện và framework đã sử dụng trong dự án:
- React Team
- Express.js
- MongoDB
- Vite
- và nhiều thư viện mã nguồn mở khác

## 📞 Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:
- Email: admin@thnstore.com
- GitHub Issues: [Create an issue](https://github.com/tran-hoang-nhan/Phone-Shop/issues)

---

⭐ Nếu bạn thấy dự án này hữu ích, hãy cho một star nhé! ⭐
