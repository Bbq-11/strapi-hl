import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';
import { ru } from 'vuetify/locale';
import { VBtn } from 'vuetify/components';
import { VDateInput } from 'vuetify/labs/components';
import 'vuetify/dist/vuetify.min.css';

export default createVuetify({
    locale: {
        locale: 'ru',
        fallback: 'ru ',
        messages: { ru },
    },
    aliases: {
        VBtnPrimary: VBtn,
    },
    defaults: {
        VTextField: {
            variant: 'outlined',
            hideDetails: 'true',
            color: 'primary',
            density: 'compact',
            autocomplete: 'off',
            class: ['jj'],
        },
        VField: {
            class: ['text-primary', 'text-subtitle-1'],
        },
        VDatePicker: {
            class: ['text-subtitle-1', 'text-primary', 'scroll-container'],
        },
    },
    components: {
        VDateInput,
    },
    theme: {
        defaultTheme: localStorage.getItem('theme') || 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#232a59',
                    secondary: '#0b0d38',
                    background: colors.amber.lighten5,
                    surface: colors.amber.lighten4,
                    'surface-variant': colors.indigo.darken4,
                    'surface-add': colors.amber.lighten5,
                    error: '#d0733b',
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#0b0d38',
                    surface: '#232a59',
                    'surface-variant': colors.amber.lighten4,
                    primary: colors.amber.lighten4,
                    secondary: colors.amber.lighten5,
                    error: '#d0733b',
                },
            },
        },
    },
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
    display: {
        mobileBreakpoint: 'md',
        thresholds: {
            xs: 0,
            sm: 420,
            md: 600,
            lg: 960,
            xl: 1280,
            xxl: 1920,
        },
    },
});
