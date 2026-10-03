---
name: Civic Authority
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#43474f'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737780'
  outline-variant: '#c3c6d0'
  surface-tint: '#396092'
  primary: '#00274e'
  on-primary: '#ffffff'
  primary-container: '#0f3d6e'
  on-primary-container: '#84a9e0'
  inverse-primary: '#a5c8ff'
  secondary: '#1d4ed8'
  on-secondary: '#ffffff'
  secondary-container: '#4069f2'
  on-secondary-container: '#fffbff'
  tertiary: '#19273a'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f3d51'
  on-tertiary-container: '#99a8bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a5c8ff'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#1e4879'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b7c4ff'
  on-secondary-fixed: '#001551'
  on-secondary-fixed-variant: '#0039b5'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  title-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-trust, authoritative, and institutional presence suitable for municipal public services and civil infrastructure oversight. Designed for three distinct personas—citizens reporting issues, municipal intake administrators, and field department officers—the interface prioritizes clarity, accountability, and seamless legibility under varied real-world conditions (from high-glare field environments to dense administrative back-office displays).

The visual aesthetic operates at the intersection of modern institutionalism and utilitarian efficiency:
- **Tone:** Objective, measured, stable, and completely devoid of decorative whimsy or playful trends.
- **Visual Stance:** Structured layouts, firm bounding boxes, precise grid alignment, clear status signposts, and rigorous WCAG AAA-compliant text contrasts.
- **Audience Impact:** Evokes civil responsibility, procedural transparency, and reassurance that issues are formally tracked and resolved.

## Colors

The palette is engineered around high-legibility municipal signals, anchored by a commanding civic navy and structured slate neutrals. Light mode serves as the primary canvas to mirror standard administrative documents and ensure outdoor legibility.

### Palette Architecture
- **Primary Canvas & Neutrals:**
  - Canvas Base: `#F8FAFC` (Slate 50)
  - Surface Default: `#FFFFFF`
  - Surface Subdued: `#F1F5F9` (Slate 100)
  - Structural Borders: `#E2E8F0` (Slate 200)
  - Strong Divider / Form Borders: `#CBD5E1` (Slate 300)
  - Body Text: `#1E293B` (Slate 800)
  - Headings & Heavy Text: `#0F172A` (Slate 900)
- **Primary Civic Identity:** `#0F3D6E` provides an unyielding, authoritative blue base for top-level navigation, primary call-to-actions, and official civic banners.
- **Secondary Interactive:** `#1D4ED8` serves as active link text, standard action triggers, and primary focus outlines.

### Functional Status System
Status indicators must never rely on color alone; they must always pair with crisp typography and distinct semantic framing:
- **Resolved / Closed:** Deep Forest Green (`#15803D`) on soft mint tinted base (`#F0FDF4`), border `#BBF7D0`.
- **In-Progress / Dispatched:** Clear Cobalt (`#2563EB`) on soft sky tinted base (`#EFF6FF`), border `#BFDBFE`.
- **Pending / Triaging / Caution:** Warm Amber (`#D97706`) on light amber tinted base (`#FFFBEB`), border `#FDE68A`.
- **Escalated / Rejected / Critical:** Urgent Crimson (`#DC2626`) on soft rose tinted base (`#FEF2F2`), border `#FECACA`.

## Typography

The design system utilizes **Public Sans** across all structural tiers. Developed explicitly for institutional interfaces, its balanced proportions, open apertures, and sturdy vertical stems provide unmatched legibility across high-density tables, multi-step citizen reporting flows, and operational incident manifests.

**JetBrains Mono** is reserved strictly for functional operational metadata, such as ticket reference numbers (e.g., `#TKT-8924-X`), GPS coordinates, and departmental equipment serial identifiers.

### Typographic Hierarchy Rules
- Maintain high editorial rigor: Headings above 20px must adopt tight letter tracking (`-0.01em` to `-0.02em`) to maintain cohesion.
- Body text is set at minimum 14px with a 1.45–1.5x line-height ratio to prevent visual fatigue during review of civic complaints.
- All badge metadata and section anchors leverage `label-sm` set in bold with slight tracking (`0.03em`) and uppercase formatting when serving as table column headers.

## Layout & Spacing

The layout model implements a structured 12-column responsive fluid grid anchored by strict content constraints to optimize intake processing speed.

### Form Factors & Breakpoints
- **Mobile (< 768px):** 4-column layout, `margin-sm: 1rem`, `gutter-sm: 1rem`. Form layouts collapse into a single vertical stack. Navigation moves to a fixed top app bar with an accessible bottom drawer or sticky action bar.
- **Tablet (768px – 1024px):** 8-column layout, `margin: 1.5rem`, `gutter: 1.5rem`. Split-screen views activate for issue list / detail inspection.
- **Desktop (> 1024px):** 12-column layout with a maximum container boundary of `1440px`. Margins expand to `margin-lg: 3rem` with `gutter-lg: 2rem`. Multi-pane workflows (e.g., persistent map view alongside an operational ticketing queue) utilize persistent sidebars with explicit widths.

