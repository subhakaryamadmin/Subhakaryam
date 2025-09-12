// Preloader script
window.addEventListener('load', () => {
  document.getElementById('preloader').classList.add('loaded');
});



// App interactivity script
document.addEventListener('DOMContentLoaded', () => {
  // Hero load animation
  const heroContent = document.getElementById('hero-content');
  if (heroContent) {
      setTimeout(() => {
          heroContent.classList.add('visible');
      }, 100);
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
      });
  }

  // Smooth scrolling and mobile menu closing for nav links
  const navLinks = document.querySelectorAll('.nav-link');
  const allNavLinksInMenu = document.querySelectorAll('header nav a.nav-link');
  const closeMenu = () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
      }
  };

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          // Only process internal links
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);

            // If there's an ID, scroll to it; otherwise, scroll to top
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Remove active class from all links when scrolling to top
                allNavLinksInMenu.forEach(navLink => navLink.classList.remove('nav-active'));
            }
          }
          closeMenu();
      });
  });

  // Intersection observer for nav link active state
  const sections = document.querySelectorAll('main section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSection = entries.filter(e => e.isIntersecting).pop();
      
      allNavLinksInMenu.forEach(link => {
          link.classList.remove('nav-active');
          const href = link.getAttribute('href');
          if (visibleSection && href === `#${visibleSection.target.id}`) {
              link.classList.add('nav-active');
          }
      });
  }, { 
      rootMargin: '0px 0px -75% 0px', // Trigger when the top of a section is in the top 25% of the viewport
      threshold: 0 
  });

  sections.forEach(section => {
    if(section.id) { // Only observe sections with an ID
      sectionObserver.observe(section);
    }
  });


  // Intersection observer for reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
      revealObserver.observe(el);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("chant-audio");
  const toggleBtn = document.getElementById("mantra-toggle");
  const toggleIcon = document.getElementById("mantra-toggle-icon");

  let mantraStarted = false;  // Track if audio has started

  // Prevent initial playback
  audio.muted = false;
  audio.pause();

  // Button toggles mantra OFF
  toggleBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (!audio.paused) {
      audio.pause();
      toggleIcon.textContent = "🔇";
      mantraStarted = false; // Mark it stopped until next user click
    }
  });

  // Any click that's not the button itself plays mantra (if not already playing)
  function handlePlay(e) {
    if (e.target !== toggleBtn && e.target !== toggleIcon && audio.paused) {
      audio.muted = false;
      audio.volume = 1.0;
      audio.play().then(() => {
        toggleIcon.textContent = "🔊";
        mantraStarted = true;
      }).catch(() => {});
    }
  }

  document.body.addEventListener("click", handlePlay);
  document.body.addEventListener("touchstart", handlePlay);

  // Ensure icon is correct at start
  toggleIcon.textContent = "🔊";
});
