'use strict';

// Helper function to add EventListeners to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
    // Using for...of loop for better readability with NodeLists
    for (const element of elements) {
        element.addEventListener(eventType, callback);
    }
};

// --- PRELOADING ---
// Runs when the entire page (HTML, CSS, images) has loaded.
// This ensures a smooth transition and removes the loading overlay.
const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
    // Add 'loaded' class to trigger the loading screen hide animation
    loadingElement.classList.add("loaded");
    // Allow scrolling on the body once loading is complete
    document.body.classList.remove("active");
});


// --- MOBILE NAVIGATION TOGGLE ---
// Selectors for navigation elements
const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector("[data-navbar]"),
    document.querySelector("[data-overlay]")
];

// Function to toggle mobile navigation state
const toggleNav = function () {
    // Toggle 'active' class on navbar, overlay, and body to control visibility and scroll behavior
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
};

// Attach toggleNav to all elements with data-nav-toggler attribute
addEventOnElements(navTogglers, "click", toggleNav);

// Function to close mobile navigation
const closeNav = function () {
    // Remove 'active' class from navbar, overlay, and body to hide navigation
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
};

// Attach closeNav to all navigation links (when a link is clicked, close the nav)
addEventOnElements(navLinks, "click", closeNav);


// --- HEADER STICKY BEHAVIOR ON SCROLL ---
// Select the header element
const header = document.querySelector("[data-header]");

// Function to add/remove 'active' class from header based on scroll position
const activeElementOnScroll = function () {
    if (window.scrollY > 50) { // If scrolled down more than 50px
        header.classList.add("active"); // Add 'active' class (for sticky/smaller header styles)
    } else {
        header.classList.remove("active"); // Remove 'active' class
    }
};

// Attach the scroll listener
window.addEventListener("scroll", activeElementOnScroll);

// Call it once on load to set initial state if page is already scrolled (e.g., from refresh)
activeElementOnScroll();


// --- TEXT ANIMATION EFFECT FOR HERO SECTION ---
// Select all elements with data-letter-effect attribute
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0; // Current active text animation index
let lastActiveLetterBoxIndex = 0; // Previous active text animation index
let totalLetterBoxDelay = 0; // Total animation delay for the current active text

const setLetterEffect = function () {
    // Loop through all letter boxes to manage their animation
    for (let i = 0; i < letterBoxes.length; i++) {
        let letterAnimationDelay = 0; // Delay for individual letters within a box

        const letters = letterBoxes[i].textContent.trim(); // Get text content
        letterBoxes[i].textContent = ""; // Clear existing text (to re-populate with spans)

        // Loop through each character to create animated spans
        for (let j = 0; j < letters.length; j++) {
            const span = document.createElement("span");
            span.style.animationDelay = `${letterAnimationDelay}s`; // Set individual letter animation delay

            // Add 'in' or 'out' class based on the active letter box
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            span.textContent = letters[j]; // Set character content

            if (letters[j] === " ") span.classList.add("space"); // Add 'space' class for proper spacing

            letterBoxes[i].appendChild(span); // Append the span to the current letter box

            // No need to break the loop here if the goal is to calculate totalLetterBoxDelay correctly
            // The condition `if (j >= letters.length - 1) break;` would stop delay calculation for the last char.
            // It might be intended to avoid extra delay after the last character, which is fine.
            if (j < letters.length - 1) { // Only add delay if there are more letters
                letterAnimationDelay += 0.05;
            }
        }

        // Get total delay for the currently active letter box
        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }

        // Add/remove 'active' class for styling the currently animated text
        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        } else {
            letterBoxes[i].classList.remove("active");
        }
    }

    // Schedule the next animation cycle
    // Using setTimeout here is essential for controlling the sequence of text animations.
    // However, if there are many letterBoxes, this could queue up many timers.
    // For performance, ensure this animation is only on limited elements.
    setTimeout(function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        // Cycle through activeLetterBoxIndex
        activeLetterBoxIndex = (activeLetterBoxIndex + 1) % letterBoxes.length;

        setLetterEffect(); // Recursively call to continue the animation
    }, (totalLetterBoxDelay * 1000) + 3000); // Wait for current animation + 3 seconds pause
};

