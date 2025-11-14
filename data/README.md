# Carpeta Data - Contenido de Santurbán

Esta carpeta contiene todos los datos de contenido de la página de Santurbán en formato JSON, separados del código React para mejor mantenibilidad.

## Archivos

### `santurban-content.json`
Contiene todo el contenido principal de la página de Santurbán:
- **hero**: Título y subtítulo de la sección hero
- **introduction**: Texto introductorio
- **keyStats**: Estadísticas clave (4 cards con íconos, valores y descripciones)
- **detailedInfo**: Información detallada sobre fábrica de agua y biodiversidad
- **curiosities**: 6 curiosidades del páramo
- **climate**: Información sobre clima y precipitación
- **geology**: Formación geológica
- **conservation**: Amenazas y acciones de protección
- **cta**: Call-to-action para explorar especies

### `tooltips.json`
Definiciones centralizadas de todos los tooltips educativos:
- `turba`: Información sobre turba
- `esponja natural`: Explicación del sistema de absorción
- `humedales`: Definición de humedales
- `endémicas`: Qué son especies endémicas
- `frailejón`: Información sobre frailejones
- Y más términos técnicos...

### `footer-content.json`
Contenido del footer:
- **sources**: Fuentes oficiales y académicas
- **copyright**: Texto de derechos de autor
- **links**: Enlaces del footer
- **educationalNote**: Nota educativa

## Uso de Tooltips

Los tooltips se activan automáticamente en el texto usando llaves `{}`:

```json
"text": "El páramo actúa como una {esponja natural} que captura agua..."
```

El componente `TextWithTooltips` busca automáticamente la definición en `tooltips.json`.

## Formato de Texto

- **Negritas**: Usar `**texto**` para resaltar texto importante
- **Tooltips**: Usar `{término}` para agregar tooltips educativos

Ejemplo:
```json
"El {frailejón} crece apenas **1 cm por año**"
```

## Mantenimiento

Para agregar nuevo contenido:
1. Editar el JSON correspondiente
2. Si necesitas un nuevo tooltip, agregarlo a `tooltips.json`
3. El componente `TextWithTooltips` se encarga del resto

No es necesario modificar el código React para cambios de contenido.
