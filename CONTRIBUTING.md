# 🤝 Hướng dẫn đóng góp cho Phone Shop

Cảm ơn bạn đã quan tâm đến việc đóng góp cho Phone Shop! Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng.

## 📋 Mục lục
- [Code of Conduct](#code-of-conduct)
- [Cách đóng góp](#cách-đóng-góp)
- [Quy trình Pull Request](#quy-trình-pull-request)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

Dự án này tuân theo Code of Conduct để đảm bảo môi trường thân thiện và chào đón mọi người. Khi tham gia, bạn đồng ý tuân theo các quy tắc này.

## 🚀 Cách đóng góp

### 1. Fork Repository
```bash
# Click nút "Fork" trên GitHub
# Clone fork của bạn về máy
git clone https://github.com/YOUR_USERNAME/Phone-Shop.git
cd Phone-Shop
```

### 2. Tạo Branch mới
```bash
# Tạo branch từ main
git checkout -b feature/amazing-feature
# hoặc
git checkout -b fix/bug-description
```

Quy tắc đặt tên branch:
- `feature/` - Cho tính năng mới
- `fix/` - Cho bug fixes
- `docs/` - Cho documentation
- `style/` - Cho styling changes
- `refactor/` - Cho code refactoring
- `test/` - Cho testing
- `chore/` - Cho maintenance tasks

### 3. Cài đặt Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 4. Tạo file .env
```bash
cp backend/.env.example backend/.env
# Cập nhật các giá trị trong .env
```

### 5. Thực hiện thay đổi
- Viết code rõ ràng và dễ hiểu
- Thêm comments khi cần thiết
- Tuân theo coding standards
- Test kỹ lưỡng

### 6. Test thay đổi
```bash
# Chạy backend
cd backend
npm start

# Chạy frontend (terminal mới)
npm run dev

# Test các tính năng đã thay đổi
```

### 7. Commit changes
```bash
git add .
git commit -m "feat: add amazing feature"
```

### 8. Push to GitHub
```bash
git push origin feature/amazing-feature
```

### 9. Tạo Pull Request
- Truy cập repository trên GitHub
- Click "New Pull Request"
- Chọn branch của bạn
- Điền mô tả chi tiết
- Submit PR

## 📝 Quy trình Pull Request

### Checklist trước khi submit PR:
- [ ] Code chạy được không có lỗi
- [ ] Đã test tất cả thay đổi
- [ ] Code tuân theo style guide
- [ ] Commit messages rõ ràng
- [ ] Documentation được cập nhật (nếu cần)
- [ ] Không có console.log() hoặc debug code
- [ ] Không có merge conflicts

### Mô tả Pull Request nên bao gồm:
1. **Tóm tắt**: Mô tả ngắn gọn về thay đổi
2. **Chi tiết**: Giải thích chi tiết về những gì đã làm
3. **Lý do**: Tại sao cần thay đổi này
4. **Screenshots**: (Nếu có UI changes)
5. **Testing**: Đã test như thế nào
6. **Related Issues**: Link đến issues liên quan

### Template Pull Request:
```markdown
## 📝 Mô tả
[Mô tả chi tiết về thay đổi]

## 🎯 Mục đích
- [ ] Bug fix
- [ ] Tính năng mới
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
[Mô tả cách đã test]

## 📸 Screenshots
[Nếu có UI changes]

## 📌 Related Issues
Closes #[issue number]
```

## 💻 Coding Standards

### JavaScript/React
```javascript
// ✅ Good
const MyComponent = ({ title, description }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return (
    <div className="container">
      <h1>{title}</h1>
    </div>
  );
};

// ❌ Bad
function mycomponent(props) {
  var x = 0;
  return <div><h1>{props.title}</h1></div>
}
```

### Quy tắc:
1. **Variables**: camelCase (`userName`, `totalPrice`)
2. **Components**: PascalCase (`UserProfile`, `ProductCard`)
3. **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
4. **Files**: PascalCase cho components (`Header.jsx`), camelCase cho utilities (`formatDate.js`)
5. **Indentation**: 2 spaces
6. **Quotes**: Single quotes cho JS, double quotes cho JSX
7. **Semicolons**: Sử dụng semicolons
8. **Arrow Functions**: Ưu tiên arrow functions
9. **Destructuring**: Sử dụng destructuring khi có thể
10. **Async/Await**: Ưu tiên async/await thay vì .then()

### CSS
```css
/* ✅ Good */
.product-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.product-card__title {
  font-size: 1.5rem;
  font-weight: bold;
}

/* ❌ Bad */
.ProductCard {
  display: flex;padding: 1rem;
}
```

## 📧 Commit Messages

Sử dụng Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: Tính năng mới
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### Examples:
```bash
feat(auth): add password reset functionality
fix(cart): resolve quantity update bug
docs(readme): update installation instructions
style(header): improve mobile responsiveness
refactor(products): optimize product loading
test(orders): add order creation tests
chore(deps): update dependencies
```

## 🐛 Bug Reports

Khi báo cáo bug, vui lòng bao gồm:

1. **Mô tả bug**: Mô tả rõ ràng và ngắn gọn
2. **Steps to reproduce**: Các bước để tái hiện bug
3. **Expected behavior**: Hành vi mong đợi
4. **Actual behavior**: Hành vi thực tế
5. **Screenshots**: Nếu có thể
6. **Environment**:
   - OS: [e.g., Windows 11]
   - Browser: [e.g., Chrome 120]
   - Node version: [e.g., 18.0.0]

### Template Bug Report:
```markdown
## 🐛 Bug Description
[Mô tả ngắn gọn]

## 📝 Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## ✅ Expected Behavior
[Mô tả hành vi mong đợi]

## ❌ Actual Behavior
[Mô tả hành vi thực tế]

## 📸 Screenshots
[Nếu có]

## 💻 Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.0.0]
```

## 💡 Feature Requests

Khi đề xuất tính năng mới:

1. **Mô tả tính năng**: Mô tả chi tiết về tính năng
2. **Use case**: Tại sao cần tính năng này
3. **Benefits**: Lợi ích mang lại
4. **Implementation ideas**: Ý tưởng triển khai (nếu có)
5. **Alternatives**: Các giải pháp thay thế đã xem xét

### Template Feature Request:
```markdown
## 💡 Feature Description
[Mô tả tính năng]

## 🎯 Use Case
[Tại sao cần tính năng này]

## 🚀 Benefits
- Benefit 1
- Benefit 2

## 💻 Implementation Ideas
[Ý tưởng triển khai]

## 🔄 Alternatives
[Các giải pháp thay thế]
```

## 🔍 Code Review Process

1. **Maintainers sẽ review** PR của bạn
2. **Có thể yêu cầu changes** - Đừng lo lắng, đây là quy trình bình thường
3. **Discuss và update** - Trao đổi và cập nhật theo feedback
4. **Approved và merged** - Khi mọi thứ OK

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## ❓ Câu hỏi?

Nếu bạn có câu hỏi, hãy:
- Tạo [GitHub Issue](https://github.com/tran-hoang-nhan/Phone-Shop/issues)
- Email: admin@thnstore.com

## 🙏 Cảm ơn

Cảm ơn bạn đã đóng góp cho Phone Shop! 🎉

---

**Happy Coding! 💻✨**
