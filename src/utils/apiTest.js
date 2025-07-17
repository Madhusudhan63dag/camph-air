// API Integration Test
// This file helps test the API integration

const API_BASE_URL = 'http://localhost:5000';

// Test API connection
async function testApiConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: 'test@example.com',
                subject: 'API Test',
                message: 'This is a test message to verify API integration',
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                domain: 'Camph Air Test'
            })
        });
        
        const result = await response.json();
        console.log('API Test Result:', result);
        return result;
    } catch (error) {
        console.error('API Test Error:', error);
        return false;
    }
}

// Test Razorpay order creation
async function testRazorpayOrder() {
    try {
        const response = await fetch(`${API_BASE_URL}/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: 100,
                currency: 'INR',
                receipt: 'test_receipt_123',
                notes: {
                    productName: 'Test Product',
                    customerName: 'Test Customer',
                    customerEmail: 'test@example.com',
                    quantity: 1
                }
            })
        });
        
        const result = await response.json();
        console.log('Razorpay Order Test Result:', result);
        return result;
    } catch (error) {
        console.error('Razorpay Order Test Error:', error);
        return false;
    }
}

// Export functions for use in development
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testApiConnection,
        testRazorpayOrder
    };
}

// For browser console testing
if (typeof window !== 'undefined') {
    window.testApiConnection = testApiConnection;
    window.testRazorpayOrder = testRazorpayOrder;
}
