import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'

import px2dp from '../util/px2dp';
 export default class Header extends Component{
    constructor(props) {  
        super(props);  
        this.state = { pressStatus: false };  
    } 

    _onHideUnderlay(){  
        this.setState({ pressStatus: false });  
    }  
  
    _onShowUnderlay(){  
        this.setState({ pressStatus: true });  
    } 

    onPressLearnMore = () => {
        Alert.alert('Button has been pressed!');
    };

    render(){
        return(
            <View style={styles.container}>
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
                <TouchableHighlight
                    onHideUnderlay={this._onHideUnderlay.bind(this)}
                    onShowUnderlay={this._onShowUnderlay.bind(this)} 
                    onPress={() => {  
                        console.log('Press Change Style Button');  
                    }}  
                     style={[styles.button_tab,styles.button_left_tab,this.state.pressStatus ? styles.pressbutton:styles.unpressbutton]}>
                     <View style={styles.button_text_view}>
                        <Text style={styles.button_text}>
                            直播
                        </Text>
                     </View>
                </TouchableHighlight>
               <TouchableHighlight
                     style={[styles.button_tab,styles.button_center_tab]}>
                     <View style={styles.button_text_view}>
                        <Text style={styles.button_text}>
                            新闻
                         </Text>
                     </View>
                 
                </TouchableHighlight>
                <TouchableHighlight
                     style={[styles.button_tab,styles.button_right_tab]}>
                      <View style={styles.button_text_view}>
                          <Text style={styles.button_text}>
                            狂言NBA
                        </Text>
                      </View>
                </TouchableHighlight>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height: 48,
        justifyContent:'center',
        borderBottomColor:'#F66A85',
         backgroundColor:'#F66A85'
    },
    button_tab:{
        height:30,
        width:86,
        borderColor:'#FFFFFF',
        borderStyle :'solid',
        backgroundColor: '#F66A85',
        borderWidth:1,
        alignSelf:'center'    
    },
    button_left_tab:{
       borderTopLeftRadius:8,
       borderBottomLeftRadius:8,
    },
    button_right_tab:{
        borderTopRightRadius:8,
       borderBottomRightRadius:8,  
    },
    button_center_tab:{
       borderLeftWidth:0,
       borderRightWidth:0    
    },
    button_text_view:{
        flex:1,
        alignItems:'center',  
        justifyContent: 'center',
    },
    button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    pressbutton:{
        backgroundColor: '#FFFFFF',
    },
    unpressbutton:{
        backgroundColor: '#FFFFFF ',
    },
    app_name:{
      
    },
    statusbar:{
        flex:1,
    },
    pic_suda:{
        
    }
});