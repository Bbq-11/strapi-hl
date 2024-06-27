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
        VBtnPrimary: {
            class: ['text-primary', 'bg-background', 'h-auto', 'border-sm', 'rounded-xl'],
        },
        VTextField: {
            variant: 'outlined',
            hideDetails: 'true',
            color: 'primary',
            density: 'compact',
            autocomplete: 'off',
            class: ['text-subtitle-1', 'text-primary'],
        },
        VField: {
            class: ['text-subtitle-1', 'text-primary'],
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
                    'primary-darken-1': '#1F5592',
                    secondary: colors.indigo.lighten5,

                    'secondary-darken-1': '#018786',
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
            // dark: {
            //     dark: true,
            //     colors: {
            //         background: colors.indigo.darken4,
            //         surface: colors.indigo.darken3,
            //         'surface-variant': colors.amber.lighten4,
            //         primary: colors.amber.lighten5,
            //         secondary: colors.amber.lighten4,
            //         error: '#d0733b',
            //     },
            // },
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
