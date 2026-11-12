# Holdeman Concrete — Landing Pages

Three standalone landing pages, one per ad group. **No nav links between them** —
each is a self-contained ad landing page that funnels to *call* or *quote form*.

| Page | File | Ad group |
|------|------|----------|
| Concrete Contractor (main) | `index.html` | concrete contractor |
| Shop Pads & Slabs | `shop-pads-slabs.html` | shop pads and slabs |
| Patios | `patios.html` | patios |

The main page has an in-page **section menu** (Services / Why Us / Our Work /
Reviews / Service Area / Free Quote) — it only jumps between sections, it does
**not** link to the other two pages.

## Preview locally
Double-click `Preview Site.command` (gitignored), then open http://localhost:8772

## Live address
Ads point at **holdeman-concrete.vercel.app**. It was added as a real domain on the Vercel project `holdeman-concrete`
on 2026-11-11 (before that it was a hand-set alias stuck on the July deployment). Push to `main` auto-deploys.

## Quote form (wired 2026-11-11)
- Web3Forms, key in the three forms; leads go to holdemanconcrete72802@gmail.com (set on the Web3Forms side).
- `js/main.js` sends the form in the background, then goes to `/thank-you`.
- `thank-you.html` fires the Google Ads conversion "Quote form (Web3Forms)" (AW-16885165346/QrGdCKC6yO4cEKLavPM-).
- Live browser test submit done 2026-11-11 (Web3Forms accepted, /thank-you reached, conversion fired). Inbox arrival not verified.

## Town in the headline (2026-11-11)
- The H1 on all three pages has `<span data-city>the River Valley</span>`.
- The campaign's Final URL suffix is `loc={loc_physical_ms}`; `js/main.js` maps Google's city ID to a town name
  (34 towns in the 8 counties). Unknown ID = stays "the River Valley". Test link: `/?city=Conway`.
- Sitelinks arrive as `/#services?loc=123`; the script reads that too and scrolls to the section.

## Driveways page (built 2026-11-11 — LOCAL ONLY, not pushed)
`driveways.html` is cloned from the patios page. Kennedy reviews it locally first. Photos picked by Kennedy 2026-11-11 (`images/dw-*.webp`): hero + 2 gallery shots are Clearwater Concrete jobs, the side-section photo is a Krete Works job, 4 gallery shots are Holdeman's own. The numbered picker set is in `images/_picker/` (gitignored, MANIFEST.txt maps numbers to source files). The Driveways ad group stays paused until this page is live and its ad copy is approved.

## Images
Pages load `.webp` copies (max 1200px wide). The original `.jpeg` files stay in `images/` — do not delete them
(old cached pages still ask for them).

## Notes
- Phone `479-219-7575` is a tap-to-call link everywhere (main conversion path).
- Photos are the client's real job-site photos (`images/`), copied from
  `../assets/photos/`. Swap any freely.
- Design: navy + construction-orange (from their logo) on warm concrete-white;
  Archivo + IBM Plex Sans/Mono. Fully responsive; works on phones.
- No build step — plain HTML/CSS/JS. Deploy the `site/` folder as-is.
