import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaShare, FaHome, FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBox } from 'react-icons/fa';
// import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.png';

// Helper function to format currency
const formatCurrency = (amount) => {
    return `₹ ${Number(amount).toFixed(2)}`;
};

// Helper function to generate order number if not provided
const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `CA-${timestamp}-${random}`;
};

const Thankyou = () => {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        // Get order data from localStorage or fallback data
        const storedOrderData = localStorage.getItem('camphAirOrderSuccess');
        
        if (storedOrderData) {
            try {
                const parsedData = JSON.parse(storedOrderData);
                setOrderData(parsedData);
            } catch (error) {
                console.error('Error parsing order data:', error);
                setOrderData(createFallbackOrderData());
            }
        } else {
            // Create fallback data if no order data is found
            setOrderData(createFallbackOrderData());
        }

        setLoading(false);
        
        // Animate in after a short delay
        setTimeout(() => {
            setAnimateIn(true);
        }, 300);

        // Clean up localStorage after displaying the thank you page
        return () => {
            localStorage.removeItem('camphAirOrderSuccess');
        };
    }, []);

    const createFallbackOrderData = () => {
        return {
            orderNumber: generateOrderNumber(),
            orderDate: new Date().toLocaleDateString('en-IN'),
            productName: 'Camph Airr',
            quantity: 1,
            totalAmount: 199,
            paymentMethod: 'Online Payment',
            transactionId: `TXN-${Date.now()}`,
            customerName: 'Valued Customer',
            customerEmail: 'customer@example.com',
            customerPhone: '9876543210',
            shippingAddress: 'Customer Address\nCity, State'
        };
    };

    const handleDownloadInvoice = () => {
        // Create a simple invoice download
        const invoiceData = `
CAMPH AIR - ORDER CONFIRMATION
==============================

Order Number: ${orderData.orderNumber}
Date: ${orderData.orderDate}
Customer: ${orderData.customerName}
Email: ${orderData.customerEmail}
Phone: ${orderData.customerPhone}

PRODUCT DETAILS:
- Product: ${orderData.productName}
- Quantity: ${orderData.quantity}
- Total: ${formatCurrency(orderData.totalAmount)}

Payment Method: ${orderData.paymentMethod}
Transaction ID: ${orderData.transactionId}

Shipping Address:
${orderData.shippingAddress}

Thank you for your order!
        `;

        const element = document.createElement('a');
        const file = new Blob([invoiceData], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `invoice-${orderData.orderNumber}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Order Confirmation - Camph Air',
                text: `I just ordered ${orderData.productName} from Camph Air! Order #${orderData.orderNumber}`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(
                `I just ordered ${orderData.productName} from Camph Air! Order #${orderData.orderNumber}`
            );
            alert('Order details copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-['Inter',sans-serif]">
           

            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Camph Air" className="h-12" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`transform transition-all duration-1000 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Success Message */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full w-24 h-24 mx-auto animate-pulse opacity-20"></div>
                            <div className="relative bg-green-100 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6">
                                <FaCheckCircle className="text-green-600 text-5xl" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Order Confirmed!
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                            Thank you for your order! We've received your purchase and will start processing it right away. 
                            You'll receive a confirmation email shortly with all the details.
                        </p>
                        
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Order #{orderData.orderNumber}
                            </h2>
                            <p className="text-gray-600">
                                Placed on {orderData.orderDate}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={handleDownloadInvoice}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                            >
                                <FaDownload />
                                Download Invoice
                            </button>
                            
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                            >
                                <FaShare />
                                Share Order
                            </button>
                        </div>
                    </div>

                    {/* Order Details */}
                    

                    {/* Footer Message */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Thank You for Choosing Camph Air!
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            We appreciate your trust in our products. If you have any questions about your order, 
                            please don't hesitate to contact our customer support team.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="mailto:support@camphair.com"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <FaEnvelope />
                                Email Support
                            </a>
                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                            >
                                <FaPhone />
                                Call Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thankyou;
