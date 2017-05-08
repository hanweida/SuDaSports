/**
 * Created by wangdi on 5/11/16.
 */
'use strict';

import {Dimensions,PixelRatio} from 'react-native';

// device width/height
const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
const pixelRatio = PixelRatio.get();

export default function px2dp(uiElementPx) { 
    return uiElementPx/pixelRatio;
}