// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.workfraime.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.workfraime.com/","title_tag":"College Admission Consulting Irvine | WORKfraime Consulting","meta_description":"Mentored academic research papers and tailored college strategies in Irvine. Boost college application success with student mentorship and academic guidance."},{"page_url":"https://www.workfraime.com/about","title_tag":"Academic Guidance Irvine | About WORKfraime Consulting","meta_description":"Learn how WORKfraime in Irvine delivers academic guidance and tailored college strategies through mentored research papers to drive college application success."},{"page_url":"https://www.workfraime.com/services-1","title_tag":"Research Paper Assistance Irvine | WORKfraime Services","meta_description":"Comprehensive research paper assistance in Irvine, from research topic selection to publishing. Flexible mentorship programs to strengthen college applications."},{"page_url":"https://www.workfraime.com/work-process","title_tag":"Research Topic Selection Irvine | WORKfraime Process","meta_description":"Step‑by‑step research topic selection and research paper mentoring in Irvine. Structured path to publish academic research papers and support college success."},{"page_url":"https://www.workfraime.com/contact-8","title_tag":"Student Mentorship Irvine | Contact WORKfraime","meta_description":"Contact WORKfraime in Irvine for student mentorship, academic guidance, and research paper assistance to enhance your college application success."},{"page_url":"https://www.workfraime.com/accessibility-statement","title_tag":"Academic Research Papers | WORKfraime Accessibility","meta_description":"Read WORKfraime’s accessibility statement. We support inclusive access to academic research papers, mentorship programs, and college admission consulting."}],"keywords":["College Admission Consulting Irvine","Research Paper Assistance Irvine","Academic Research Papers","College Application Success","Mentorship Programs Irvine","Research Topic Selection Irvine","Student Mentorship Irvine","Academic Guidance Irvine","Publish Research Papers Irvine","Tailored College Strategies"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.workfraime.com/#organization",
  "name": "WORKfraime Consulting LLC",
  "url": "https://www.workfraime.com/",
  "logo": "https://static.wixstatic.com/media/7ec975_68d523f1e41c43f8892bab30bdaf1ce2%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/7ec975_68d523f1e41c43f8892bab30bdaf1ce2%7Emv2.png",
  "image": [
    "https://static.wixstatic.com/media/7ec975_68d523f1e41c43f8892bab30bdaf1ce2~mv2.png/v1/fill/w_256,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7ec975_68d523f1e41c43f8892bab30bdaf1ce2~mv2.png",
    "https://static.wixstatic.com/media/7ec975_c7eb7a27af33488099027fc908c61c79~mv2.jpg/v1/fill/w_144,h_88,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/7ec975_c7eb7a27af33488099027fc908c61c79~mv2.jpg",
    "https://static.wixstatic.com/media/53c1be07f7ee4118879c07a5cde54219.jpg/v1/fill/w_600,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53c1be07f7ee4118879c07a5cde54219.jpg"
  ],
  "description": "WORKfraime Consulting empowers students with exceptional college application success through individually mentored academic research papers, tailored guidance, and creative publishing solutions that help their applications stand out while building creditworthiness through compensated part-time work.",
  "email": "info@workfraime.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Irvine",
    "addressRegion": "CA",
    "postalCode": "92620",
    "addressCountry": "US"
  },
  "areaServed": "US",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "info@workfraime.com",
    "availableLanguage": "en"
  },
  "foundingDate": "2035",
  "serviceType": "Student research paper mentoring for college admissions",
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Student Research Paper Mentoring and Publishing Support",
      "description": "Individually mentored academic research paper development for high school students aged 16 and older, including topic selection, structured guidance, compensated work-for-hire arrangements, and optional pay-to-publish journal submission support to strengthen college admission applications."
    }
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
