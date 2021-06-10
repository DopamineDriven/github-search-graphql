export interface tailwindConfigInferred {
	mode: string;
	important: boolean;
	purge: {
		content: string[];
		options: {
			safelist: {
				standard: string[];
			};
		};
	};
	darkMode: string;
	theme: {
		extend: {
			zIndex: {
				'-10': string;
				100: string;
				150: string;
			};
			maxWidth: {
				'9xl': string;
				'8xl': string;
			};
			screens: {
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				'2xl': string;
				'3xl': string;
			};
			transitionDuration: {
				0: string;
				300: string;
				500: string;
				700: string;
				1000: string;
			};
			rotate: {
				0: string;
				45: string;
				90: string;
				125: string;
				180: string;
				270: string;
				360: string;
			};
			fontFamily: {
				header: string[];
				heady: string[];
				poppins: string[];
				somaRoman: string[];
				somaDisplay: string[];
				sans: string[];
			};
			colors: {
				'reddit-0': string;
				'reddit-1': string;
				'reddit-2': string;
				'reddit-3': string;
				'reddit-4': string;
				'primary-0': string;
				'primary-1': string;
				'primary-2': string;
				'primary-3': string;
				'primary-4': string;
				'primary-5': string;
				'primary-6': string;
				'primary-7': string;
				'primary-8': string;
				'primary-9': string;
				'secondary-0': string;
				'secondary-1': string;
				'secondary-2': string;
				'secondary-3': string;
				'secondary-4': string;
				'secondary-5': string;
				'secondary-6': string;
				'secondary-7': string;
				'secondary-8': string;
				'secondary-9': string;
				'secondary-10': string;
				'accents-0': string;
				'accents-1': string;
				'accents-2': string;
				'accents-3': string;
				'accents-4': string;
				'accents-5': string;
				'accents-6': string;
				'accents-7': string;
				'accents-8': string;
				'accents-9': string;
				'theme-0': string;
				'theme-1': string;
				'purple-0': string;
				lightBlue: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				cyan: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				rojo: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				rosado: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				amarillo: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				verdeAzulado: {
					0: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				olive: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				asparagus: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				seagreen: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				pine: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				steel: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				denim: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				royalblue: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				orchid: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				blush: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				chocolate: {
					50: string;
					100: string;
					200: string;
					300: string;
					400: string;
					500: string;
					600: string;
					700: string;
					800: string;
					900: string;
				};
				redditRed: string;
				redditNav: string;
				redditSearch: string;
				redditBG: string;
			};
			keyframes: {
				wiggle: {
					'0%, 100%': {
						transform: string;
					};
					'50%': {
						transform: string;
					};
				};
				hero: {
					transform: string;
				};
			};
			animation: {
				wiggle: string;
				hero: string;
				slowPing: string;
			};
			width: {
				82: string;
				100: string;
				200: string;
				'8xl': string;
			};
			height: {
				75: string;
			};
			spacing: {
				7: string;
				14: string;
				18: string;
				25: string;
				26: string;
				28: string;
				44: string;
				82: string;
				100: string;
				104: string;
				156: string;
			};
			boxShadow: {
				'outline-2': string;
				'outline-normal': string;
				magical: string;
				cardHover: string;
			};
			lineHeight: {
				'extra-loose': string;
			};
			scale: {
				120: string;
			};
			fontSize: {
				xxs: (
					| string
					| {
							lineHeight: string;
					  }
				)[];
			};
		};
		variants: {
			padding: string[];
			textColor: string[];
			backgroundColor: string[];
			display: string[];
			visibility: string[];
			transitionDuration: string[];
			transitionTimingFunction: string[];
			gridColumn: string[];
			extend: {
				filter: string[];
				ringWidth: string[];
				ringColor: string[];
				fontSize: string[];
				stroke: string[];
				fill: string[];
				gridTemplateColumns: string[];
				animation: string[];
				transitionProperty: string[];
				transitionDelay: string[];
				scale: string[];
				rotate: string[];
			};
		};
	};
}
