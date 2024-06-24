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
                // colors: {
                //     background: colors.lightGreen.lighten4,
                //     surface: colors.lightGreen.lighten5,
                //     surfaceVariant: colors.lightGreen.lighten3,
                //     primary: '#263b26',
                //     secondary: '#1a281a',
                //     error: colors.orange.lighten2,
                // },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#131e13',
                    surface: '#1c2d1c',
                    primary: colors.lightGreen.lighten4,
                    secondary: colors.lightGreen.lighten5,
                    'surface-variant': colors.lightGreen.lighten1,
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
