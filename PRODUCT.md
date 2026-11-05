# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Público general en la web, desde celular o computador: cualquier persona curiosa por el Páramo de Santurbán (habitantes de Santander y Norte de Santander, personas que reciben su agua, visitantes interesados en naturaleza colombiana). No es una herramienta de clase ni un kiosko físico, aunque debe ser legible para todas las edades.

## Product Purpose

Museo Virtual Santurbán: una exhibición digital sobre el Páramo de Santurbán ("Donde el agua nace, la vida florece"). El visitante recorre el páramo (agua, biodiversidad, clima, geología, conservación) y una colección de especies con modelos 3D.

Éxito: el visitante sale entendiendo por qué Santurbán importa (fábrica de agua para 2.3 millones de personas en 48 municipios, especies endémicas) y con ganas de protegerlo.

## Positioning

Es el páramo específico de Santurbán, no "naturaleza" genérica: sus 26 lagunas glaciares, el frailejón, el oso de anteojos, el agua que llega a Bucaramanga, Cúcuta y al Lago de Maracaibo. Las piezas de la colección son especies reales en 3D, presentadas por un narrador oso de anteojos.

## Operating Context

- Rutas: `/` (entrada con narrador y audio de bienvenida), `/santurban` (el páramo: introducción, galería, datos clave, agua, biodiversidad, curiosidades, clima, geología, conservación, CTA), `/explore` (colección de especies), `/species/[id]` (ficha con visor 3D y foto de referencia, navegación anterior/siguiente), `/about` (equipo y créditos).
- Especies y objetos vienen de Supabase (`species`, `objects`), modelos `.glb` en Supabase Storage. Contenido editorial del páramo en `data/santurban-content.json`, glosario en `data/tooltips.json`.
- Narración en audio por página y chatbot guía con IA (Gemini) flotante.

## Capabilities and Constraints

- Next.js (App Router) + Tailwind + Supabase; three.js / react-three-fiber para 3D; framer-motion / gsap disponibles.
- Idioma: español (es_CO).
- Campos de especie: common_name, scientific_name, type (fauna/flora), conservation_status, description, ecological_importance, threats, adaptations, characteristics, image_url, glb_reference.
- Narración en audio y chatbot existen; no son obligatorios en el rediseño, su forma puede cambiar.

## Brand Commitments

- Nombre: "Museo Virtual Santurbán". Lema: "Donde el agua nace, la vida florece".
- Obligatorio: el oso narrador (mascota oso de anteojos, `public/bear/*.png`, estados idle/speaking/salute).
- Obligatorio: los modelos 3D de especies.
- Créditos: Smart Center Development (CDT, `public/cdt-logo.png`), equipo en `public/team/`.

## Evidence on Hand

- Datos del páramo en `data/santurban-content.json` (2.3M personas, 48 municipios, 142.000 ha, 26+ lagunas, 293 especies de fauna, 457 de plantas, rango 0–15 °C).
- Foto hero de Wikimedia Commons; galería del páramo en `components/ui/paramo-gallery.tsx`.
- No hay fotografía propia del museo, testimonios ni cifras de visitantes: no inventarlas.

## Product Principles

1. El agua es el hilo: todo conecta con por qué el páramo produce el agua de millones.
2. Cada especie es una pieza de colección, tratada con el respeto de una vitrina real.
3. Contar antes que listar: recorrido con secuencia, no una pila de tarjetas.
4. Rigor científico visible: nombres científicos, estado de conservación y cifras con fuente.
5. Terminar en acción: comprender lleva a querer proteger.

## Accessibility & Inclusion

Público de todas las edades en celular: texto legible, controles táctiles, audio nunca imprescindible para entender (todo lo narrado debe existir también como texto).
