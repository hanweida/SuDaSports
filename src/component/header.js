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

 export default class Header extends Component{
    constructor(props) {  
        super(props);  
        this.state = {
            pressStatus: false,
            button_index:0
        };
    }

     componentDidMount() {
         this._onHideUnderlay(0);
     }
    _onHideUnderlay(index){
        if(index == this.state.button_index){
            this.setState({
                pressStatus: true,
                button_index:index
            });
        } else {
            this.setState({
                pressStatus: false,
                button_index:index
            });
        }
    }
  
    _onShowUnderlay(index){
        this.setState({
            pressStatus: true,
            button_index:index
        });
    }

     _onPress(){
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
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height: 0,
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