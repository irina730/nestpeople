# Nest People — HRO / EOR / Executive Search website

A fast, responsive, zero-dependency marketing site. Pure HTML/CSS/JS.

## Files
- `index.html` — all page content (hero, services, how-it-works, coverage, about, contact)
- `styles.css` — all styling + responsive rules
- `script.js` — mobile menu + contact-form handling

## Preview locally
```bash
cd ~/hro-eor-website
python3 -m http.server 8080
# open http://localhost:8080
```

## Customize
| Want to change | Where |
|---|---|
| Brand name "Nest People" | Search/replace in `index.html` + footer |
| Logo | inline SVG in `index.html` header + `favicon.svg` |
| Colors | `:root` variables at top of `styles.css` (`--blue` = orange, `--teal` = light amber, `--navy` = brown) |
| Email / phone | `#contact` section in `index.html` |
| Services copy | `#services` cards in `index.html` |

## Deploy (free)
**Netlify (recommended — contact form works out of the box):**
1. Push this folder to a GitHub repo, or drag-and-drop the folder at https://app.netlify.com/drop
2. The form already has the `netlify` attribute — submissions show up in your Netlify dashboard, no backend needed.

**Vercel:**
1. `npm i -g vercel` then `vercel` in this folder.
2. For the form, connect a form service (Formspree/Basin) — see note in `script.js`.

## Custom domain
Buy a domain (Namecheap/Cloudflare), then point it at Netlify/Vercel in their dashboard (Domains → Add domain).

---
*Not legal or tax advice. Have an employment attorney review EOR claims and compliance language before launch.*