// Call the letter effect function after the window has fully loaded
// This listener is crucial for starting the animation after all resources are available.
window.addEventListener("load", setLetterEffect);


// --- BACK TO TOP BUTTON ---
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    const bodyHeight = document.body.scrollHeight; // Total height of the document
    const windowHeight = window.innerHeight; // Height of the viewport
    const scrollEndPos = bodyHeight - windowHeight; // Max scrollable distance

    // Calculate scroll percentage. Handle division by zero if scrollEndPos is 0 (very short page).
    const totalScrollPercent = scrollEndPos > 0 ? (window.scrollY / scrollEndPos) * 100 : 0;

    // Update button text with scroll percentage
    backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

    // Show/hide back to top button based on scroll percentage
    if (totalScrollPercent > 5) {
        backTopBtn.classList.add("show");
    } else {
        backTopBtn.classList.remove("show");
    }
});


// --- SCROLL REVEAL ANIMATION ---
// Select all elements designed for scroll-based revelation
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
    // Using for...of for better readability
    for (const element of revealElements) {
        // Check if the element is within the viewport, slightly above the bottom edge (1.15 factor)
        const elementIsInScreen = element.getBoundingClientRect().top < window.innerHeight / 1.15;

        if (elementIsInScreen) {
            element.classList.add("revealed"); // Add 'revealed' class to trigger animation
        } else {
            element.classList.remove("revealed"); // Remove 'revealed' class if scrolled back up
        }
    }
};

// Attach scroll event listener for reveal effect
window.addEventListener("scroll", scrollReveal);

// Call scrollReveal once on load to reveal elements already in view when the page loads
window.addEventListener("load", scrollReveal);


// --- CUSTOM CURSOR ---
// (Note: Custom cursors can sometimes impact performance or accessibility. Use sparingly.)
const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// Update custom cursor position based on mouse movement
document.body.addEventListener("mousemove", function (event) {
    // Debounce/throttle if performance is an issue for constant updates
    // The setTimeout of 100ms already acts as a form of debouncing,
    // which might cause a slight lag between mouse and cursor.
    // If the lag is noticeable, consider reducing or removing the timeout.
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
});

// Add 'hovered' class to custom cursor
const hoverActive = function () {
    cursor.classList.add("hovered");
};

// Remove 'hovered' class from custom cursor
const hoverDeactive = function () {
    cursor.classList.remove("hovered");
};

// Add hover effects for anchor elements and buttons
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// Add 'disabled' class when mouse leaves the body
document.body.addEventListener("mouseout", function () {
    cursor.classList.add("disabled");
});

// Remove 'disabled' class when mouse re-enters the body
document.body.addEventListener("mouseover", function () {
    cursor.classList.remove("disabled");
});


