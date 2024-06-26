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
                    primary: colors.indigo.darken4,
                    secondary: colors.indigo.lighten5,
                    accent: '#ff0000',
                    background: colors.amber.lighten5,
                    surface: colors.amber.lighten4,
                    'surface-variant': colors.indigo.darken4,
                    'surface-add': colors.amber.lighten5,
                    error: '#ff0000',
                    info: '#ff0000',
                    success: '#ff0000',
                    warning: '#ff0000',
                    danger: '#ff0000',

                    // background: colors.amber.lighten5,
                    // surface: colors.amber.lighten4,
                    // 'surface-add': '#FFE082',
                    // 'surface-variant': colors.indigo.darken4,
                    // primary: colors.indigo.darken4,
                    // secondary: colors.indigo.lighten5,
                    // error: colors.orange.lighten2,
                    // 'border-primary': colors.indigo.darken4,
                    // 'border-secondary': colors.amber.lighten5,
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: colors.indigo.darken4,
                    surface: colors.indigo.darken3,
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
