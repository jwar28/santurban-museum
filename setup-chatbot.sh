#!/bin/bash

# Script para configurar el chatbot del Museo Virtual de Santurbán

echo "🤖 Configuración del Chatbot - Museo Virtual Santurbán"
echo "======================================================"
echo ""

# Verificar si existe .env.local
if [ -f .env.local ]; then
    echo "✅ Archivo .env.local encontrado"
else
    echo "⚠️  Archivo .env.local NO encontrado"
    echo ""
    echo "Creando archivo .env.local..."

    # Copiar desde .env.example
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ Archivo .env.local creado desde .env.example"
    else
        # Crear desde cero
        cat > .env.local << 'EOF'
# Google Generative AI (Gemini)
# Obtén tu API key en: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=

# Supabase (si ya tienes configurado)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
EOF
        echo "✅ Archivo .env.local creado"
    fi
fi

echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Obtén tu API key de Google Gemini:"
echo "   👉 https://aistudio.google.com/app/apikey"
echo ""
echo "2. Abre el archivo .env.local y pega tu API key:"
echo "   GOOGLE_API_KEY=tu_api_key_aqui"
echo ""
echo "3. Reinicia el servidor de desarrollo:"
echo "   bun run dev"
echo ""
echo "4. Abre el chatbot en la esquina inferior izquierda ✨"
echo ""

# Verificar si GOOGLE_API_KEY está configurada
if grep -q "GOOGLE_API_KEY=.\+" .env.local 2>/dev/null; then
    echo "✅ GOOGLE_API_KEY está configurada en .env.local"
else
    echo "⚠️  GOOGLE_API_KEY NO está configurada en .env.local"
    echo ""
    echo "🔑 Necesitas agregar tu API key para que el chatbot funcione"
fi

echo ""
echo "📚 Documentación completa: CHATBOT_SETUP.md"
echo ""
