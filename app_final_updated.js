class FintechGame {
    constructor() {
        this.currentCharacter = null;
        this.darkPatternsAvoided = 0;
        this.gameState = {
            step: 0,
            userData: {},
            choices: [],
            accountType: 'basic', // Track account type selection
            investmentAmount: 0, // Track investment amount
            selectedCard: null, // Track selected credit card
            loanAmount: 0, // Track loan amount
            currentTCPage: 1, // Track T&C page for loan
            documentsUploaded: {} // Track document uploads
        };
        this.moneyLost = 0; // Track total money lost

        this.characters = {
            ramesh: {
                name: "Ramesh",
                avatar: "👨💼",
                description: "Middle-aged professional looking for savings options",
                device: "Samsung Galaxy",
                journey: "Banking Journey",
goal: "Ramesh is new to digital finance. Help him deposit his money into a zero-balance savings account."
            },
            payal: {
                name: "Payal",
                avatar: "👩💻",
                description: "Young professional interested in investments",
                device: "iPhone",
                journey: "Investment Journey",
goal: "Payal is new to mutual funds and wants to invest for just 3–4 months."
            }
        };

        this.mutualFunds = [
            {
                name: "Ultra High Return Equity Fund",
                category: "Equity",
                expectedReturn: 22,
                riskLevel: "High",
                minInvestment: 1000,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Mega Growth Direct Plan",
                category: "Equity",
                expectedReturn: 20,
                riskLevel: "High",
                minInvestment: 500,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Super SIP Booster Fund",
                category: "Hybrid",
                expectedReturn: 18,
                riskLevel: "Medium-High",
                minInvestment: 1000,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Premium Growth Fund",
                category: "Equity",
                expectedReturn: 16,
                riskLevel: "High",
                minInvestment: 2000,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Dynamic Equity Fund",
                category: "Equity",
                expectedReturn: 15,
                riskLevel: "Medium-High",
                minInvestment: 1500,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Balanced Advantage Fund",
                category: "Hybrid",
                expectedReturn: 12,
                riskLevel: "Medium",
                minInvestment: 500,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Large Cap Equity Fund",
                category: "Equity",
                expectedReturn: 11,
                riskLevel: "Medium",
                minInvestment: 1000,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Conservative Hybrid Fund",
                category: "Hybrid",
                expectedReturn: 8,
                riskLevel: "Low-Medium",
                minInvestment: 500,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Debt Plus Fund",
                category: "Debt",
                expectedReturn: 7,
                riskLevel: "Low",
                minInvestment: 1000,
                isHighInterest: true,
                exitLoad: "3% if redeemed before 6 months"
            },
            {
                name: "Liquid Fund",
                category: "Debt",
                expectedReturn: 5,
                riskLevel: "Very Low",
                minInvestment: 500,
                isHighInterest: false,
                exitLoad: "Nil"
            }
        ];

        this.stockNews = [
            "Sensex hits all-time high of 73,000 points",
            "IT stocks rally on strong Q3 results",
            "Banking sector shows robust growth",
            "FMCG stocks under pressure due to inflation"
        ];

        this.creditCards = [
            {
                name: "Sky Miles Platinum Card",
                benefits: "5X airline points, lounge access",
                annualFee: 10000,
                type: "premium"
            },
            {
                name: "Hotel Rewards Gold Card",
                benefits: "3X hotel points, complimentary stays",
                annualFee: 7500,
                type: "premium"
            },
            {
                name: "Food & Entertainment Card",
                benefits: "10% cashback on food delivery, movie tickets",
                annualFee: 5000,
                type: "lifestyle"
            },
            {
                name: "Shopping Rewards Card",
                benefits: "5% cashback on online shopping, EMI benefits",
                annualFee: 2500,
                type: "shopping"
            },
            {
                name: "Basic Lifetime Free Card",
                benefits: "1% cashback on all purchases",
                annualFee: 0,
                type: "basic"
            }
        ];

        this.selectedFund = null;
        this.initializeGame();
    }

    initializeGame() {
        this.setupEventListeners();
        this.showCharacterSelection();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // Character selection
        document.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const character = e.currentTarget.dataset.character;
                this.selectCharacter(character);
            });
        });

        // Restart and navigation buttons
        document.getElementById('restartGame').addEventListener('click', () => this.restartGame());
        document.getElementById('playAgain').addEventListener('click', () => this.restartGame());
        document.getElementById('switchCharacter').addEventListener('click', () => this.showCharacterSelection());

        // Modal controls
        document.getElementById('closeSimulator').addEventListener('click', () => this.closeSimulator());
        document.getElementById('investNow').addEventListener('click', () => this.proceedToInvestment());

        // Simulator controls
        document.getElementById('amountSlider').addEventListener('input', (e) => this.updateSimulator());
        document.getElementById('yearsSlider').addEventListener('input', (e) => this.updateSimulator());
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        if (isDarkMode) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            themeToggle.textContent = '☀️ Light';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('darkMode', newTheme === 'dark');
            themeToggle.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        });
    }

    showCharacterSelection() {
        document.getElementById('characterSelection').classList.add('active');
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('resultsScreen').classList.remove('active');
    }

    selectCharacter(characterId) {
        this.currentCharacter = this.characters[characterId];
        this.gameState = { 
            step: 0, 
            userData: {}, 
            choices: [],
            accountType: 'basic',
            investmentAmount: 0,
            selectedCard: null,
            loanAmount: 0,
            currentTCPage: 1,
            documentsUploaded: {}
        };
        this.darkPatternsAvoided = 0;
        this.moneyLost = 0;
        this.updateScore();

        document.getElementById('characterSelection').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');
        this.updateCharacterDisplay();
        this.startJourney(characterId);
    }

    updateCharacterDisplay() {
        const characterDisplay = document.getElementById('currentCharacter');
        const goalText = document.getElementById('goalText');

        characterDisplay.innerHTML = `
            <div class="avatar">${this.currentCharacter.avatar}</div>
            <div>
                <h3>${this.currentCharacter.name}</h3>
                <p>${this.currentCharacter.device}</p>
            </div>
        `;

        goalText.textContent = this.currentCharacter.goal;
    }

    startJourney(characterId) {
        if (characterId === 'ramesh') {
            this.showRameshDashboard();
        } else {
            this.showPayalDashboard();
        }
    }

    // RAMESH JOURNEY - Updated with all requested changes
    showRameshDashboard() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">100%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content banking-app">
                        <div class="app-header-main">
                            <h2 class="app-title">SafeBank</h2>
                            <p class="welcome-message">Banking made simple</p>
                        </div>
                        <div class="dashboard-content">
                            <div class="cta-card" id="registerButton">
                                <h3>Get started with high-interest savings today!</h3>
                            </div>

                            <div class="features-grid">
                                <div class="feature-card" id="saveMoney">
                                    <div class="feature-icon">💰</div>
                                    <h4 class="feature-title">Save Money</h4>
                                </div>
                                <div class="feature-card" id="growWealth">
                                    <div class="feature-icon">📈</div>
                                    <h4 class="feature-title">Grow Wealth</h4>
                                </div>
                                <div class="feature-card" id="secureBanking">
                                    <div class="feature-icon">🔒</div>
                                    <h4 class="feature-title">Secure Banking</h4>
                                </div>
                                <div class="feature-card" id="easyAccess">
                                    <div class="feature-icon">📱</div>
                                    <h4 class="feature-title">Easy Access</h4>
                                </div>
                            </div>
                        </div>
                        <div class="bottom-nav">
                            <div class="nav-item active">
                                <div class="nav-icon">🏠</div>
                                <div>Home</div>
                            </div>
                            <div class="nav-item" id="accountsNav">
                                <div class="nav-icon">💳</div>
                                <div>Accounts</div>
                            </div>
                            <div class="nav-item" id="transferNav">
                                <div class="nav-icon">💸</div>
                                <div>Transfer</div>
                            </div>
                            <div class="nav-item" id="profileNav">
                                <div class="nav-icon">👤</div>
                                <div>Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for dashboard elements
        document.getElementById('registerButton').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('saveMoney').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('growWealth').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('secureBanking').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('easyAccess').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('accountsNav').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('transferNav').addEventListener('click', () => this.showRegistrationForm());
        document.getElementById('profileNav').addEventListener('click', () => this.showRegistrationForm());
    }

    // Screen 2 - Updated Registration Form (Savings Account)
    showRegistrationForm() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:31</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">99%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <h2 class="form-title">Savings Account</h2>
                            <form id="registrationForm">
                                <div class="form-group">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" class="form-control" value="Ramesh Kumar" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone Number</label>
                                    <input type="tel" class="form-control" value="9876543210" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" value="ramesh@email.com" required>
                                </div>

                                <div class="checkbox-group">
                                    <input type="checkbox" id="locationPermission">
                                    <label for="locationPermission">Allow location access for nearby ATMs (Optional)</label>
                                </div>

                                <div class="checkbox-group">
                                    <input type="checkbox" id="marketingConsent" checked>
                                    <label for="marketingConsent">I want to receive promotional offers and marketing communications</label>
                                </div>

                                <div class="checkbox-group">
                                    <input type="checkbox" id="termsConditions" required>
                                    <label for="termsConditions">I agree to the <a href="#" id="tcLink">Terms and Conditions</a> (Required)</label>
                                </div>

