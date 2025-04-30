
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Light mode colors
				'quickpens-navy': '#1F2937',
				'quickpens-blue': '#3B82F6',
				'quickpens-purple': '#4F46E5',
				'quickpens-green': '#10B981',
				'quickpens-orange': '#F59E0B',
				'quickpens-red': '#EF4444',
				'quickpens-gray': '#64748B',
				'quickpens-light': '#F9FAFB',
				// Dark mode colors
				'quickpens-dark': '#1F2937',
				'quickpens-dark-blue': '#60A5FA',
				'quickpens-dark-purple': '#818CF8',
				'quickpens-dark-green': '#34D399',
				'quickpens-dark-orange': '#FBBF24',
				'quickpens-dark-red': '#FB7185',
				'quickpens-dark-gray': '#94A3B8',
				'quickpens-dark-bg': '#111827',
				// Status colors
				'quickpens-status-available': '#10B981',
				'quickpens-status-claimed': '#F59E0B',
				'quickpens-status-completed': '#3B82F6',
				// Card colors
				'quickpens-card-bg': {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Input colors
				'quickpens-input-bg': {
					DEFAULT: 'hsl(var(--input))',
					foreground: 'hsl(var(--input-foreground))'
				},
				// Button colors
				'quickpens-button-primary': {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				'quickpens-button-secondary': {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				// Theme variables
				'quickpens-theme': {
					'--background': '#F9FAFB',
					'--foreground': '#1F2937',
					'--card': '#FFFFFF',
					'--card-foreground': '#1F2937',
					'--border': '#E5E7EB',
					'--input': '#FFFFFF',
					'--input-foreground': '#1F2937',
					'--ring': '#64748B',
					'--primary': '#3B82F6',
					'--primary-foreground': '#FFFFFF',
					'--secondary': '#64748B',
					'--secondary-foreground': '#FFFFFF',
					'--muted': '#F3F4F6',
					'--muted-foreground': '#64748B',
					'--accent': '#4F46E5',
					'--accent-foreground': '#FFFFFF',
				},
				'quickpens-theme-dark': {
					'--background': '#1F2937',
					'--foreground': '#F9FAFB',
					'--card': '#111827',
					'--card-foreground': '#F9FAFB',
					'--border': '#374151',
					'--input': '#111827',
					'--input-foreground': '#F9FAFB',
					'--ring': '#374151',
					'--primary': '#60A5FA',
					'--primary-foreground': '#1F2937',
					'--secondary': '#94A3B8',
					'--secondary-foreground': '#1F2937',
					'--muted': '#374151',
					'--muted-foreground': '#94A3B8',
					'--accent': '#818CF8',
					'--accent-foreground': '#1F2937',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				quickpens: {
					navy: '#0A2463',
					gold: '#FFD700',
					light: '#F5F5F5',
					accent: '#3E92CC',
					dark: '#1A1A1A'
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
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			fontFamily: {
				serif: ['Georgia', 'serif'],
				sans: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
