import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default <Config>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        hero: ['"Michroma"', '"AlibabaPuHuiTi"', "sans-serif"],
        body: ['"Inter"', '"AlibabaPuHuiTi"', "sans-serif"],
        sans: ['"Inter"', '"AlibabaPuHuiTi"', "sans-serif"],
      },
      colors: {
        brand: "#2d9ed0",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translate(-50%, 100px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        // ★★★ 新增：流光扫过 (apps/manual) ★★★
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        // ★★★ 新增：斑点漂浮 (purchase/roadmap) ★★★
        meshBlob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1) rotate(5deg)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9) rotate(-5deg)",
          },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "ken-burns": "kenBurns 20s ease-out forwards",
        "float-in": "floatIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulseSlow 8s ease-in-out infinite",
        // ★★★ 新增 ★★★
        shine: "shine 0.7s ease-in-out",
        "mesh-blob": "meshBlob 20s infinite alternate linear",
      },
    },
  },
  plugins: [typography],
};
