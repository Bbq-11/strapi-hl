import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';

export default createVuetify({
    aliases: {
    },
    defaults: {
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
            }
        }
    },
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
});