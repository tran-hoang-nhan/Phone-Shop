// Coupon Model for MongoDB
export class Coupon {
  constructor(couponData) {
    this.code = couponData.code.toUpperCase();
    this.type = couponData.type; // 'percentage' or 'fixed'
    this.value = couponData.value;
    this.minimumAmount = couponData.minimumAmount || 0;
    this.maximumDiscount = couponData.maximumDiscount || null;
    this.usageLimit = couponData.usageLimit || null;
    this.usedCount = 0;
    this.isActive = couponData.isActive !== undefined ? couponData.isActive : true;
    this.startsAt = couponData.startsAt || new Date();
    this.expiresAt = couponData.expiresAt || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isValid(orderAmount = 0) {
    const now = new Date();
    
    // Check if active
    if (!this.isActive) return { valid: false, reason: 'Coupon is not active' };
    
    // Check date range
    if (this.startsAt && now < this.startsAt) {
      return { valid: false, reason: 'Coupon not yet active' };
    }
    if (this.expiresAt && now > this.expiresAt) {
      return { valid: false, reason: 'Coupon has expired' };
    }
    
    // Check usage limit
    if (this.usageLimit && this.usedCount >= this.usageLimit) {
      return { valid: false, reason: 'Coupon usage limit reached' };
    }
    
    // Check minimum amount
    if (orderAmount < this.minimumAmount) {
      return { valid: false, reason: `Minimum order amount is $${this.minimumAmount}` };
    }
    
    return { valid: true };
  }

  calculateDiscount(orderAmount) {
    const validation = this.isValid(orderAmount);
    if (!validation.valid) {
      return { discount: 0, error: validation.reason };
    }

    let discount = 0;
    
    if (this.type === 'percentage') {
      discount = (orderAmount * this.value) / 100;
      if (this.maximumDiscount && discount > this.maximumDiscount) {
        discount = this.maximumDiscount;
      }
    } else if (this.type === 'fixed') {
      discount = Math.min(this.value, orderAmount);
    }

    return { discount: Math.round(discount * 100) / 100 };
  }

  use() {
    this.usedCount++;
    this.updatedAt = new Date();
  }

  deactivate() {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}