### Spatial Rhythm
The spacing rhythm follows an uncompromising 4px/8px module:
- `space-xs` (4px): Micro gaps between icons and labels, chip interior spacing.
- `space-sm` (8px): Stack spacing between form label and input; button vertical interior padding.
- `space-md` (16px): Default padding for cards, lists, table cells, and field groups.
- `space-lg` (24px): Structural gaps between distinct card sections, panels, and form steps.
- `space-xl` (40px): Major landmark divisions within civic dashboards and landing headers.

## Elevation & Depth

To preserve institutional authority and eliminate visual noise, this design system discards heavy drop shadows and glassmorphic blurs in favor of **low-contrast structural outlines and subtle ambient depth**.

### Depth Layers
- **Ground Floor (Base Canvas):** Background surface set to `#F8FAFC`. Zero elevation, non-interactive.
- **Layer 1 (Cards, Data Panels, Form Sections):** Flat `#FFFFFF` surface bounded by a crisp 1px border (`#E2E8F0`). Flat elevation by default; raises to a faint, tinted ambient shadow on hover (`0 2px 4px -1px rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`).
- **Layer 2 (Dropdowns, Popovers, Date Pickers):** Elevated above content with `#FFFFFF` background, 1px border (`#CBD5E1`), and structured shadow (`0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`).
- **Layer 3 (Modals, Citizen Detail Drawers):** High priority view with dim backdrop overlay (`#0F172A` at 40% opacity) paired with a defined elevation shadow (`0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`).

Decorative gradients and saturated drop shadows are explicitly forbidden. Depth must always be verified via structural luminance differences and clean borders.

## Shapes

The shape system adopts a **Soft (Level 1)** geometry. Radii are intentionally conservative to maintain a disciplined, architectural, and legally sound visual grammar:

- **Base Components (Inputs, Buttons, Badges):** `0.25rem` (4px). Provides subtle softening without sacrificing structural rigidity.
- **Containers & Cards (`rounded-lg`):** `0.5rem` (8px). Delivers a distinct boundary for aggregated data blocks and image attachments.
- **Dialogs & Large Drawers (`rounded-xl`):** `0.75rem` (12px). Encapsulates high-context actions.

Fully rounded pill shapes are strictly restricted to status indicator dots or circular icon buttons; data-bearing chips, tags, and standard buttons maintain rectangular discipline with 4px corner radii.

## Components

### Buttons
- **Primary:** Background `#0F3D6E`, text `#FFFFFF`, radius `0.25rem`, padding `0.5rem 1rem`. On hover: `#1E40AF`. Active state shifts down to `#1E3A8A`. Focus ring: 2px offset with `#1D4ED8`.
- **Secondary:** Background `#FFFFFF`, text `#0F172A`, 1px solid `#CBD5E1`. On hover: background `#F1F5F9`, border `#94A3B8`.
- **Destructive:** Background `#DC2626`, text `#FFFFFF`. Used strictly for issue rejection, record deletion, or critical emergency flags.

### Status Chips & Badges
- **Structure:** 1px solid border, 4px corner radius, padding `0.125rem 0.5rem`, typography `label-sm`.
- **Status Resolved:** Background `#F0FDF4`, border `#BBF7D0`, text `#15803D`. Prefix with an 8px solid dot (`#16A34A`).
- **Status In-Progress:** Background `#EFF6FF`, border `#BFDBFE`, text `#1D4ED8`. Prefix with an 8px solid dot (`#2563EB`).
- **Status Pending:** Background `#FFFBEB`, border `#FDE68A`, text `#B45309`. Prefix with an 8px solid dot (`#D97706`).
- **Status Escalated:** Background `#FEF2F2`, border `#FECACA`, text `#B91C1C`. Prefix with an 8px solid dot (`#DC2626`).

### Form Inputs & Textareas
- **Resting:** Background `#FFFFFF`, 1px solid border `#CBD5E1`, text `#0F172A`, radius `0.25rem`, height `40px` (inputs), padding `0.5rem 0.75rem`.
- **Focus:** Border color `#1D4ED8`, outline 2px solid `rgba(29, 78, 216, 0.2)`.
- **Error:** Border color `#DC2626`, paired with helper text in `body-sm` using `#DC2626`.
- **Labels:** Set in `label-md` with color `#334155`, positioned directly above the input with `4px` gap. Required fields display an authoritative crimson asterisk (`*`).

### Checkboxes & Radio Buttons
- 16px × 16px geometry with 1.5px border `#94A3B8`. Checkbox radius is 3px; radio is circular.
- Selected state fills with `#0F3D6E` and displays an explicit white tick mark or centered circular dot. Focus visible state matches the secondary blue halo.

### Cards & Data Panels
- Surface `#FFFFFF`, border `1px solid #E2E8F0`, corner radius `0.5rem`.
- Header blocks feature an integrated bottom divider (`1px solid #F1F5F9`) separating metadata from issue description. Internal padding is strictly `1.25rem` (20px).

### Civic Data Tables (Back-Office & Admin Views)
- Header row set to `#F8FAFC`, typography `label-sm` uppercase, border bottom `2px solid #E2E8F0`.
- Data rows feature alternating hover states (`#F8FAFC`), `1px solid #F1F5F9` row dividers, and right-aligned action buttons to streamline bulk intake management.