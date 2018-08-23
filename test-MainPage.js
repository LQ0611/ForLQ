
import React, {Component} from 'react';

import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity, ListView, Dimensions,
    DeviceEventEmitter,
    NetInfo,
    NativeModules,
} from 'react-native';

import List from './Select';
import data from './test-data';
export default class MainComponent extends Component {
    static navigationOptions=({navigation}) => ({
        title:'索引测试页面',
    });
    constructor(props) {
        super(props);
    }

    Show(item){
        console.log("item",item);
        Alert.alert('Show你选择了城市====》' + item.id + '#####' + item.name);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <List
                    param={data}
                    Show={this.Show.bind(this)}


                    style={{
                        /*分组的组名高度*/
                        SECTIONHEIGHT :30,

                        /*分组的组名背景颜色*/
                        sectionBackgroundColor:'#F4F4F4',

                        /*分组组名字体大小*/
                        sectionFontSize:20,

                        /*分组组名字体颜色*/
                        sectionFontColor:'black',

                        /*分组组名左边距*/
                        sectionMarginLeft:5,

                        /*当组名不为字母时，方块所在行的高度*/
                        ROWHEIGHT_BOX : 40,

                        /*组名不为字母时，一行有几个*/
                        boxNumEveryRow:3,

                        /*组名不为字母时，每个方块的左右边距*/
                        boxMarginLeft:10,
                        boxMarginRight:10,

                        /*组名不为字母时，每个方块的上下边距*/
                        boxMarginTop:5,
                        boxMarginBottom:5,

                        /*组名不为字母时，方块内名字的字体大小*/
                        boxFontSize:15,

                        /*组名不为字母时，方块内名字的字体颜色*/
                        boxFontColor:'black',

                        /*组名不为字母时，方块边框宽度*/
                        boxBorderWidth:1,

                        /*组名不为字母时，方块边框宽度*/
                        boxBorderColor:'#DBDBDB',

                        /*组名不为字母时，方块所在行的北京颜色*/
                        boxRowBackgroundColor:'#ffffff',

                        /*列表每一行的高度*/
                        ROWHEIGHT :50,

                        /*在关键字不为字母时，每一行有几个小块*/
                        boxNumEveryRow:3,

                        /*图片、标题左边距*/
                        imgMarginLeft:10,
                        textMarginLeft:10,

                        /*主标题字体大小及颜色*/
                        headTitleColor:'black',
                        headTitleFontSize:25,

                        /*索引的字体大小及颜色*/
                        letterFontColor:'#D0D0D0',

                        /*索引的右边距*/

                        /*索引的右边距*/
                        letterMarginTop:10,

                        /*索引列表高度*/
                        /*索引列表宽度*/

                        /*图片的高度、宽度*/
                        imageHeight:40,
                        imageWidth:40,
                    }}
                />
            </View>
        )
    }


}
