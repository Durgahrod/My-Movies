import createExpoWebpackConfigAsync from '@expo/webpack-config';
import { resolve } from 'path';

export default async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    config.module.rules.forEach(r => {
        if (r.oneOf) {
            r.oneOf.forEach(o => {
                if (o.use && o.use.loader && o.use.loader.includes('babel-loader')) {
                    o.include = [
                        resolve('.'),
                        resolve('node_modules/@ui-kitten/components'),
                    ]
                }
            })
        }
    })
    return config;
};
