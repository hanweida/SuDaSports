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
        // console.log(str);
         this.getByJsFile(str);
    }

    getByJsFile=(str)=>{
        console.log('http://nba.tmiaoo.com'+str);
         var responses = fetch('http://nba.tmiaoo.com'+str)
      .then((response) => response.text())
      .then((responseText) => {
       // console.log(responseText);
        this.getJSAddressByJsFile(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
    }

    getJSAddressByJsFile=(str)=>{
        let startIndex = 0;
         let endIndex = 0;
         let array = [];
         //console.log(str);
        while((startIndex = str.indexOf('<a data-action='))!=-1){
            endIndex= str.indexOf('</a>')+"</a>".length;
            let sub = str.substring(startIndex, endIndex);
            array.push(sub);
            str=str.substr(endIndex);
            //console.log(sub);
            //console.log("----------------------------------");
        }
 //a data-action=\"相关比赛\" href=\"http://nba.tmiaoo.com//n/100202900?classid=1&id=2098\" class=\"boss\">		
            //<div class=\"team-left\">			
            //<img src=\"http://img1.gtimg.com/bj2022fr/pics/hv1/48/131/2149/139772178.png\"><span>瓦基弗银行</span>		
            //</div>		<div class=\"team-score\">			<p class=\"score-num gray\">				
            //<span>-</span>			</p>			
            //<p class=\"score-content\">				
            //<span>03-30 23:55:00</span>			</p>		</div>		
            //<div class=\"team-right\">			
            //<img src=\"http://img1.gtimg.com/sports/pics/hv1/88/238/2155/140189653.png\"><span>贝西克塔斯</span>		
            //</div>		</a>
            this.textToJson(array);
    }

        textToJson=(arrays)=>{
             let startIndex = 0;
             let endIndex = 0;
             let startPreNameIndex = 0;
             let endPreNameIndex = 0;
             let startPrePicIndex = 0;
             let endPrePicIndex = 0;
             let startLastPicIndex = 0;
             let endLastPicIndex = 0;
             let startLastNameIndex = 0;
             let endLastNameIndex = 0;
             let startTimeIndex = 0;
             let endTimeIndex = 0;
            let text;
            var josnData={};
            var josnArrya=[];
            for(i = 0; i < arrays.length ; i++){
                 text=arrays[i];
                 startIndex = text.indexOf('http://');
                 endIndex = text.indexOf('" class');
                 josnData['videourl']=text.substring(startIndex,endIndex);

                startPreNameIndex=text.indexOf('<span>');
                endPreNameIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                startPrePicIndex=text.indexOf('<span>');
                endPrePicIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                 startLastNameIndex=text.indexOf('<span>');
                endLastNameIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                 startTimeIndex=text.indexOf('<span>');
                endTimeIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                startLastPicIndex=text.indexOf('<span>');
                endLastPicIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                josnArrya.push(josnData);
            }     
            for( i in josnArrya){
                console.log(josnArrya[i].prename +":"+josnArrya[i].videourl);
            }
        }
    
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1
        }
    }
);