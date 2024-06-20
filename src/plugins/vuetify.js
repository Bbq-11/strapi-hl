import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
// Translations provided by Vuetify
import { ru } from 'vuetify/locale';

export default createVuetify({
    locale: {
        locale: 'ru',
        fallback: 'ru ',
        messages: { ru },
    },
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
