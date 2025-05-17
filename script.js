// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultDiv = document.getElementById('converted-amount');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const currencyPairs = document.querySelectorAll('.currency-pair');
const fromFlag = document.querySelector('.from .currency-flag');
const toFlag = document.querySelector('.to .currency-flag');

// Navigation Elements
const sections = document.querySelectorAll('.section');

// Contact Form Elements
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.querySelector('.submit-btn');

// Hamburger Menu Functionality
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navbar.classList.toggle('menu-open');
}

// Close menu when clicking outside
function closeMenu(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navbar.classList.remove('menu-open');
    }
}

// Event Listeners for Menu
hamburger.addEventListener('click', toggleMenu);
document.addEventListener('click', closeMenu);

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navbar.classList.remove('menu-open');
    });
});

// Fake conversion rates (these would normally come from an API)
const rates = {
    INR: {
        USD: 0.013,
        EUR: 0.011,
        GBP: 0.0098,
        JPY: 1.47,
        AUD: 0.021,
        CAD: 0.018,
        CNY: 0.095,
        SGD: 0.018,
        AED: 0.048,
        SAR: 0.049,
        CHF: 0.011,
        NZD: 0.022,
        ZAR: 0.25,
        BRL: 0.065,
        RUB: 1.20,
        KRW: 17.5,
        INR: 1.0
    },
    USD: {
        INR: 75.0,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
        AUD: 1.54,
        CAD: 1.35,
        CNY: 7.15,
        SGD: 1.35,
        AED: 3.67,
        SAR: 3.75,
        CHF: 0.85,
        NZD: 1.65,
        ZAR: 18.5,
        BRL: 4.85,
        RUB: 90.0,
        KRW: 1300.0,
        USD: 1.0
    },
    EUR: {
        INR: 88.0,
        USD: 1.18,
        GBP: 0.86,
        JPY: 129.0,
        AUD: 1.81,
        CAD: 1.59,
        CNY: 8.41,
        SGD: 1.59,
        AED: 4.32,
        SAR: 4.41,
        CHF: 1.0,
        NZD: 1.94,
        ZAR: 21.8,
        BRL: 5.71,
        RUB: 106.0,
        KRW: 1530.0,
        EUR: 1.0
    },
    GBP: {
        INR: 102.0,
        USD: 1.37,
        EUR: 1.16,
        JPY: 150.0,
        AUD: 2.11,
        CAD: 1.85,
        CNY: 9.79,
        SGD: 1.85,
        AED: 5.02,
        SAR: 5.13,
        CHF: 1.16,
        NZD: 2.25,
        ZAR: 25.3,
        BRL: 6.64,
        RUB: 123.0,
        KRW: 1780.0,
        GBP: 1.0
    },
    JPY: {
        INR: 0.68,
        USD: 0.0091,
        EUR: 0.0077,
        GBP: 0.0067,
        AUD: 0.014,
        CAD: 0.012,
        CNY: 0.065,
        SGD: 0.012,
        AED: 0.033,
        SAR: 0.034,
        CHF: 0.0077,
        NZD: 0.015,
        ZAR: 0.17,
        BRL: 0.044,
        RUB: 0.82,
        KRW: 11.8,
        JPY: 1.0
    },
    AUD: {
        INR: 48.7,
        USD: 0.65,
        EUR: 0.55,
        GBP: 0.47,
        JPY: 71.4,
        CAD: 0.88,
        CNY: 4.64,
        SGD: 0.88,
        AED: 2.38,
        SAR: 2.43,
        CHF: 0.55,
        NZD: 1.07,
        ZAR: 12.0,
        BRL: 3.15,
        RUB: 58.4,
        KRW: 844.0,
        AUD: 1.0
    },
    CAD: {
        INR: 55.6,
        USD: 0.74,
        EUR: 0.63,
        GBP: 0.54,
        JPY: 81.5,
        AUD: 1.14,
        CNY: 5.30,
        SGD: 1.0,
        AED: 2.72,
        SAR: 2.78,
        CHF: 0.63,
        NZD: 1.22,
        ZAR: 13.7,
        BRL: 3.59,
        RUB: 66.7,
        KRW: 963.0,
        CAD: 1.0
    },
    CNY: {
        INR: 10.5,
        USD: 0.14,
        EUR: 0.12,
        GBP: 0.10,
        JPY: 15.4,
        AUD: 0.22,
        CAD: 0.19,
        SGD: 0.19,
        AED: 0.51,
        SAR: 0.52,
        CHF: 0.12,
        NZD: 0.23,
        ZAR: 2.59,
        BRL: 0.68,
        RUB: 12.6,
        KRW: 182.0,
        CNY: 1.0
    },
    SGD: {
        INR: 55.6,
        USD: 0.74,
        EUR: 0.63,
        GBP: 0.54,
        JPY: 81.5,
        AUD: 1.14,
        CAD: 1.0,
        CNY: 5.30,
        AED: 2.72,
        SAR: 2.78,
        CHF: 0.63,
        NZD: 1.22,
        ZAR: 13.7,
        BRL: 3.59,
        RUB: 66.7,
        KRW: 963.0,
        SGD: 1.0
    },
    AED: {
        INR: 20.4,
        USD: 0.27,
        EUR: 0.23,
        GBP: 0.20,
        JPY: 30.0,
        AUD: 0.42,
        CAD: 0.37,
        CNY: 1.95,
        SGD: 0.37,
        SAR: 1.02,
        CHF: 0.23,
        NZD: 0.45,
        ZAR: 5.04,
        BRL: 1.32,
        RUB: 24.5,
        KRW: 354.0,
        AED: 1.0
    },
    SAR: {
        INR: 20.0,
        USD: 0.27,
        EUR: 0.23,
        GBP: 0.19,
        JPY: 29.3,
        AUD: 0.41,
        CAD: 0.36,
        CNY: 1.91,
        SGD: 0.36,
        AED: 0.98,
        CHF: 0.22,
        NZD: 0.44,
        ZAR: 4.93,
        BRL: 1.29,
        RUB: 24.0,
        KRW: 347.0,
        SAR: 1.0
    },
    CHF: {
        INR: 90.9,
        USD: 1.18,
        EUR: 1.0,
        GBP: 0.86,
        JPY: 129.0,
        AUD: 1.81,
        CAD: 1.59,
        CNY: 8.41,
        SGD: 1.59,
        AED: 4.32,
        SAR: 4.41,
        NZD: 1.94,
        ZAR: 21.8,
        BRL: 5.71,
        RUB: 106.0,
        KRW: 1530.0,
        CHF: 1.0
    },
    NZD: {
        INR: 45.5,
        USD: 0.61,
        EUR: 0.52,
        GBP: 0.44,
        JPY: 66.7,
        AUD: 0.93,
        CAD: 0.82,
        CNY: 4.34,
        SGD: 0.82,
        AED: 2.22,
        SAR: 2.27,
        CHF: 0.52,
        ZAR: 11.2,
        BRL: 2.95,
        RUB: 54.5,
        KRW: 788.0,
        NZD: 1.0
    },
    ZAR: {
        INR: 4.05,
        USD: 0.054,
        EUR: 0.046,
        GBP: 0.040,
        JPY: 5.95,
        AUD: 0.083,
        CAD: 0.073,
        CNY: 0.39,
        SGD: 0.073,
        AED: 0.20,
        SAR: 0.20,
        CHF: 0.046,
        NZD: 0.089,
        BRL: 0.26,
        RUB: 4.86,
        KRW: 70.3,
        ZAR: 1.0
    },
    BRL: {
        INR: 15.4,
        USD: 0.21,
        EUR: 0.18,
        GBP: 0.15,
        JPY: 22.7,
        AUD: 0.32,
        CAD: 0.28,
        CNY: 1.47,
        SGD: 0.28,
        AED: 0.76,
        SAR: 0.78,
        CHF: 0.18,
        NZD: 0.34,
        ZAR: 3.85,
        RUB: 18.6,
        KRW: 268.0,
        BRL: 1.0
    },
    RUB: {
        INR: 0.83,
        USD: 0.011,
        EUR: 0.0094,
        GBP: 0.0081,
        JPY: 1.22,
        AUD: 0.017,
        CAD: 0.015,
        CNY: 0.079,
        SGD: 0.015,
        AED: 0.041,
        SAR: 0.042,
        CHF: 0.0094,
        NZD: 0.018,
        ZAR: 0.21,
        BRL: 0.054,
        KRW: 14.4,
        RUB: 1.0
    },
    KRW: {
        INR: 0.057,
        USD: 0.00077,
        EUR: 0.00065,
        GBP: 0.00056,
        JPY: 0.085,
        AUD: 0.0012,
        CAD: 0.0010,
        CNY: 0.0055,
        SGD: 0.0010,
        AED: 0.0028,
        SAR: 0.0029,
        CHF: 0.00065,
        NZD: 0.0013,
        ZAR: 0.014,
        BRL: 0.0037,
        RUB: 0.069,
        KRW: 1.0
    }
};

