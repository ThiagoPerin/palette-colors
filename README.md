# 🎨 Palette Colors

**Palette Colors** is a web application designed to generate interesting and fun color palettes, extract colors from images, and evaluate contrasts between text and background. It allows users to explore color combinations, save custom palettes, and check if the contrast between text and background is suitable for readability.

## 🚀 Features

- **Generate Color Palettes:** Automatically create color palettes.
- **Save Color Palettes:** Save generated palettes for future reference.
- **Extract Color Palettes from Images:** Extract the main colors from uploaded images.
- **Evaluate Contrast:** Check the contrast between text and background for readability.

## 🔬 Technologies

The system was built using the following technologies:

- **SvelteKit** with **TypeScript** for the front-end.
- **Tailwind CSS** for styling.

## 💡 Requirements

To run the system locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ThiagoPerin/palette-colors.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

This will start the system locally on your machine.

## 🗄️ Data Storage

The history of generated and extracted color palettes is saved in the **localStorage** of the browser. No external database is required.