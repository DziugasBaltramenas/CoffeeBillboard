process.env.BROWSER = 'none';

const CSS_MODULE_LOCAL_IDENT_NAME_DEV = '[name]__[local]___[hash:base64:5]';
const CSS_MODULE_LOCAL_IDENT_NAME_PROD = '[hash:base64:5]';

module.exports = function({ env }) {
    const isProduction = env === 'production';

    return {
        style: {
            modules: {
                localIdentName: isProduction ? CSS_MODULE_LOCAL_IDENT_NAME_PROD : CSS_MODULE_LOCAL_IDENT_NAME_DEV,
            },
            css: {
                loaderOptions: {
                    camelCase: true,
                },
            },
        },
        webpack: {
            alias: {
                app: `${__dirname}/src/app`,
            }
        },
        devServer: {
            proxy: {
                '/api': 'http://localhost:4000'
            }
        }
    };
};
