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
        this.state = {
            pressStatus: false,
            button_index:0
        };
    } 

    _onHideUnderlay(index){
        this.setState({
            pressStatus: false,
            button_index:index
        });
    }  
  
    _onShowUnderlay(index){
        this.setState({
            pressStatus: true,
            button_index:index
        });
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
                    onHideUnderlay={this._onHideUnderlay.bind(this, 0)}
                    onShowUnderlay={this._onShowUnderlay.bind(this, 0)}
                    onPress={() => {
                    }}
                    underlayColor='#FFFFFF'
                    style={[styles.button_tab,styles.button_left_tab,(this.state.pressStatus && 0 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                     <View style={styles.button_text_view}>
                        <Text style={[styles.button_text, (this.state.pressStatus && 0 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
                            直播
                        </Text>
                     </View>
                </TouchableHighlight>
               <TouchableHighlight
                   onHideUnderlay={this._onHideUnderlay.bind(this, 1)}
                   onShowUnderlay={this._onShowUnderlay.bind(this, 1)}
                   onPress={() => {
                    }}
                   underlayColor='#FFFFFF'
                   style={[styles.button_tab,styles.button_center_tab,(this.state.pressStatus && 1 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                     <View style={styles.button_text_view}>
                         <Text style={[styles.button_text, (this.state.pressStatus && 1 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
                            新闻
                         </Text>
                     </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onHideUnderlay={this._onHideUnderlay.bind(this, 2)}
                    onShowUnderlay={this._onShowUnderlay.bind(this, 2)}
                    onPress={() => {
                    }}
                    underlayColor='#FFFFFF'
                    style={[styles.button_tab,styles.button_right_tab,(this.state.pressStatus && 2 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                      <View style={styles.button_text_view}>
                          <Text style={[styles.button_text, (this.state.pressStatus && 2 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
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
    unpress_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    press_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#F66A85'
    },
    press_button:{
        backgroundColor: '#FFFFFF'
    },
    unpress_button:{
        backgroundColor: '#F66A85',
    },
    app_name:{
      
    },
    statusbar:{
        flex:1,
    },
    pic_suda:{
        
    }
});