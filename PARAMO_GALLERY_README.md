# Galería de Imágenes del Páramo - Componente Marquee

## Componentes Creados

### 1. `ParamoImageCard` (`components/ui/paramo-image-card.tsx`)
Card elegante para mostrar imágenes del páramo con:
- Imagen principal con efecto hover (zoom)
- Nombre de la ubicación en tipografía destacada
- Créditos del fotógrafo con ícono de cámara
- Overlay gradiente para mejor legibilidad
- Efectos visuales y transiciones suaves
- Dimensiones: 400px × 500px

### 2. `ParamoGallery` (`components/ui/paramo-gallery.tsx`)
Componente completo que integra el Marquee con las cards de imágenes.

### 3. Estructura de Datos (`data/marquee-data.ts`)
Define la interfaz `ParamoImage` y exporta el array `paramoImages`.

## Estructura de Datos

```typescript
export interface ParamoImage {
  id: number;
  imageUrl: string;
  locationName: string;
  credits: string;
  alt: string;
}
```

## Cómo Usar

### Opción 1: Usar el componente completo (Recomendado)
```tsx
import { ParamoGallery } from "@/components/ui/paramo-gallery";

export default function Page() {
  return (
    <div>
      <ParamoGallery />
    </div>
  );
}
```

### Opción 2: Personalizar el Marquee
```tsx
import { Marquee } from "@/components/ui/marquee";
import { ParamoImageCard } from "@/components/ui/paramo-image-card";
import { paramoImages } from "@/data/marquee-data";

export default function CustomGallery() {
  return (
    <Marquee
      pauseOnHover
      className="[--duration:40s]"
      reverse={false}
    >
      {paramoImages.map((image) => (
        <ParamoImageCard key={image.id} image={image} />
      ))}
    </Marquee>
  );
}
```

## Agregar Nuevas Imágenes

Edita el archivo `data/marquee-data.ts` y agrega nuevos objetos al array `paramoImages`:

```typescript
{
  id: 7,
  imageUrl: "/images/paramo-7.jpg",
  locationName: "Nombre del Lugar",
  credits: "Foto por: Nombre del Fotógrafo",
  alt: "Descripción de la imagen para accesibilidad"
}
```

## Configuración del Marquee

- `pauseOnHover`: Pausa la animación al pasar el mouse
- `[--duration:60s]`: Controla la velocidad del carrusel (menos segundos = más rápido)
- `reverse`: Invierte la dirección del movimiento
- `repeat`: Número de repeticiones del contenido (por defecto: 4)

## Notas Importantes

1. **Imágenes**: Coloca las imágenes en la carpeta `public/images/`
2. **Optimización**: El componente usa `next/image` para optimización automática
3. **Responsive**: Las cards tienen un ancho fijo de 400px pero se pueden personalizar
4. **Accesibilidad**: Incluye textos alternativos y ARIA labels

## Personalización de Estilos

Para cambiar los colores o tamaños, edita las clases de Tailwind en:
- `components/ui/paramo-image-card.tsx`: Estilos de la card
- `components/ui/paramo-gallery.tsx`: Estilos del contenedor general
