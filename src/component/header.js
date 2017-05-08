import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native'

import px2dp from '../util/px2dp';
 export default class Header extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'#FC4035'}
                    translucent={false}
                    barStyle={'default'}
                    showHideTransition={'fade'}
                    networkActivityIndicatorVisible={true}
                    style={styles.statusbar}
                />
               <Image source={require('../img/nav_pic_suda@2x.png')} style={styles.pic_suda}/> 
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FC4035',
        justifyContent:'center',
        alignItems:'center',
        height: px2dp(118),
    },
    app_name:{
      
    },
    statusbar:{
        flex:1,
    },
    pic_suda:{
        
    }
});