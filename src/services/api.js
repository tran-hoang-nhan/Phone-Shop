class ApiService {
    constructor(baseURL = 'https://64d6fb2b2a017531bc12e71a.mockapi.io') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    /**
     * Set authentication token
     * @param {string} token - JWT token
     */
    setAuthToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Make GET request
     * @param {string} endpoint - API endpoint
     * @returns {Promise<Object>} Response data
     */
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: this.headers
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`GET request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Make POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`POST request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Make PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async put(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`PUT request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Make PATCH request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request payload
     * @returns {Promise<Object>} Response data
     */
    async patch(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`PATCH request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Make DELETE request
     * @param {string} endpoint - API endpoint
     * @returns {Promise<Object>} Response data
     */
    async delete(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: this.headers
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`DELETE request failed for ${endpoint}:`, error);
            throw error;
        }
    }
}

export const apiService = new ApiService();