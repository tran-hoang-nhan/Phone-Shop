# Phone Shop - React E-commerce Application

A modern e-commerce application built with React, Vite, and React Router for selling smartphones and accessories.

## Features

- 🏠 **Home Page** - Hero section with featured products
- 📱 **Products Page** - Browse all products with category filtering
- 🔍 **Product Details** - Detailed product information with specifications
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 📱 **Responsive Design** - Mobile-friendly interface
- 💾 **Local Storage** - Persistent cart and product data

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **CSS3** - Styling with responsive design
- **Local Storage** - Data persistence

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── ProductDetail.jsx # Product detail page
│   └── ProductDetail.css # Product detail styles
├── context/            # React Context
│   ├── AppContext.js   # Context definition
│   └── AppContext.jsx  # Context provider
├── hooks/              # Custom hooks
│   └── useApp.js       # App context hook
├── models/             # Data models
│   ├── Product.js      # Product model and data
│   ├── Cart.js         # Cart model and operations
│   └── Payment.js      # Payment model
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Products.jsx    # Products listing
│   └── Cart.jsx        # Shopping cart
├── services/           # API services (future)
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── App.css             # Global styles
├── index.css           # Base styles
└── main.jsx            # App entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Phone-Shope
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Home Page
- Hero section with call-to-action
- Featured products grid
- Navigation to products page

### Products Page
- Display all available products
- Category filtering (Smartphone, Accessory)
- Add to cart functionality
- Product details navigation

### Product Details
- Detailed product information
- Product specifications table
- Quantity selector
- Add to cart with custom quantity
- Tabbed interface (Specifications, Reviews, Shipping)

### Shopping Cart
- View cart items
- Update quantities
- Remove items
- Order summary with totals
- Persistent cart data

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Data Management

### Products
- Stored in localStorage
- Default products loaded on first visit
- Product model with specifications
- Category-based organization

### Cart
- Persistent cart using localStorage
- Add/remove/update operations
- Automatic total calculations
- Cross-session persistence

## Styling

- CSS3 with modern features
- Flexbox and Grid layouts
- CSS custom properties
- Responsive breakpoints
- Consistent design system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] User authentication
- [ ] Payment integration
- [ ] Product search functionality
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Order history
- [ ] Admin panel
- [ ] API integration
- [ ] Unit tests
- [ ] Performance optimization
