import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';
import { ru } from 'vuetify/locale';
import { VBtn } from 'vuetify/components';
import { VDateInput } from 'vuetify/labs/components';

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
        },
        VField: {
            class: ['text-primary'],
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
                    accent: '#00ff00',
                    background: colors.amber.lighten5,
                    surface: colors.amber.lighten4,
                    'surface-variant': colors.indigo.darken4,
                    'surface-bright': '#ff0000',
                    'surface-light': '#ea0000',
                    'on-surface-variant': '#1cda1c',
                    'surface-add': colors.amber.lighten5,
                    // error: '#ff0000',
                    // info: '#ff0000',
                    // success: '#ff0000',
                    // warning: '#ff0000',
                    // danger: '#ff0000',
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#0b0d38',
                    surface: '#232a59',
                    'surface-variant': colors.amber.lighten4,
                    primary: colors.amber.lighten5,
                    secondary: colors.amber.lighten4,
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
});
