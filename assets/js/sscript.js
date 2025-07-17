'use strict';

// Ensure all code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const expandTrigger = document.querySelector('.expand-trigger');
    const expandableContent = document.getElementById('expandable-content');

    // --- Dark Mode Toggle ---
    if (darkModeToggle) { // Check if the dark mode toggle button exists
        // Set initial button text based on current body class
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Update button text immediately after toggle
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        });
    } else {
        console.warn("Dark mode toggle button with ID 'dark-mode-toggle' not found.");
    }


    // --- Expand/Collapse Functionality ---
    if (expandTrigger && expandableContent) { // Check if both elements exist
        expandTrigger.addEventListener('click', function () {
            expandableContent.classList.toggle('expanded');
            // Optional: Update button text/aria-expanded for accessibility
            const isExpanded = expandableContent.classList.contains('expanded');
            expandTrigger.setAttribute('aria-expanded', isExpanded);
            // You could change the text of the trigger here too, e.g., "Read More" / "Read Less"
        });
    } else {
        console.warn("Expand trigger or expandable content not found. Check classes/IDs: .expand-trigger, #expandable-content.");
    }


    // --- Dynamic Pricing Plan Generation ---
    /**
     * Creates a single plan DOM element.
     * @param {object} plan - The plan data object.
     * @returns {HTMLElement} The created plan div element.
     */
    function createPlanElement(plan) {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');
        if (plan.featured) {
            planDiv.classList.add('featured');
        }

        // Using aria-hidden="true" for Font Awesome icons that are purely decorative
        // and whose meaning is already conveyed by the accompanying text.
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
            // Create the payment details popup dynamically
            const popup = document.createElement('div');
            popup.classList.add('popup'); // This class typically has display: none and transition
            popup.innerHTML = `
                <div class="popup-content">
                    <button class="close-button" aria-label="Close payment details popup">&times;</button>
                    <h3>Bank Details</h3>
                    <p><strong>IBAN NO:</strong> PK10FAYS3206301000001734<br>
                        <b>Bank Name:</b> FAYSAL BANK LTD<br>
                        <b>Account Title:</b> JANSHERKHAN</p>
                    <h3>USDT TRC-20 Address:</h3>
                    <p><code>TLoLeNJumnEZd5ubqv4D8qJvxQomfeR2Bu</code></p>
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
            document.body.appendChild(popup);

            // Add 'show' class to trigger CSS transitions for fade-in
            popup.classList.add('show');

            // Close button functionality for this specific popup
            const closeButton = popup.querySelector('.close-button');
            closeButton.addEventListener('click', () => {
                popup.classList.remove('show'); // Trigger fade out
                setTimeout(() => {
                    popup.remove(); // Remove from DOM after transition
                }, 300); // Matches CSS transition duration
            });

            // Close popup if clicked outside
            popup.addEventListener('click', (event) => {
                if (event.target === popup) {
                    popup.classList.remove('show');
                    setTimeout(() => {
                        popup.remove();
                    }, 300);
                }
            });
        });

        return planDiv;
    }

    // Pricing Plan Data - Define your plan data here
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
            const plans = container.querySelectorAll('.plan');
            if (plans.length > 0) {
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
                        leftArrow.setAttribute('aria-label', `Scroll left for ${serviceName} plans`);
                        plansWrapper.appendChild(leftArrow);
                    }

                    let rightArrow = plansWrapper.querySelector('.slide-arrow.right');
                    if (!rightArrow) {
                        rightArrow = document.createElement('button');
                        rightArrow.classList.add('slide-arrow', 'right');
                        rightArrow.innerHTML = '&gt;';
                        rightArrow.setAttribute('aria-label', `Scroll right for ${serviceName} plans`);
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
                        updateArrowVisibility(); // Update arrow visibility after scroll
                    });

                    leftArrow.addEventListener('click', function () {
                        if (scrollPosition > 0) {
                            scrollPosition = Math.max(0, scrollPosition - planWidth);
                            container.style.transform = `translateX(-${scrollPosition}px)`;
                            container.style.transition = 'transform 0.3s ease-in-out'; // Add transition for smooth scroll
                        }
                        updateArrowVisibility(); // Update arrow visibility after scroll
                    });

                    // Function to update arrow visibility based on scroll position
                    const updateArrowVisibility = () => {
                        const maxScrollLeft = container.scrollWidth - container.clientWidth;
                        leftArrow.style.display = (scrollPosition <= 0) ? 'none' : 'flex'; // Use 'flex' if they are flex items
                        rightArrow.style.display = (scrollPosition >= maxScrollLeft) ? 'none' : 'flex';
                    };

                    // Reset transform on window resize to prevent layout issues
                    window.addEventListener('resize', () => {
                        container.style.transform = `translateX(0)`;
                        scrollPosition = 0;
                        updateArrowVisibility(); // Update on resize
                    });

                    // Initial check for arrow visibility
                    updateArrowVisibility();
                }
            } else {
                console.warn(`No plans found for service: ${serviceName} within the container.`);
            }
        } else {
            console.warn(`Container with ID '${serviceName}' not found.`);
        }
    }
});