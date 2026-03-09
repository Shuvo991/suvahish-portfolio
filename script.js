/* ═══════════════════════════════════════════════════════
   Suvashish Chakraborty — Portfolio Script
   Handles: scroll reveals, navbar, mobile menu,
   case study toggles, and contact form.
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Scroll Reveal (Intersection Observer) ───────
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-40px",
    }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // ── 2. Navbar scroll effect ────────────────────────
  const navbar = document.getElementById("navbar");

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ── 3. Mobile menu ────────────────────────────────
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // ── 4. Case study expand/collapse ─────────────────
  const caseToggles = document.querySelectorAll(".case-toggle");

  caseToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.dataset.target;
      const details = document.getElementById(targetId);
      const isOpen = details.classList.contains("open");

      // Close all others
      document.querySelectorAll(".case-details.open").forEach((d) => {
        d.classList.remove("open");
      });
      document.querySelectorAll(".case-toggle.active").forEach((t) => {
        t.classList.remove("active");
        t.querySelector(".toggle-text").textContent = "Read Case Study";
      });

      // Toggle current
      if (!isOpen) {
        details.classList.add("open");
        toggle.classList.add("active");
        toggle.querySelector(".toggle-text").textContent = "Hide Details";
      }
    });
  });

  // ── 5. Contact form ───────────────────────────────
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.className = "form-status error";
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.className = "form-status error";
        return;
      }

      // Simulate sending (replace with actual endpoint)
      submitBtn.querySelector("span").textContent = "Sending...";
      submitBtn.disabled = true;

      // ── Option A: mailto fallback (works without backend) ──
      const subject = encodeURIComponent(
        `Portfolio Contact from ${name}`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:suvashish991@gmail.com?subject=${subject}&body=${body}`;

      // Reset UI
      setTimeout(() => {
        submitBtn.querySelector("span").textContent = "Message Sent!";
        formStatus.textContent = "Your email client should have opened. If not, email me directly.";
        formStatus.className = "form-status success";

        setTimeout(() => {
          submitBtn.querySelector("span").textContent = "Send Message";
          submitBtn.disabled = false;
          form.reset();
          formStatus.textContent = "";
        }, 4000);
      }, 500);
    });
  }

  // ── 6. Smooth scroll for anchor links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── 7. Parallax effect on hero (subtle) ───────────
  const heroOrb = document.querySelector(".hero-orb");

  if (heroOrb && window.matchMedia("(min-width: 769px)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
          const progress = scrollY / heroHeight;
          heroOrb.style.transform = `translate(${30 * Math.sin(progress * Math.PI)}px, ${-scrollY * 0.3}px)`;
        }
      },
      { passive: true }
    );
  }

  // ── 8. Active nav link highlighting ───────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = "";
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.style.color = "var(--amber-400)";
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => navObserver.observe(section));
});
