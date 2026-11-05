---
name: Museo Virtual Santurbán
description: Donde el agua nace, la vida florece. A páramo museum read as an altitudinal cross-section, summit to valley.
colors:
  mist: "#dfe5e1"
  mist-deep: "#cdd7d2"
  ink: "#1e2d29"
  ink-soft: "#3d4f49"
  water: "#2f6f8f"
  water-deep: "#245a75"
  water-pale: "#a8d0e0"
  gold: "#c4ac62"
  slope-1: "#9fb3a5"
  slope-2: "#4f6b5c"
  slope-3: "#3a5148"
  slope-4: "#1a2724"
  on-slope: "#eef2ef"
  on-slope-soft: "#b5c4bc"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  subhead:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  epigraph:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.4vw, 1.9rem)"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  figure:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "\"tnum\", \"lnum\""
rounded:
  none: "0px"
spacing:
  plate-mount: "8px"
  gutter: "16px"
  gutter-md: "48px"
  gutter-lg: "80px"
  room-y: "80px"
  room-y-md: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.water-deep}"
    textColor: "{colors.mist}"
  button-outline:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-outline-hover:
    backgroundColor: "{colors.mist-deep}"
    textColor: "{colors.ink}"
  button-on-dark:
    backgroundColor: "{colors.on-slope}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "56px"
  button-on-dark-hover:
    backgroundColor: "{colors.water-pale}"
    textColor: "{colors.ink}"
  plate-mount:
    backgroundColor: "{colors.mist-deep}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate-mount}"
  nav-bar:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "56px"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-slope}"
    rounded: "{rounded.none}"
  input-field:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 48px 12px 16px"
---

# Design System: Museo Virtual Santurbán

## Overview

**Creative North Star: "The Tableau Physique"**

The site is drawn as Humboldt's altitudinal cross-section of the páramo. Scrolling is descending: every long page starts in summit mist and ends in the dark of the valley, the way water leaves the glacial lagoons and arrives in Bucaramanga. The engraved scientific plate supplies the materials: a Caslon roman for titles, its italic for scientific names and epigraphs, a narrow grotesque for lettering and tabular figures, hairline rules, dotted contour lines and straight corners.

Density is moderate and editorial. Content sits in ruled lists and labelled columns, the way a plate annotates its specimen, never in stacks of boxed cards. Depth is altitude: surfaces darken in bands (mist, slope-1, slope-2, slope-3, slope-4) as the reader goes down, and color carries position in the descent rather than decoration. Water blue is the one active accent: it marks the path, the current place, and the live control.

The build rejects the template museum: a dark full-bleed photo hero over a row of rounded cards.

**Key Characteristics:**
- Pages read top to bottom as a descent, banded light to dark.
- Engraved-plate typography: Caslon roman and italic over a tracked grotesque label.
- Hairline and dotted rules instead of boxes; zero corner radius everywhere.
- Photography lives in plate mounts with captions and credits, never full bleed.
- Water blue is reserved for path, position and action.

## Colors

A cool grey-green ground with slate ink, one lagoon blue, a rare frailejón gold, and a four-step slope ramp that darkens with altitude.

### Primary
- **Lagoon Water** (water): the drawn water line, the altimeter fill and diamond, the active-nav underline, the audio progress bar, text selection. It means path and position.
- **Deep Lagoon** (water-deep): the epigraph italic under every h1, scientific names, hover state for ink buttons and links on light ground, the focus outline on light ground.
- **Pale Lagoon** (water-pale): the water stroke on the profile, hover color for display links and the on-dark button, the focus outline inside `.on-dark` bands, the rule under "Acciones de protección".

### Secondary
- **Frailejón Gold** (gold): the flowering stalk of the drawn frailejón, footer column labels on slope-4, and the rule under "Amenazas" on slope-3. Used on dark ground or as a drawn mark only.

### Neutral
- **Summit Mist** (mist): page ground, navbar, floating panels, text on ink buttons. Also the browser theme color.
- **Deep Mist** (mist-deep): plate mounts, hover fill for outline and ghost controls, chat input tray, scrollbar track.
- **Slate Ink** (ink): all primary text, primary button fill, the altitude rule, tooltips.
- **Soft Ink** (ink-soft): secondary text, captions, credits, inactive nav, label headings.
- **Slope 1, Páramo** (slope-1): upper band of the profile and the páramo band on /santurban (water, life, field notes). Takes ink text.
- **Slope 2, Altoandino** (slope-2): middle band; climate and geology rooms. Takes on-slope text.
- **Slope 3, Valley** (slope-3): lowest profile band, home "Plano del museo", conservation room. Takes on-slope text.
- **Slope 4, Valley Floor** (slope-4): the arrival CTA and the footer. Takes on-slope text.
- **On-Slope** (on-slope) and **On-Slope Soft** (on-slope-soft): primary and secondary text on slope-2 through slope-4.

### Named Rules
**The Descent Rule.** On a long page, bands only get darker going down: mist, slope-1, slope-2, slope-3, slope-4. Never put a lighter band below a darker one; the footer is always slope-4.

