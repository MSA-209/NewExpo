import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen,Dimensions} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme } from 'react-native-paper';
import { styles } from './styleSheet'; 
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; 


const screenDimension = Dimensions.get("screen")
const isPhone = screenDimension.width < 800; // Adjust the threshold as needed
const videoWidth = isPhone ? screenDimension.width - 40 : 350; // Adjust the width for phone mode
const videoHeight = isPhone ? (screenDimension.width - 40) * (9 / 16) : 270; // Adjust the height for phone mode
const resolution = 9/16;
const videoSources = {
  'Placard': require('./assets/placard_video.mp4'), 
  'Apex' :require('./assets/Apex.mp4'),
  'Grabhook' :require('./assets/grabhook.mp4'),
  'ChainClevis' :require('./assets/chain_clevis.mp4'),
  'MediumClevis' :require('./assets/medium_clevis.mp4'),
  'Suspension1' :require('./assets/Suspension_strap_1.mp4'),
  'Suspension2' :require('./assets/Suspension_Strap_2.mp4'),
  'Suspension3' :require('./assets/Suspension_Strap_3.mp4'),
  'Suspension4' :require('./assets/Suspension_Strap_4.mp4'),
  'SusStrapOrder' :require('./assets/Suspension_Strap_Order.mp4'),
  'StrapSide' :require('./assets/188_strap_side.mp4'),
  'S1P2' :require('./assets/188_strap_side_P2.mp4'),
  'TopLateralC1' :require('./assets/Top_Lateral_C1.mp4'),
  'MidLateralC1' :require('./assets/MId_Lateral_C1.mp4'),
  'BotLateralC1' :require('./assets/Bottom_Lateral_C1.mp4'),
};


export function SlingloadVideo({ navigation, videoName, sequenceName }) {
    const theme = useTheme();
    const videoSource = videoSources[videoName];
    const videoRef = React.useRef(null);
    const [skipText, setSkipText] = useState('Skip');
    const handlePlaybackStatusUpdate = (playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        setSkipText('Next');
      }
    };
    const handleSkip = async () => {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
      }
      navigation.navigate(sequenceName);
    };
    const handleReplay = async () => {
      if (videoRef.current) {
        await videoRef.current.replayAsync();
      }
    };
    return (
      <View>
        <View style={{marginTop: isPhone? 30 : 40, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{top: isPhone? 6 : 7, width: isPhone? 340 : 580, height: isPhone? 250 : 420,
             overflow: 'hidden', alignSelf: 'center', borderRadius: 10, borderWidth: 1, borderColor: theme.colors.primary,
             justifyContent: 'center', alignItems: 'center'}}>
              <Video 
              ref={videoRef}
              source={videoSource}
              style={{width: isPhone? 445 : 800, height: isPhone? 400: 420, alignSelf: 'center'}}

              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />   
            </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: isPhone? 340 : 580, 
          height: isPhone? 40 : 50, backgroundColor: '#ffcc01', alignSelf: 'center', alignItems: 'center',
          borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
          <TouchableOpacity onPress={handleReplay}>
            <View style={{marginLeft: 20, flexDirection: 'row'}}>
              <View>
                <Text style={{color:'#000000', fontSize: 18}}>Replay</Text>
              </View>
              {/* <View>
              <FontAwesome name="undo" size={20} color={theme.colors.primary} />
              </View> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <View style={{marginRight: 20, justifyContent: 'center'}}>
            <Text style={{color:'#000000', fontSize: 18}}>{skipText}</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }





