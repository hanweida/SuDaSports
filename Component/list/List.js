import React ,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

export default class List extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Text>List</Text>
            </View>
        );
    }

    componentDidMount() {
        //http://s.tmiaoo.com/ipad.html
        //http://nba.tmiaoo.com/nba.html
      var responses = fetch('http://s.tmiaoo.com/ipad.html')
      .then((response) => response.text())
      .then((responseText) => {
       // console.log(responseText);
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
         let zuobiao = successMessage.indexOf('<script src="/d/js/js/');
         let zuobiaoEnd = successMessage.indexOf('"></script>');
         console.log(zuobiao);
         console.log(zuobiaoEnd);
         let str = successMessage.substring(zuobiao+'<script src="'.length, zuobiaoEnd);
         console.log(str);
         this.getByJsFile(str);
    }

    getByJsFile=(str)=>{
        console.log('http://nba.tmiaoo.com'+str);
         var responses = fetch('http://nba.tmiaoo.com'+str)
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
    }
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1
        }
    }
);