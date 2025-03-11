const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.plan-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Tabs functionality
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(container => container.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tabContents = document.querySelectorAll('.tab-content');

    tabContents.forEach(tabContent => {
        const planContainer = tabContent.querySelector('.plan-container');
        const plans = tabContent.querySelectorAll('.plan');
        const planWidth = plans[0].offsetWidth + 20; // Include margin (10px on each side)

        // Create and append left arrow
        const leftArrow = document.createElement('button');
        leftArrow.classList.add('slide-arrow', 'left');
        leftArrow.innerHTML = '&lt;';
        tabContent.parentElement.appendChild(leftArrow);

        // Create and append right arrow
        const rightArrow = document.createElement('button');
        rightArrow.classList.add('slide-arrow', 'right');
        rightArrow.innerHTML = '&gt;';
        tabContent.parentElement.appendChild(rightArrow);

        let scrollPosition = 0;

        rightArrow.addEventListener('click', function () {
            if (scrollPosition < (plans.length - 1) * planWidth) {
                scrollPosition += planWidth;
                planContainer.style.transform = `translateX(-${scrollPosition}px)`;
            }
        });

        leftArrow.addEventListener('click', function () {
            if (scrollPosition > 0) {
                scrollPosition -= planWidth;
                planContainer.style.transform = `translateX(-${scrollPosition}px)`;
            }
        });
    });
});

// Dark Mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

function createPlanElement(plan) {
    const planDiv = document.createElement('div');
    planDiv.classList.add('plan');
    if (plan.featured) planDiv.classList.add('featured');

    planDiv.innerHTML = `
        <h3>${plan.title}</h3>
        <p>${plan.price}</p>
        <ul>
            ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="btn">Choose</button>
    `;

    const chooseButton = planDiv.querySelector('.btn');

    chooseButton.addEventListener('click', () => {
        // Create popup element (same as before)
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
                <li>After payment send screenshot with your name on Below.</l1>
                <li><b>Whatsapp No:</b> +92 337 7841111 <b>Gmail:</b> raojansher04@gmail.com</li>
                <li> You will be shortly to the group after passing the Psychometric Test.</li>
                </ul>
            </div>
        `;
        document.body.appendChild(popup);
        popup.classList.add('show');

        // Close button functionality (same as before)
        const closeButton = popup.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 300);
        });

        // Close popup if clicked outside (same as before)
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

// Plan Data (No changes needed)
const planData = {
    crypto: [
        { title: "Premium Plan Standard", price: "$100/3months", features: ["Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"] },
        { title: "Premium Plan Standard", price: "$180/6months", features: ["Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"] },
        { title: "Premium Plan Standard", price: "$300/Yearly", features: ["Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"], featured: true },
        { title: "Premium Plan Standard", price: "$500/Lifetime", features: ["Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"] },
        { title: "Premium Plus Plan", price: "$500/Yearly", features: ["1 to 1 Live Trade", "Complete access to Personal Inbox", "Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"] },
        { title: "Pro Premium Plus Plan", price: "$700/Lifetime", features: ["1 to 1 Live Trade", "Live Full Crypto Course", "Complete access to Personal Inbox", "Scalps", "1 user", "Whatsapp Group support", "Intra-day and Swing Trades", "Portfolio Management", "Premium Support by JS Team"] }

    ]
};

// Append plans to their respective containers (No changes needed)
for (const service in planData) {
    const container = document.getElementById(service);
    planData[service].forEach(plan => {
        const planElement = createPlanElement(plan);
        container.appendChild(planElement);
    });
}