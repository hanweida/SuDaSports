'use strict';

export async function get(url, successCallBack, failCallBack) {
    try {
        let data = await RNFetchBlob.fetch('GET',url,Header);
        if (data.respInfo.status === 200){
            return successCallBack(await data.json());
        }else {
            return failCallBack(data.json());
        }
    } catch (error){
        failCallBack(error);
    }
}
