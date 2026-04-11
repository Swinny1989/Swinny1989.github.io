# Katie's K9s – Pages & Content

## Pages
| Route             | File                                  | Description                        |
|-------------------|---------------------------------------|------------------------------------|
| `/`               | `app/page.tsx`                        | Homepage with hero, about, reviews |
| `/services`       | `app/services/page.tsx`               | Pricing cards + criteria           |
| `/how-to-book`    | `app/how-to-book/page.tsx`            | 5-step booking process             |
| `/your-dogs-stay` | `app/your-dogs-stay/page.tsx`         | What to expect during a stay       |
| `/gallery`        | `app/gallery/page.tsx`                | Photo gallery (CMS managed)        |
| `/reviews`        | `app/reviews/page.tsx`                | Customer reviews (CMS managed)     |
| `/contact`        | `app/contact/page.tsx`                | Email, phone, WhatsApp, socials    |
| `/credits`        | `app/credits/page.tsx`                | Flaticon acknowledgments           |

## CMS-managed content files
- `nextjs-site/content/gallery.json` — array of `{ src, alt }` image objects
- `nextjs-site/content/reviews.json` — array of `{ title, body, author }` review objects
- `nextjs-site/content/services.json` — services array, otherServices, criteria sections

## Nav links (in order)
Home → Services → How to Book → Your Dog's Stay → Gallery → Reviews → Contact

Defined in `nextjs-site/components/Nav.tsx`.

## Business details
- **Business name:** Katie's K9s
- **Location:** Congleton, Cheshire
- **Licence:** CE/HB232
- **Email:** katies-k9s@hotmail.com
- **Phone:** 07540 316 692
- **WhatsApp:** https://wa.me/447540316692
- **Instagram:** https://www.instagram.com/katiesk9s/
- **Facebook:** https://www.facebook.com/p/Katies-K9s-Dog-Day-Care-Home-Boarding-61567067352572/

## Images
All images live in `nextjs-site/public/images/`.
Gallery images are in `nextjs-site/public/images/gallery/`.
Key images: `lily.jpg` (hero), `Round.png` (logo), `bgimg-2/3/4.jpg` (section backgrounds).
