'use strict'
const target = process.env.npm_lifecycle_event

if (target === 'test') {
  var configObj = {
    NODE_ENV: '"production"',
    API_ROOT: '"http://test.weupay.com"'
  }
} else if (target === 'build') {
  var configObj = {
    NODE_ENV: '"production"',
    API_ROOT: '"http://weixin.weupay.com"'
  }
}

module.exports = configObj