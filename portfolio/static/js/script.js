// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Store user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        document.querySelector('.dark-toggle').innerHTML = '☀️'; // Change to sun icon
    } else {
        localStorage.setItem('darkMode', 'disabled');
        document.querySelector('.dark-toggle').innerHTML = '🌙'; // Change to moon icon
    }
}

// Function to close the image modal (made globally accessible)
function closeModal() {
    const modal = document.getElementById('imgModal');
    modal.classList.remove('active');
}

// DOM Content Loaded - All main JS logic
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Check for dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-toggle').innerHTML = '☀️'; // Set sun icon if dark mode is enabled
    } else {
        document.querySelector('.dark-toggle').innerHTML = '🌙'; // Set moon icon if dark mode is disabled
    }

    // Initialize AOS - Animate On Scroll
    AOS.init({
        duration: 800, // Reduced animation duration
        once: true,      // Whether animation should happen only once - default
    });

    // Education Section Logic
    const eduItems = document.querySelectorAll('.edu-item');
    const eduCards = document.querySelectorAll('.edu-card');

    // Display the first education card by default
    if (eduItems.length > 0 && eduCards.length > 0) {
        eduItems[0].classList.add('active');
        eduCards[0].classList.add('show');
    }

    eduItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items and hide all cards
            eduItems.forEach(i => i.classList.remove('active'));
            eduCards.forEach(card => card.classList.remove('show'));

            // Add active class to clicked item and show corresponding card
            item.classList.add('active');
            const targetId = item.dataset.target;
            document.getElementById(targetId).classList.add('show');
        });
    });

   // Skills Section Animation Logic
const skillsSection = document.querySelector('.skills-section');
const skills = document.querySelectorAll('.skill');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skills.forEach(skill => {
                const percent = skill.dataset.percent;
                const color = skill.dataset.color;
                const circle = skill.querySelector('.fg'); // Foreground circle
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percent / 100) * circumference;

                // Apply the stroke-dashoffset and color for animation
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = color;

                // Get the skill name element
                const skillNameElement = skill.querySelector('.skill-name');
                if (skillNameElement) {
                    // Append the percentage to the existing skill name text
                    skillNameElement.textContent = `${skillNameElement.textContent} | ${percent}%`;
                }
            });
            // Stop observing once skills are animated
            observer.unobserve(skillsSection);
        }
    });
};

// Create an Intersection Observer for the skills section
const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

// Start observing the skills section if it exists
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
    // Portfolio Section Filtering Logic
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all category buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to the clicked button
            btn.classList.add('active');

            const filter = btn.dataset.category; // Get the filter category (e.g., 'web', 'mobile', 'all')

            portfolioCards.forEach(card => {
                // Show cards that match the filter or if filter is 'all'
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block'; // Make it visible
                    // Use a small timeout to allow display change before applying transition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Hide cards that don't match
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)'; // Animate out
                    setTimeout(() => card.style.display = 'none', 300); // Hide completely after transition
                }
            });
        });
    });

    // Portfolio Image Modal Logic
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const viewImgBtns = document.querySelectorAll('.view-img'); // Buttons to open modal

    // Open modal when 'View Image' button is clicked
    viewImgBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.dataset.img; // Get image source from data-img attribute
            modalImg.src = imgSrc;
            modal.classList.add('active'); // Show the modal
        });
    });

    // Close Modal when clicking outside the image or on the close button (delegated)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
});



  document.addEventListener('DOMContentLoaded', function () {
        const items = document.querySelectorAll('.edu-item');
        const cards = document.querySelectorAll('.edu-card');

        function showCard(id) {
            cards.forEach(card => card.classList.remove('active'));
            items.forEach(item => item.classList.remove('active'));

            const card = document.getElementById(id);
            const item = document.querySelector(`.edu-item[data-target="${id}"]`);

            if (card) card.classList.add('active');
            if (item) item.classList.add('active');
        }

        // Set first as active on page load
        if (items.length > 0) {
            const firstId = items[0].getAttribute('data-target');
            showCard(firstId);
        }

        // Add click listeners
        items.forEach(item => {
            item.addEventListener('click', () => {
            const id = item.getAttribute('data-target');
            showCard(id);
            });
        });
        });