**The Water Means Path Rule.** Water blue marks where the water goes, where the reader is, and what is live (progress, active nav, focus). It is not a decorative fill or a section background.

**The Gold Is Rare Rule.** Gold appears on dark slope ground or as a drawn botanical mark. It never carries body text on mist.

## Typography

**Display Font:** Libre Caslon Display (with Georgia, serif)
**Text Serif:** Libre Caslon Text, roman, bold and italic (with Georgia, serif)
**Label/Body Font:** Archivo with the width axis loaded (with system-ui, sans-serif)

**Character:** A copperplate roman cut for engraving sits over a plain, slightly narrow grotesque, the pairing of a scientific plate's title and its lettered annotations.

### Hierarchy
- **Display** (400, clamp(3rem, 8vw, 6rem), 0.92): one per page, the h1. Home pushes it to clamp(3.5rem, 11vw, 6rem) at 0.9.
- **Headline** (400, 2.25rem to 3rem, 1.05): room titles (h2), section titles, the closing statement grows to clamp(2.5rem, 6vw, 5rem).
- **Title** (400, 1.5rem to 2.25rem): species names on plates, team names, museum-plan room names, collection filter tabs, mobile menu items.
- **Subhead** (Libre Caslon Text 700, 1.25rem): h3 inside rooms (field notes, climate seasons, threats/actions).
- **Epigraph** (Libre Caslon Text italic, clamp(1.25rem, 2.4vw, 1.9rem), 1.375): the line under each h1 in deep lagoon, room notes, scientific names, captions of places, empty states.
- **Body** (Archivo 400, 1rem to 1.125rem, 1.625): running text, held to 34rem to 40rem measure.
- **Label** (Archivo 600, 0.75rem, 0.16em, uppercase): navigation, the brand lockup, primary button text, and short headings that title a column of data (species entries, footer columns, Mission/Vision).
- **Figure** (Caslon Display, 2.25rem to 3rem, tabular lining): stat values in the park's data sheet. Altitudes and counters use Archivo 600 with tabular figures.

### Named Rules
**The Italic Is Latin Rule.** Italic serif is for scientific names, place names and epigraphs. Do not italicize for emphasis in body copy; emphasis is Archivo 600.

**The Tabular Figures Rule.** Every altitude, count, plate number and time readout sets tabular lining figures, with metres written "4.290 m" (es-CO grouping, a space before the unit).

**The Label Titles Data Rule.** The tracked uppercase label titles a block of data it sits directly on (nav, column, entry). It is never a category line stacked above a display heading.

## Layout

The spatial model is a plate with a margin. Reading pages center a 72rem (max-w-6xl) column; the collection and species plates widen to 1500px; the navbar caps at 1600px. Horizontal gutters step 16px, 48px, 80px across mobile, md and lg.

/santurban is built from rooms: an 18rem left column carrying the sticky room title and italic note, content on the right (lg and up), stacked on mobile. Rooms pad 80px vertically, 112px at md. Bands of slope color wrap groups of rooms, separated inside a band by dotted contour rules.

The species page is a tableau: a three-column grid (20rem data, flexible specimen, 20rem data) with the 3D viewer centered and entries on both sides; on mobile the specimen comes first and the entries stack.

The navbar is fixed at 56px. On /santurban a fixed 112px altimeter margin sits left at md and up, and becomes a 36px strip under the navbar on mobile. Floating audio and chat controls sit bottom-right on desktop, the audio bar bottom-center on mobile.

Breakpoints are Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).

## Elevation & Depth

The system is flat. In-flow surfaces carry no shadows; depth is altitude, expressed as tonal bands that darken downward, and structure comes from hairline borders (ink at 25 to 40 percent) and 2px ink rules that open a data list.

Floating layers that sit over content (mobile menu, audio bar, chat launcher and panel) take one soft, downward ink drop so they read as lifted off the plate. Nothing else does.

### Shadow Vocabulary
- **Float low** (`box-shadow: 0 10px 28px -14px rgba(30,45,41,0.5)`): the docked audio bar and chat launcher (launcher at 0.6).
- **Float menu** (`box-shadow: 0 12px 32px -12px rgba(30,45,41,0.45)`): the mobile navigation dropdown.
- **Float panel** (`box-shadow: 0 24px 60px -24px rgba(30,45,41,0.7)`): the open chat panel.

### Named Rules
**The Altitude Is Depth Rule.** Sections never lift; they descend. Use a darker slope band, not a shadow, to separate a section.

**The Overlay-Only Shadow Rule.** A shadow is allowed only on a fixed or portalled layer floating over content, always the diffuse ink drop above. Never hard, never offset sideways, never on a plate, list row or section.

## Shapes

Corners are square everywhere (radius 0; the shadcn `--radius` is set to 0px so re-themed chat pieces inherit it). Form comes from lines: 1px hairlines at ink 25 to 40 percent, 2px ink rules opening a list, a 2px colored rule under a subhead to mark its kind, and dotted contour rules (4px dash, 6px gap, 1px tall) between rooms and in the mobile altitude line. The only diagonal is the altimeter's position marker, an 11px square rotated 45 degrees in water. Photographs sit inside a plate mount: a 1px ink/40 border with 8px of deep mist around the image.

