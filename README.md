# Kanvai 🎨✨

Un generador de imágenes impulsado por **Gemini AI** que permite a los
usuarios dibujar en un lienzo y transformar sus bocetos en ilustraciones
fotorealistas o de estilo anime.

## 🚀 Características

- 🎨 **Lienzo interactivo**: Dibuja con pincel o borrador, ajusta el
  color y el grosor de la línea.\
- 🤖 **Integración con Gemini AI**: Convierte tu dibujo en imágenes
  generadas por IA (fotorealistas o anime).\
- 🛠️ **Herramientas de dibujo**: Selector de color, control de radio
  del pincel y borrador.\
- 🔑 **Soporte para API Key**: Usa tu propia clave de Gemini para la
  generación de imágenes.\
- 📱 **Interfaz moderna y responsiva**: Construida con **React +
  Vite + TailwindCSS**.\
- 📂 **Arquitectura escalable**: Uso de **React Router** y estructura
  de carpetas con `pages/` para soportar futuras vistas.

## 🖼️ Flujo de uso

1.  Ingresa tu clave de **Gemini API**.\
2.  Dibuja algo en el lienzo (con pincel o borrador).\
3.  Selecciona un estilo (Fotorealista o Anime).\
4.  Haz clic en **Generar imagen** y espera el resultado.

## 🛠️ Tecnologías utilizadas

- ⚛️ **React 19** + **Vite**\
- 🎨 **TailwindCSS**\
- 🖌️ **Konva / React-Konva** (para el lienzo)\
- 🤖 **@google/genai** (Gemini AI API)\
- 🧭 **React Router**

## 📦 Instalación y configuración

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/Cristiangc67/KanvAI.git
cd kanvai
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Construir para producción

```bash
npm run build
```

### Vista previa de la build

```bash
npm run preview
```

## 🔑 Configuración de API Key

Este proyecto no guarda tu clave de API en el backend.\

1. Obtén tu **Gemini API Key** en [Google AI
   Studio](https://aistudio.google.com/).\
2. Ingresa la clave en el campo `Gemini key` dentro de la aplicación.

## 📂 Estructura principal del proyecto

    src/
     ├── components/
     │   ├── Canvas.tsx        # Lienzo interactivo
     │   ├── TopBar.tsx        # Barra de herramientas
     │   ├── Generate.tsx      # Lógica de generación con Gemini
     │   ├── PromptModal.tsx   # Modal para seleccionar estilo
     │   ├── Output.tsx        # Renderiza resultados (imagen generada)
     │
     ├── pages/
     │   ├── Creation.tsx      # Vista principal de creación
     │
     ├── App.tsx               # Componente principal con rutas
     ├── main.tsx              # Punto de entrada

## 📸 Capturas

<img width="1635" height="951" alt="creation" src="https://github.com/user-attachments/assets/38d2d2ab-7577-476d-9034-5bfb02da2eb8" />
