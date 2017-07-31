import React ,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    ListView,
    ListViewDataSource,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native'

import Header from '../header';
import Footer from '../foot';
WEBVIEW_REF = 'webview';
import px2dp from '../../util/px2dp'
export default class List extends Component{
 constructor(props) {
        super(props);//这一句不能省略，照抄即可
    }

    render(){
        //采用webview方式
        return (
            <View style={styles.container}>
                <Header></Header>
                 <Footer></Footer>
            </View>
        );
    }

    componentDidMount() {
      var responses = fetch('http://s.tmiaoo.com/ipad.html')
        .then((response) => response.text())
        //获得返回的html 文本
        .then((responseText) => {
         //console.log(responseText);
         this.jiexi(responseText);
         return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
    
        //  responses.then((successMessage)=>{
        //    this.jiexi(successMessage);
        //  });
    }

    jiexi=(successMessage)=>{
        //console.log(successMessage);
        var patten = new RegExp('<script[^>]*>(.*?)<\/script>', 'g');
var matchArr = successMessage.match(patten);


        var str = successMessage.match('<script (\S*)</script>');
        //  let zuobiao = successMessage.indexOf('<script src="/d/js/js/');
        //  let zuobiaoEnd = successMessage.indexOf('"></script>');
        //  let str = successMessage.substring(zuobiao+'<script src="'.length, zuobiaoEnd);
         alert(matchArr[0]);
         console.log(matchArr[0]);
         //this.getByJsFile(str);
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    listView: {
        paddingTop: 20,
        backgroundColor: 'white',
    },
    webViewstyle:{
        height: 1000,
    },
    thumb: {
        width: 50,
        height: 50,
    },
   row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  }, 
});