// Function to convert currency
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }
    
    const rate = rates[from][to];
    const convertedAmount = (amount * rate).toFixed(2);
    
    resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}

// Function to update currency flags
function updateCurrencyFlags() {
    const fromFlagCode = fromCurrency.options[fromCurrency.selectedIndex].dataset.flag;
    const toFlagCode = toCurrency.options[toCurrency.selectedIndex].dataset.flag;
    
    fromFlag.src = `https://flagcdn.com/w20/${fromFlagCode}.png`;
    toFlag.src = `https://flagcdn.com/w20/${toFlagCode}.png`;
}

// Function to handle popular currency pair selection
function handleCurrencyPairClick(e) {
    const button = e.currentTarget;
    const from = button.dataset.from;
    const to = button.dataset.to;
    
    // Update select elements
    fromCurrency.value = from;
    toCurrency.value = to;
    
    // Update flags
    updateCurrencyFlags();
    
    // Update active state
    currencyPairs.forEach(pair => pair.classList.remove('active'));
    button.classList.add('active');
    
    // Convert currency
    convertCurrency();
}

// Function to swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    updateCurrencyFlags();
    convertCurrency();
}

// Event Listeners for Currency Pairs
currencyPairs.forEach(pair => {
    pair.addEventListener('click', handleCurrencyPairClick);
});

// Navigation Functions
function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    
    // Show target section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
            section.classList.add('active');
        }
    });
}

// Contact Form Functions
function handleSubmit(e) {
    e.preventDefault();
    
    // Basic form validation
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
}

// Event Listeners for Currency Converter
convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', () => {
    updateCurrencyFlags();
    convertCurrency();
});
toCurrency.addEventListener('change', () => {
    updateCurrencyFlags();
    convertCurrency();
});

// Event Listeners for Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', handleNavigation);
});

// Event Listener for Contact Form
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}

// Initial setup
updateCurrencyFlags();
convertCurrency(); 