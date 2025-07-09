'use strict';

// add Event on multiple elment
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// PRELOADING
const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
    loadingElement.classList.add("loaded");
    document.body.classList.remove("active");
});

// MOBILE NAV TOGGLE
const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelector("[data-navbar]"),
    document.querySelector("[data-overlay]")
];

const toggleNav = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);

// HEADER
const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

window.addEventListener("scroll", activeElementOnScroll);

/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
    // loop through all letter boxes
    for (let i = 0; i < letterBoxes.length; i++) {
        // set initial animation delay
        let letterAnimationDelay = 0;

        // get all character from the current letter box
        const letters = letterBoxes[i].textContent.trim();
        // remove all character from the current letter box
        letterBoxes[i].textContent = "";

        // loop through all letters
        for (let j = 0; j < letters.length; j++) {
            // create a span
            const span = document.createElement("span");

            // set animation delay on span
            span.style.animationDelay = `${letterAnimationDelay}s`;

            // set the "in" class on the span, if current letter box is active
            // otherwise class is "out"
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            // pass current letter into span
            span.textContent = letters[j];

            // add space class on span, when current letter contain space
            if (letters[j] === " ") span.classList.add("space");

            // pass the span on current letter box
            letterBoxes[i].appendChild(span);

            // skip letterAnimationDelay when loop is in the last index
            if (j >= letters.length - 1) break;
            // otherwise update
            letterAnimationDelay += 0.05;
        }

        // get total delay of active letter box
        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }

        // add active class on last active letter box
        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        } else {
            letterBoxes[i].classList.remove("active");
        }
    }

    setTimeout(function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;

        // update activeLetterBoxIndex based on total letter boxes
        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

        setLetterEffect();
    }, (totalLetterBoxDelay * 1000) + 3000);
}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);

/**
 * BACK TO TOP BUTTON
 */
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

    backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

    // visible back top btn when scrolled 5% of the page
    if (totalScrollPercent > 5) {
        backTopBtn.classList.add("show");
    } else {
        backTopBtn.classList.remove("show");
    }
});

/**
 * SCROLL REVEAL
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
    for (let i = 0; i < revealElements.length; i++) {
        const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

        if (elementIsInScreen) {
            revealElements[i].classList.add("revealed");
        } else {
            revealElements[i].classList.remove("revealed");
        }
    }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();

/**
 * CUSTOM CURSOR
 */
const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
    setTimeout(function () {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
    }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
    cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
    cursor.classList.remove("disabled");
});

// --- CONSOLIDATED DOMContentLoaded EVENT LISTENER ---