// --- DOMContentLoaded Event Listener for non-critical/dynamic content setup ---
// This ensures that the DOM is fully parsed before running scripts that modify it.
document.addEventListener('DOMContentLoaded', function () {

    // --- Initial Popup (appears after 30 seconds) ---
    // Ensure the popup elements exist before attempting to manipulate them
    const initialPopup = document.getElementById('popup');
    const closeInitialPopupButton = document.getElementById('closePopup');

    if (initialPopup && closeInitialPopupButton) {
        setTimeout(function () {
            initialPopup.style.display = 'flex'; // Show the popup
            // Use opacity for smoother transition for the popup
            initialPopup.style.opacity = '1';

            setTimeout(function () {
                closeInitialPopupButton.classList.add('show'); // Show close button after 5 seconds
            }, 5000);
        }, 30000); // Show popup after 30 seconds

        // Event listener for closing the initial popup
        closeInitialPopupButton.addEventListener('click', function () {
            initialPopup.style.opacity = '0'; // Start fade out
            setTimeout(function () {
                initialPopup.style.display = 'none'; // Hide after fade
            }, 300); // Matches CSS transition duration
        });

        // Close initial popup if clicked outside the content area
        initialPopup.addEventListener('click', function (event) {
            if (event.target === initialPopup) { // Only if the click is directly on the overlay
                initialPopup.style.opacity = '0';
                setTimeout(function () {
                    initialPopup.style.display = 'none';
                }, 300);
            }
        });
    }


    // --- Expand/Collapse Section (Not in provided HTML, but kept for context) ---
    // Ensure these elements exist in your HTML if you want this functionality
    const expandTrigger = document.querySelector('.expand-trigger');
    const expandableContent = document.getElementById('expandable-content');
    if (expandTrigger && expandableContent) {
        expandTrigger.addEventListener('click', function () {
            expandableContent.classList.toggle('expanded');
        });
    }

    // --- Dynamic Pricing Plan Generation ---
    // Function to create a single plan element
    function createPlanElement(plan) {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');
        if (plan.featured) {
            planDiv.classList.add('featured');
        }

        // Use array map and join for features, improving readability
        // Added `aria-hidden="true"` to icons if they are purely decorative and text provides meaning.
        // If icons *add* meaning not present in text, they should have `aria-label`. Here, text is sufficient.
        planDiv.innerHTML = `
            <h3>${plan.title}</h3>
            <p>${plan.price}</p>
            <ul>
                ${plan.features.map(feature => `<li><i class="${feature.icon}" aria-hidden="true"></i>${feature.text}</li>`).join('')}
            </ul>
            <button class="btn" aria-label="Choose ${plan.title} plan">Choose</button>
        `;

        const chooseButton = planDiv.querySelector('.btn');

        // Event listener for the "Choose" button within each plan
        chooseButton.addEventListener('click', () => {
            // Create and show the payment details popup
            const planPopup = document.createElement('div');
            planPopup.classList.add('popup'); // This class typically has display: none and transition
            planPopup.innerHTML = `
                <div class="popup-content">
                    <button class="close-button" aria-label="Close payment details popup">&times;</button>
                    <h3>Bank Details</h3>
                    <p><strong>IBAN NO:</strong> PK10FAYS3206301000001734<br>
                        <b>Bank Name:</b> FAYSAL BANK LTD<br>
                        <b>Account Title:</b> JANSHERKHAN</p>
                    <h3>USDT TRC-20 Address:</h3>
                    <p style="font-size: 14px;"><code>TLoLeNJumnEZd5ubqv4D8qJvxQomfeR2Bu</code></p>
                    <h3>Binance ID: <code>458260839</code> (js-rao)</h3>
                    <h3><strong>How to pay:</strong></h3>
                    <ol>
                        <li>Copy the USDT TRC-20 address or Binance ID.</li>
                        <li>Open your crypto wallet or Binance account.</li>
                        <li>Send the specified amount to the provided address or Binance ID.</li>
                        <li>Include any necessary transaction details (e.g., memo).</li>
                        <li>Contact us with the transaction ID/hash for confirmation.</li>
                    </ol>
                    <ul>
                        <h3><strong>Note:</strong></h3>
                        <li>After payment send screenshot with your name and Email address on Below.</li>
                        <li><b>Gmail:</b> <a href="mailto:raojansher04@gmail.com" target="_blank" rel="noopener noreferrer">raojansher04@gmail.com</a></li>
                        <li>You will be shortly added to the group after passing the Psychometric Test.</li>
                    </ul>
                </div>
            `;
            document.body.appendChild(planPopup);

            // Add 'show' class to trigger CSS transitions for fade-in
            planPopup.classList.add('show');

            // Close button functionality for this specific popup
            const closePlanPopupButton = planPopup.querySelector('.close-button');
            closePlanPopupButton.addEventListener('click', () => {
                planPopup.classList.remove('show'); // Trigger fade out
                setTimeout(() => {
                    planPopup.remove(); // Remove from DOM after transition
                }, 300); // Matches CSS transition duration
            });

            // Close popup if clicked outside
            planPopup.addEventListener('click', (event) => {
                if (event.target === planPopup) {
                    planPopup.classList.remove('show');
                    setTimeout(() => {
                        planPopup.remove();
                    }, 300);
                }
            });
        });

        return planDiv;
    }

    // Pricing Plan Data
    const planData = {
        crypto: [
            {
                title: "Premium Plan Standard", price: "$100/3months", features: [
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Premium Plan Standard", price: "$180/6months", features: [
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Premium Plan Standard", price: "$300/Yearly", features: [
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ], featured: true
            },
            {
                title: "Premium Plan Standard", price: "$500/Lifetime", features: [
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Premium Plus Plan", price: "$500/Yearly", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Pro Premium Plus Plan", price: "$700/Lifetime", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Live Crypto Course", icon: "fa fa-graduation-cap" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            }
        ],
        forex: [
            {
                title: "Premium Plus Plan", price: "$1000/Yearly", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Pro Premium Plus Plan", price: "$2500/Lifetime", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Financial Markets Live Courses (Forex + Stock + Commodities + Crypto)", icon: "fa fa-graduation-cap" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            }
        ],
        commodities: [
            {
                title: "Premium Plus Plan", price: "$1000/Yearly", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Pro Premium Plus Plan", price: "$2500/Lifetime", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Financial Markets Live Courses (Forex + Stock + Commodities + Crypto)", icon: "fa fa-graduation-cap" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            }
        ],
        stocks: [
            {
                title: "Premium Plus Plan", price: "$1000/Yearly", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            },
            {
                title: "Pro Premium Plus Plan", price: "$2500/Lifetime", features: [
                    { text: "1-on-1 Live Trade", icon: "fa fa-video" },
                    { text: "Financial Markets Live Courses (Forex + Stock + Commodities + Crypto)", icon: "fa fa-graduation-cap" },
                    { text: "Personal Inbox Access", icon: "fa fa-inbox" },
                    { text: "Scalps", icon: "fa fa-chart-line" },
                    { text: "1 user", icon: "fa fa-user" },
                    { text: "Whatsapp Group support", icon: "fa fa-whatsapp" },
                    { text: "Intra-day & Swing Trades", icon: "fa fa-exchange-alt" },
                    { text: "Portfolio Management", icon: "fa fa-briefcase" },
                    { text: "Premium JS Team Support", icon: "fa fa-headset" }
                ]
            }
        ]
    };

    // Append plans to their respective containers
    // Using Object.entries for more robust iteration
    for (const [serviceName, plansArray] of Object.entries(planData)) {
        const container = document.getElementById(serviceName);
        if (container) { // Check if the container exists
            plansArray.forEach(plan => {
                const planElement = createPlanElement(plan);
                container.appendChild(planElement);
            });

            // --- Horizontal Scrolling Arrows for Pricing Plans ---
            // These arrows are only relevant if the layout is horizontal (desktop view)
            // and the content overflows. For mobile, the flex-direction: column makes them unneeded.
            const plans = container.querySelectorAll('.plan');
            if (plans.length > 0) {
                // Ensure planWidth is calculated correctly including margins
                const firstPlan = plans[0];
                const computedStyle = window.getComputedStyle(firstPlan);
                const planWidth = firstPlan.offsetWidth +
                                  parseInt(computedStyle.marginLeft) +
                                  parseInt(computedStyle.marginRight);

                const plansWrapper = container.closest('.plans-wrapper');

                if (plansWrapper) {
                    // Create arrows only if they don't already exist to prevent duplicates
                    let leftArrow = plansWrapper.querySelector('.slide-arrow.left');
                    if (!leftArrow) {
                        leftArrow = document.createElement('button');
                        leftArrow.classList.add('slide-arrow', 'left');
                        leftArrow.innerHTML = '&lt;';
                        leftArrow.setAttribute('aria-label', 'Scroll left through plans');
                        plansWrapper.appendChild(leftArrow);
                    }

                    let rightArrow = plansWrapper.querySelector('.slide-arrow.right');
                    if (!rightArrow) {
                        rightArrow = document.createElement('button');
                        rightArrow.classList.add('slide-arrow', 'right');
                        rightArrow.innerHTML = '&gt;';
                        rightArrow.setAttribute('aria-label', 'Scroll right through plans');
                        plansWrapper.appendChild(rightArrow);
                    }

                    let scrollPosition = 0; // Current scroll offset for the container

                    rightArrow.addEventListener('click', function () {
                        // Check if there's more content to scroll
                        if (scrollPosition < (container.scrollWidth - container.clientWidth)) {
                            // Scroll by the width of one plan (plus its margins if not part of scrollWidth)
                            scrollPosition = Math.min(scrollPosition + planWidth, container.scrollWidth - container.clientWidth);
                            container.style.transform = `translateX(-${scrollPosition}px)`;
                            container.style.transition = 'transform 0.3s ease-in-out'; // Add transition for smooth scroll
                        }
                    });

                    leftArrow.addEventListener('click', function () {
                        if (scrollPosition > 0) {
                            scrollPosition = Math.max(0, scrollPosition - planWidth);
                            container.style.transform = `translateX(-${scrollPosition}px)`;
                            container.style.transition = 'transform 0.3s ease-in-out'; // Add transition for smooth scroll
                        }
                    });

                    // Reset transform on window resize to prevent layout issues
                    window.addEventListener('resize', () => {
                        container.style.transform = `translateX(0)`;
                        scrollPosition = 0;
                        // Hide/show arrows based on overflow
                        if (container.scrollWidth > container.clientWidth) {
                            leftArrow.style.display = 'block';
                            rightArrow.style.display = 'block';
                        } else {
                            leftArrow.style.display = 'none';
                            rightArrow.style.display = 'none';
                        }
                    });

                    // Initial check for arrow visibility
                    if (container.scrollWidth <= container.clientWidth) {
                        leftArrow.style.display = 'none';
                        rightArrow.style.display = 'none';
                    }
                }
            } else {
                console.warn(`No plans found for service: ${serviceName} within the container.`);
            }
        } else {
            console.warn(`Container with ID '${serviceName}' not found in the DOM.`);
        }
    }
});


// --- Toggle Details (if used elsewhere, define globally) ---
// This function seems generic. If it's used by elements not generated by JS,
// it needs to be accessible globally or attached via event delegation.
// As provided, it's not being called by anything in the HTML, so it might be unused.
function toggleDetails(button) {
    let details = button.nextElementSibling;
    if (details.style.display === "none" || details.style.opacity === "0") {
        details.style.display = "block";
        setTimeout(() => {
            details.style.opacity = "1";
        }, 10);
    } else {
        details.style.opacity = "0";
        setTimeout(() => {
            details.style.display = "none";
        }, 500);
    }
}

// --- Contact Us (Gmail Function) ---
// This function is called by `onclick="openGmail()"` in index.html, so it must be global.
function openGmail() {
    const recipient = "raojansher04@gmail.com";
    const subject = "Inquiry from Trading with JS Rao website"; // More specific subject
    const body = ""; // Default empty body

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Using `accounts.google.com/AccountChooser` for better handling of multiple accounts
    const gmailWebUrl = `https://accounts.google.com/AccountChooser?continue=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Attempt to open native mail client first, then fallback to webmail
    // This logic can be tricky and may vary across devices/browsers.
    // The `isGmailAppOpen` check is not reliable for detecting if an app opened.
    // A more common pattern is to just offer both options or use a simple mailto.
    
    // For simplicity and better cross-platform compatibility, a direct mailto or opening webmail is usually best.
    // The previous implementation's `setTimeout` and `isGmailAppOpen` is an attempt to detect app launch,
    // but it's unreliable and can be problematic.

    // A simpler approach: try mailto first, if it doesn't immediately switch, offer webmail.
    const newWindow = window.open(mailtoUrl, '_blank');
    if (newWindow) {
        // If mailto opens a new window/tab (which it often does), try to close it if webmail is needed.
        // This is still not perfect but a common pattern.
        setTimeout(() => {
            // Check if the new window is still blank (meaning mailto probably didn't fully take over)
            try {
                if (newWindow.location.href === 'about:blank') {
                    newWindow.location.href = gmailWebUrl;
                }
            } catch (e) {
                // Cross-origin security error might occur if mailto redirects immediately.
                // In that case, mailto worked, so no fallback needed.
                // If it fails, assume mailto didn't work and try webmail.
                window.open(gmailWebUrl, '_blank');
            }
        }, 500); // Give mailto a moment to try opening
    } else {
        // Popup blocked, so directly try webmail as a fallback
        window.open(gmailWebUrl, '_blank');
    }
}

// The `isGmailAppOpen` function is removed as it's not reliable for app detection.
// function isGmailAppOpen() {
//     const currentUrl = window.location.href;
//     return currentUrl.startsWith("mailto:");
// }