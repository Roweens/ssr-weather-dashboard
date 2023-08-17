import type { Config } from 'tailwindcss';

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                bgColor: 'var(--bg-color)',
                lightBgColor: 'var(--light-bg-color)',
                invertedColor: 'var(--inverted-color)',
                hintColor: 'var(--hint-color)',
                highlightColor: 'var(--highlight-color)',
            },
            fontFamily: {
                roboto: ['var(--font-roboto-flex)'],
            },
            spacing: {
                stack4: '4px',
                stack8: '8px',
                stack16: '16px',
                stack24: '24px',
                stack32: '32px',
            },
            gridTemplateColumns: {
                header: '100px minmax(100px, 300px) minmax(250px, 1fr) minmax(100px, 400px)',
                headerLaptop: '80px 1fr minmax(100px, 400px)',
                headerMobile: '80px 1fr',
                mainPage: 'minmax(400px, 3fr) minmax(400px, 1fr)',
            },
        },
    },
    plugins: [],
} satisfies Config;
