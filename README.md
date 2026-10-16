# Alur Praveen — Immersive Cybersecurity Portfolio

This new portfolio is based on the supplied `Resume.pdf`. It preserves the previous portfolio as a separate project and replaces its AI/full-stack positioning with the cybersecurity experience, projects, skills and achievements in the résumé.

## Start

Node.js 20.19+ or 22.12+ and npm are recommended.

```sh
npm install
npm run dev
```

Production:

```sh
npm run build
npm run preview
```

## 3D experience

- A single, fixed Three.js world fills the entire viewport, including the whole hero. It includes a faceted security core, orbital rings, linked network nodes, a perspective grid, particles, lighting, bloom and vignette.
- Camera position follows page scroll; the core responds to pointer movement. The world remains behind translucent sections throughout the page.
- Project cards are real panels positioned and animated inside a React Three Fiber scene, with perspective-correct HTML labels. Navigate using drag, arrows, dots or the keyboard. A separate readable HTML detail panel ensures content remains available if WebGL fails.
- The 3D timeline and HTML role tabs remain synchronized. The skills cloud can be rotated by dragging.
- Magnetic links, a custom cursor, character reveals and GSAP section transitions preserve the original cinematic direction.

The interface intentionally keeps navigation, forms and long text in accessible HTML over the 3D scene. It does not rasterize important text or form controls into a canvas.

## Résumé content

The résumé download is the exact uploaded PDF, copied without modifying its contents. Source facts include:

- Aspiring cybersecurity professional; Hosapete, Karnataka.
- Movidu cybersecurity internship, January–May 2026; InternPe frontend experience, April–May 2025.
- Web Application Vulnerability Scanner, Network Intrusion Detection System, Pragovarya Rental and UK CookHouse.
- All five listed certifications; BE ISE, State Board Class XII (2022), CBSE Class X (2020).
- BEC-IEEE Operating Committee Chairperson, IEEE AESS Secretary and Outstanding Student 2025 recognition.
- Résumé-provided phone, email, LinkedIn and GitHub.

Minor spelling and spacing errors are corrected in website copy. No additional degrees, dates, job outcomes or certification credentials are invented. The date of birth is not repeated on the public-facing page; it remains in the original downloadable résumé.

## Contact form activation

The contact form implements validation, a honeypot, duplicate-submit protection, loading/success/error states, a timeout and Formspree HTTP delivery. **No verified Formspree endpoint was supplied, so direct email delivery still requires configuration.** The site never reports a fake sent message. Email and phone links work independently.

1. Create a Formspree form and verify `alurpraveen4217@gmail.com` as its destination.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_FORMSPREE_ENDPOINT` to the real `https://formspree.io/f/…` endpoint.
4. Restart locally, or add the variable in Vercel and rebuild.
5. Submit a test and confirm receipt in your inbox.

Reference: https://help.formspree.io/articles/working-with-react/building-a-form-with-javascript

Do not place private mail-service credentials in browser environment variables. VITE_ values are embedded at build time.

## Vercel

Import the project as a Git repository, select Vite, add the contact endpoint and deploy. The included `vercel.json` uses `npm run build` with `dist` output. Update the canonical and Open Graph URL in `index.html` to your Vercel/custom domain. No backend server is required.

## Files

- `src/App.jsx`: résumé sections, hero, navigation, loading and scroll behavior.
- `src/data.js`: projects, internships, skills and certifications.
- `src/components/3d/World.jsx`: full-viewport world and adaptive rendering.
- `src/components/3d/ProjectGallery.jsx`: true 3D project panels.
- `src/components/3d/Scenes.jsx`: 3D timeline, skills and contact core.
- `src/components/sections/Projects.jsx`: project controls and accessible details.
- `src/components/sections/Contact.jsx`: validated contact form.
- `src/components/ui/Effects.jsx`: cursor, magnetic links and section titles.
- `src/styles.css`: Tailwind and custom responsive visual tokens.
- `public/Praveen-Alur-Resume.pdf`: unchanged uploaded résumé.

## Performance, accessibility and checks

Mobile/low-core devices use fewer nodes and particles, lower pixel density, simpler geometry and no fullscreen post-processing. A frame-rate sample further reduces effects on slower hardware. Background rendering pauses when the tab is hidden, and local section canvases pause offscreen. Reduced-motion disables idle world motion and smooth scrolling. WebGL failures retain readable content and provide a gradient fallback.

The production build and local asset references were checked. The downloaded résumé is byte-identical to the attachment. No device-specific FPS results or live email-delivery verification are claimed. Browser/device QA remains recommended before public launch.

Project-specific live URLs were not in the résumé. Demo controls clearly identify that missing link. GitHub controls open the actual résumé-provided profile, not invented repository URLs.
