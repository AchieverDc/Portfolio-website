// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const profileBtns = document.querySelectorAll(".profile-btn");
const profiles = document.querySelectorAll(".profile");
const contactForm = document.querySelector(".contact-form form");

// Theme Management
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);

    // Theme toggle event listener
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update theme toggle icon
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    // Mobile menu toggle
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Update active nav link on scroll
    this.updateActiveNavLink();
    window.addEventListener("scroll", () => this.updateActiveNavLink());
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

// Profile Switcher Management
class ProfileSwitcher {
  constructor() {
    this.currentProfile = "fullstack";
    this.init();
  }

  init() {
    profileBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const profileType = btn.getAttribute("data-profile");
        this.switchProfile(profileType);
      });
    });
  }

  switchProfile(profileType) {
    if (profileType === this.currentProfile) return;

    // Update button states
    profileBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-profile") === profileType) {
        btn.classList.add("active");
      }
    });

    // Hide current profile with fade out effect
    const currentProfileEl = document.getElementById(
      `${this.currentProfile}-profile`
    );
    const newProfileEl = document.getElementById(`${profileType}-profile`);

    currentProfileEl.style.opacity = "0";
    currentProfileEl.style.transform = "translateY(20px)";

    setTimeout(() => {
      currentProfileEl.classList.remove("active");
      newProfileEl.classList.add("active");

      // Show new profile with fade in effect
      setTimeout(() => {
        newProfileEl.style.opacity = "1";
        newProfileEl.style.transform = "translateY(0)";
      }, 50);
    }, 300);

    this.currentProfile = profileType;

    // Update page title based on active profile
    this.updatePageTitle(profileType);
  }

  updatePageTitle(profileType) {
    const titles = {
      fullstack: "Jeremiah Tani - Full Stack Developer",
      network: "Jeremiah Tani - Network Engineer",
    };
    document.title =
      titles[profileType] +
      " & " +
      (profileType === "fullstack"
        ? "Network Engineer"
        : "Full Stack Developer");
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    // Intersection Observer for scroll animations
    this.observeElements();

    // Add loading animation to initial elements
    this.addLoadingAnimations();
  }

  observeElements() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, options);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
      ".tech-item, .project-card, .about-content, .contact-form"
    );
    elementsToAnimate.forEach((el) => observer.observe(el));
  }

  addLoadingAnimations() {
    // Add staggered loading animation to tech items
    const techItems = document.querySelectorAll(".tech-item");
    techItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add("loading");
    });

    // Add loading animation to project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("loading");
    });
  }
}

// Utility Functions
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Performance Optimizations
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    // Optimize scroll events
    window.addEventListener(
      "scroll",
      Utils.throttle(() => {
        this.handleScroll();
      }, 16)
    ); // ~60fps

    // Optimize resize events
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        this.handleResize();
      }, 250)
    );

    // Preload critical resources
    this.preloadResources();
  }

  handleScroll() {
    // Add scroll-based optimizations here
    const scrollTop = window.pageYOffset;

    // Parallax effect for hero section (optional)
    const hero = document.querySelector(".hero");
    if (hero && scrollTop < hero.offsetHeight) {
      hero.style.transform = `translateY(${scrollTop * 0.1}px)`;
    }
  }

  handleResize() {
    // Handle responsive adjustments
    const width = window.innerWidth;

    // Close mobile menu if window becomes wide
    if (width > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }

  preloadResources() {
    // Preload CV files
    const cvLinks = [
      "cv/Jeremiah-Tani-Full-Stack-Developer-CV _20250726_175347_0000.pdf",
      "cv/Jeremiah-Tani-Network-Engineer-CV_20250726_180136_0000.pdf",
    ];

    cvLinks.forEach((link) => {
      const linkEl = document.createElement("link");
      linkEl.rel = "prefetch";
      linkEl.href = link;
      document.head.appendChild(linkEl);
    });
  }
}

// Error Handling
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    // Global error handling
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.error);
      // Could send to error tracking service
    });

    // Handle image loading errors
    document.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") {
          this.handleImageError(e.target);
        }
      },
      true
    );
  }

  handleImageError(img) {
    // Replace broken images with placeholder
    if (!img.dataset.errorHandled) {
      img.dataset.errorHandled = "true";
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTcwQzUwIDEzNi44NjMgNzYuODYyOSAxMTAgMTEwIDExMEMxNDMuMTM3IDExMCAxNzAgMTM2Ljg2MyAxNzAgMTcwSDE1MFY5NFEiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
    }
  }
}

// Initialize Application
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all managers
      new ThemeManager();
      new NavigationManager();
      new ProfileSwitcher();
      new AnimationManager();
      new FormManager();
      new PerformanceManager();
      new ErrorHandler();

      // Add loaded class to body for any CSS animations
      document.body.classList.add("loaded");

      console.log("Portfolio website initialized successfully");
    } catch (error) {
      console.error("Error initializing application:", error);
    }
  }
}

// Contact Form Manager
class FormManager {
  constructor(formId) {
    this.contactForm = document.getElementById("contact-form");
    this.submitBtn = this.contactForm?.querySelector(".submit-btn");

    if (this.contactForm) {
      this.contactForm.addEventListener("submit", (e) =>
        this.handleFormSubmit(e)
      );
    } else {
      console.error(`Form with ID "contact-form" not found.`);
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.contactForm);
    const data = Object.fromEntries(formData);

    if (this.validateForm(data)) {
      this.sendFormData(data);
    } else {
      this.showErrorMessage("Please fill in all fields correctly");
    }
  }

  validateForm(data) {
    const { name, email, subject, message } = data;

    // Basic empty check
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return false;
    }

    // Email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async sendFormData(data) {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        this.showSuccessMessage("Message Sent Successfully!");
        this.contactForm.reset();
      } else {
        const errorMsg = await response.text();
        this.showErrorMessage("Something went wrong: " + errorMsg);
      }
    } catch (error) {
      console.error("Request failed:", error);
      this.showErrorMessage("Network error. Please try again later.");
    }
  }

  showSuccessMessage(message) {
    if (!this.submitBtn) return;

    const originalText = this.submitBtn.textContent;
    this.submitBtn.textContent = message;
    this.submitBtn.style.background = "#10b981";

    setTimeout(() => {
      this.submitBtn.textContent = originalText;
      this.submitBtn.style.background = "";
    }, 3000);
  }

  showErrorMessage(message) {
    if (!this.submitBtn) return;

    const originalText = this.submitBtn.textContent;
    this.submitBtn.textContent = message;
    this.submitBtn.style.background = "#ef4444";

    setTimeout(() => {
      this.submitBtn.textContent = originalText;
      this.submitBtn.style.background = "";
    }, 3000);
  }
}

// Initialize the form manager
document.addEventListener("DOMContentLoaded", () => {
  new FormManager("contact-form");
});

// Start the application
new App();
