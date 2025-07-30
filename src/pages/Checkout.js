import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaShieldAlt, FaCreditCard, FaCheckCircle, FaRegCreditCard } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';

// API Configuration
const API_BASE_URL = "http://localhost:5000" || 'http://localhost:5000';

// https://camph-air-api.onrender.com

// Helper function for API calls with error handling
const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making API call to: ${url}`);
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`API response from ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`API call error for ${endpoint}:`, error);
        throw error;
    }
};

// Simple order number generator
const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `CA-${timestamp}-${random}`;
};

const SHIPPING_CHARGE = 0; // Default shipping charge
const COD_SHIPPING_CHARGE = 50; // Additional shipping charge for COD orders

const COUNTRIES = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AS", name: "American Samoa" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AI", name: "Anguilla" },
    { code: "AQ", name: "Antarctica" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BM", name: "Bermuda" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BV", name: "Bouvet Island" },
    { code: "BR", name: "Brazil" },
    { code: "IO", name: "British Indian Ocean Territory" },
    { code: "BN", name: "Brunei Darussalam" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CV", name: "Cape Verde" },
    { code: "KY", name: "Cayman Islands" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CX", name: "Christmas Island" },
    { code: "CC", name: "Cocos (Keeling) Islands" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo" },
    { code: "CD", name: "Congo, Democratic Republic of the" },
    { code: "CK", name: "Cook Islands" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Cote D'Ivoire" },
    { code: "HR", name: "Croatia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "ET", name: "Ethiopia" },
    { code: "FK", name: "Falkland Islands (Malvinas)" },
    { code: "FO", name: "Faroe Islands" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GF", name: "French Guiana" },
    { code: "PF", name: "French Polynesia" },
    { code: "TF", name: "French Southern Territories" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Greece" },
    { code: "GL", name: "Greenland" },
    { code: "GD", name: "Grenada" },
    { code: "GP", name: "Guadeloupe" },
    { code: "GU", name: "Guam" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "HM", name: "Heard Island and Mcdonald Islands" },
    { code: "VA", name: "Holy See (Vatican City State)" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KP", name: "Korea, Democratic People's Republic of" },
    { code: "KR", name: "Korea, Republic of" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Lao People's Democratic Republic" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libyan Arab Jamahiriya" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macao" },
    { code: "MK", name: "Macedonia" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "YT", name: "Mayotte" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia, Federated States of" },
    { code: "MD", name: "Moldova, Republic of" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolia" },
    { code: "MS", name: "Montserrat" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "NC", name: "New Caledonia" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "NU", name: "Niue" },
    { code: "NF", name: "Norfolk Island" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palau" },
    { code: "PS", name: "Palestinian Territory, Occupied" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PN", name: "Pitcairn" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "PR", name: "Puerto Rico" },
    { code: "QA", name: "Qatar" },
    { code: "RE", name: "Reunion" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russian Federation" },
    { code: "RW", name: "Rwanda" },
    { code: "SH", name: "Saint Helena" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "LC", name: "Saint Lucia" },
    { code: "PM", name: "Saint Pierre and Miquelon" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "CS", name: "Serbia and Montenegro" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" },
    { code: "SJ", name: "Svalbard and Jan Mayen" },
    { code: "SZ", name: "Swaziland" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syrian Arab Republic" },
    { code: "TW", name: "Taiwan" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania, United Republic of" },
    { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TK", name: "Tokelau" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TC", name: "Turks and Caicos Islands" },
    { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UM", name: "United States Minor Outlying Islands" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Viet Nam" },
    { code: "VG", name: "Virgin Islands, British" },
    { code: "VI", name: "Virgin Islands, U.S." },
    { code: "WF", name: "Wallis and Futuna" },
    { code: "EH", name: "Western Sahara" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" }
];

// Indian Cities List
const INDIAN_CITIES = [
    "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Amritsar", "Aurangabad", "Bareilly", "Belgaum", "Bhavnagar",
    "Bhopal", "Bhubaneswar", "Bikaner", "Bokaro Steel City", "Chandigarh", "Chennai", "Coimbatore", "Cuttack", "Dehradun", "Delhi",
    "Dhanbad", "Durg", "Durgapur", "Erode", "Faridabad", "Firozabad", "Ghaziabad", "Gorakhpur", "Gulbarga", "Guntur",
    "Guwahati", "Gwalior", "Hubli", "Hyderabad", "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamnagar",
    "Jamshedpur", "Jhansi", "Jodhpur", "Kakinada", "Kannur", "Kanpur", "Kochi", "Kolhapur", "Kolkata", "Kota",
    "Kozhikode", "Kurnool", "Lucknow", "Ludhiana", "Madurai", "Malappuram", "Mangalore", "Mathura", "Meerut", "Moradabad",
    "Mumbai", "Mysore", "Nagpur", "Nanded", "Nashik", "Nellore", "New Delhi", "Noida", "Patna", "Pondicherry",
    "Pune", "Raipur", "Rajkot", "Ranchi", "Rourkela", "Salem", "Sangli", "Shimla", "Siliguri", "Solapur",
    "Srinagar", "Surat", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Ujjain", "Vadodara", "Varanasi",
    "Vasai-Virar", "Vijayawada", "Visakhapatnam", "Warangal", "Agartala", "Aizawl", "Itanagar", "Dispur", "Patna", "Raipur",
    "Panaji", "Gandhinagar", "Chandigarh", "Shimla", "Srinagar", "Ranchi", "Bengaluru", "Thiruvananthapuram", "Bhopal", "Imphal",
    "Shillong", "Kohima", "Bhubaneswar", "Chandigarh", "Jaipur", "Gangtok", "Chennai", "Hyderabad", "Agartala", "Lucknow",
    "Kolkata", "Dehradun", "Abohar", "Adilabad", "Adoni", "Agar", "Agartala", "Agra", "Ahmadnagar", "Ahmadpur East",
    "Ahmedabad", "Ahmedgarh", "Ahmednagar", "Aizawl", "Ajmer", "Akola", "Alappuzha", "Aligarh", "Alipurduar", "Alirajpur",
    "Allahabad", "Almora", "Alwar", "Ambala", "Ambattur", "Ambedkar Nagar", "Ambikapur", "Amravati", "Amreli", "Amritsar",
    "Amroha", "Anand", "Anantapur", "Anantnag", "Angul", "Anjaw", "Anuppur", "Araria", "Aravalli", "Ariyalur",
    "Arwal", "Asansol", "Ashok Nagar", "Auraiya", "Aurangabad", "Azamgarh", "Badgam", "Bagalkot", "Bageshwar", "Bagpat",
    "Bahraich", "Baksa", "Balaghat", "Balangir", "Balasore", "Ballia", "Balrampur", "Banaskantha", "Banda", "Bandipora",
    "Bangalore", "Banka", "Bankura", "Banswara", "Barabanki", "Baramulla", "Baran", "Bardhaman", "Bareilly", "Bargarh",
    "Barmer", "Barnala", "Barpeta", "Barwani", "Bastar", "Basti", "Bathinda", "Beawar", "Beed", "Begusarai",
    "Belgaum", "Bellary", "Bemetara", "Betul", "Bhadrak", "Bhagalpur", "Bhandara", "Bharatpur", "Bharuch", "Bhavnagar",
    "Bhilwara", "Bhind", "Bhiwani", "Bhojpur", "Bhopal", "Bidar", "Bijapur", "Bijnor", "Bikaner", "Bilaspur",
    "Birbhum", "Bishnupur", "Bokaro", "Bongaigaon", "Botad", "Boudh", "Budaun", "Bulandshahr", "Buldhana", "Bundi",
    "Burhanpur", "Buxar", "Cachar", "Central Delhi", "Chamarajanagar", "Chamba", "Chamoli", "Champawat", "Champhai", "Chandauli",
    "Chandel", "Chandigarh", "Chandrapur", "Changlang", "Chatra", "Chennai", "Chhatarpur", "Chhindwara", "Chikkaballapur", "Chikkamagaluru",
    "Chirang", "Chitradurga", "Chitrakoot", "Chittoor", "Chittorgarh", "Churachandpur", "Churu", "Coimbatore", "Cooch Behar", "Cuddalore",
    "Cuttack", "Dadra and Nagar Haveli", "Dahod", "Dakshin Dinajpur", "Dakshina Kannada", "Daman", "Damoh", "Dantewada", "Darbhanga", "Darjeeling",
    "Darrang", "Datia", "Dausa", "Davanagere", "Debagarh", "Dehradun", "Deoghar", "Deoria", "Devbhoomi Dwarka", "Dewas",
    "Dhalai", "Dhamtari", "Dhanbad", "Dhar", "Dharmapuri", "Dharwad", "Dhemaji", "Dhenkanal", "Dholpur", "Dhubri",
    "Dhule", "Dibang Valley", "Dibrugarh", "Dima Hasao", "Dimapur", "Dindigul", "Dindori", "Diu", "Doda", "Dumka",
    "Dungapur", "Durg", "East Champaran", "East Delhi", "East Garo Hills", "East Godavari", "East Kameng", "East Khasi Hills", "East Siang", "East Sikkim",
    "East Singhbhum", "Ernakulam", "Erode", "Etah", "Etawah", "Faizabad", "Faridabad", "Faridkot", "Farrukhabad", "Fatehabad",
    "Fatehgarh Sahib", "Fatehpur", "Fazilka", "Firozabad", "Firozpur", "Gadag", "Gadchiroli", "Gajapati", "Ganderbal", "Gandhinagar",
    "Ganjam", "Garhwa", "Gariaband", "Gautam Buddha Nagar", "Gaya", "Ghaziabad", "Ghazipur", "Giridih", "Goa", "Goalpara",
    "Godda", "Golaghat", "Gonda", "Gondia", "Gopalganj", "Gorakhpur", "Gulbarga", "Gumla", "Guna", "Guntur",
    "Gurdaspur", "Gurgaon", "Gwalior", "Hailakandi", "Hamirpur", "Hanumangarh", "Hapur", "Harda", "Hardoi", "Haridwar",
    "Hassan", "Hathras", "Haveri", "Hazaribagh", "Hisar", "Hooghly", "Hoshangabad", "Hoshiarpur", "Howrah", "Hyderabad",
    "Idukki", "Imphal East", "Imphal West", "Indore", "Jabalpur", "Jagatsinghpur", "Jaintia Hills", "Jaipur", "Jaisalmer", "Jajpur",
    "Jalandhar", "Jalaun", "Jalgaon", "Jalna", "Jalore", "Jammu", "Jamnagar", "Jamtara", "Jamui", "Janjgir-Champa",
    "Jashpur", "Jaunpur", "Jehanabad", "Jhabua", "Jhajjar", "Jhalawar", "Jhansi", "Jhargram", "Jharsuguda", "Jhunjhunu",
    "Jind", "Jodhpur", "Jorhat", "Junagadh", "Jyotiba Phule Nagar", "Kabirdham", "Kadapa", "Kaimur", "Kaithal", "Kakinada",
    "Kalahandi", "Kamrup", "Kamrup Metropolitan", "Kancheepuram", "Kandhamal", "Kangra", "Kanker", "Kannauj", "Kannur", "Kanpur Dehat",
    "Kanpur Nagar", "Kapurthala", "Karauli", "Karbi Anglong", "Kargil", "Karimganj", "Karimnagar", "Karnal", "Karur", "Kasaragod",
    "Kasganj", "Kathua", "Katihar", "Katni", "Kaushambi", "Kendrapara", "Kendujhar", "Khagaria", "Khammam", "Khandwa",
    "Khargone", "Kheda", "Khordha", "Khunti", "Kinnaur", "Kiphire", "Kishanganj", "Kishtwar", "Kodagu", "Koderma",
    "Kohima", "Kokrajhar", "Kolar", "Kolasib", "Kolhapur", "Kolkata", "Kollam", "Koppal", "Koraput", "Korba",
    "Korea", "Koriya", "Kota", "Kottayam", "Kozhikode", "Krishna", "Kulgam", "Kullu", "Kumuram Bheem", "Kupwara",
    "Kurnool", "Kurukshetra", "Kurung Kumey", "Kushinagar", "Kutch", "Lahaul and Spiti", "Lakhimpur", "Lakhisarai", "Lakshadweep", "Lalitpur",
    "Latehar", "Latur", "Lawngtlai", "Leh", "Lohardaga", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Lucknow",
    "Ludhiana", "Lunglei", "Machilipatnam", "Madhepura", "Madhubani", "Madurai", "Maharajganj", "Mahasamund", "Mahbubnagar", "Mahe",
    "Mahendragarh", "Mahoba", "Mainpuri", "Malappuram", "Malda", "Malkangiri", "Mamit", "Mandi", "Mandya", "Mandsaur",
    "Mangalore", "Mansa", "Mathura", "Mau", "Mayurbhanj", "Medak", "Medinipur East", "Medinipur West", "Meerut", "Meghalaya",
    "Mehsana", "Mewat", "Mirzapur", "Moga", "Mohali", "Mokokchung", "Mon", "Moradabad", "Morbi", "Morena",
    "Mumbai", "Mumbai Suburban", "Munger", "Murshidabad", "Muzaffarnagar", "Muzaffarpur", "Mysore", "Nabarangpur", "Nadia", "Nagaon",
    "Nagapattinam", "Nagaur", "Nagpur", "Nainital", "Nalanda", "Nalbari", "Nalgonda", "Namakkal", "Nanded", "Nandurbar",
    "Narayanpur", "Narmada", "Narsinghpur", "Nashik", "Navsari", "Nawada", "Nayagarh", "Neemuch", "Nellore", "New Delhi",
    "Nilgiris", "Nizamabad", "Noida", "North 24 Parganas", "North Delhi", "North East Delhi", "North Goa", "North Sikkim", "North Tripura", "North West Delhi",
    "Nuapada", "Ongole", "Ooty", "Osmanabad", "Pachmarhi", "Pakur", "Palakkad", "Palamu", "Pali", "Palwal",
    "Panaji", "Panchkula", "Panchmahal", "Panipat", "Panna", "Papum Pare", "Parbhani", "Paschim Medinipur", "Patan", "Pathanamthitta",
    "Pathankot", "Patiala", "Patna", "Pauri Garhwal", "Perambalur", "Phek", "Pilibhit", "Pithoragarh", "Pondicherry", "Poonch",
    "Porbandar", "Pratapgarh", "Pudukkottai", "Pulwama", "Pune", "Purba Medinipur", "Puri", "Purnia", "Purulia", "Raebareli",
    "Raichur", "Raigad", "Raigarh", "Raipur", "Raisen", "Rajanna Sircilla", "Rajgarh", "Rajkot", "Rajnandgaon", "Rajouri",
    "Rajsamand", "Ramanagara", "Ramanathapuram", "Ramban", "Ramgarh", "Rampur", "Ranchi", "Ratlam", "Ratnagiri", "Rayagada",
    "Reasi", "Rewa", "Rewari", "Ri Bhoi", "Rohtak", "Rohtas", "Rudraprayag", "Rupnagar", "Sabarkantha", "Sagar",
    "Saharanpur", "Saharsa", "Sahibganj", "Saiha", "Salem", "Samastipur", "Samba", "Sambalpur", "Sangli", "Sangrur",
    "Sant Kabir Nagar", "Sant Ravidas Nagar", "Saran", "Satara", "Satna", "Sawai Madhopur", "Sehore", "Senapati", "Seoni", "Seraikela Kharsawan",
    "Serchhip", "Shahdol", "Shahjahanpur", "Shajapur", "Shamli", "Sheikhpura", "Sheohar", "Sheopur", "Shimla", "Shimoga",
    "Shivpuri", "Shopian", "Shravasti", "Siddharthnagar", "Sidhi", "Sikar", "Simdega", "Sindhudurg", "Singrauli", "Sirmaur",
    "Sirohi", "Sirsa", "Sitamarhi", "Sitapur", "Sivaganga", "Siwan", "Solan", "Solapur", "Sonbhadra", "Sonipat",
    "Sonitpur", "South 24 Parganas", "South Delhi", "South East Delhi", "South Garo Hills", "South Goa", "South Sikkim", "South Tripura", "South West Delhi", "Sri Muktsar Sahib",
    "Srinagar", "Subarnapur", "Sukma", "Sultanpur", "Sundergarh", "Supaul", "Surat", "Surendranagar", "Surguja", "Tamenglong",
    "Tapi", "Tarn Taran", "Tawang", "Tehri Garhwal", "Thane", "Thanjavur", "The Dangs", "Theni", "Thiruvananthapuram", "Thoothukudi",
    "Thoubal", "Thrissur", "Tikamgarh", "Tinsukia", "Tirap", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvannamalai", "Tonk",
    "Tuensang", "Tumkur", "Udaipur", "Udalguri", "Udhampur", "Udham Singh Nagar", "Udupi", "Ujjain", "Ukhrul", "Umaria",
    "Una", "Unakoti", "Unnao", "Upper Siang", "Upper Subansiri", "Uttar Dinajpur", "Uttarkashi", "Vadodara", "Vaishali", "Valsad",
    "Varanasi", "Vellore", "Vidisha", "Vijayapura", "Vijayawada", "Viluppuram", "Virudhunagar", "Visakhapatnam", "Vizianagaram", "Wardha",
    "Warangal Rural", "Warangal Urban", "Washim", "Wayanad", "West Champaran", "West Delhi", "West Garo Hills", "West Godavari", "West Kameng", "West Khasi Hills",
    "West Siang", "West Sikkim", "West Singhbhum", "West Tripura", "Wokha", "Yadgir", "Yamunanagar", "Yanam", "Yavatmal", "Zunheboto"
];

// Add styles for the moda
const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif",
        },
        content: {
            background: '#fff',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
};

// Updated helper function at the top level
const formatCurrency = (amount) => {
    return `₹ ${Number(amount).toFixed(2)}`;
};

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
    return (
        <div className="flex flex-col space-y-4 mb-6 font-['Inter',sans-serif]">
            <h3 className="text-lg font-semibold text-gray-800">Select Payment Method</h3>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200 hover:shadow-md">
                <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedMethod === 'razorpay'}
                    onChange={() => onSelect('razorpay')}
                    className="h-5 w-5 text-indigo-600"
                />
                <div className="ml-4 flex items-center">
                    {/* <SiRazorpay className="text-blue-500 text-3xl mr-2" /> */}
                    <span className="ml-2 text-sm text-gray-600">Cards, UPI, Net Banking</span>
                </div>
            </label>
            
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200 hover:shadow-md">
                <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedMethod === 'cod'}
                    onChange={() => onSelect('cod')}
                    className="h-5 w-5 text-indigo-600"
                />
                <div className="ml-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-900">Cash On Delivery</span>
                    <span className="ml-2 text-sm text-gray-600">(Pay when you receive + ₹50 shipping)</span>
                </div>
            </label>
        </div>
    );
};

// Add OTP Verification Component
const OTPVerification = ({ phoneNumber, onVerificationSuccess, onCancel }) => {
    const [otp, setOtp] = useState('');
    const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const generateOTP = async () => {
        setIsGeneratingOtp(true);
        setOtpError('');
        
        try {
            const response = await apiCall('/generate-otp', {
                method: 'POST',
                body: JSON.stringify({
                    phoneNumber: phoneNumber
                })
            });

            if (response.success) {
                setOtpSent(true);
                setResendTimer(60); // 60 seconds countdown
                console.log('OTP sent successfully');
            } else {
                setOtpError(response.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error generating OTP:', error);
            setOtpError('Failed to send OTP. Please try again.');
        } finally {
            setIsGeneratingOtp(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp || otp.length !== 4) {
            setOtpError('Please enter a valid 4-digit OTP');
            return;
        }

        setIsVerifyingOtp(true);
        setOtpError('');

        try {
            const response = await apiCall('/verify-otp', {
                method: 'POST',
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    otp: otp
                })
            });

            if (response.success) {
                onVerificationSuccess();
            } else {
                setOtpError(response.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setOtpError('Failed to verify OTP. Please try again.');
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setOtp(value);
        if (otpError) setOtpError('');
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={{...modalStyles.content, maxWidth: '450px'}}>
                <div className="text-center mb-6">
                    <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Phone Verification</h2>
                    <p className="text-gray-600 mb-4">
                        {!otpSent 
                            ? `We'll send a verification code to ${phoneNumber}`
                            : `Enter the 4-digit code sent to ${phoneNumber}`
                        }
                    </p>
                </div>

                {!otpSent ? (
                    <div className="space-y-4">
                        <button
                            onClick={generateOTP}
                            disabled={isGeneratingOtp}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg
                                    shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                    flex items-center justify-center"
                        >
                            {isGeneratingOtp ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending OTP...
                                </div>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Send OTP
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter 4-digit OTP
                            </label>
                            <input
                                type="tel"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter OTP"
                                maxLength="4"
                                className="block w-full text-center text-2xl font-bold tracking-widest rounded-lg border border-gray-300 px-4 py-3
                                        focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                autoComplete="one-time-code"
                            />
                        </div>

                        <button
                            onClick={verifyOTP}
                            disabled={isVerifyingOtp || otp.length !== 4}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg
                                    shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                    flex items-center justify-center"
                        >
                            {isVerifyingOtp ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Verifying...
                                </div>
                            ) : (
                                <>
                                    <FaCheckCircle className="mr-2" />
                                    Verify OTP
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Didn't receive OTP?</span>
                            {resendTimer > 0 ? (
                                <span className="text-gray-500">Resend in {resendTimer}s</span>
                            ) : (
                                <button
                                    onClick={generateOTP}
                                    disabled={isGeneratingOtp}
                                    className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {otpError && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center text-sm border border-red-200">
                        {otpError}
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={onCancel}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg
                                transition-all duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// Add SearchableDropdown component
const SearchableDropdown = ({ name, value, onChange, options, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        setSearchTerm(option);
        onChange({ target: { name, value: option } });
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onChange({ target: { name, value: e.target.value } });
        setIsOpen(true);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                placeholder={placeholder}
                className={`block w-full rounded-md shadow-sm 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    border ${error ? 'border-red-500' : 'border-gray-300'} 
                    p-3 transition-all duration-200 hover:border-blue-400
                    focus:shadow-lg transform focus:scale-[1.01]
                    font-['Inter',sans-serif]`}
            />
            {isOpen && filteredOptions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.slice(0, 10).map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get order details from URL parameters, location.state, or cart data
    const orderDetails = useMemo(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check if cart data is passed from Cart component
        if (urlParams.get('cartData')) {
            try {
                const cartData = JSON.parse(urlParams.get('cartData'));
                console.log('Processing cart data:', cartData);
                
                // Process cart items for checkout
                const totalAmount = cartData.total;
                const quantity = cartData.items.length;
                
                // If multiple items, create a combined product description
                if (cartData.items.length > 1) {
                    const productNames = cartData.items.map(item => item.name).join(', ');
                    const allFragrances = cartData.items.reduce((acc, item) => {
                        return acc.concat(item.combo || []);
                    }, []);
                    
                    console.log('Creating bundle order for multiple items:', productNames);
                    return {
                        productName: `Bundle: ${productNames}`,
                        quantity: quantity,
                        fragrances: allFragrances,
                        pricePerUnit: totalAmount / quantity,
                        totalAmount: totalAmount,
                        mainImage: cartData.items[0]?.image || null,
                        cartItems: cartData.items, // Keep original cart items for detailed display
                        isBundle: true
                    };
                } else if (cartData.items.length === 1) {
                    // Single item from cart
                    const item = cartData.items[0];
                    console.log('Creating single item order from cart:', item.name);
                    return {
                        productName: item.name,
                        quantity: 1,
                        fragrances: item.combo || [],
                        pricePerUnit: item.price,
                        totalAmount: item.price,
                        mainImage: item.image || null,
                        cartItems: [item]
                    };
                }
            } catch (error) {
                console.error('Error parsing cart data:', error);
            }
        }
        
        // Check URL parameters (from direct product purchase)
        if (urlParams.get('product')) {
            console.log('Processing direct product purchase from URL');
            return {
                productName: urlParams.get('product'),
                quantity: parseInt(urlParams.get('quantity')) || 1,
                fragrances: JSON.parse(urlParams.get('fragrances') || '[]'),
                pricePerUnit: parseInt(urlParams.get('pricePerUnit')) || 199,
                totalAmount: parseInt(urlParams.get('total')) || 199,
                mainImage: urlParams.get('mainImage'),
                selectedFlavor: urlParams.get('selectedFlavor')
            };
        }
        
        // Fallback to location.state if no URL params
        console.log('Using fallback order details from location.state or default');
        return location.state || { 
            productName: 'Camph Airr', 
            quantity: 1, 
            totalAmount: 199,
            fragrances: ['Lavender'],
            pricePerUnit: 199
        };
    }, [location.state]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formComplete, setFormComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Default to Razorpay
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const paymentSectionRef = useRef(null);
    const formColumnRef = useRef(null); // Add ref for the form column
    const orderSummaryRef = useRef(null); // Add ref for the order summary column

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        flatHouseBuilding: '',
        address: '',
        landmark: '',
        city: '',
        town: '',
        pincode: '',
        country: 'India',
    });

    const [formErrors, setFormErrors] = useState({});

    // Add missing handlePaymentMethodSelect function
    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
    };

    // Helper function to calculate shipping charge based on payment method
    const getCurrentShippingCharge = () => {
        return paymentMethod === 'cod' ? COD_SHIPPING_CHARGE : SHIPPING_CHARGE;
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [animateForm, setAnimateForm] = useState(false);

    // Define all helper functions before the main return statement
    const renderCheckoutProgress = () => (
        <div className="flex justify-center ml-10 my-10">
            <div className="flex items-center w-full max-w-2xl relative">
                {/* Progress line */}
                <div className="absolute h-1 bg-gray-200 w-full top-4 z-0"></div>
                <div className={`absolute h-1 bg-blue-600 transition-all duration-500 top-4 z-0`} 
                     style={{width: `${((currentStep - 1) / 2) * 100}%`}}></div>
                
                {/* Steps */}
                {['Information', 'Payment', 'Confirmation'].map((step, index) => (
                    <div key={step} className="flex-1">
                        <div className={`flex flex-col items-center relative z-10 
                            ${currentStep > index + 1 ? 'text-blue-600' : 
                              currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                                transition-all duration-300 ${
                                currentStep > index + 1 ? 'bg-blue-600 text-white' :
                                currentStep === index + 1 ? 'bg-blue-100 border-2 border-blue-600' : 
                                'bg-gray-200'}`}>
                                {currentStep > index + 1 ? '✓' : index + 1}
                            </div>
                            <span className="text-xs mt-2 font-medium">{step}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderOrderSummary = () => (
        <div className={`bg-white p-8  ${animateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 tracking-tight">
                Order Summary
            </h2>
            <div className="space-y-4">
                {/* Handle Bundle Items (from cart) */}
                {orderDetails?.isBundle && orderDetails?.cartItems ? (
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 mb-3">Bundle Items:</h3>
                        {orderDetails.cartItems.map((item, index) => (
                            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                                <div className="text-xs text-gray-600 mt-1">
                                    <div className="flex justify-between">
                                        <span>Fragrances:</span>
                                        <span className="font-medium">{item.combo ? item.combo.join(', ') : 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Price:</span>
                                        <span className="font-medium">{formatCurrency(item.price)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 mt-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Bundle Total</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Total Items:</span>
                                    <span className="font-medium">{orderDetails.quantity} {orderDetails.quantity === 1 ? 'Item' : 'Items'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Bundle Price:</span>
                                    <span className="font-medium">{formatCurrency(orderDetails.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Single Product Details */
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                        <h3 className="font-semibold text-gray-800 mb-2">{orderDetails?.productName}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Quantity:</span>
                                <span className="font-medium">{orderDetails?.quantity} {orderDetails?.quantity === 1 ? 'Unit' : 'Units'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Price per unit:</span>
                                <span className="font-medium">{formatCurrency(orderDetails?.pricePerUnit)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing */}
                <div className="space-y-2">
                    <div className="flex justify-between py-2">
                        <span className="text-gray-700 font-medium">Subtotal:</span>
                        <span className="text-gray-700 font-semibold">
                            {formatCurrency(orderDetails?.totalAmount)}
                        </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between py-2 border-t border-gray-200">
                        <span className="font-medium text-gray-700">Shipping:</span>
                        <div className="text-sm text-gray-500 mt-1 flex flex-col items-end gap-2">
                            {paymentMethod === 'cod' ? (
                                <>
                                    <span className="font-semibold text-orange-600">₹{COD_SHIPPING_CHARGE}</span>
                                    <span>(COD charges apply)</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold text-green-600">FREE</span>
                                    <span>(Delivery within 5-7 business days)</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between py-4 border-t border-gray-200 mt-2">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-lg font-bold text-indigo-700">
                            {formatCurrency(orderDetails?.totalAmount + getCurrentShippingCharge())}
                        </span>
                    </div>
                </div>
            </div>
            
            {renderTrustBadges()}
        </div>
    );

    const renderTrustBadges = () => (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
                <p className="text-gray-600 font-medium flex items-center justify-center">
                    <FaShieldAlt className="text-green-600 mr-2" />
                    Secure Checkout
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Your information is protected using secure encryption
                </p>
            </div>
            
            <div className="flex items-center justify-center flex-wrap gap-4 mt-2">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <FaLock className="text-gray-600 mr-2" />
                    <span className="text-xs text-gray-700">SSL Secured</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <FaRegCreditCard className="text-gray-600 mr-2" />
                    <span className="text-xs text-gray-700">Encrypted Payment</span>
                </div>
            </div>

            <div className="border-t border-gray-200 w-full my-4 pt-4"></div>
            <p className="text-center text-sm font-medium text-gray-700">We Accept</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/825/825464.png" alt="RuPay" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png" alt="UPI" className="h-6" />
            </div>
        </div>
    );

const sendOrderConfirmationEmail = async (paymentDetails) => {
    try {
        // Generate a unique order number using schema helper
        const orderNumber = generateOrderNumber();
        
        // Create order details object - handle both single items and cart bundles
        const orderDetailsForEmail = {
            orderNumber: orderNumber,
            productName: orderDetails.productName,
            quantity: orderDetails.quantity,
            totalAmount: (orderDetails.totalAmount + getCurrentShippingCharge()).toFixed(2),
            currency: '₹',
            paymentMethod: paymentDetails.payment_method || 'Online Payment'
        };

        // If it's a bundle from cart, add products array for backend to handle
        if (orderDetails.isBundle && orderDetails.cartItems) {
            orderDetailsForEmail.products = orderDetails.cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: 1,
                fragrances: item.combo || []
            }));
        } else {
            // Single product
            orderDetailsForEmail.fragrances = orderDetails.fragrances || [];
        }
        
        // Create customer details object
        const customerDetailsForEmail = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            flatHouseBuilding: formData.flatHouseBuilding,
            address: formData.address,
            landmark: formData.landmark,
            city: formData.city,
            town: formData.town,
            pincode: formData.pincode,
            country: formData.country
        };
        
        // Try using the backend order confirmation API
        try {
            const emailResult = await apiCall('/send-order-confirmation', {
                method: 'POST',
                body: JSON.stringify({
                    customerEmail: formData.email,
                    orderDetails: orderDetailsForEmail,
                    customerDetails: customerDetailsForEmail
                })
            });
            
            if (emailResult.success) {
                return true;
            }
        } catch (emailApiError) {
            console.log("Backend email API failed, trying FormSubmit instead:", emailApiError);
        }
        
        // Fallback to FormSubmit if backend email API fails
        const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `Order Confirmation - ${orderDetails.productName}`,
                _template: 'table',
                _captcha: 'false',
                message: `
                    Order Details:
                    Order Number: ${orderNumber}
                    Product: ${orderDetails.productName}
                    Quantity: ${orderDetails.quantity}
                    Total: ${formatCurrency(orderDetails.totalAmount + getCurrentShippingCharge())}
                    
                    Customer Information:
                    Name: ${formData.firstName} ${formData.lastName}
                    Email: ${formData.email}
                    Phone: ${formData.phone}
                    Flat/House/Building: ${formData.flatHouseBuilding}
                    Street Address: ${formData.address}
                    Landmark: ${formData.landmark || 'N/A'}
                    City: ${formData.city}
                    Town: ${formData.town || 'N/A'}
                    Pincode: ${formData.pincode}
                    Country: ${formData.country}
                    
                    Payment Information:
                    Transaction ID: ${paymentDetails.id}
                    Status: ${paymentDetails.status}
                    Time: ${new Date().toISOString()}
                `
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

const trackAbandonedOrder = () => {
    if (formData.email) {
        // Create abandoned order data based on order type
        const abandonedOrderData = {
            timestamp: new Date().toISOString(),
            customerDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                flatHouseBuilding: formData.flatHouseBuilding,
                address: formData.address,
                landmark: formData.landmark,
                city: formData.city,
                town: formData.town,
                pincode: formData.pincode,
                country: formData.country
            },
            orderDetails: {
                orderNumber: `CA-CART-${Date.now().toString().slice(-6)}`,
                productName: orderDetails.productName,
                quantity: orderDetails.quantity,
                totalAmount: (orderDetails.totalAmount + getCurrentShippingCharge()).toFixed(2),
                currency: '₹',
                isBundle: orderDetails.isBundle || false,
                cartItems: orderDetails.cartItems || null
            }
        };
        
        // Add detailed product information for bundles
        if (orderDetails.isBundle && orderDetails.cartItems) {
            abandonedOrderData.orderDetails.products = orderDetails.cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: 1,
                fragrances: item.combo || []
            }));
        } else {
            abandonedOrderData.orderDetails.fragrances = orderDetails.fragrances || [];
        }
        
        localStorage.setItem('camphAirAbandonedCart', JSON.stringify(abandonedOrderData));
        
        // If the window is about to be closed, try to send abandoned cart email
        window.addEventListener('beforeunload', (e) => {
            // Only if we've collected information but haven't completed checkout
            if (formComplete && !paymentSuccess) {
                // Use fetch with keepalive instead of sendBeacon for better reliability
                fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                    method: 'POST',
                    keepalive: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        customerEmail: formData.email,
                        orderDetails: abandonedOrderData.orderDetails,
                        customerDetails: abandonedOrderData.customerDetails
                    })
                }).catch(error => console.error('Failed to send abandoned order notification', error));
            }
        });
    }
};

const validateForm = () => {
    const errors = {};

    // Existing validations
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.flatHouseBuilding) errors.flatHouseBuilding = 'Flat/House/Building is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.pincode) errors.pincode = 'Pincode is required';

    // Enhanced phone validation
    if (!formData.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = 'Phone number must be exactly 10 digits';
    }

    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
        errors.pincode = 'Pincode must be exactly 6 digits';
    }

    // Email validation
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Update formComplete state based on validation
    setFormComplete(Object.keys(errors).length === 0);
    return errors;
};

const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone input
    if (name === 'phone') {
        // Remove any non-digit characters
        const phoneValue = value.replace(/\D/g, '');
        // Limit to 10 digits
        const truncatedPhone = phoneValue.slice(0, 10);
        setFormData(prev => ({
            ...prev,
            [name]: truncatedPhone
        }));
    } else if (name === 'pincode') {
        // Remove any non-digit characters and limit to 6 digits
        const pincodeValue = value.replace(/\D/g, '');
        const truncatedPincode = pincodeValue.slice(0, 6);
        setFormData(prev => ({
            ...prev,
            [name]: truncatedPincode
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
        setFormErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        try {
            setFormComplete(true);
            setCurrentStep(2); // Update progress bar
            setIsSubmitting(false);
            
            // Track abandoned order
            trackAbandonedOrder();
            
            // Add smooth scroll to payment section
            setTimeout(() => {
                paymentSectionRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } catch (error) {
            console.error('Form submission error:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: "Error validating form. Please try again."
            }));
            setIsSubmitting(false);
        }
    }
};

const handleRazorpayPayment = async () => {
    setIsSubmitting(true);
    
    try {
        // Calculate total amount with shipping
        const totalAmount = orderDetails.totalAmount + getCurrentShippingCharge();
        
        // First create order on server
        const orderData = await apiCall('/create-order', {
            method: 'POST',
            body: JSON.stringify({
                amount: totalAmount,


                currency: 'INR',
                receipt: `camph_order_${Date.now()}`,
                notes: {
                    productName: orderDetails.productName,
                    customerName: `${formData.firstName} ${formData.lastName}`,
                    customerEmail: formData.email,
                    quantity: orderDetails.quantity
                }
            })
        });
        
        if (!orderData.success) {
            throw new Error(orderData.message || "Failed to create order");
        }
        
        const options = {
            key: orderData.key, // Key from backend API
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'Camph Air',
            description: `Order for ${orderDetails.productName}`,
            order_id: orderData.order.id,
            image: 'https://cdn-icons-png.flaticon.com/512/2331/2331966.png', // Your logo URL
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            notes: {
                address: `${formData.address}, ${formData.city}, ${formData.country}`
            },
            theme: {
                color: '#4F46E5' // Match your indigo-600 color
            },
            handler: async function (response) {
                try {
                    // Verify payment on server
                    const verifyData = await apiCall('/verify-payment', {
                        method: 'POST',
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    
                    if (!verifyData.success) {
                        throw new Error("Payment verification failed");
                    }
                    
                    // Create payment details for success handling
                    const paymentDetails = {
                        id: response.razorpay_payment_id,
                        status: 'Completed',
                        update_time: new Date().toISOString(),
                        orderId: response.razorpay_order_id
                    };
                    
                    // Handle successful payment
                    onPaymentSuccess(paymentDetails);
                } catch (error) {
                    console.error("Payment verification error:", error);
                    setFormErrors(prev => ({
                        ...prev,
                        submit: "Payment successful but verification failed. Please contact support."
                    }));
                    setIsSubmitting(false);
                }
            },
            modal: {
                ondismiss: async function () {
                    setIsSubmitting(false);
                    
                    // Send abandoned order notification when user closes Razorpay modal
                    const abandonedOrderData = {
                        timestamp: new Date().toISOString(),
                        customerDetails: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            flatHouseBuilding: formData.flatHouseBuilding,
                            address: formData.address,
                            landmark: formData.landmark,
                            city: formData.city,
                            town: formData.town,
                            pincode: formData.pincode,
                            country: formData.country
                        },
                        orderDetails: {
                            orderNumber: `CA-CART-${Date.now().toString().slice(-6)}`,
                            productName: orderDetails.productName,
                            quantity: orderDetails.quantity,
                            totalAmount: totalAmount.toFixed(2),
                            currency: '₹',
                            razorpayOrderId: orderData.order.id
                        }
                    };

                    try {
                        const response = await fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                customerEmail: formData.email,
                                orderDetails: abandonedOrderData.orderDetails,
                                customerDetails: abandonedOrderData.customerDetails,
                                abandonedAt: 'payment',
                                reason: 'modal_closed'
                            })
                        });

                        if (!response.ok) {
                            console.error('Failed to send abandoned order notification:', await response.text());
                        }
                    } catch (error) {
                        console.error('Error sending abandoned order notification:', error);
                    }
                }
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        console.error("Payment initialization error:", error);
        setFormErrors(prev => ({
            ...prev,
            submit: "Failed to initialize payment. Please try again."
        }));
        setIsSubmitting(false);
    }
};

const handleCodOrderAfterVerification = async () => {
    setIsSubmitting(true);
    try {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Create mock payment details for COD
        const paymentDetails = {
            id: `COD-${Date.now()}`,
            status: 'Confirmed',
            update_time: new Date().toISOString(),
            payment_method: 'Cash On Delivery (Phone Verified)'
        };
        
        onPaymentSuccess(paymentDetails);
    } catch (error) {
        console.error('COD processing error:', error);
        setFormErrors(prev => ({
            ...prev,
            submit: "There was an error processing your order. Please try again."
        }));
        setIsSubmitting(false);
    }
};

const handleCodOrder = async () => {
    // Check if phone is verified for COD
    if (!isPhoneVerified) {
        setShowOtpVerification(true);
        return;
    }

    // If already verified, proceed directly
    handleCodOrderAfterVerification();
};

// Handle OTP verification success
const handleOtpVerificationSuccess = () => {
    setIsPhoneVerified(true);
    setShowOtpVerification(false);
    
    // Automatically proceed with COD order after verification
    // Remove the setTimeout and directly call the order processing
    handleCodOrderAfterVerification();
};

// Handle OTP verification cancel
const handleOtpVerificationCancel = () => {
    setShowOtpVerification(false);
};

const onPaymentSuccess = async (order) => {
    setPaymentSuccess(true);
    setCurrentStep(3); // Update progress to final step
    
    // Clear any abandoned cart data since we completed the purchase
    localStorage.removeItem('camphAirAbandonedCart');
    
    // Clear the cart if order came from cart
    if (orderDetails.isBundle || orderDetails.cartItems) {
        localStorage.removeItem('cart');
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
    
    // Try to send confirmation email
    const emailSent = await sendOrderConfirmationEmail(order);
    
    if (!emailSent) {
        console.warn("Failed to send confirmation email");
    }

    // Prepare order data for thank you page
    const orderData = {
        orderNumber: generateOrderNumber(),
        orderDate: new Date().toLocaleDateString('en-IN'),
        productName: orderDetails.productName,
        quantity: orderDetails.quantity,
        totalAmount: orderDetails.totalAmount + getCurrentShippingCharge(),
        paymentMethod: order.payment_method || (order.method === 'cod' ? 'Cash on Delivery' : 'Online Payment'),
        transactionId: order.id || order.transactionId || 'COD-' + Date.now(),
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.flatHouseBuilding}, ${formData.address}${formData.landmark ? ', Near ' + formData.landmark : ''}\n${formData.city}${formData.town ? ', ' + formData.town : ''} - ${formData.pincode}\n${formData.country}`
    };

        // Store order data for thank you page
        localStorage.setItem('camphAirOrderSuccess', JSON.stringify(orderData));
        
        // Navigate to thank you page after a short delay
        setTimeout(() => {
            navigate('/thank-you', { 
                state: orderData,
                replace: true 
            });
        }, 2000); // 2 second delay to show success state
    };

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        if (location.state) {
            console.log("Received from product page:", location.state);
        }
        
        if (!orderDetails) {
            navigate('/product');
            return;
        }

        // Log the order details for debugging
        console.log("Final order details processed:", orderDetails);

        /* PayPal integration temporarily disabled
        if (formComplete) {
            const addPayPalScript = async () => {
                // PayPal script loading code...
            };

            const renderPayPalButtons = () => {
                // PayPal button rendering code...
            };

            addPayPalScript();
        }
        */
    }, [orderDetails, navigate, formComplete, location.state]);

    useEffect(() => {
        if (formComplete) {
            const loadRazorpayScript = () => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                document.body.appendChild(script);
                
                return script;
            };
            
            const razorpayScript = loadRazorpayScript();
            
            return () => {
                if (document.body.contains(razorpayScript)) {
                    document.body.removeChild(razorpayScript);
                }
            };
        }
    }, [formComplete]);

    useEffect(() => {
        setAnimateForm(true);
    }, []);

    // Add scroll synchronization effect
    useEffect(() => {
        const formColumn = formColumnRef.current;
        const orderSummary = orderSummaryRef.current;
        
        const handleScroll = () => {
            if (!formColumn || !orderSummary) return;
            
            const formScrollTop = window.scrollY;
            const formHeight = formColumn.offsetHeight;
            const windowHeight = window.innerHeight;
            const orderSummaryHeight = orderSummary.offsetHeight;
            
            // Calculate how much the order summary should move
            // Prevent moving too far down (keep it in viewport)
            const maxOffset = Math.max(0, formHeight - orderSummaryHeight);
            
            // Calculate scrolling progress as a percentage
            const scrollProgress = Math.min(formScrollTop / (formHeight - windowHeight + 300), 1);
            const translateY = Math.min(scrollProgress * maxOffset, maxOffset);
            
            // Apply smooth translation to the order summary
            orderSummary.style.transform = `translateY(${translateY}px)`;
            orderSummary.style.transition = 'transform 0.1s ease-out';
        };
        
        // Add scroll event listener to window
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Redirect if no order details
    if (!orderDetails || !orderDetails.productName) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">No Order Found</h1>
                    <p className="text-gray-600 mb-4">Please go back and select a product first.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    // Main component return
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Poppins',sans-serif]">
            {/* <style>{fontStyles}</style> */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {renderCheckoutProgress()}
                
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    {/* Checkout Form - First Column */}
                    <div 
                        ref={formColumnRef}
                        className={`bg-white p-8 ${animateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 tracking-tight">Shipping Information</h2>
                        
                        {!formComplete ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your first name"
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.firstName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name"
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email address"
                                            className={`block w-full rounded-md shadow-sm pl-10
                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                    border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} 
                                                    p-3 transition-all duration-200 hover:border-blue-400
                                                    focus:shadow-lg transform focus:scale-[1.01]
                                                    font-['Inter',sans-serif]`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formErrors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formErrors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            maxLength="10"
                                            className={`block w-full rounded-md shadow-sm pl-10
                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                    border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} 
                                                    p-3 transition-all duration-200 hover:border-blue-400
                                                    focus:shadow-lg transform focus:scale-[1.01]
                                                    font-['Inter',sans-serif]`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formErrors.phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formErrors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2 border-t border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery Address</h3>
                                    
                                    {/* Flat/House/Building Number */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Flat/House/Building No. *
                                        </label>
                                        <input
                                            type="text"
                                            name="flatHouseBuilding"
                                            value={formData.flatHouseBuilding}
                                            onChange={handleInputChange}
                                            placeholder="Enter flat, house, or building number"
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.flatHouseBuilding ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.flatHouseBuilding && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.flatHouseBuilding}
                                            </p>
                                        )}
                                    </div>

                                    {/* Street Address */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter street address"
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.address && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>

                                    {/* Landmark */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Landmark (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            placeholder="Enter nearby landmark"
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.landmark ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.landmark && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formErrors.landmark}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        {/* City */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <SearchableDropdown
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                options={INDIAN_CITIES}
                                                placeholder="Select your city"
                                                error={formErrors.city}
                                            />
                                            {formErrors.city && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.city}
                                                </p>
                                            )}
                                        </div>

                                        {/* Town */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Town (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="town"
                                                value={formData.town}
                                                onChange={handleInputChange}
                                                placeholder="Enter your town"
                                                className={`block w-full rounded-md shadow-sm 
                                                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                            border ${formErrors.town ? 'border-red-500' : 'border-gray-300'} 
                                                            p-3 transition-all duration-200 hover:border-blue-400
                                                            focus:shadow-lg transform focus:scale-[1.01]
                                                            font-['Inter',sans-serif]`}
                                            />
                                            {formErrors.town && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.town}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Pincode */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pincode *
                                            </label>
                                            <input
                                                type="tel"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="Enter 6-digit pincode"
                                                maxLength="6"
                                                className={`block w-full rounded-md shadow-sm 
                                                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                            border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} 
                                                            p-3 transition-all duration-200 hover:border-blue-400
                                                            focus:shadow-lg transform focus:scale-[1.01]
                                                            font-['Inter',sans-serif]`}
                                            />
                                            {formErrors.pincode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.pincode}
                                                </p>
                                            )}
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country *
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md shadow-sm 
                                                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                            border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} 
                                                            p-3 transition-all duration-200 hover:border-blue-400
                                                            focus:shadow-lg transform focus:scale-[1.01]
                                                            font-['Inter',sans-serif]`}
                                            >
                                                <option value="">Select a country</option>
                                                {COUNTRIES.map((country) => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.country && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {formErrors.country}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                                    <div className="flex items-center">
                                        <FaCheckCircle className="text-green-600 mr-2 text-xl" />
                                        <p className="text-blue-800 font-medium">
                                            100% Money Back Guarantee
                                        </p>
                                    </div>
                                    <p className="text-blue-600 text-sm mt-1 ml-6 mb-2">
                                        15-day satisfaction guarantee or your money back
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]
                                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                flex items-center justify-center tracking-wide"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            <>
                                                <FaLock className="mr-2" />
                                                Continue to Payment
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center">
                                        <FaCheckCircle className="text-green-500 mr-2 text-lg" />
                                        <p className="text-green-700 font-medium">
                                            Information validated! Please select your preferred payment method.
                                        </p>
                                    </div>
                                </div>
                                
                                <div ref={paymentSectionRef} className="border border-gray-300 rounded-lg p-5 mb-4 shadow-sm">
                                    <h3 className="font-medium text-gray-700 flex items-center mb-3">
                                        <FaCreditCard className="mr-2 text-indigo-600" />
                                        Secure Payment
                                    </h3>
                                    
                                    <PaymentMethodSelector 
                                        selectedMethod={paymentMethod}
                                        onSelect={handlePaymentMethodSelect}
                                    />
                                    
                                    {/* PayPal option temporarily disabled 
                                    {paymentMethod === 'paypal' && (
                                        <div ref={paypalRef} className="mt-4"></div>
                                    )}
                                    */}
                                    
                                    {paymentMethod === 'razorpay' && (
                                        <button
                                            onClick={handleRazorpayPayment}
                                            disabled={isSubmitting}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                    shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                    flex items-center justify-center mt-4 tracking-wide"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Processing...
                                                </div>
                                            ) : (
                                                <>
                                                    <SiRazorpay className="mr-2 text-lg" />
                                                    Pay ₹ {(orderDetails.totalAmount + getCurrentShippingCharge()).toFixed(2)}
                                                </>
                                            )}
                                        </button>
                                    )}
                                    
                                    {paymentMethod === 'cod' && (
                                        <>
                                            <div className="mt-4 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <div className="flex items-center text-yellow-800 mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-medium">Cash on Delivery Information</span>
                                                </div>
                                                <p className="text-yellow-700 text-sm mt-1 ml-7 mb-2">
                                                    Pay with cash upon delivery. Our delivery agent will collect the payment when your order arrives. A shipping charge of ₹50 applies for COD orders.
                                                </p>
                                                {!isPhoneVerified && (
                                                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 ml-7">
                                                        <div className="flex items-center text-orange-800 mb-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                            </svg>
                                                            <span className="font-medium text-sm">Phone Verification Required</span>
                                                        </div>
                                                        <p className="text-orange-700 text-xs">
                                                            We'll verify your phone number with OTP before confirming your COD order.
                                                        </p>
                                                    </div>
                                                )}
                                                {isPhoneVerified && (
                                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 ml-7">
                                                        <div className="flex items-center text-green-800">
                                                            <FaCheckCircle className="mr-2 text-sm" />
                                                            <span className="font-medium text-sm">Phone Verified Successfully</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <button
                                                onClick={handleCodOrder}
                                                disabled={isSubmitting}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                        shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                        flex items-center justify-center tracking-wide"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    <>
                                                        {!isPhoneVerified ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                </svg>
                                                                Verify Phone & Place Order - ₹ {(orderDetails.totalAmount + getCurrentShippingCharge()).toFixed(2)}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                                </svg>
                                                                Place Order - ₹ {(orderDetails.totalAmount + getCurrentShippingCharge()).toFixed(2)}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    <div className="flex items-center text-blue-700">
                                        <FaShieldAlt className="mr-2" />
                                        <span className="font-medium">Secure Transaction</span>
                                    </div>
                                    <p className="text-sm text-blue-600 mt-1 ml-6">
                                        Your payment information is securely processed and never stored.
                                    </p>
                                </div>
                                
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By completing this payment, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                </p>
                            </>
                        )}

                        {formErrors.submit && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-200">
                                {formErrors.submit}
                            </div>
                        )}
                    </div>
                    
                    {/* Order Summary - Second Column */}
                    <div className="relative bg-white">
                        <div
                            ref={orderSummaryRef}
                            className="transition-transform">
                            {renderOrderSummary()}
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Verification Modal */}
            {showOtpVerification && (
                <OTPVerification
                    phoneNumber={formData.phone}
                    onVerificationSuccess={handleOtpVerificationSuccess}
                    onCancel={handleOtpVerificationCancel}
                />
            )}

            {/* Success Message Modal */}
            {paymentSuccess && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content}>
                        <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <FaCheckCircle className="text-green-600 text-4xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                            {paymentMethod === 'cod' ? 'Order Confirmed!' : 'Payment Successful!'}
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                            {paymentMethod === 'cod' 
                                ? 'Your COD order has been confirmed! We\'ll contact you before delivery.'
                                : 'Thank you for your order! We\'ve sent a confirmation email with your order details.'
                            }
                        </p>
                        <div className="flex items-center justify-center mb-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-2"></div>
                            <span className="text-gray-600">Redirecting to order confirmation...</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            You'll be automatically redirected in a few seconds
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;