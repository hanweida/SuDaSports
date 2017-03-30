import React ,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    ListView,
    ListViewDataSource,
    TouchableOpacity,
    Image
} from 'react-native'

export default class List extends Component{
 constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=> row1 !== row2,
            }),
            isLoadingTail:false,
            isRefreshing:false,
        };
    }

    _renderRow=(rowData, sectionID, rowID)=> {
          //    console.log(josnArray[0].prename);
        //    console.log(josnArray[0].prePic);
        //    console.log(josnArray[0].time);
        //    console.log(josnArray[0].lastname);
        //    console.log(josnArray[0].lastPic);
        //    console.log(josnArray[0].videourl);
    return (
        <TouchableOpacity>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri:rowData.prePic}} />
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.prename}
              </Text>
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.time}
              </Text>
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.lastname}
              </Text>
              <Image style={styles.thumb} source={{uri:rowData.lastPic}} />
            </View>
          </View>
        </TouchableOpacity>
    );
   }

    render(){
        return (
            //onEndReached={this._fetchMoreData}
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}

                    style={styles.listView}
                />
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
            var josnArray=[];
            for(i = 0; i < arrays.length ; i++){
                var josnData={};
                 text=arrays[i];
                 startIndex = text.indexOf('http://');
                 endIndex = text.indexOf('" class');
                 josnData['videourl']=text.substring(startIndex,endIndex);

                startPreNameIndex=text.indexOf('<span>');
                endPreNameIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                startPrePicIndex=text.indexOf('<img src=\\"');
                endPrePicIndex = text.indexOf('\\"><span>');
                josnData['prePic']=text.substring(startPrePicIndex+'<img src=\\"'.length,endPrePicIndex);

                
                text = text.substr(text.indexOf('score-content'));
                startTimeIndex=text.indexOf('<span>');
                endTimeIndex = text.indexOf('</span>');
                josnData['time']=text.substring(startTimeIndex+"<span>".length,endTimeIndex);

                text = text.substr(endTimeIndex+'</span>'.length);
                startLastNameIndex=text.indexOf('<span>');
                endLastNameIndex = text.indexOf('</span>');
                josnData['lastname']=text.substring(startLastNameIndex+"<span>".length,endLastNameIndex);

                startLastPicIndex=text.indexOf('<img src=\\"');
                endLastPicIndex = text.indexOf('\\"><span>');
                josnData['lastPic']=text.substring(startLastPicIndex+'<img src=\\"'.length,endLastPicIndex);
                josnArray.push(josnData);
            }     

        //console.log(josnArray[0].videourl +":"+josnArray[0].prename +":"+josnArray[i].prePic+":"+josnArray[i].time+":"+josnArray[i].lastname+":"+josnArray[i].lastPic);
        //    console.log(josnArray[0].prename);
        //    console.log(josnArray[0].prePic);
        //    console.log(josnArray[0].time);
        //    console.log(josnArray[0].lastname);
        //    console.log(josnArray[0].lastPic);
        //    console.log(josnArray[0].videourl);
            for( i in josnArray){
                console.log(josnArray[i].videourl +":"+josnArray[i].prename +":"+josnArray[i].prePic+":"+josnArray[i].time+":"+josnArray[i].lastname+":"+josnArray[i].lastPic);
            }
             this.setState({
                    // dataSource: this.state.dataSource.cloneWithRows([
                    //     {
                    //         "lastname":"lastname"
                    //     },
                    //     {
                    //         "lastname":"firtst"
                    //     }
                    // ])   
                     dataSource: this.state.dataSource.cloneWithRows(josnArray)   
            });
            // for( i in josnArray){
            //    // this._data = this._data.concat(josnArray[i]);
                
            // }
            
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