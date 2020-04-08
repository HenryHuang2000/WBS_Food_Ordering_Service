// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
        file: 'app.js',
        format: 'iife',
        name: 'MyBundle'
    }
}