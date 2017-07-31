import React,{ PropTypes }from 'react';
import {requireNativeComponent,View} from 'react-native';
 
var CircleCustom = {
    name:'RCTCircleCustom',
    propTypes:{
           color: PropTypes.number,
    radius: PropTypes.number,
    ...View.propTypes // 包含默认的View的属性
    }
};
var RCTCircleCustom = requireNativeComponent('RCTCircleCustom' ,CircleCustom);
module.exports = RCTCircleCustom;