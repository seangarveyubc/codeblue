import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Colours from "../../utilities/Colours";

interface Props {
    heartRate:any
}

const HeartRateWidget =  ({ heartRate }: Props) => {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
    if (heartRate !== '') {
      setActive(true);
    } else {
      setActive(false);
    }
    });

    return (
        <View style={styles.widget}>
            <View style={styles.text}>
                <Text style={{ flex:0.4, fontSize: 16, color: active?Colours.BLACK:Colours.GREY }}>{'Heart Rate'}</Text>
                <View style={styles.reading}>
                    <Text style={{ fontSize: 50,   color: active?Colours.BLACK:Colours.GREY}}>{active?heartRate:'----'}</Text>
                    <Text style={{ marginBottom:10, fontSize: 20, color: active?Colours.BLACK:Colours.GREY }}>{'bpm'}</Text>
                </View>
            </View>
            <Image
            source={require('../assets/images/heartRate.png')} //Change your icon image here
            style={styles.ImageStyle}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
  widget:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    margin:20,
    height:170,
    borderRadius: 20,
    backgroundColor: Colours.LIGHTBLUE,
    fontFamily: 'DM SANS'
  },
//   title: {flex:0.4,
//     fontSize: 16,    
//     color:Colours.BLACK,
//   },
//   rate:{
//     fontSize: 50,    
//     color:Colours.BLACK,
//   },
//   bpm:{
//     marginBottom:10,
//     fontSize: 20,    
//     color:Colours.BLACK,},

  text: {
    flex:0.5,
    flexDirection:'column'
  },
  reading:{
    alignItems:'flex-end',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  ImageStyle:{}
});

export default HeartRateWidget; 