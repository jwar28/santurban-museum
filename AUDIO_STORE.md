# 🎵 Audio Store - Sistema de Caché de Audios

## 📋 Descripción

El **Audio Store** es un sistema de gestión y caché de audios construido con Zustand que optimiza la carga de archivos de audio en toda la aplicación. Resuelve problemas de demoras y errores al:

- ✅ Cachear URLs de audios por 30 minutos
- ✅ Precargar audios al inicio de la aplicación
- ✅ Evitar múltiples llamadas a Supabase Storage
- ✅ Proporcionar estado de carga y errores

## 🏗️ Arquitectura

### Archivos principales

```
lib/store/
  └── audio-store.ts          # Store de Zustand con lógica de caché

components/ui/
  ├── audio-player.tsx        # Componente actualizado que usa la store
  └── audio-preloader.tsx     # Componente que precarga audios al inicio

hooks/
  └── use-audio.ts            # Hook personalizado para usar audios

app/
  └── layout.tsx              # Layout con AudioPreloader integrado
```

## 🚀 Uso

### 1. Componente AudioPlayer (Automático)

El componente `AudioPlayer` ya está integrado con la store. Simplemente úsalo como antes:

```tsx
import AudioPlayer from "@/components/ui/audio-player";

<AudioPlayer audioFileName="intro.mp3" autoPlay={false} />
```

### 2. Hook useAudio (Manual)

Para casos donde necesites acceso directo a la URL del audio:

```tsx
import { useAudio } from "@/hooks/use-audio";

function MyComponent() {
  const { audioUrl, isLoading, hasError, isPreloaded } = useAudio("intro.mp3");

  if (isLoading) return <div>Cargando audio...</div>;
  if (hasError) return <div>Error al cargar audio</div>;

  return <audio src={audioUrl} controls />;
}
```

### 3. Precarga de Audios

Los audios se precargan automáticamente al inicio de la app mediante `AudioPreloader`. Para agregar más audios a la precarga:

**Edita:** `/components/ui/audio-preloader.tsx`

```tsx
const audioFiles = [
  { fileName: "intro.mp3" },
  { fileName: "explora.mp3" },
  { fileName: "mi-nuevo-audio.mp3" }, // ⬅️ Agregar aquí
];
```

### 4. API de la Store

Puedes usar la store directamente si necesitas más control:

```tsx
import { useAudioStore } from "@/lib/store/audio-store";

function MyComponent() {
  const getAudioUrl = useAudioStore((state) => state.getAudioUrl);
  const preloadAudio = useAudioStore((state) => state.preloadAudio);
  const clearCache = useAudioStore((state) => state.clearCache);
  const isAudioLoaded = useAudioStore((state) => state.isAudioLoaded);

  // Obtener URL de audio (con caché)
  const url = await getAudioUrl("intro.mp3", "audios");

  // Precargar un audio
  await preloadAudio("explora.mp3");

  // Verificar si está cargado
  const loaded = isAudioLoaded("intro.mp3");

  // Limpiar caché (útil al cerrar sesión)
  clearCache();
}
```

### 5. Precarga Manual Múltiple

```tsx
import { useAudioStore } from "@/lib/store/audio-store";

const preloadMultipleAudios = useAudioStore(
  (state) => state.preloadMultipleAudios
);

await preloadMultipleAudios([
  { fileName: "audio1.mp3" },
  { fileName: "audio2.mp3", bucketName: "custom-bucket" },
]);
```

## 🔧 Configuración

### Duración del Caché

Por defecto, los audios se cachean por **30 minutos**. Para cambiar esto:

**Edita:** `/lib/store/audio-store.ts`

```typescript
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos
```

### Bucket de Supabase

Por defecto, los audios se buscan en el bucket `"audios"`. Para usar otro bucket:

```tsx
<AudioPlayer audioFileName="intro.mp3" bucketName="mi-bucket" />
```

O en el hook:

```tsx
const { audioUrl } = useAudio("intro.mp3", { bucketName: "mi-bucket" });
```

## 📊 Estado de la Store

La store mantiene el siguiente estado:

```typescript
interface AudioStore {
  // Cache de URLs
  audioCache: Map<string, AudioState>;

  // Audios precargados
  preloadedAudios: Set<string>;

  // Métodos disponibles
  getAudioUrl: (fileName, bucket?) => Promise<string | null>;
  preloadAudio: (fileName, bucket?) => Promise<void>;
  preloadMultipleAudios: (files) => Promise<void>;
  clearCache: () => void;
  isAudioLoaded: (fileName) => boolean;
}

interface AudioState {
  url: string | null;
  isLoading: boolean;
  hasError: boolean;
  lastFetched?: number;
}
```

## ⚡ Beneficios

1. **Rendimiento**: Los audios se cargan una sola vez y se reutilizan
2. **Experiencia de usuario**: Precarga evita demoras al navegar
3. **Manejo de errores**: Detecta y reporta problemas de carga
4. **Caché inteligente**: Invalida automáticamente después de 30 min
5. **TypeScript**: Totalmente tipado para seguridad de tipos

## 🐛 Troubleshooting

### El audio no se carga

1. Verifica que el archivo existe en Supabase Storage
2. Revisa la consola del navegador para errores
3. Comprueba que el nombre del archivo es correcto (case-sensitive)

### Caché no se actualiza

- La caché expira después de 30 minutos automáticamente
- Puedes forzar limpieza con `clearCache()`

### Audio se demora en precargar

- Asegúrate de que `AudioPreloader` está en el layout
- Revisa la velocidad de conexión a Supabase
- Considera reducir el número de audios precargados

## 📝 Ejemplo Completo

```tsx
"use client";

import { useAudio } from "@/hooks/use-audio";
import { useAudioStore } from "@/lib/store/audio-store";
import { useEffect } from "react";

export default function AudioExample() {
  const { audioUrl, isLoading, hasError } = useAudio("intro.mp3");
  const preloadAudio = useAudioStore((state) => state.preloadAudio);

  useEffect(() => {
    // Precargar siguiente audio mientras se reproduce el actual
    preloadAudio("siguiente.mp3");
  }, [preloadAudio]);

  if (isLoading) return <div>⏳ Cargando...</div>;
  if (hasError) return <div>❌ Error al cargar</div>;

  return (
    <audio src={audioUrl || undefined} controls>
      Tu navegador no soporta audio HTML5
    </audio>
  );
}
```

## 🎯 Lista de Audios Actuales

Audios precargados en la aplicación:

- ✅ `intro.mp3` - Página principal
- ✅ `explora.mp3` - Página Explora
- ✅ `conservacion.mp3` - Página Santurbán
- ✅ `creditos.mp3` - Página Acerca de
- ✅ `oso.mp3` - Especie: Oso de Anteojos
- ✅ `frailejón.mp3` - Especie: Frailejón
- ✅ `colibri.mp3` - Especie: Colibrí
- ✅ `venado.mp3` - Especie: Venado
- ✅ `puma.mp3` - Especie: Puma
- ✅ `cóndor.mp3` - Especie: Cóndor

Para agregar más, edita `/components/ui/audio-preloader.tsx`.

---

**Creado con ❤️ para el Museo Virtual Santurbán**
