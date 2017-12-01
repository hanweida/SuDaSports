import React,{Component} from 'react'
import {
    StyleSheet,
    StatusBar,
} from 'react-native'
 /** app顶部样式*/
 export default class Header extends Component{
    constructor(props) {  
        super(props);  
        this.state = {
            pressStatus: false,
            button_index:0
        };
    }

    render(){
        return(
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'#F66A85'}
                    translucent={false}
                    barStyle={'default'}
                    showHideTransition={'fade'}
                    networkActivityIndicatorVisible={true}
                    style={styles.statusbar}
                />
        );
    }    
}

const styles = StyleSheet.create({
    statusbar:{
        flex:1,
    },
});