'use strict'

import BuildConfig from '../BuildConfig'
const TencentApi = {
    api:{
        TeamsRankUrl: BuildConfig.server.tencent.baseURL+"/team/rank"
    }
}

module.exports = TencentApi;