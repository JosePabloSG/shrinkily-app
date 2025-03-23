import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'blue-violet': {
  				'50': '#edf3ff',
  				'100': '#dfe7ff',
  				'200': '#c5d3ff',
  				'300': '#a1b6ff',
  				'400': '#7c8dfd',
  				'500': '#5d66f7',
  				'600': '#504ded',
  				'700': '#3832d0',
  				'800': '#2e2ba8',
  				'900': '#2b2b84',
  				'950': '#1a194d'
  			},
  			'water-leaf': {
  				'50': '#f1fcf9',
  				'100': '#d1f6ef',
  				'200': '#a1ebde',
  				'300': '#6edacb',
  				'400': '#40c1b3',
  				'500': '#26a69a',
  				'600': '#1c857d',
  				'700': '#1b6a65',
  				'800': '#1a5552',
  				'900': '#1a4745',
  				'950': '#092a2a'
  			},
  			'dull-lavender': {
  				'50': '#f4f4fe',
  				'100': '#eaeafd',
  				'200': '#d9dbfb',
  				'300': '#babbf8',
  				'400': '#9e9cf4',
  				'500': '#7066ec',
  				'600': '#5b45e2',
  				'700': '#4b33ce',
  				'800': '#3f2bac',
  				'900': '#36258d',
  				'950': '#1f1560'
  			},
  			'beauty-bush': {
  				'50': '#fdf3f3',
  				'100': '#fce4e4',
  				'200': '#facccc',
  				'300': '#f6abab',
  				'400': '#ee7b7b',
  				'500': '#e25151',
  				'600': '#cf3333',
  				'700': '#ad2828',
  				'800': '#902424',
  				'900': '#782424',
  				'950': '#410e0e'
  			},
  			gravel: {
  				'50': '#f7f7f8',
  				'100': '#efeef0',
  				'200': '#dbdadd',
  				'300': '#bbbabf',
  				'400': '#96949c',
  				'500': '#7b7781',
  				'600': '#636069',
  				'700': '#514e56',
  				'800': '#48464c',
  				'900': '#3c3b3f',
  				'950': '#28272a'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
