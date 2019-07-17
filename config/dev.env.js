'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://192.168.1.173:8787"',
    BASE_IMG_URL: '"http://hk.iimiim.cn:8989"',
    Content_Type: '"application/JSON; charset=UTF-8"',
})