document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const expandTrigger = document.querySelector('.expand-trigger');
    const expandableContent = document.getElementById('expandable-content');

    // Dark Mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    // Expand/Collapse
    expandTrigger.addEventListener('click', function () {
        expandableContent.classList.toggle('expanded');
    });

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
            // Create popup element
            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <button class="close-button">&times;</button>
                <div class="popup-content">
                    <h3> Bank Details </h3>
                    <p><strong>IBAN NO:</strong> PK10FAYS3206301000001734<br>
                        <b>Bank Name: </b> FAYSAL BANK LTD <br> 
                        <b>Account Title: </b>JANSHERKHAN </p>
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
                        <li><b>Whatsapp No:</b> +92 337 7841111 <b>Gmail:</b> raojansher04@gmail.com</li>
                        <li> You will be shortly to the group after passing the Psychometric Test.</li>
                    </ul>
                </div>
            `;
            document.body.appendChild(popup);
            popup.classList.add('show');

            // Close button functionality
            const closeButton = popup.querySelector('.close-button');
            closeButton.addEventListener('click', () => {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.remove();
                }, 300);
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

    // Plan Data (with icons)
    const planData = {
        crypto: [
            // {
            // title: "Crypto Crash Course",
            //     price: "$250",
            //     features: [
            //       { "text": "Complete Fundamentals Learning", "icon": "fa fa-book" },
            //       { "text": "Complete Technical Analysis Learning", "icon": "fa fa-chart-area" },
            //       { "text": "Complete Onchain Analysis Learning", "icon": "fa fa-database" },
            //       { "text": "Mentorship with One-on-One Chat Support", "icon": "fa fa-comments" },
            //       { "text": "Live Classes on Zoom/Meet", "icon": "fa fa-video" },
            //       { "text": "Portfolio Management Strategies", "icon": "fa fa-briefcase" },
            //       { "text": "Access to Recorded Sessions", "icon": "fa fa-history" }
            //     ]
            //   }, 
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
        planData[service].forEach(plan => {
            const planElement = createPlanElement(plan);
            container.appendChild(planElement);
        });

        // Calculate planWidth after adding the plans to the container
        const plans = container.querySelectorAll('.plan');
        if (plans.length > 0) {
            let planWidth = plans[0].offsetWidth +
                parseInt(window.getComputedStyle(plans[0]).marginRight) +
                parseInt(window.getComputedStyle(plans[0]).marginLeft);

            // Associate arrows with the correct plan container
            const plansWrapper = container.closest('.plans-wrapper');

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
        } else {
            console.warn(`No plans found for service: ${service}`);
        }
    }
});
