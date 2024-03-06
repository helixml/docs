const themeDir = __dirname + '/../../';
// const defaultTheme = require('tailwindcss/defaultTheme')

const disabledCss = {
    'code::before': false,
    'code::after': false,
    'blockquote p:first-of-type::before': false,
    'blockquote p:last-of-type::after': false,
    pre: false,
    code: false,
    'pre code': false,
    'code::before': false,
    'code::after': false,
}

module.exports = {
    content: [
        `${themeDir}/hugo_stats.json`,
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: { css: disabledCss },
                sm: { css: disabledCss },
                lg: { css: disabledCss },
                xl: { css: disabledCss },
                '2xl': { css: disabledCss },
            },
        },

        // fontSize: {
        //     xs: ['0.75rem', { lineHeight: '1rem' }],
        //     sm: ['0.875rem', { lineHeight: '1.5rem' }],
        //     base: ['1rem', { lineHeight: '1.75rem' }],
        //     lg: ['1.125rem', { lineHeight: '1.75rem' }],
        //     xl: ['1.25rem', { lineHeight: '2rem' }],
        //     '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
        //     '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
        //     '4xl': ['2rem', { lineHeight: '2.5rem' }],
        //     '5xl': ['2.5rem', { lineHeight: '3rem' }],
        //     '6xl': ['3rem', { lineHeight: '3.5rem' }],
        //     '7xl': ['4rem', { lineHeight: '4.5rem' }],
        // },
        // extend: {
        //     borderRadius: {
        //         '4xl': '2.5rem',
        //     },
        //     fontFamily: {
        //         sans: ['Mona Sans', ...defaultTheme.fontFamily.sans],
        //         category: ['Conthrax W05 Regular', ...defaultTheme.fontFamily.sans],
        //         display: [
        //             ['Mona Sans', ...defaultTheme.fontFamily.sans],
        //             { fontVariationSettings: '"wdth" 125' },
        //         ],
        //     },
        // },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography'),]
}