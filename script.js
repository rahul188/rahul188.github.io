// Main JavaScript for Rahul Kuchhadia's portfolio website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // Theme switcher
    const themeSwitch = document.querySelector('.theme-switch');
    const themeIcon = document.querySelector('.theme-switch i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile navigation toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    nav.appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Add responsive styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                color: var(--primary-color);
                z-index: 101;
            }
            
            .nav-links {
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 0;
                right: -100%;
                width: 250px;
                height: 100vh;
                background-color: #fff;
                padding: 80px 20px 20px;
                transition: right 0.3s ease;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
            
            .nav-links.show {
                right: 0;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .dark-theme .nav-links {
                background-color: #1e1e1e;
            }
        }
    `;
    
    document.head.appendChild(style);

    // Typing animation for hero section
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const phrases = ['AI & ML Specialist', 'Agentic AI Expert', 'LLM Specialist', 'CoPilot/GEMINI Expert', 'DevOps & MLOps Leader'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // GitHub contributions chart (placeholder implementation)
    const contributionsChart = document.querySelector('.github-contributions');
    if (contributionsChart) {
        // This would normally fetch real data from GitHub API
        // For demonstration, we'll create a simple visual representation
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const chartHTML = `
            <div class="contributions-header">
                <h3>GitHub Contributions</h3>
                <p>123 contributions in the last year</p>
            </div>
            <div class="contributions-calendar">
                <div class="months-row">
                    <div class="month" style="grid-column: 1 / span 4;">Jan</div>
                    <div class="month" style="grid-column: 5 / span 4;">Feb</div>
                    <div class="month" style="grid-column: 9 / span 5;">Mar</div>
                    <div class="month" style="grid-column: 14 / span 4;">Apr</div>
                    <div class="month" style="grid-column: 18 / span 5;">May</div>
                    <div class="month" style="grid-column: 23 / span 4;">Jun</div>
                    <div class="month" style="grid-column: 27 / span 5;">Jul</div>
                    <div class="month" style="grid-column: 32 / span 4;">Aug</div>
                    <div class="month" style="grid-column: 36 / span 5;">Sep</div>
                    <div class="month" style="grid-column: 41 / span 4;">Oct</div>
                    <div class="month" style="grid-column: 45 / span 4;">Nov</div>
                    <div class="month" style="grid-column: 49 / span 4;">Dec</div>
                </div>
                <div class="contributions-grid">
                    ${Array(52).fill().map((_, weekIndex) => 
                        `<div class="week" style="grid-column: ${weekIndex + 1} / span 1;">
                            ${Array(7).fill().map((_, dayIndex) => 
                                `<div class="day level-${Math.floor(Math.random() * 5)}"></div>`
                            ).join('')}
                        </div>`
                    ).join('')}
                </div>
            </div>
            <div class="contributions-footer">
                <span>Less</span>
                <div class="level-0 sample"></div>
                <div class="level-1 sample"></div>
                <div class="level-2 sample"></div>
                <div class="level-3 sample"></div>
                <div class="level-4 sample"></div>
                <span>More</span>
            </div>
            <div class="contributions-footer">
                <span>Less</span>
                <div class="level-0 sample"></div>
                <div class="level-1 sample"></div>
                <div class="level-2 sample"></div>
                <div class="level-3 sample"></div>
                <div class="level-4 sample"></div>
                <span>More</span>
            </div>
        `;
        
        contributionsChart.innerHTML = chartHTML;
        
        // Add styles for the chart
        const chartStyle = document.createElement('style');
        chartStyle.textContent = `
            .github-contributions {
                background-color: #fff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                margin-bottom: 20px;
            }
            
            .dark-theme .github-contributions {
                background-color: #1e1e1e;
            }
            
            .contributions-header {
                margin-bottom: 15px;
            }
            
            .contributions-calendar {
                margin-top: 15px;
                overflow-x: auto;
            }
            
            .months-row {
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                margin-bottom: 5px;
                width: 100%;
            }
            
            .contributions-grid {
                display: grid;
                grid-template-columns: repeat(52, 1fr);
                grid-auto-flow: dense;
                grid-gap: 3px;
            }
            
            .month {
                font-size: 12px;
                text-align: center;
                padding: 5px 0;
            }
            
            .week {
                display: grid;
                grid-template-rows: repeat(7, 1fr);
                grid-gap: 2px;
            }
            
            .day {
                width: 10px;
                height: 10px;
                border-radius: 2px;
                margin: 1px;
            }
            
            .level-0 { background-color: #ebedf0; }
            .level-1 { background-color: #9be9a8; }
            .level-2 { background-color: #40c463; }
            .level-3 { background-color: #30a14e; }
            .level-4 { background-color: #216e39; }
            
            .dark-theme .level-0 { background-color: #2d333b; }
            
            .contributions-footer {
                display: flex;
                align-items: center;
                gap: 5px;
                margin-top: 10px;
                font-size: 12px;
            }
            
            .sample {
                width: 10px;
                height: 10px;
                border-radius: 2px;
            }
        `;
        
        document.head.appendChild(chartStyle);
    }
    
    // Skills progress bars
    document.querySelectorAll('.skill-progress').forEach(skill => {
        const progress = skill.querySelector('.progress-bar');
        const percentage = progress.getAttribute('data-progress');
        
        progress.style.width = '0%';
        
        setTimeout(() => {
            progress.style.width = percentage + '%';
        }, 500);
    });
});
