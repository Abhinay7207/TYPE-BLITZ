import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                "primary-glow": "var(--primary-glow)",
                secondary: "var(--secondary)",
                "secondary-glow": "var(--secondary-glow)",
                surface: "var(--surface)",
                "surface-border": "var(--surface-border)",
                "surface-hover": "var(--surface-hover)",
                "text-main": "var(--text-main)",
                "text-muted": "var(--text-muted)",
                "text-dim": "var(--text-dim)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
