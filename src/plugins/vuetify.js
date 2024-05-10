import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default createVuetify({
    aliases: {},
    defaults: {},
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
            },
        },
    },
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
});
