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
From this `site/` folder:
```
python3 -m http.server 8080
```
Then open http://localhost:8080

## ⚠️ Before going live — hook up the quote form
Right now the form has a placeholder. Until it's connected, submitting just shows
a "Call to book" message instead of pretending to send.

1. Make a free account at **https://formspree.io** and create a form.
2. Copy your form ID (looks like `xyzabcd`).
3. In all three files (`index.html`, `shop-pads-slabs.html`, `patios.html`),
   find `YOUR_FORM_ID` and replace it with your real ID, e.g.
   `action="https://formspree.io/f/xyzabcd"`.
4. Set the notification email in Formspree to where you want leads to land.

That's it — quote requests will then email straight to that inbox.

## Notes
- Phone `479-219-7575` is a tap-to-call link everywhere (main conversion path).
- Photos are the client's real job-site photos (`images/`), copied from
  `../assets/photos/`. Swap any freely.
- Design: navy + construction-orange (from their logo) on warm concrete-white;
  Archivo + IBM Plex Sans/Mono. Fully responsive; works on phones.
- No build step — plain HTML/CSS/JS. Deploy the `site/` folder as-is.