## Components

### Buttons
Heavy, rectangular and lettered, like a stamped plate label.
- **Shape:** square corners (0px), 56px tall.
- **Primary:** ink fill, mist text, label type at 0.8rem, 28px horizontal padding, trailing arrow.
- **Hover / Focus:** fill shifts to deep lagoon over 300ms with the ease-out curve; the arrow travels 4px right. Focus is a 2px deep-lagoon outline offset 3px (pale lagoon inside dark bands).
- **Outline:** 1px ink/50 border, ink text, Archivo 600; hover darkens the border to ink and fills deep mist.
- **On dark:** on-slope fill, ink text, hover to pale lagoon. Used for the arrival CTA in the valley.
- **Text link action:** Archivo 600 with a 2px ink bottom rule and a trailing arrow, for in-room calls ("Ver estas especies en la colección").

### Plates (species and gallery)
- **Corner Style:** square.
- **Mount:** deep mist, 1px ink/40 border, 8px padding; hover darkens the border to ink and scales the image to 1.04 over 700ms inside the clip.
- **Caption:** plate number "Nº 02" in tabular Archivo, Caslon title, italic scientific name, then type and status and the photo credit in small ink-soft.
- **Fallback:** if the image fails, the plate stays mist with faint 24px ruled lines and the name in italic, never a broken-image icon.

### Ruled lists and data sheets
The workhorse container. A 2px ink rule opens the list; each row is closed by a 1px hairline; the term sits left in ink-soft and the value right, large and tabular. Room entries and museum-plan rows follow the same grammar on dark bands with on-slope/30 rules.

### Inputs / Fields
- **Style:** mist ground, 1px ink/40 border, square, 12px by 16px padding with room for a send button.
- **Focus:** border darkens to ink.

### Navigation
- **Style:** fixed mist bar, 56px, hairline bottom border. Brand lockup and links in label type.
- **States:** inactive ink-soft, hover and active ink; the active link carries a 2px water underline sitting on the bar's border, drawn from the left over 500ms.
- **Mobile:** a "Menú" label button opens a square mist panel (float menu shadow) listing rooms in Caslon at 1.5rem, active in deep lagoon, with a contour rule before the partner logo.

### Tooltips (glossary)
Glossary terms are Archivo 600 with a dotted 1.5px underline that turns solid on hover; the tooltip is an ink block with on-slope text and a rotated-square arrow.

### Audio guide
A square mist bar with a hairline border and float-low shadow: a 44px ink play button, the label "Guía de sala", a tabular time readout, and a progress track made of a 1px ink/40 hairline, a 3px water fill and a 3px ink playhead. It removes itself when narration is unavailable.

### Paramo Profile (signature)
The altitudinal cross-section SVG: three slope bands (slope-1, slope-2, slope-3) as engraved hills, three dotted contour lines at ink/28, water-ellipse lagoons, line-drawn frailejones with a gold flowering stalk, and the bear narrator on the ridge. A pale-lagoon water line draws itself from the summit lagoon to the valley once on load (2.8s after 0.5s, ease-out). Inclined lettering follows the slope: a tracked caps annotation with the species name in Caslon italic below it, as on Humboldt's plate. The water drop is the descent link; at xl it carries an ink "COMENZAR EL DESCENSO →" tag. A compact variant crops to the summit and enlarges the lettering for mobile.

### Altimeter (signature)
A fixed margin on /santurban: a hairline vertical rule with band ticks, filled from the top with a 3px water line as the reader scrolls, a water diamond at the current position, and the current altitude and life-zone name in tabular Archivo tracking beside it. On mobile it collapses to a strip under the navbar with zone, altitude and a 2px water progress line.

## Do's and Don'ts

### Do:
- **Do** order bands light to dark down the page and end on slope-4.
- **Do** set every h1 in Caslon Display with a deep-lagoon italic epigraph beneath it.
- **Do** separate rooms with dotted contour rules and open data lists with a 2px ink rule.
- **Do** mount every photograph as a plate with caption and credit, and give it the mist fallback.
- **Do** set altitudes, counts and plate numbers in tabular lining figures, "4.290 m".
- **Do** use the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)) at 300ms for color, 500ms for drawn underlines, 700ms for plate zoom, and honor reduced motion.
- **Do** keep scientific names in Caslon italic.

### Don't:
- **Don't** round corners; radius is 0 across controls, plates and panels.
- **Don't** box content as shadowed cards; use ruled lists and plate mounts.
- **Don't** put shadows on in-flow surfaces; only floating overlays get the soft ink drop.
- **Don't** use water blue as a background fill or decoration; it marks path, position and live state.
- **Don't** set gold text on mist.
- **Don't** stack a tracked caps category line above a display heading outside the profile's slope lettering.
- **Don't** run a photograph full bleed behind text.