<div class="action-buttons">
    <!-- Elite account as full-width button -->
    <button type="button" class="btn btn--primary btn--full-width" id="eliteAccountBtn">
        Open Elite Account
    </button>
</div>
    <!-- Basic account as underlined link below -->
    <div style="text-align: center; margin-top: 10px;">
        <a href="#" id="basicAccountLink"
           style="color: var(--color-text-secondary); text-decoration: underline; cursor: pointer; font-size: 9px;">
            Create basic account instead
        </a>
</div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('tcLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showTermsAndConditions();
        });
document.getElementById('basicAccountLink').addEventListener('click', (e) => {
    e.preventDefault();
    this.selectAccountType('basic');
});
        document.getElementById('eliteAccountBtn').addEventListener('click', () => this.selectAccountType('elite'));

        // Track marketing consent changes
        document.getElementById('marketingConsent').addEventListener('change', (e) => {
            if (!e.target.checked) {
            }
        });
    }

    showTermsAndConditions() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'tcModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Terms and Conditions</h3>
                    <button class="modal-close" id="closeTCModal">×</button>
                </div>
                <div class="modal-body">
                    <div id="tcContent" style="max-height: 400px; overflow-y: auto;">
                        <h4>Page 1 - General Terms</h4>
                        <p>This Banking Agreement ("Agreement") governs your use of banking services provided by SafeBank. By opening an account, you agree to be bound by these terms...</p>
                        <br><br><br><br><br>

                        <h4>Page 2 - Account Opening</h4>
                        <p>Account opening is subject to verification of documents and compliance with regulatory requirements. The Bank reserves the right to accept or reject any account opening application...</p>
                        <br><br><br><br><br>

                        <h4>Page 3 - Service Charges</h4>
                        <p>The Bank may levy service charges for various services. These charges are subject to change with prior notice. Please refer to the Schedule of Charges...</p>
                        <br><br><br><br><br>

                        <h4>Page 4 - Digital Services</h4>
                        <p>Digital banking services are provided subject to system availability. The Bank shall not be liable for any loss due to system downtime or technical issues...</p>
                        <br><br><br><br><br>

                        <h4>Page 5 - Privacy Policy</h4>
                        <p>We collect and process your personal information in accordance with applicable privacy laws. Your data may be shared with regulatory authorities as required...</p>
                        <br><br><br><br><br>

                        <h4>Page 6 - Liability</h4>
                        <p>The Bank's liability is limited to the extent permitted by law. Customers are responsible for maintaining the confidentiality of their account credentials...</p>
                        <br><br><br><br><br>

                        <h4>Page 7 - Amendments</h4>
                        <p>The Bank reserves the right to modify these terms at any time. Changes will be notified through the official website or mobile application...</p>
                        <br><br><br><br><br>

                        <h4>Page 8 - Dispute Resolution</h4>
                        <p>Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of courts in Mumbai. Alternative dispute resolution mechanisms may be available...</p>
                        <br><br><br><br><br>

                        <h4>Page 9 - Elite Account Special Terms</h4>
                        <p><strong>Elite Account Requirements:</strong><br>
                        - Minimum Account Balance (MAB): ₹1,00,000<br>
                        - Penalty for non-maintenance of MAB: ₹5,000 per month<br>
                        - ATM Card Annual Fee: ₹1,000<br>
                        - Premium customer service and benefits included<br>
                        - Higher interest rates on fixed deposits<br>
                        - Complimentary insurance coverage<br><br>

                        <strong>Basic Account Features:</strong><br>
                        - Zero Minimum Account Balance<br>
                        - Free ATM card<br>
                        - Standard interest rate: 3.3% per annum<br>
                        - Basic banking services included</p>
                        <br><br><br><br><br>

                        <h4>Page 10 - Final Terms</h4>
                        <p>By proceeding with account opening, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions mentioned herein...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('closeTCModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    selectAccountType(type) {
        const termsCheckbox = document.getElementById('termsConditions');
        if (!termsCheckbox.checked) {
            alert('Please accept the Terms and Conditions to proceed.');
            return;
        }

        this.gameState.accountType = type;

        // NEW: Check marketing consent checkbox status
        const marketingCheckbox = document.getElementById('marketingConsent');
        const marketingUnticked = !marketingCheckbox.checked;

        // NEW: Dark pattern counting logic based on checkbox and account type
        if (marketingUnticked && type === 'basic') {
            this.addDarkPattern("Unticked marketing consent and chose Basic account");
            this.addDarkPattern("Selected Basic Account over Elite Account");
        } else if (marketingUnticked && type === 'elite') {
            this.addDarkPattern("Unticked marketing consent but chose Elite account");
        } else if (!marketingUnticked && type === 'basic') {
            this.addDarkPattern("Selected Basic Account over Elite Account");
        }
        // If checkbox not pre-ticked and player chooses Elite → count as 0 (no dark pattern added)

        this.proceedToDocuments();
    }

    // Screen 3 - Updated Document Upload
    proceedToDocuments() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:32</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <h2 class="form-title">Upload Documents</h2>
                            <p style="text-align: center; margin-bottom: 20px; color: var(--color-text-secondary);">
                                Please upload the following documents to complete your account opening
                            </p>

                            <div class="form-group">
                                <label class="form-label">Aadhaar Card (Required) *</label>
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <button type="button" class="btn btn--outline" id="uploadAadhaar">Upload</button>
                                    <span id="aadhaarStatus" style="color: var(--color-text-secondary);">Not uploaded</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">PAN Card (Required) *</label>
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <button type="button" class="btn btn--outline" id="uploadPAN">Upload</button>
                                    <span id="panStatus" style="color: var(--color-text-secondary);">Not uploaded</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Income Proof (Required for higher limits) *</label>
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <button type="button" class="btn btn--outline" id="uploadIncome">Upload</button>
                                    <span id="incomeStatus" style="color: var(--color-text-secondary);">Not uploaded</span>
                                </div>
                                <small style="color: #ff6b35;">Required for transaction limits above ₹50,000</small>
                            </div>

                            <div class="action-buttons">
                                <button type="button" class="btn btn--primary" id="submitDocsBtn">Submit Documents</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize document upload states
        this.gameState.documentsUploaded = {
            aadhaar: false,
            pan: false,
            income: false
        };

        // Add event listeners for document uploads
        document.getElementById('uploadAadhaar').addEventListener('click', () => this.uploadDocument('aadhaar'));
        document.getElementById('uploadPAN').addEventListener('click', () => this.uploadDocument('pan'));
        document.getElementById('uploadIncome').addEventListener('click', () => this.uploadDocument('income'));
        document.getElementById('submitDocsBtn').addEventListener('click', () => this.submitDocuments());
    }

    uploadDocument(docType) {
        this.gameState.documentsUploaded[docType] = true;
        const statusElement = document.getElementById(docType + (docType === 'aadhaar' ? 'Status' : docType === 'pan' ? 'Status' : 'Status'));
        const statusId = docType === 'aadhaar' ? 'aadhaarStatus' : docType === 'pan' ? 'panStatus' : 'incomeStatus';
        document.getElementById(statusId).textContent = 'Uploaded ✓';
        document.getElementById(statusId).style.color = '#28a745';
    }

    submitDocuments() {
        const { aadhaar, pan, income } = this.gameState.documentsUploaded;

        if (!aadhaar || !pan) {
            alert('Please upload all required documents (Aadhaar and PAN).');
            return;
        }

        if (!income) {
            this.addDarkPattern("Submitted without uploading income proof");
        }

        this.showDepositScreen();
    }

    // Screen 4 - NEW Deposit Money Screen
    showDepositScreen() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:33</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">97%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <h2 class="form-title">Deposit Money</h2>
                            <p style="text-align: center; margin-bottom: 20px; color: var(--color-text-secondary);">
                                Make your first deposit to activate your account
                            </p>

                            <div class="deposit-options" style="margin-bottom: 20px;">
                                <h4 style="margin-bottom: 15px;">Quick Deposit Options:</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                                    <button type="button" class="btn btn--outline deposit-option" data-amount="1000">₹1,000</button>
                                    <button type="button" class="btn btn--outline deposit-option" data-amount="5000">₹5,000</button>
                                </div>
                                <div style="position: relative;">
                                    <button type="button" class="btn btn--outline deposit-option" data-amount="100000" style="width: 100%;">
                                        ₹1,00,000
                                        <span style="position: absolute; top: -8px; right: 8px; background: #ff4444; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">Popular</span>
                                    </button>
                                </div>
                                <div style="margin-top: 15px;">
                                    <input type="number" class="form-control" id="customAmount" placeholder="Enter custom amount" min="100" style="text-align: center;">
                                </div>
                                <div style="margin-top: 15px;">
                                    <p style="font-size: 12px; color: var(--color-text-secondary); text-align: center;">Selected Amount: ₹<span id="selectedAmount">0</span></p>
                                </div>
                            </div>

                            <div class="deposit-summary" style="background: var(--color-bg-3); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h4>SafeBank</h4>
                                <p style="margin: 5px 0;">Initial Deposit: ₹<span id="depositAmount">0</span></p>
                            </div>

                            <button type="button" class="btn btn--primary btn--full-width" id="depositNowBtn" style="margin-bottom: 16px;">
                                Deposit Now
                            </button>

                            <!-- MODIFIED: Skip Deposit as hyperlinked clickable element below Deposit Now -->
                            <div style="text-align: center;">
                                <a href="#" id="skipDepositLink" style="color: var(--color-text-secondary); text-decoration: underline; cursor: pointer; font-size: 14px;">Skip Deposit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Set up event listeners
        let selectedAmount = 0;

        // Handle deposit option buttons
        document.querySelectorAll('.deposit-option').forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active state from all buttons
                document.querySelectorAll('.deposit-option').forEach(btn => btn.classList.remove('btn--primary'));

                // Add active state to clicked button
                e.target.classList.add('btn--primary');

                selectedAmount = parseInt(e.target.dataset.amount);
                document.getElementById('selectedAmount').textContent = selectedAmount.toLocaleString('en-IN');
                document.getElementById('depositAmount').textContent = selectedAmount.toLocaleString('en-IN');
                document.getElementById('customAmount').value = '';
            });
        });

        // Handle custom amount input
        document.getElementById('customAmount').addEventListener('input', (e) => {
            const amount = parseInt(e.target.value) || 0;
            if (amount >= 100) {
                selectedAmount = amount;
                document.getElementById('selectedAmount').textContent = selectedAmount.toLocaleString('en-IN');
                document.getElementById('depositAmount').textContent = selectedAmount.toLocaleString('en-IN');

                // Remove active state from preset buttons
                document.querySelectorAll('.deposit-option').forEach(btn => btn.classList.remove('btn--primary'));
            }
        });

        // Handle deposit now button
        document.getElementById('depositNowBtn').addEventListener('click', () => {
            if (selectedAmount < 100) {
                alert('Please select a deposit amount of at least ₹100');
                return;
            }
            this.showAccountCongratulations(selectedAmount);
        });

        // MODIFIED: Handle skip deposit link (still counts as dark pattern avoided)
        document.getElementById('skipDepositLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.addDarkPattern("Skipped initial deposit");
            this.showAccountCongratulations(0);
        });
    }

    // Screen 5 - Updated Account Congratulations Screen
    showAccountCongratulations(depositAmount) {
        const accountDetails = this.gameState.accountType === 'elite' ? {
            type: 'Elite Account',
            mab: '₹1,00,000 Minimum Balance',
            penalty: '₹5,000 penalty for non-maintenance',
            atmCard: 'ATM card fee: ₹1,000 annually',
            interest: '4.5% interest on savings'
        } : {
            type: 'Basic Savings Account',
            mab: 'Zero Minimum Balance',
            penalty: 'No penalties',
            atmCard: 'Free ATM card',
            interest: '3.3% interest on savings'
        };

        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:34</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">96%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #28a745, #20c997); color: white; border-radius: 10px; margin-bottom: 20px;">
                                <h2 style="margin: 0 0 10px 0; color: white;">🎉 Account Opened Successfully!</h2>
                                <p style="margin: 0; opacity: 0.9;">Welcome to SafeBank</p>
                            </div>

                            <div class="account-details" style="background: #603b94; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="margin-bottom: 15px; color: var(--color-text);">${accountDetails.type}</h3>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    <li style="padding: 5px 0; border-bottom: 1px solid #dee2e6;">✓ ${accountDetails.mab}</li>
                                    <li style="padding: 5px 0; border-bottom: 1px solid #dee2e6;">✓ ${accountDetails.atmCard}</li>
                                    <li style="padding: 5px 0; border-bottom: 1px solid #dee2e6;">✓ ${accountDetails.interest}</li>
                                    <li style="padding: 5px 0;">${accountDetails.penalty === 'No penalties' ? '✓' : '⚠️'} ${accountDetails.penalty}</li>
                                </ul>
                            </div>

                            ${depositAmount > 0 ? `
                            <div style="text-align: center; background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #28a745; font-weight: bold;">Initial Deposit: ₹${depositAmount.toLocaleString('en-IN')}</p>
                            </div>
                            ` : ''}

                            <div class="cta-card" style="background: linear-gradient(135deg, #ff6b35, #f7931e); margin-bottom: 20px;">
                                <h3 style="color: white; margin-bottom: 8px;">🚀 Pre-Approved Personal Loan!</h3>
                                <p style="color: white; margin: 0;">Get instant loan up to ₹5,00,000 at just 2% interest*</p>
                                <small style="color: rgba(255,255,255,0.8);">*T&C Apply - No paperwork required</small>
                            </div>

                            <div class="action-buttons">
                                <button type="button" class="btn btn--primary" id="getLoanBtn">Get Loan</button>
                            </div>
<div style="text-align: center; margin-top: 10px;">
    <a href="#" id="skipLoanLink" style="color: var(--color-text-secondary); text-decoration: underline; cursor: pointer; font-size: 12px;">
        Not Interested
    </a>
</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

document.getElementById('skipLoanLink').addEventListener('click', (e) => {
    e.preventDefault();
    this.addDarkPattern("Skipped the loan offer");
    this.completeRameshJourney();
});

        document.getElementById('getLoanBtn').addEventListener('click', () => this.showLoanDetails());
    }

    // Screen 6 - Loan Details Screen
    showLoanDetails() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:35</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">95%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <div style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 15px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="margin: 0 0 5px 0; color: white;">🚀 No Documents Required!</h3>
                                <p style="margin: 0; font-size: 14px; opacity: 0.9;">2% Monthly Interest • Instant Approval • Quick Disbursal</p>
                            </div>

                            <h2 class="form-title">Select Loan Amount</h2>

                            <div class="loan-options" style="margin-bottom: 20px;">
                                <h4 style="margin-bottom: 15px;">Popular Loan Amounts:</h4>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px;">
                                    <button type="button" class="btn btn--outline loan-option" data-amount="1000">₹1,000</button>
                                    <button type="button" class="btn btn--outline loan-option" data-amount="5000">₹5,000</button>
                                    <button type="button" class="btn btn--outline loan-option" data-amount="10000">₹10,000</button>
                                    <button type="button" class="btn btn--outline loan-option" data-amount="100000">₹1,00,000</button>
                                </div>
                                <button type="button" class="btn btn--outline loan-option" data-amount="500000" style="width: 100%;">₹5,00,000</button>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Or enter custom loan amount</label>
                                <input type="number" class="form-control" id="customLoanAmount" min="1000" max="500000" placeholder="Enter loan amount">
                            </div>

                            <div style="text-align: center; margin: 20px 0; padding: 15px; background: #fff3cd; border-radius: 8px;">
                                <p style="margin: 0; color: #856404; font-weight: bold;">Selected Amount: ₹<span id="selectedLoanAmount">0</span></p>
                                <small style="color: #856404;">Only 2% monthly interest • 30-day tenure</small>
                            </div>

                            <div class="action-buttons">
                                <button type="button" class="btn btn--primary btn--full-width" id="getLoanDetailsBtn">Get Loan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        let selectedLoanAmount = 0;

        // Add event listeners for loan options
        document.querySelectorAll('.loan-option').forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.loan-option').forEach(btn => btn.classList.remove('btn--primary'));
                document.querySelectorAll('.loan-option').forEach(btn => btn.classList.add('btn--outline'));

                // Add active class to clicked button
                e.target.classList.remove('btn--outline');
                e.target.classList.add('btn--primary');

                selectedLoanAmount = parseInt(e.target.dataset.amount);
                document.getElementById('selectedLoanAmount').textContent = selectedLoanAmount.toLocaleString('en-IN');
                document.getElementById('customLoanAmount').value = '';
            });
        });

        // Custom loan amount input
        document.getElementById('customLoanAmount').addEventListener('input', (e) => {
            const amount = parseInt(e.target.value) || 0;
            if (amount >= 1000) {
                selectedLoanAmount = amount;
                document.getElementById('selectedLoanAmount').textContent = selectedLoanAmount.toLocaleString('en-IN');

                // Remove active class from preset buttons
                document.querySelectorAll('.loan-option').forEach(btn => btn.classList.remove('btn--primary'));
                document.querySelectorAll('.loan-option').forEach(btn => btn.classList.add('btn--outline'));
            }
        });

        document.getElementById('getLoanDetailsBtn').addEventListener('click', () => {
            if (selectedLoanAmount > 0) {
                this.gameState.loanAmount = selectedLoanAmount;
                this.showLoanTermsAndConditions();
            } else {
                alert('Please select a loan amount.');
            }
        });
    }

    // Screen 7 - NEW Loan Terms & Conditions Screen
    showLoanTermsAndConditions() {
        this.gameState.currentTCPage = 1;
        this.renderLoanTC();
    }

    renderLoanTC() {
        const phoneInterface = document.getElementById('phoneInterface');
        const currentPage = this.gameState.currentTCPage;
        const totalPages = 10;

        const tcPages = {
            1: `<h4> <strong style="color: #dc3545;"> Page 1 - Loan Agreement Overview</strong></h4>
                <p style="color: #dc3545;">This Personal Loan Agreement governs the terms of the loan facility provided by SafeBank. The borrower agrees to repay the principal amount along with applicable interest and charges...</p>`,
            2: `<h4> <strong style="color: #dc3545;"> Page 2 - Eligibility Criteria</strong></h4>
                <p style="color: #dc3545;">The borrower must be an Indian resident, aged between 21-65 years, with a steady source of income. Employment history and credit score will be considered...</p>`,
            3: `<h4> <strong style="color: #dc3545;"> Page 3 - Loan Processing </strong></h4>
                <p style="color: #dc3545;">Loan processing involves verification of documents, credit assessment, and approval by the lending team. Processing time may vary from 2-7 working days...</p>`,
            4: `<h4> <strong style="color: #dc3545;"> Page 4 - Interest Calculation</strong></h4>
                <p style="color: #dc3545;">Interest will be calculated on a daily reducing balance basis. The effective annual percentage rate (APR) will be disclosed separately...</p>`,
            5: `<h4> <strong style="color: #dc3545;"> Page 5 - Repayment Terms</strong> </h4>
                <p style="color: #dc3545;">EMIs will be automatically debited from the registered bank account on the due date. Failure to pay EMIs on time will result in additional charges...</p>`,
            6: `<h4> <strong style="color: #dc3545;"> Page 6 - Prepayment & Foreclosure </strong></h4>
                <p style="color: #dc3545;">Borrowers may prepay the loan partially or in full. Prepayment charges may apply as per the loan agreement. No foreclosure charges for retail loans...</p>`,
            7: `<h4> <strong style="color: #dc3545;"> Page 7 - Default & Recovery </strong></h4>
                <p style="color: #dc3545;">In case of default, the Bank may initiate recovery proceedings. Legal action may be taken to recover the outstanding amount...</p>`,
            8: `<h4> <strong style="color: #dc3545;"> Page 8 - Data Usage & Privacy</strong></h4>
                <p style="color: #dc3545;">Customer data will be used for loan processing, credit assessment, and recovery purposes. Data may be shared with credit bureaus and collection agencies...</p>`,
            9: `<h4> <strong style="color: #dc3545;"> Page 9 - IMPORTANT LOAN TERMS </strong></h4>
                <p><strong style="color: #dc3545;">CRITICAL INFORMATION:</strong></p>
                <ul style="color: #dc3545; font-weight: bold;">
                    <li>Loan must be repaid within 30 DAYS from disbursal</li>
                    <li>Interest Rate: 24% PER ANNUM (2% per month)</li>
                    <li>Processing Fee: ₹2,999 (non-refundable)</li>
                    <li>Late payment penalty: 5% of outstanding amount per day</li>
                    <li>Recovery methods include contacting references and family members</li>
                    <li>Personal and professional contacts may be approached for recovery</li>
                    <li>Legal action will be initiated for defaults exceeding 7 days</li>
                    <li>Credit score will be severely impacted in case of default</li>
                </ul>
                <p style="color: #dc3545; font-weight: bold;">By proceeding, you acknowledge and accept these terms.</p>`,
            10: `<h4> <strong style="color: #dc3545;"> Page 10 - Final Declarations </strong></h4>
                 <p style="color: #dc3545;">The borrower declares that all information provided is true and accurate. Any misrepresentation may lead to immediate cancellation of the loan...</p>`
        };

        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:36</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">94%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <h2 class="form-title">Loan Terms & Conditions</h2>
                                <span style="color: var(--color-text-secondary); font-size: 14px;">Page ${currentPage} of ${totalPages}</span>
                            </div>

                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; height: 300px; overflow-y: auto;">
                                ${tcPages[currentPage]}
                            </div>

                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <button type="button" class="btn btn--outline" id="prevPageBtn" ${currentPage === 1 ? 'disabled' : ''}>← Previous</button>
                                <span style="color: var(--color-text-secondary);">Page ${currentPage}</span>
                                <button type="button" class="btn btn--outline" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>
                            </div>

                            <div class="action-buttons">
                                <button type="button" class="btn btn--primary" id="proceedLoanBtn">Proceed with Loan</button>
                                ${currentPage >= 9 ? '<button type="button" class="btn btn--secondary" id="skipLoanTCBtn">Skip Loan</button>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add navigation event listeners
        if (currentPage > 1) {
            document.getElementById('prevPageBtn').addEventListener('click', () => {
                this.gameState.currentTCPage--;
                this.renderLoanTC();
            });
        }

        if (currentPage < totalPages) {
            document.getElementById('nextPageBtn').addEventListener('click', () => {
                this.gameState.currentTCPage++;
                this.renderLoanTC();
            });
        }

        document.getElementById('proceedLoanBtn').addEventListener('click', () => {
            this.showLoanCongratulations();
        });

        if (currentPage >= 9) {
            document.getElementById('skipLoanTCBtn').addEventListener('click', () => {
                this.addDarkPattern("Skipped loan after reading predatory terms");
this.gameState.loanAmount = 0; 
                this.completeRameshJourney();
            });
        }
    }

    // Screen 8 - NEW Loan Congratulations Screen
    showLoanCongratulations() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone samsung">
                <div class="game-screen">
                    <div class="status-bar android">
                        <div class="status-left">
                            <span class="time">12:37</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">93%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content">
                        <div class="form-screen">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                                <h2 style="color: var(--color-success); margin-bottom: 8px;">Loan Approved!</h2>
                                <p style="color: var(--color-text-secondary);">Money will be credited to your account within 10 minutes</p>
                            </div>

                            <div style="background: var(--color-bg-4); padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid var(--color-error);">
                                <h4 style="color: var(--color-error); margin: 0 0 8px 0;">Loan Details</h4>
                                <div style="color: var(--color-text);">
                                    <p><strong>Amount:</strong> ₹${this.gameState.loanAmount.toLocaleString('en-IN')}</p>
                                    <p><strong>Interest Rate:</strong> 2% per month</p>
                                    <p><strong>Tenure:</strong> 30 days</p>
                                    <p><strong>Total Repayment:</strong> ₹${Math.floor(this.gameState.loanAmount * 1.02).toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            <div style="background: var(--color-bg-2); padding: 12px; border-radius: 6px; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 12px; color: var(--color-text);"><strong>Important:</strong> Failure to repay within 30 days will result in additional penalties and contact with your references.</p>
                            </div>

                            <button type="button" class="btn btn--primary btn--full-width" id="continueToResultsBtn">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('continueToResultsBtn').addEventListener('click', () => {
            this.completeRameshJourney();
        });
    }

    completeRameshJourney() {
        this.calculateRameshMoneyLost();
        this.showResults();
    }

    calculateRameshMoneyLost() {
        this.moneyLost = 0;
         if (this.gameState.accountType === 'basic') {
            this.moneyLost += 0;
        }
  
        // Account type losses
        if (this.gameState.accountType === 'elite') {
            this.moneyLost += 6000; // ATM card fee + MAB penalty
        }

        // Loan losses (12% of loan amount)
        if (this.gameState.loanAmount > 0) {
            this.moneyLost += Math.floor(this.gameState.loanAmount * 0.12);
        }
    }

    // PAYAL JOURNEY - New 6 Screen Implementation
    showPayalDashboard() {
        const phoneInterface = document.getElementById('phoneInterface');
        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main">
                            <h1 class="app-title">InvestSmart</h1>
                            <p class="welcome-message">Grow your wealth smartly</p>
                        </div>

                        <div class="dashboard-content">
                            <!-- Big Registration Banner -->
                            <div class="cta-card" style="background: linear-gradient(135deg, #FF6B35, #F7931E); margin-bottom: 20px;" onclick="window.game.showRegistrationScreen()">
                                <h3 style="color: white; margin-bottom: 8px;">Register to double your portfolio</h3>
                                <p style="opacity: 0.9; color: white;">Start investing with top performing funds</p>
                            </div>

                            <!-- Dashboard Features -->
                            <div class="features-grid">
                                <div class="feature-card" onclick="window.game.showRegistrationScreen()">
                                    <div class="feature-icon">📈</div>
                                    <h4 class="feature-title">Mutual Funds</h4>
                                </div>
                                <div class="feature-card" onclick="window.game.showRegistrationScreen()">
                                    <div class="feature-icon">💰</div>
                                    <h4 class="feature-title">SIP Plans</h4>
                                </div>
                                <div class="feature-card" onclick="window.game.showRegistrationScreen()">
                                    <div class="feature-icon">🎯</div>
                                    <h4 class="feature-title">Goal Planning</h4>
                                </div>
                                <div class="feature-card" onclick="window.game.showRegistrationScreen()">
                                    <div class="feature-icon">📊</div>
                                    <h4 class="feature-title">Analytics</h4>
                                </div>
                            </div>

                            <!-- Market Updates -->
                            <div class="news-section">
                                <h4 class="section-title">Market Updates</h4>
                                <div class="news-list">
                                    <div class="news-item" onclick="window.game.showRegistrationScreen()">Sensex hits all-time high - Great time to invest</div>
                                    <div class="news-item" onclick="window.game.showRegistrationScreen()">Equity funds show strong performance</div>
                                    <div class="news-item" onclick="window.game.showRegistrationScreen()">Top fund managers recommend diversification</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
// ✅ Payal Registration Screen (styled like Ramesh, inline onclick)
showRegistrationScreen() {
    const phoneInterface = document.getElementById('phoneInterface');

    phoneInterface.innerHTML = `
        <div class="game-phone iphone">
            <div class="game-screen">
                <div class="status-bar ios">
                    <div class="status-left">
                        <span class="time">12:30</span>
                    </div>
                    <div class="status-right">
                        <span class="battery">98%</span>
                        <span class="network">📶</span>
                    </div>
                </div>
                <div class="app-content">
                    <div class="form-screen">
                        <h2 class="form-title">Mutual Fund Registration</h2>
                        <form>
                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" value="Payal Sharma" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" value="payal.sharma@email.com" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" value="+91-9876543210" required>
                            </div>

                            <div class="checkbox-group">
                                <input type="checkbox" id="marketingConsent" checked>
                                <label for="marketingConsent">I agree to receive marketing communications</label>
                            </div>

                            <div class="checkbox-group">
                                <input type="checkbox" id="termsConsent" required>
                                <label for="termsConsent">
                                    I agree to the 
                                    <a href="#" onclick="window.game.showPayalTermsModal(); return false;">Terms and Conditions</a> (Required)
                                </label>
                            </div>

                            <div class="action-buttons">
                                <button type="button" class="btn btn--primary btn--full-width" onclick="window.game.validateRegistration()">
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// ✅ Payal Terms & Conditions Modal
showPayalTermsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'payalTcModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Terms and Conditions</h3>
                <button class="modal-close" onclick="document.body.removeChild(document.getElementById('payalTcModal'))">×</button>
            </div>
            <div class="modal-body">
                <div id="tcContent" style="max-height: 400px; overflow-y: auto;">
                    <h4>Page 1 - General Terms</h4>
                    <p>Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully...</p>
                    <br><br><br><br><br>

                    <h4>Page 2 - Eligibility</h4>
                    <p>Investor must be over 18 years old and compliant with KYC requirements...</p>
                    <br><br><br><br><br>
<h4>Page 3 - Service Charges</h4>
                        <p>The Bank may levy service charges for various services. These charges are subject to change with prior notice. Please refer to the Schedule of Charges...</p>
                        <br><br><br><br><br>

                        <h4>Page 4 - Digital Services</h4>
                        <p>Digital banking services are provided subject to system availability. The Bank shall not be liable for any loss due to system downtime or technical issues...</p>
                        <br><br><br><br><br>

                        <h4>Page 5 - Privacy Policy</h4>
                        <p>We collect and process your personal information in accordance with applicable privacy laws. Your data may be shared with regulatory authorities as required...</p>
                        <br><br><br><br><br>

                        <h4>Page 6 - Liability</h4>
                        <p>The Bank's liability is limited to the extent permitted by law. Customers are responsible for maintaining the confidentiality of their account credentials...</p>
                        <br><br><br><br><br>

                        <h4>Page 7 - Amendments</h4>
                        <p>The Bank reserves the right to modify these terms at any time. Changes will be notified through the official website or mobile application...</p>
                        <br><br><br><br><br>

                        <h4>Page 8 - Dispute Resolution</h4>
                        <p>Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of courts in Mumbai. Alternative dispute resolution mechanisms may be available...</p>
                        <br><br><br><br><br>

                        <h4>Page 9 - Exit Load</h4>
                        <p>An exit load will be levied if units are redeemed before the specified holding period as per scheme rules.<br>
                        </p>
                        <br><br><br><br><br>


                    <!-- Repeat up to Page 10 -->
                    <h4>Page 10 - Important Disclosures</h4>
                    <p>Returns are not guaranteed. Past performance is not indicative of future results. Exit load applies if redeemed before the specified period...</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ✅ Registration validation
validateRegistration() {
    const marketingChecked = document.getElementById('marketingConsent').checked;
    const termsChecked = document.getElementById('termsConsent').checked;

    if (!termsChecked) {
        alert("You must agree to Terms & Conditions to continue.");
        return;
    }

    // Dark Pattern Avoided if marketing is unticked
    if (!marketingChecked) {
        this.addDarkPattern("User unticked pre-ticked marketing checkbox");
    }

    this.showMutualFundsList(); // proceed to old Screen 2
}


    showMutualFundsList() {
        const phoneInterface = document.getElementById('phoneInterface');

        // Updated mutual funds list with high yield at top
        const funds = [
            { name: "Ultra Growth Fund", return: 22, risk: "Equity", exitLoad: "3% if redeemed before 6 months", isHighYield: true },
            { name: "Mega Wealth Creator", return: 20, risk: "Equity", exitLoad: "3% if redeemed before 6 months", isHighYield: true },
            { name: "Super Return Fund", return: 19.7, risk: "Hybrid", exitLoad: "3% if redeemed before 6 months", isHighYield: true },
            { name: "Premium Equity Fund", return: 19, risk: "Equity", exitLoad: "3% if redeemed before 6 months", isHighYield: true },
            { name: "Dynamic Growth Fund", return: 17, risk: "Equity", exitLoad: "3% if redeemed before 6 months", isHighYield: true },
            { name: "Balanced Advantage Fund", return: 17, risk: "Hybrid", exitLoad: "3% if redeemed before 1 year", isHighYield: true },
            { name: "Large Cap Fund", return: 15, risk: "Equity", exitLoad: "3% if redeemed before 1 year", isHighYield: true },
            { name: "Conservative Fund", return: 13, risk: "Hybrid", exitLoad: "3% if redeemed before 1 year", isHighYield: true },
            { name: "Debt Plus Fund", return: 11, risk: "Debt", exitLoad: "3% if redeemed before 1 year", isHighYield: true },
            { name: "Liquid Fund", return: 7, risk: "Liquid", exitLoad: "Nil", isHighYield: false }
        ];

        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main">
                            <h1 class="app-title">Mutual Funds</h1>
                            <p class="welcome-message">Choose the best fund for your goals</p>
                        </div>

                        <div class="funds-list">
                            ${funds.map(fund => `
                                <div class="fund-item ${fund.isHighYield ? 'high-interest' : ''}" onclick="window.game.selectFund('${fund.name}', ${fund.return}, '${fund.exitLoad}')">
                                    <div class="fund-header">
                                        <h4 class="fund-name">${fund.name}</h4>
                                        <span class="fund-return">${fund.return}%</span>
                                    </div>
                                    <div class="fund-details">
                                        <span>${fund.risk}</span>
                                        <span>Min: ₹1,000</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    selectFund(fundName, returnRate, exitLoad) {
        this.selectedFund = { 
            name: fundName, 
            return: returnRate, 
            exitLoad: exitLoad,
            isHighYield: returnRate > 7 
        };

        // Track dark pattern avoidance for liquid fund
        if (fundName === 'Liquid Fund') {
            this.addDarkPattern("Chose safe liquid fund over high-yield options");
        }

        this.showInvestmentSimulator();
    }

    showInvestmentSimulator() {
        const phoneInterface = document.getElementById('phoneInterface');

        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main">
                            <h1 class="app-title">Investment Calculator</h1>
                            <p class="welcome-message">Plan your investment</p>
                        </div>

                        <div class="dashboard-content" style="padding: 20px;">
                            <div class="card" style="margin-bottom: 20px; text-align: center;">
                                <h3>${this.selectedFund.name}</h3>
                                <p>Expected Return: <strong>${this.selectedFund.return}%</strong> p.a.</p>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Investment Amount</label>
                                <input type="range" id="amountSlider" min="1000" max="500000" value="50000" step="1000" 
                                       class="slider" style="width: 100%;" oninput="window.game.updateCalculator()">
                                <div style="text-align: center; margin-top: 8px;">
                                    <span id="amountDisplay">₹50,000</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Investment Period</label>
                                <input type="range" id="yearsSlider" min="1" max="20" value="5" 
                                       class="slider" style="width: 100%;" oninput="window.game.updateCalculator()">
                                <div style="text-align: center; margin-top: 8px;">
                                    <span id="yearsDisplay">5 years</span>
                                </div>
                            </div>

                            <div class="result-card" style="background: var(--color-bg-3); padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
                                <div>Invested Amount: <strong id="investedAmount">₹50,000</strong></div>
                                <div style="margin: 10px 0;">Expected Returns: <strong id="expectedReturns" style="color: var(--color-success);">₹1,38,414</strong></div>
                                <div>Total Value: <strong id="totalValue" style="font-size: 24px; color: var(--color-success);">₹1,88,414</strong></div>
                            </div>

                            <button class="btn btn--primary btn--full-width" onclick="window.game.showCongratulationsScreen()">
                                Continue Investment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateCalculator();
    }

    updateCalculator() {
        const amountSlider = document.getElementById('amountSlider');
        const yearsSlider = document.getElementById('yearsSlider');

        if (!amountSlider || !yearsSlider) return;

        const amount = parseInt(amountSlider.value);
        const years = parseInt(yearsSlider.value);
        const rate = this.selectedFund.return / 100;

        // Calculate compound interest
        const totalValue = amount * Math.pow(1 + rate, years);
        const returns = totalValue - amount;

        // Update displays
        document.getElementById('amountDisplay').textContent = `₹${amount.toLocaleString('en-IN')}`;
        document.getElementById('yearsDisplay').textContent = `${years} years`;
        document.getElementById('investedAmount').textContent = `₹${amount.toLocaleString('en-IN')}`;
        document.getElementById('expectedReturns').textContent = `₹${Math.round(returns).toLocaleString('en-IN')}`;
        document.getElementById('totalValue').textContent = `₹${Math.round(totalValue).toLocaleString('en-IN')}`;

        // Store investment amount for later use
        this.gameState.investmentAmount = amount;
    }

    showCongratulationsScreen() {
        const phoneInterface = document.getElementById('phoneInterface');

        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main">
                            <h1 class="app-title">Investment Successful! 🎉</h1>
                            <p class="welcome-message">Your SIP has been activated</p>
                        </div>

                        <div class="dashboard-content" style="padding: 20px;">
                            <div class="card" style="text-align: center; margin-bottom: 20px; padding: 20px;">
                                <h3>Investment Summary</h3>
                                <p><strong>Fund:</strong> ${this.selectedFund.name}</p>
                                <p><strong>Amount:</strong> ₹${this.gameState.investmentAmount.toLocaleString('en-IN')}</p>
                                <p><strong>Expected Return:</strong> ${this.selectedFund.return}% p.a.</p>
                                <p style="font-size: 12px; color: var(--color-text-secondary);"><strong>Exit Load:</strong> ${this.selectedFund.exitLoad}</p>
                            </div>

                            <!-- Special Credit Card Offer -->
                            <div class="cta-card" style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); padding: 20px; text-align: center; margin: 20px 0;">
                                <h3 style="color: white; margin-bottom: 8px;">🎯 Special Offer!</h3>
                                <p style="color: white; opacity: 0.9; margin-bottom: 12px;">✓ Lifetime free options<br>✓ Pre-approved based on your investment<br>✓ Free card with exclusive benefits</p>
<div class="action-buttons" style="margin-top: 24px;">
    <button class="btn btn--primary btn--full-width" onclick="window.game.showCreditCardOptions()">
        Get Credit Card
    </button>
</div>
                 </div>
                    </div>
                </div>
<div style="text-align: center; margin-top: 10px;">
    <a href="#" onclick="window.game.skipCreditCard(); return false;" 
       style="color: var(--color-text-secondary); text-decoration: underline; cursor: pointer; font-size: 12px;">
        Not Interested
    </a>
</div>
            </div>
        `;
    }
    skipCreditCard() {
        this.addDarkPattern("Skipped unnecessary credit card offer");
        this.completePayalJourney();
    }

    showCreditCardOptions() {
        const phoneInterface = document.getElementById('phoneInterface');

        const creditCards = [
            { name: "Sky Miles Platinum Card", benefits: "5X airline points, lounge access", fee: 10000, points: "airline" },
            { name: "Hotel Rewards Gold Card", benefits: "3X hotel points, complimentary stays", fee: 7500, points: "hotel" },
            { name: "Food & Entertainment Card", benefits: "10% cashback on food delivery, movie tickets", fee: 5000, points: "food" },
            { name: "Shopping Rewards Card", benefits: "5% cashback on online shopping, EMI benefits", fee: 2500, points: "shopping" },
            { name: "Basic Lifetime Free Card", benefits: "1% cashback on all purchases", fee: 0, points: "basic" }
        ];

        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main">
                            <h1 class="app-title">Credit Cards</h1>
                            <p class="welcome-message">Choose the perfect card for you</p>
                        </div>

                        <div class="dashboard-content" style="padding: 16px;">
                            ${creditCards.map((card, index) => `
                                <div class="card" style="margin-bottom: 16px; padding: 16px; ${card.fee === 0 ? 'border: 2px solid var(--color-success);' : ''}">
                                    <h4 style="margin-bottom: 8px;">${card.name}</h4>
                                    <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 12px;">${card.benefits}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-weight: bold; ${card.fee === 0 ? 'color: var(--color-success);' : ''}">
                                            ${card.fee === 0 ? 'Lifetime Free' : `₹${card.fee.toLocaleString('en-IN')}/year`}
                                        </span>
                                        <button class="btn btn--primary btn--sm" onclick="window.game.selectCreditCard('${card.name}', ${card.fee}, '${card.points}')">
                                            Get This Card
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    selectCreditCard(cardName, fee, cardType) {
        this.gameState.selectedCard = { name: cardName, fee: fee, type: cardType };

        // Track dark pattern avoidance for basic card
        if (cardName === 'Basic Lifetime Free Card') {
            this.addDarkPattern("Chose basic lifetime free card over premium options");
        }

        this.showCreditCardCongratulations();
    }

    showCreditCardCongratulations() {
        const phoneInterface = document.getElementById('phoneInterface');
        const selectedCard = this.gameState.selectedCard;

        const rewardDetails = {
            airline: "Earn points on flights, hotels, and travel bookings",
            hotel: "Earn points on hotel stays and dining",
            food: "Earn cashback on food delivery, restaurants, and movie tickets",
            shopping: "Earn cashback on online shopping and retail purchases",
            basic: "Earn cashback on all your everyday purchases"
        };

        phoneInterface.innerHTML = `
            <div class="game-phone iphone">
                <div class="game-screen">
                    <div class="status-bar ios">
                        <div class="status-left">
                            <span class="time">12:30</span>
                        </div>
                        <div class="status-right">
                            <span class="battery">98%</span>
                            <span class="network">📶</span>
                        </div>
                    </div>
                    <div class="app-content investment-app">
                        <div class="app-header-main" style="background: linear-gradient(135deg, #10B981, #059669);">
                            <h1 class="app-title">Card Approved! 🎉</h1>
                            <p class="welcome-message">Your credit card is on the way</p>
                        </div>

                        <div class="dashboard-content" style="padding: 20px; text-align: center;">
                            <div class="card" style="margin-bottom: 20px; padding: 20px;">
                                <h3>${selectedCard.name}</h3>
                                <p style="margin: 16px 0; padding: 12px; background: var(--color-bg-3); border-radius: 8px;">
                                    <strong>Earn Rewards:</strong><br>
                                    ${rewardDetails[selectedCard.type]}
                                </p>

                                <div style="margin: 16px 0; padding: 12px; background: ${selectedCard.fee > 0 ? 'var(--color-bg-4)' : 'var(--color-bg-3)'}; border-radius: 8px;">
                                    <strong>Annual Fee:</strong><br>
                                    ${selectedCard.fee === 0 ? 'Lifetime Free!' : `₹${selectedCard.fee.toLocaleString('en-IN')} will be charged to your first statement`}
                                </div>

                                <p style="font-size: 14px; color: var(--color-text-secondary);">
                                    Your card will be delivered within 7 business days
                                </p>
                            </div>

                            <button class="btn btn--primary btn--full-width" onclick="window.game.completePayalJourney()">
                                End Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    completePayalJourney() {
        this.calculatePayalMoneyLost();
        this.showResults();
    }


    
calculatePayalMoneyLost() {
    this.moneyLost = 0;

    // High-interest fund losses (3% of investment + message)
    if (this.selectedFund && this.selectedFund.isHighYield && this.gameState.investmentAmount > 0) {
        this.moneyLost += Math.floor(this.gameState.investmentAmount * 0.03);
    }

    // Credit card annual fee losses
    if (this.gameState.selectedCard && this.gameState.selectedCard.fee > 0) {
        this.moneyLost += Math.floor(this.gameState.selectedCard.fee * 0.50);
    }
}

    // Utility Functions
    addDarkPattern(description) {
        this.darkPatternsAvoided++;
        this.gameState.choices.push(description);
        this.updateScore();
        this.updatePatternsLog();
    }

    updateScore() {
        const scoreElement = document.querySelector('.score-display span');
        if (scoreElement) {
            scoreElement.textContent = this.darkPatternsAvoided;
        }
    }

    updatePatternsLog() {
        const logElement = document.querySelector('.patterns-log');
        if (logElement) {
            logElement.innerHTML = this.gameState.choices.map(choice => 
                `<div class="pattern-item">✓ ${choice}</div>`
            ).join('');
        }
    }

    // Updated Results Screen with Money Lost Calculation
    showResults() {
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('resultsScreen').classList.add('active');

        const resultsContent = document.getElementById('resultsContent');
        const character = this.currentCharacter;

let moneyLostMessage = '';

if (this.moneyLost === 0) {
    moneyLostMessage = `
        <div class="money-saved-section" style="background: #d4edda; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb; margin: 20px 0; text-align: center;">
            <h3 style="color: #155724;">🎉 You saved ${this.currentCharacter.name}'s money!</h3>
            <p style="color: #155724; margin: 0; font-size: 14px;">Smart choices helped avoid all losses.</p>
        </div>
    `;
} else {
    if (this.currentCharacter.name === 'Ramesh') {
        moneyLostMessage = `
            <div class="money-lost-section" style="background: #f8d7da; padding: 20px; border-radius: 8px; border: 1px solid #f5c6cb; margin: 20px 0;">
                <h3 style="color: #721c24; margin-bottom: 15px;">💸 Money Lost: ₹${this.moneyLost.toLocaleString('en-IN')}</h3>
                <div style="color: #721c24; font-size: 14px;">
                    ${this.gameState.accountType === 'elite' ? `<p>Elite Account fees & penalties: ₹6,000</p>` : ''}
                    ${this.gameState.loanAmount > 0 ? `<p>Predatory Loan Impact: ₹${Math.floor(this.gameState.loanAmount * 0.12).toLocaleString('en-IN')}</p>` : ''}
                </div>
            </div>
        `;
    } else if (this.currentCharacter.name === 'Payal') {
        moneyLostMessage = `
            <div class="money-lost-section" style="background: #f8d7da; padding: 20px; border-radius: 8px; border: 1px solid #f5c6cb; margin: 20px 0;">
                <h3 style="color: #721c24; margin-bottom: 15px;">💸 Money Lost: ₹${this.moneyLost.toLocaleString('en-IN')}</h3>
                <div style="color: #721c24; font-size: 14px;">
                    ${this.selectedFund && this.selectedFund.isHighYield ? `<p> Exit Load Fee: You selected an high interest fund, this would cost her 3% of her investment money </p>` : ''}
                    ${this.gameState.selectedCard && this.gameState.selectedCard.fee > 0 ? 
                        `<p>Credit Card Fees: The Card you selected is only worth ₹${Math.floor(this.gameState.selectedCard.fee * 0.50).toLocaleString('en-IN')}.</p>` 
                    : ''}
                </div>
            </div>
        `;
    }
}


        resultsContent.innerHTML = `
            <div class="character-summary">
                <div class="avatar" style="font-size: 48px;">${character.avatar}</div>
                <h2>${character.name}'s Journey Complete!</h2>
            </div>

<p style="margin: 10px 0; font-size: 24px; color: #7ba143; text-align:center;">
    ${character.name === 'Ramesh' 
        ? `For Ramesh – you found ${this.darkPatternsAvoided} out of 5 dark patterns.` 
        : `For Payal – you found ${this.darkPatternsAvoided} out of 3 dark patterns.`}
</p>

            ${moneyLostMessage}

            <div class="choices-summary">
                <h3>Your Smart Financial Choices:</h3>
                <ul style="text-align: left; margin-top: 16px;">
                    ${this.gameState.choices.map(choice => `<li style="margin: 8px 0;">✓ ${choice}</li>`).join('')}
                </ul>
            </div>

${this.darkPatternsAvoided === 0 || this.moneyLost > 0 ? `
<div class="warning-summary" style="background: #f8d7da; padding: 20px; border-radius: 8px; border: 2px solid #dc3545; margin: 20px 0;">
    <h3 style="color: #721c24; display: flex; align-items: center; gap: 8px;">
        ⚠️ You Fell for the Dark Patterns!
    </h3>
    <p style="color: #721c24; margin: 12px 0 0 0; line-height: 1.5;">
        ${this.darkPatternsAvoided === 0 ? 
            `The financial app successfully manipulated your decisions using deceptive design patterns. You didn't catch any of the traps they set - this is exactly how millions lose money every day!` : 
            `Despite spotting some patterns, you still lost money to their manipulative tactics.`}
    </p>
    <p style="color: #721c24; margin: 12px 0 0 0; font-weight: 600;">
        🎯 Stay Alert: These apps profit when you don't read the fine print, rush through decisions, or choose "premium" options that benefit them more than you.
    </p>
    <p style="color: #721c24; margin: 8px 0 0 0; font-size: 14px;">
        Real lesson: Always slow down, read everything, question why something is "recommended," and choose the simplest, most transparent option available.
    </p>
</div>
` : `
<div class="learning-summary" style="background: #d4edda; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb; margin: 20px 0;">
    <h3 style="color: #155724;">What You Learned:</h3>
    <p style="color: #155724; margin: 0;">
        You successfully identified and avoided ${this.darkPatternsAvoided} dark patterns in the ${character.journey.toLowerCase()}. 
        This demonstrates the importance of reading terms carefully, avoiding high-interest products, and making informed financial decisions!
    </p>
</div>
`}

            <div style="text-align: center; margin-top: 30px;">
                <p style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 15px;">
                    Share your experience and help others avoid these dark patterns!
                </p>
            </div>
        `;
    }

    restartGame() {
        this.currentCharacter = null;
        this.darkPatternsAvoided = 0;
        this.moneyLost = 0;
        this.gameState = { 
            step: 0, 
            userData: {}, 
            choices: [],
            accountType: 'basic',
            investmentAmount: 0,
            selectedCard: null,
            loanAmount: 0,
            currentTCPage: 1,
            documentsUploaded: {}
        };
        this.selectedFund = null;
        this.showCharacterSelection();
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new FintechGame();
window.game = game;
});
