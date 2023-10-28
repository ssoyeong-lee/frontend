import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        card: "0px 0px 40px #89A84846",
        board: "0px 0px 25px #BED8FF",
        ball: "0px 0px 10px #FFE500",
        blue: "0px 0px 10px #3691FC",
        red: "0px 0px 10px #FD5E5E",
        green: "0px 0px 10px #0ACE41",
        bar: "0px 0px 4px #FFFFFFAA",
      },
      keyframes: {
        "sidenav-open": {
          "0%": { width: "calc(100%+530px)" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "sidenav-open": "sidenav-open 0.7s ease-in-out forwards",
      },
    },
    colors: {
      white: "#FFFFFF",
      "gray-100": "#EAEAEA",
      "gray-200": "#E0E0E0",
      "gray-300": "#C8C8C8",
      "gray-400": "#8D8D8D",
      "gray-500": "#555555",
      "gray-600": "#3F3F3F",
      "gray-700": "#262626",
      black: "#000000",
      card: "#100813CC",

      "lightred-cyber": "#B15F5F",
      "deepred-cyber": "#FD5E5E",
      "red-cyber": "#FF2F2F",
      "yellow-cyber": "#ACCF1E",
      "green-cyber": "#1FDE00",
      "lightblue-cyber": "#3DC6DF",
      "deepblue-cyber": "#007A90",
      "sky-cyber": "#08A2BE",
      "blue-cyber": "#3691FC",
      "purple-cyber": "#B142F5",
      "darkgreen-cyber": "#13633C",
      "button-green": "#05A11B",
      "button-green-hover": "#118120",

      "cover-black-100": "#00000080",
      "cover-black-200": "#000000CC",
      "cover-white": "#D8D8D880",
    },
  },
  plugins: [],
};
export default config;
