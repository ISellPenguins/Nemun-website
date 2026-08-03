/* ============================================================
   NEMUN 2027 - shared chrome + interactions
   1. Injects the header/nav and footer from single-source templates
   2. Mobile nav toggle + touch dropdown
   3. Scroll reveal (IntersectionObserver, honours prefers-reduced-motion)
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Shared header ---------- */

  var NAV_ITEMS = [
    { label: "Home", href: "main.html" },
    {
      label: "About",
      href: "main.html#about",
      children: [
        { label: "Secretariats", href: "secretariats.html" },
        { label: "Meet the team", href: "team.html" },
        { label: "Venue", href: "main.html#venue" }
      ]
    },
    { label: "Registration", href: "registration.html" },
    {
      label: "Conference",
      href: "main.html#conference",
      children: [
        { label: "Theme introduction", href: "theme-introduction.html" },
        { label: "Keynote Speaker", href: "main.html#keynote" },
        { label: "Important Dates", href: "main.html#dates" },
        { label: "Transportation", href: "main.html#transportation" },
        { label: "Accommodation", href: "main.html#accommodation" }
      ]
    },
    { label: "Committee", href: "main.html#committee" },
    { label: "Contact Us", href: "main.html#contact" },
    { label: "JMUN", href: "main.html#jmun" }
  ];

  var current = (document.body && document.body.dataset.page) || "";

  function isCurrent(href) {
    var page = href.split("#")[0];
    return page === current;
  }

  function renderNav() {
    var html = '<header class="site-header">';
    html += '<nav class="nav container" aria-label="Primary">';
    html += '<a class="brand" href="main.html">NEMUN 2027</a>';

    html += '<button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="site-nav">';
    html += "<span></span><span></span><span></span>";
    html += "</button>";

    html += '<ul class="nav-links" id="site-nav">';

    NAV_ITEMS.forEach(function (item) {
      if (item.children) {
        html += '<li class="nav-item nav-item--dropdown">';
        html += '<a href="' + item.href + '">' + item.label + ' <span class="caret" aria-hidden="true">\u25BE</span></a>';
        html += '<ul class="dropdown">';
        item.children.forEach(function (child) {
          html += '<li><a href="' + child.href + '"' +
            (isCurrent(child.href) ? ' aria-current="page"' : "") +
            ">" + child.label + "</a></li>";
        });
        html += "</ul></li>";
      } else {
        html += "<li><a href=\"" + item.href + "\"" +
          (isCurrent(item.href) ? ' aria-current="page"' : "") +
          ">" + item.label + "</a></li>";
      }
    });

    html += "</ul>";
    html += "</nav>";
    html += "</header>";
    return html;
  }

  /* ---------- Shared footer ---------- */

  function renderFooter() {
    return (
      '<footer class="site-footer" id="contact">' +
      '<div class="container footer-top">' +
      '<div class="footer-grid">' +

      '<div>' +
      '<a class="footer-brand" href="main.html">NEMUN 2027</a>' +
      '<p class="footer-blurb">National Experimental High School at Hsinchu Science Park, Taiwan. An annual Model United Nations conference. Be a voice, not an echo.</p>' +
      '<div class="footer-socials">' +
      '<a href="#" aria-label="Instagram">Instagram</a>' +
      '<a href="#" aria-label="Facebook">Facebook</a>' +
      "</div>" +
      "</div>" +

      '<div>' +
      '<h4 class="footer-heading">Explore</h4>' +
      '<ul class="footer-links">' +
      '<li><a href="main.html">Home</a></li>' +
      '<li><a href="registration.html">Registration</a></li>' +
      '<li><a href="theme-introduction.html">Theme</a></li>' +
      '<li><a href="team.html">Meet the team</a></li>' +
      '<li><a href="secretariats.html">Secretariats</a></li>' +
      "</ul>" +
      "</div>" +

      '<div>' +
      '<h4 class="footer-heading">Contact</h4>' +
      '<div class="footer-contact">' +
      '<a href="mailto:nemun@nehs.hc.edu.tw">nemun@nehs.hc.edu.tw</a>' +
      '<span>National Experimental High School, 300 Jieshou Rd, Hsinchu City, Taiwan</span>' +
      "</div>" +
      "</div>" +

      "</div>" +

      '<div class="footer-map">' +
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.9767193521147!2d121.01625853889817!3d24.7773917178719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346836241355dfb1%3A0xfe2e46df2815ef22!2z5ZyL56uL5paw56u556eR5a245ZyS5Y2A5a-m6amX6auY57Sa5Lit562J5a245qCh!5e0!3m2!1szh-TW!2stw!4v1783504813358!5m2!1szh-TW!2stw" loading="lazy" title="NEMUN venue map" allowfullscreen></iframe>' +
      "</div>" +

      "</div>" +
      '<div class="footer-socket">' +
      '<p class="container">National Experimental High School at Hsinchu Science Park \u00A9 2027 | NEMUN</p>' +
      "</div>" +
      "</footer>"
    );
  }

  function mount() {
    var header = document.querySelector("[data-site-header]");
    var footer = document.querySelector("[data-site-footer]");
    if (header) header.innerHTML = renderNav();
    if (footer) footer.innerHTML = renderFooter();
  }

  /* ---------- Mobile nav toggle ---------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (e) {
      var t = e.target.closest(".nav-item--dropdown > a");
      if (t) {
        var item = t.parentElement;
        var isOpen = item.classList.toggle("is-open");
        t.setAttribute("aria-expanded", isOpen ? "true" : "false");
      } else if (e.target.closest("a")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */

  function initReveal() {
    var items = document.querySelectorAll(".reveal, .reveal-group");
    if (reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    mount();
    initNav();
    initReveal();
  });
})();
