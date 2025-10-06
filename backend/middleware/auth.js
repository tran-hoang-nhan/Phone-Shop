const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Bảo vệ routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Đảm bảo token tồn tại
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập, vui lòng đăng nhập'
    });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập, token không hợp lệ'
    });
  }
};

// Phân quyền user role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Vai trò ${req.user.role} không có quyền truy cập route này`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };