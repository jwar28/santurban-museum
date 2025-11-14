import santurbanContent from "@/data/santurban-content.json";

/**
 * Genera un contexto enriquecido sobre el Páramo de Santurbán
 * basado en los datos del museo virtual
 */
export function getMuseumContext(): string {
	const content = santurbanContent;

	return `
## CONTEXTO DEL MUSEO VIRTUAL DE SANTURBÁN

### Información General del Páramo
- **Ubicación:** Departamentos de Norte de Santander y Santander, Colombia
- **Extensión:** 142,000 hectáreas (72% en Norte de Santander)
- **Población beneficiada:** 2.3 millones de personas en 48 municipios
- **Temperatura:** Rango diario de 0°C a 15°C
- **Lagunas:** Más de 26 lagunas de origen glaciar

### La Fábrica de Agua
${content.detailedInfo.waterFactory.paragraphs.join("\n")}

### Biodiversidad Única
${content.detailedInfo.biodiversity.paragraphs.join("\n")}

### Ecosistemas del Páramo
${content.detailedInfo.ecosystem.paragraphs.join("\n")}

### Conservación y Amenazas
${content.conservation.intro}

**Amenazas principales:**
${content.conservation.threats.map((threat) => `- ${threat}`).join("\n")}

**Acciones de protección:**
${content.conservation.protectionActions.map((action) => `- ${action}`).join("\n")}

### Curiosidades del Páramo
${content.curiosities.map((c) => `${c.icon} **${c.title}:** ${c.description}`).join("\n\n")}

### Datos Clave:
${content.keyStats.map((stat) => `- ${stat.icon} ${stat.value}: ${stat.description}`).join("\n")}

### Turismo Responsable
**Vías de acceso:** ${content.tourism.access.description}

**Lagunas para visitar:**
${content.tourism.placesOfInterest.places.map((place) => `- **${place.name}:** ${place.description}`).join("\n")}

**Recomendaciones importantes:**
${content.tourism.recommendations.items.join("\n")}

### Sobre el Museo Virtual

**Misión:**
Educar a una audiencia global sobre la importancia ecológica de este ecosistema vital
e inspirar un compromiso colectivo para su conservación.

**Visión:**
Convertirnos en el principal recurso digital para la educación sobre ecosistemas de páramo,
fomentando una comunidad global de defensores.

**Reconocimientos:**
- 2024: Participación destacada en XI CIINATIC 2024
- 2025: Ganador de INNGENIATE-C, Semana de Ingeniería UNAB
- Propuesta: Hub Eco Smart Regions - Centro de interpretación del Páramo de Santurbán

**Equipo:**
- Liliana Calderón-Benavides (Directora, Smart Regions Center)
- Verónica Chajín Ortiz (Co-directora, Ing. de Sistemas & Magíster en Software)
- Javier Guerra Turizo (Desarrollador, Ing. de Sistemas)

Este museo virtual es un proyecto educativo digital dedicado a preservar y compartir
la biodiversidad del páramo de Santurbán con el mundo.

Esta información debe ser usada para responder preguntas sobre el páramo de Santurbán,
su importancia, biodiversidad, amenazas, conservación, turismo responsable y sobre el museo virtual.
`.trim();
}

/**
 * Genera contexto sobre una especie específica si se menciona
 */
export function getSpeciesContext(speciesName?: string): string {
	if (!speciesName) return "";

	// Aquí podrías integrar con tu base de datos de especies
	// Por ahora retornamos un contexto general
	return `
### Especies del Páramo
El museo virtual incluye información sobre especies endémicas como:
- Frailejones (Espeletia)
- Oso de Anteojos (Tremarctos ornatus)
- Águila Mora (Geranoaetus melanoleucus)
- Diversas especies de aves y mamíferos

Si el usuario pregunta por una especie específica, invítalo a explorar
la sección "Ver especies" del museo virtual en /explore.
`.trim();
}

/**
 * Información sobre el museo y el equipo
 */
export function getAboutMuseumContext(): string {
	return `
### ACERCA DEL MUSEO VIRTUAL DE SANTURBÁN

**¿Qué es este museo?**
Es un museo virtual interactivo dedicado a preservar y compartir la biodiversidad
del páramo de Santurbán. Permite a usuarios de todo el mundo explorar este ecosistema
vital a través de modelos 3D de especies, información educativa y contenido multimedia.

**Misión:**
Educar a una audiencia global sobre la importancia ecológica de este ecosistema vital
e inspirar un compromiso colectivo para su conservación.

**Visión:**
Convertirnos en el principal recurso digital para la educación sobre ecosistemas de páramo,
fomentando una comunidad global de defensores de la conservación.

**Logros y Reconocimientos:**
- 🏆 2024: Participación destacada en XI CIINATIC 2024
- 🥇 2025: Ganador de INNGENIATE-C, Semana de Ingeniería UNAB
- 💡 Propuesta: Hub Eco Smart Regions - Centro de interpretación del Páramo de Santurbán

**Equipo del Proyecto:**

👩‍💼 **Liliana Calderón-Benavides** (Directora)
- Smart Regions Center
- Lidera la visión estratégica del proyecto

👩‍💻 **Verónica Chajín Ortiz** (Co-directora)
- Ingeniera de Sistemas & Magíster en Software
- Responsable de la arquitectura del sistema

👨‍💻 **Javier Guerra Turizo** (Desarrollador)
- Ingeniero de Sistemas
- Desarrollo e implementación técnica

**¿Por qué es importante este museo virtual?**
- Democratiza el acceso al conocimiento sobre Santurbán
- Permite explorar especies en 3D sin perturbar el ecosistema
- Educa sobre la importancia de la conservación del páramo
- Conecta a personas de todo el mundo con este ecosistema vital
- Preserva digitalmente información sobre especies y el ecosistema

**Características del museo:**
- 🌿 Galería de especies en 3D interactivas
- 💧 Información detallada sobre el páramo
- 🎨 Diseño inmersivo y educativo
- 📱 Accesible desde cualquier dispositivo
- 🤖 Asistente virtual con IA para responder preguntas

Si te preguntan sobre el museo, el equipo o cómo se creó, usa esta información.
`.trim();
}
