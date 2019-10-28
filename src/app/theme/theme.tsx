import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import colors from './styles/colors.module.scss';
import typo from './styles/typo.module.scss';
import layout from './styles/layout.module.scss';

const paperShadow = '0px 0px 10px 4px rgba(0,0,0,0.03)';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
    },
    overrides: {
        MuiTypography: {
            root: {
                fontSize: typo.fontSize,
                color: colors.typographyColor,
            },
            h2: {
                fontSize: typo.fontSizeXxl,
            },
            h3: {
                fontSize: typo.fontSizeXl,
            },
            h4: {
                fontSize: typo.fontSizeLg,
            },
            h5: {
                fontSize: typo.fontSize,
            },
            body1: {
                fontSize: typo.fontSizeSm,
            },
            body2: {
                fontSize: typo.fontSizeXs,
            },
            overline: {
                color: colors.grey,
            }
        },
        MuiPaper: {
            root: {
                boxShadow: 'none',
            },
            elevation1: {
                boxShadow: paperShadow,
            },
            rounded: {
                borderRadius: layout.paperRadius,
            },
        },
        MuiCardContent: {
            root: {
                '&:last-child': {
                    paddingBottom: layout.padding,
                },
            }
        },
        MuiButton: {
            root: {
                textTransform: 'none',
                boxShadow: paperShadow,
                fontSize: typo.fontSizeSm,
                fontWeight: 600,
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
            containedPrimary: {
                color: colors.white,
            },
            containedSecondary: {
                color: colors.white,
            },
            outlined: {
                borderColor: colors.primary,
                color: colors.primary,
            },
        },
    },
});

export { theme };
