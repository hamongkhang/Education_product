module.exports = {
    plugins: [
        require('@tailwindcss/forms'),
    ],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'xs': '576px',
            // => @media (min-width: 576px) { ... }
            'sm1': '600px',
            // => @media (min-width: 600px) { ... }
            'sm': '640px',
            'md': '768px',
            'md1': '990px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            spacing: {
                "18": "72px",
                "19": "76px",
                "508": "508px",
                "600": "600px",
                "650": "650px",
                "700": "700px",
                "746": "746px",
                "788": "788px",
                "814": "814px",
            },
            backgroundColor: {
                "penetration-1": "rgba(0, 0, 0, 0.1)",
                "penetration-2": "rgba(0, 0, 0, 0.2)",
                "penetration-3": "rgba(0, 0, 0, 0.3)",
                "penetration-4": "rgba(0, 0, 0, 0.4)",
                "penetration-5": "rgba(0, 0, 0, 0.5)",
                "penetration-6": "rgba(0, 0, 0, 0.6)",
                "penetration-7": "rgba(0, 0, 0, 0.7)",
                "penetration-8": "rgba(0, 0, 0, 0.8)",
                "penetration-9": "rgba(0, 0, 0, 0.9)",
                "orange": "#fb923c",
            },
            fontSize: {
                "13": "13px",
                "15": "15px",
                "17": "17px",
            },
            lineHeight: {
                "12": "48px"
            },
            keyframes: {
                btnlogin: {
                    '0%': { strokeDashoffset: '400' },
                    '100%': { strokeDashoffset: '0' },
                },
                underline: {
                    '0%': { translateX: '0%' },
                    '100%': { translateX: '100%' },
                },
            },
            animation: {
                btnlogin: 'btnlogin 2s linear infinite',
                underline: 'underline 2s linear infinite',
            },
            fill: theme => ({
                'red': theme('colors.red.500'),
                'green': theme('colors.green.500'),
                'blue': theme('colors.blue.500'),
                'transparent': 'transparent',
            }),
            stroke: theme => ({
                'red': theme('colors.red.500'),
                'green': theme('colors.green.500'),
                'blue': theme('colors.blue.500'),
                strokeDasharray: {
                    '100': '100',
                }
            }),
        },
    },
    variants: {
        extend: {
            borderRadius: ['focus'],
            divideColor: ['group-hover'],
            translate: ['group-hover'],
            display: ['group-hover'],
            backgroundColor: ['checked'],
            borderColor: ['checked'],
            height: ['focus-within'],
            display: ['focus-within'],
            opacity: ['focus-within'],
        },
    },
    plugins: [],
}