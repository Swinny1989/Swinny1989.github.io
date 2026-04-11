# Katie's K9s – Design System

## Colour palette
| Name        | Hex       | Usage                              |
|-------------|-----------|------------------------------------|
| Cream       | `#FAF7F2` | Page backgrounds                   |
| Forest      | `#3D5A3E` | Primary — headings, buttons, nav   |
| Forest dark | `#2C4230` | Hover states                       |
| Stone       | `#8B7355` | Secondary accents, small print     |
| Amber       | `#C8956C` | CTA buttons, numbered steps        |
| Warm gray   | `#6B6560` | Body text                          |

## Typography
- **Headings** — Playfair Display (serif), via `font-serif` / `font-family: var(--font-serif)`
- **Body** — Inter (sans-serif), via `font-sans` / `font-family: var(--font-sans)`
- Both loaded via `next/font/google` in `app/layout.tsx`

## Component patterns
- Cards: `bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8`
- Primary button: `bg-[#3D5A3E] hover:bg-[#2C4230] text-white font-medium px-8 py-3 rounded-full transition-colors`
- Outline button: `border-2 border-[#3D5A3E] text-[#3D5A3E] hover:bg-[#3D5A3E] hover:text-white font-medium px-8 py-3 rounded-full transition-colors`
- Amber CTA button: `bg-[#C8956C] hover:bg-[#b07d58] text-white font-medium px-8 py-3 rounded-full transition-colors`
- Page header: `text-center mb-12` with `h1` using `font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6`
- Page subtitle: `text-[#6B6560] text-lg max-w-xl mx-auto`
- Page wrapper: `max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20` (narrow) or `max-w-5xl` (wide)

## Image sections (homepage)
- Full-bleed sections use `relative overflow-hidden` with a `fill` Next.js Image and a colour overlay div
- Parallax-style sections use fixed heights e.g. `h-[32rem] sm:h-[40rem]`

## Mobile-first
- All layouts are mobile-first
- Nav collapses to hamburger on mobile (`md:hidden` / `hidden md:flex`)
- Cards stack to single column on mobile
