const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/phoneShop')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Create Admin User
async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@thnstore.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('📧 Email: admin@thnstore.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Role:', existingAdmin.role);
      mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = new User({
      name: 'Admin THN Store',
      email: 'admin@thnstore.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('═══════════════════════════════════');
    console.log('📧 Email: admin@thnstore.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('═══════════════════════════════════');
    console.log('\n👉 You can now login with these credentials at http://localhost:5173/login');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    mongoose.disconnect();
  }
}

createAdmin();