document.addEventListener('DOMContentLoaded', function () {
    // Popup (from original script - the one that appears after 30 seconds)
    const initialPopup = document.getElementById('popup');
    const closeInitialPopupButton = document.getElementById('closePopup');

    if (initialPopup && closeInitialPopupButton) { // Ensure elements exist before trying to use them
        setTimeout(function() {
            initialPopup.style.display = 'flex'; // Show the popup
            setTimeout(function(){
                closeInitialPopupButton.classList.add('show');
            },5000); // show close button after 5sec
        }, 30000); // Show popup after 30 seconds

        closeInitialPopupButton.addEventListener('click', function() {
            initialPopup.style.display = 'none'; // Hide the popup
        });

        // Close popup if clicked outside the content
        window.addEventListener('click', function(event) {
            if (event.target === initialPopup) {
                initialPopup.style.display = 'none';
            }
        });
    }

    // REMOVED DARK MODE TOGGLE JAVASCRIPT HERE

    // Expand/Collapse
    const expandTrigger = document.querySelector('.expand-trigger');
    const expandableContent = document.getElementById('expandable-content');
    if (expandTrigger && expandableContent) {
        expandTrigger.addEventListener('click', function () {
            expandableContent.classList.toggle('expanded');
        });
    }

    // Function to create a plan element (defined inside DOMContentLoaded to ensure scope)
    function createPlanElement(plan) {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');
        if (plan.featured) {
            planDiv.classList.add('featured');
        }

        planDiv.innerHTML = `
            <h3>${plan.title}</h3>
            <p>${plan.price}</p>
            <ul>
                ${plan.features.map(feature => `<li><i class="${feature.icon}"></i>${feature.text}</li>`).join('')}
            </ul>
            <button class="btn">Choose</button>
        `;

        const chooseButton = planDiv.querySelector('.btn');

        chooseButton.addEventListener('click', () => {
            // Create popup element for "Choose" button
            const planPopup = document.createElement('div');
            planPopup.classList.add('popup'); // Ensure 'popup' class is added
            planPopup.innerHTML = `
                <div class="popup-content">
                    <button class="close-button">&times;</button>
                    <h3> Bank Details </h3>
                    <p><strong>IBAN NO:</strong> PK10FAYS3206301000001734<br>
                        <b>Bank Name: </b> FAYSAL BANK LTD <br>
                        <b>Account Title: </b>JANSHERKHAN </p>
                    <h3>USDT TRC-20 Address:</h3>
                    <p style="font-size: 14px;"><code>TLoLeNJumnEZd5ubqv4D8qJvxQomfeR2Bu                  
                                        </code></p>
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
                        <li><b>Gmail:</b> raojansher04@gmail.com</li>
                        <li> You will be shortly to the group after passing the Psychometric Test.</li>
                    </ul>
                </div>
            `;
            document.body.appendChild(planPopup);
            planPopup.classList.add('show'); // This class usually controls visibility in CSS

            // Close button functionality for this specific popup
            const closePlanPopupButton = planPopup.querySelector('.close-button');
            closePlanPopupButton.addEventListener('click', () => {
                planPopup.classList.remove('show');
                setTimeout(() => {
                    planPopup.remove();
                }, 300);
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

    // Plan Data (with icons)
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
    for (const service in planData) {
        const container = document.getElementById(service);
        if (container) { // Check if the container exists
            planData[service].forEach(plan => {
                const planElement = createPlanElement(plan);
                container.appendChild(planElement);
            });

            // Calculate planWidth after adding the plans to the container
            const plans = container.querySelectorAll('.plan');
            if (plans.length > 0) {
                let planWidth = plans[0].offsetWidth;
                const computedStyle = window.getComputedStyle(plans[0]);
                planWidth += parseInt(computedStyle.marginRight) + parseInt(computedStyle.marginLeft);

                const plansWrapper = container.closest('.plans-wrapper');

                if (plansWrapper) {
                    const leftArrow = document.createElement('button');
                    leftArrow.classList.add('slide-arrow', 'left');
                    leftArrow.innerHTML = '&lt;';
                    plansWrapper.appendChild(leftArrow);

                    const rightArrow = document.createElement('button');
                    rightArrow.classList.add('slide-arrow', 'right');
                    rightArrow.innerHTML = '&gt;';
                    plansWrapper.appendChild(rightArrow);

                    let scrollPosition = 0;

                    rightArrow.addEventListener('click', function () {
                        if (scrollPosition < (plans.length - 1) * planWidth) {
                            scrollPosition += planWidth;
                            container.style.transform = `translateX(-${scrollPosition}px)`;
                        }
                    });

                    leftArrow.addEventListener('click', function () {
                        if (scrollPosition > 0) {
                            scrollPosition -= planWidth;
                            container.style.transform = `translateX(-${scrollPosition}px)`;
                        }
                    });
                }
            } else {
                console.warn(`No plans found for service: ${service}`);
            }
        } else {
            console.warn(`Container with ID '${service}' not found.`);
        }
    }
});


// Toggle functions
function toggleDetails(button) {
    let details = button.nextElementSibling;
    if (details.style.display === "none" || details.style.opacity === "0") {
        details.style.display = "block";
        setTimeout(() => { details.style.opacity = "1"; }, 10);
    } else {
        details.style.opacity = "0";
        setTimeout(() => { details.style.display = "none"; }, 500);
    }
}

// contact us
function openGmail() {
    const recipient = "raojansher04@gmail.com";
    const subject = "Feedback and Suggestions";
    const body = "";

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
        window.location.href = mailtoUrl;

        setTimeout(() => {
            if (!isGmailAppOpen()) {
                window.location.href = gmailWebUrl;
            }
        }, 25);
    } else {
        window.open(gmailWebUrl, '_blank');
    }
}

function isGmailAppOpen() {
    const currentUrl = window.location.href;
    return currentUrl.startsWith("mailto:");
}
