/**
 * Local Data Service for Customer
 * Provides product data from a local dataset instead of API calls
 */

class LocalDataService {
    constructor() {
        // Initialize with the provided dataset
        this.products = [
            {
                "id": "1",
                "name": "iphoneX",
                "price": 1000,
                "screen": "screen 68",
                "backCamera": "2 camera 12 MP",
                "frontCamera": "7 MP",
                "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
                "desc": "Thiết kế mang tính đột phá",
                "type": "iphone"
            },
            {
                "id": "2",
                "name": "Samsung Galaxy M51 ",
                "price": 3500,
                "screen": "screen 69",
                "backCamera": " Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP",
                "frontCamera": " 32 MP",
                "img": "https://cdn.tgdd.vn/Products/Images/42/217536/samsung-galaxy-m51-trang-new-600x600-600x600.jpg",
                "desc": "Thiết kế đột phá, màn hình tuyệt đỉnh",
                "type": "Samsung"
            },
            {
                "id": "3",
                "name": "Samsung Galaxy M22",
                "price": 45000,
                "screen": "screen 70",
                "backCamera": "Chính 12 MP & Phụ 64 MP, 12 MP",
                "frontCamera": " 32 MP",
                "img": "https://cdn.tgdd.vn/Products/Images/42/217536/samsung-galaxy-m51-trang-new-600x600-600x600.jpg",
                "desc": "Thiết kế mang tính đột phá",
                "type": "Samsung"
            },
            {
                "id": "4",
                "name": "Iphone 11",
                "price": 1000,
                "screen": "screen 54",
                "backCamera": "Camera: Chính 12 MP & Phụ 64 MP, 12 MP",
                "frontCamera": "32 MP",
                "img": "https://cdn-v2.didongviet.vn/files/products/2024/9/1/1/1727766151384_iphone_11_64gb_likenew_1.png",
                "desc": "Thiết kế đột phá, màn hình tuyệt đỉnh",
                "type": "Iphone"
            }
        ];
    }

    /**
     * Get all products
     * @returns {Promise<Array>} List of products
     */
    async get(endpoint) {
        // If endpoint is '/products', return all products
        if (endpoint === '/products') {
            return Promise.resolve([...this.products]);
        }
        
        // If endpoint is '/products/{id}', return the specific product
        const match = endpoint.match(/\/products\/(\d+)/);
        if (match) {
            const id = match[1];
            const product = this.products.find(p => p.id === id);
            return Promise.resolve(product || null);
        }
        
        // For any other endpoint, return an empty array
        return Promise.resolve([]);
    }

    /**
     * Make POST request (simulated)
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async post(endpoint, data) {
        console.log(`POST request to ${endpoint} with data:`, data);
        return Promise.resolve({ success: true });
    }

    /**
     * Make PUT request (simulated)
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async put(endpoint, data) {
        console.log(`PUT request to ${endpoint} with data:`, data);
        return Promise.resolve({ success: true });
    }

    /**
     * Make PATCH request (simulated)
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async patch(endpoint, data) {
        console.log(`PATCH request to ${endpoint} with data:`, data);
        return Promise.resolve({ success: true });
    }

    /**
     * Make DELETE request (simulated)
     * @param {string} endpoint - API endpoint
     * @returns {Promise<Object>} Response data
     */
    async delete(endpoint) {
        console.log(`DELETE request to ${endpoint}`);
        return Promise.resolve({ success: true });
    }
}

// Export the service
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalDataService;
}

export const localDataService = new LocalDataService();