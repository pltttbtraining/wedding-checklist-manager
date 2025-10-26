:root {
    --primary-blue: #4A90E2;
    --blue-light: #87CEEB;
    --blue-lighter: #B0E0E6;
    --blue-dark: #357ABD;
    --shadow-light: #ffffff;
    --shadow-dark: #b8b8b8;
    --background: #E6E9F0;
    --text-primary: #2C3E50;
    --text-secondary: #7F8C8D;
    --success: #27AE60;
    --warning: #F39C12;
    --danger: #E74C3C;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body.neumorphism-theme {
    background: var(--background);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    padding: 1rem;
}

/* Neumorphism Base Styles */
.neumorphism-card {
    background: var(--background);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 
        8px 8px 16px var(--shadow-dark),
        -8px -8px 16px var(--shadow-light);
    border: 1px solid rgba(255,255,255,0.2);
}

.neumorphism-pressed {
    background: var(--background);
    border-radius: 15px;
    box-shadow: 
        inset 4px 4px 8px var(--shadow-dark),
        inset -4px -4px 8px var(--shadow-light);
}

.neumorphism-input, .neumorphism-select, .neumorphism-textarea {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 15px;
    background: var(--background);
    font-size: 1rem;
    box-shadow: 
        inset 4px 4px 8px var(--shadow-dark),
        inset -4px -4px 8px var(--shadow-light);
    transition: all 0.3s ease;
    color: var(--text-primary);
}

.neumorphism-input:focus, .neumorphism-select:focus, .neumorphism-textarea:focus {
    outline: none;
    box-shadow: 
        inset 6px 6px 12px var(--shadow-dark),
        inset -6px -6px 12px var(--shadow-light);
}

.neumorphism-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 15px;
    background: var(--primary-blue);
    color: white;
    font-weight: 600;
    box-shadow: 
        6px 6px 12px var(--shadow-dark),
        -6px -6px 12px var(--shadow-light);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.neumorphism-btn:active {
    box-shadow: 
        inset 4px 4px 8px var(--blue-dark),
        inset -4px -4px 8px var(--blue-light);
    transform: scale(0.98);
}

.neumorphism-modal {
    border-radius: 25px;
    border: none;
    background: var(--background);
    box-shadow: 
        12px 12px 24px var(--shadow-dark),
        -12px -12px 24px var(--shadow-light);
}

/* App Container */
.app-container {
    max-width: 100%;
    margin: 0 auto;
}

/* Header */
.app-header {
    margin-bottom: 1.5rem;
}

.header-content {
    text-align: center;
    padding: 2rem 1rem;
}

.app-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, var(--primary-blue), var(--blue-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.app-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0.5rem 0 0 0;
}

/* Shimmer Animation */
@keyframes shimmer {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
}

.shimmer {
    animation: shimmer 3s ease-in-out infinite;
}

/* Countdown Section */
.countdown-section {
    margin-bottom: 1.5rem;
}

.countdown-container {
    text-align: center;
}

.countdown-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
}

.countdown-display {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}

.countdown-item {
    flex: 1;
    text-align: center;
}

.countdown-value {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-blue);
    border-radius: 15px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.countdown-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Progress Section */
.progress-section {
    margin-bottom: 1.5rem;
}

.progress-overview {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.progress-circle {
    position: relative;
    width: 100px;
    height: 100px;
}

.progress-bg {
    fill: none;
    stroke: var(--background);
    stroke-width: 8;
}

.progress-fill {
    fill: none;
    stroke: var(--primary-blue);
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
}

.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-blue);
}

.progress-stats {
    flex: 1;
    display: flex;
    justify-content: space-around;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* Actions Section */
.actions-section {
    margin-bottom: 1.5rem;
}

.action-btn {
    width: 100%;
    padding: 1.5rem 1rem;
    border: none;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
    color: var(--text-primary);
    text-decoration: none;
}

.action-btn:active {
    box-shadow: 
        inset 4px 4px 8px var(--shadow-dark),
        inset -4px -4px 8px var(--shadow-light);
    transform: scale(0.98);
}

.action-btn i {
    font-size: 1.5rem;
    color: var(--primary-blue);
}

.action-btn span {
    font-size: 0.9rem;
    font-weight: 500;
}

/* Tasks Section */
.tasks-section {
    margin-bottom: 2rem;
}

.category-card {
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.category-card:active {
    transform: scale(0.98);
}

.category-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1rem;
}

.category-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.category-progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.progress-text-small {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.progress-bar-container {
    flex: 1;
    height: 8px;
    background: var(--background);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 
        inset 2px 2px 4px var(--shadow-dark),
        inset -2px -2px 4px var(--shadow-light);
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), var(--blue-light));
    border-radius: 4px;
    transition: width 0.5s ease;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtask-count {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* Toggle Switch */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
    border-radius: 34px;
    box-shadow: 
        inset 4px 4px 8px var(--shadow-dark),
        inset -4px -4px 8px var(--shadow-light);
    transition: all 0.3s ease;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background: var(--text-secondary);
    border-radius: 50%;
    box-shadow: 
        2px 2px 4px var(--shadow-dark);
    transition: all 0.3s ease;
}

input:checked + .toggle-slider {
    background: var(--success);
}

input:checked + .toggle-slider:before {
    transform: translateX(24px);
    background: white;
    box-shadow: 
        -2px 2px 4px rgba(0,0,0,0.2);
}

/* Subtask List */
.subtask-item {
    display: flex;
    align-items: center;
    justify-content: between;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 15px;
    background: var(--background);
    box-shadow: 
        4px 4px 8px var(--shadow-dark),
        -4px -4px 8px var(--shadow-light);
    transition: all 0.3s ease;
}

.subtask-item:active {
    box-shadow: 
        inset 2px 2px 4px var(--shadow-dark),
        inset -2px -2px 4px var(--shadow-light);
}

.subtask-info {
    flex: 1;
}

.subtask-name {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.subtask-status {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* Auth Icon */
.auth-icon {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: var(--primary-blue);
    font-size: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .countdown-display {
        gap: 0.25rem;
    }
    
    .countdown-value {
        font-size: 1.2rem;
        padding: 0.75rem 0.25rem;
        min-height: 60px;
    }
    
    .progress-overview {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .progress-stats {
        width: 100%;
    }
    
    .app-title {
        font-size: 1.75rem;
    }
}

/* Pulse Animation for Completed Tasks */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.completed-pulse {
    animation: pulse 0.5s ease;
}

/* Smooth Transitions */
* {
    transition: color 0.3s ease, background-color 0.3s ease;
}
