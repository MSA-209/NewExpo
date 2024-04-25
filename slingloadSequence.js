
import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, TextInput, FlatList, screen} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme } from 'react-native-paper';
import { styles } from './styleSheet';
import { FontAwesome } from '@expo/vector-icons'; 
import ModelComp from './ModelComp';
const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 800;

const imageSources = {
  'Apex': require('./assets/Apex_Extra.png'), 
  'Grabhook' :require('./assets/Grabhook_Extra.png'),
  'MedClevis' :require('./assets/MedClevis_Extra.png'),
  'SusOrder' :require('./assets/SusOrder_Extra.png'),
  'TopLateralC1' :require('./assets/TopLateralC1_Extra.png'),
};
export function SlingloadSequence({navigation, itemName, inspectionSteps, videoName, nextItem, extraTitle, extraInfo, extraPhoto }) {
  const theme = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepList, setStepList] = useState('');
  const imageSource = imageSources[extraPhoto];
  
  if (stepList.length == 0) {
    setStepList(stepList + inspectionSteps[currentStepIndex] + '\n');
    setCurrentStepIndex(currentStepIndex => currentStepIndex + 1);
  }
  const goNextStep = () => {
    if (currentStepIndex <= inspectionSteps.length - 1) {
      setStepList(stepList + inspectionSteps[currentStepIndex] + '\n');
      setCurrentStepIndex(currentStepIndex => currentStepIndex + 1);
    }
  };
  const goPreviousStep = () => {
    if (currentStepIndex > 0) {
      const lastIndex = stepList.lastIndexOf('\n', stepList.length - 2);
      const newStepList = stepList.slice(0, lastIndex + 1);
      setStepList(newStepList);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleCloseBox = () => {
    setIsBoxVisible(false);
  };
  if (extraInfo) {
    extraInfo = '• ' + extraInfo.replace(/\n/g, '\n• ');
  }
  console.log(extraPhoto)
  return (
<ScrollView style={[styles.scrollView]} showsVerticalScrollIndicator={false}>
<View style={{marginTop: -10, marginBottom: 8}}>

      <View style={{marginTop: isPhone? 30 : 'auto', justifyContent: 'center',  backgroundColor: isPhone? 'transparent' : 'rgba(232, 226, 217, 0.3)', height: isPhone? 500 : 'auto'}}>
      {/* <View style={[styles.slingloadSequenceLayout, {borderColor: isPhone? 'none' : theme.colors.primary, borderWidth: 0}]}> */}

    <View style={[{flexDirection: isPhone? 'column' : 'row', borderColor: isPhone? 'none' : theme.colors.primary, 
    borderWidth: 0, height: isPhone? 500 : 600}]}>
  {/* THIS IS FOR PHONE VIEW ONLY */}
  <View style={[styles.imageTitleDisplay, {display: isPhone? 'flex' : 'none', position: 'absolute', bottom: isPhone? 'auto' : 0, zIndex: 15}]}>
        <View style={{flex: 0.9}}><Text style={{color: '#ffffff', fontSize: isPhone? 20 : 25, fontWeight: 500, alignSelf: 'center'}}>{itemName}</Text></View>
        <View style={{marginRight: 10, flex: 0.1}}>
          <TouchableOpacity onPress={() => navigation.navigate(nextItem)}>
              <View style={{marginTop: 5}}>
              <FontAwesome name="chevron-right" size={isPhone? 25 : 35} color='#ffffff'/>
            </View>
          </TouchableOpacity>
        </View>
    </View>

  {/* END PHONE VIEW OF IMAGE AND TITLE */}
      <View style={[styles.untimedTestC1, {display: isPhone? 'none' : 'flex', top : isPhone? 0 : 'auto'}]}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: isPhone? '#000000' : '#ffffff', alignSelf: 'center',
                fontSize: isPhone? 20 : 30, marginBottom: isPhone? 10 : 20, 
                marginTop: isPhone? 15 : 30}}>Inspection Steps</Text>
        {/* <View style={{backgroundColor:theme.colors.primary, width: 150, height: 3, marginBottom: 15}}></View> */}
      </View>
  <View style={styles.inspectText}>
    <ScrollView style={{height: 300, marginRight: 10}}>
    <Text style={{width: screenDimension.width * 0.25,color: isPhone? '#000000' : '#E8E2D9', fontSize: isPhone? 18 : 22, marginLeft: isPhone? 'auto' : 25, marginBottom: 10}}>{stepList}</Text>
    </ScrollView>
          </View>

      <View style={{alignSelf: 'center', marginTop: isPhone? 'auto' : 0, position: 'absolute', bottom: isPhone? 'auto' : 140}}>
        <View style={{flexDirection: 'row', gap: 15, alignSelf: 'center'}}>
          <View>
            <TouchableOpacity onPress={goPreviousStep}>
              <View style={styles.preNextStepButton}>
                <Text style={{color: '#E8E2D9', fontSize: isPhone? 16 : 18, alignSelf: 'center'}}>Previous Step</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={goNextStep}>
              <View style={styles.preNextStepButton}>
                  <Text style={{color: '#E8E2D9', fontSize: isPhone? 16 : 18, alignSelf: 'center'}}>Next Step</Text>
              </View>             
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate(videoName)}>
          <View style={[styles.preNextStepButton, {width: isPhone? 'auto' : 335, alignSelf: 'center'}]}>
            <Text style={{color: '#E8E2D9', fontSize: isPhone? 16 : 18, alignSelf: 'center'}}>Watch Video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={[styles.untimedTestC2]}> 
    <View style={{height: 50, zIndex: 30}}>
      
    </View>
      <View style={{backgroundColor: isPhone? 'rgba(232, 226, 217, 0.3)' : 'transparent', height: isPhone? 350 : 480, width: isPhone? 340 : 'auto', 
      position: 'absolute', alignSelf: 'center', top: isPhone? 50 : 40, paddingTop: isPhone? 20 : 50,
      borderRadius: isPhone? 10 : 0, borderWidth: isPhone? 1 : 0, borderColor: theme.colors.onBackground}}>
        <ModelComp imageArray = {itemName}/>
      </View>
      <View>
          <TouchableOpacity onPress={() => navigation.navigate(videoName)}>
            {/* <View style={{width: 40, height: 40, borderRadius: 40, borderWidth: 3, borderColor: theme.colors.onBackground, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="video-camera" size={20} color={theme.colors.onBackground}/>

            </View> */}
            <View style={{display: isPhone? 'flex' : 'none', marginLeft: isPhone? 'auto' : 15, top: isPhone? 195 : 265,  left: isPhone? 323 : 'auto',
        borderColor: theme.colors.onBackground, marginBottom: isPhone? 10 : 0, borderWidth: isPhone? 3 : 6, zIndex: 50,
        height: isPhone? 40 : 85, width: isPhone? 40 : 85, borderRadius: isPhone? 40 : 85, position: 'absolute', justifyContent: 'center'}}>
            <FontAwesome name="video-camera" size={20} color={theme.colors.onBackground} style={{alignSelf: 'center'}}/>
            </View>   
          </TouchableOpacity>
    <View style={{flexDirection: 'row', marginTop: isPhone? 5 : 15, marginRight: isPhone? 5 : 0, position: 'absolute'}}>
        {extraTitle || extraInfo || extraPhoto ? (        
        <TouchableOpacity onPress={toggleBoxVisibility}>
        <View style={{marginLeft: isPhone? 'auto' : 15, top: isPhone? 290 : 265,  left: isPhone? 323 : 'auto',
        borderColor: theme.colors.onBackground, marginBottom: isPhone? 10 : 0, borderWidth: isPhone? 3 : 6, zIndex: 50,
        height: isPhone? 40 : 85, width: isPhone? 40 : 85, borderRadius: isPhone? 40 : 85, position: 'absolute'}}>
          <Text style={{color: theme.colors.onBackground, fontSize: isPhone? 30 : 50, fontWeight: isPhone? 700 : 500, alignSelf: 'center', marginTop: isPhone? 0 : -3}}>?</Text>
            </View>     
          </TouchableOpacity>) : (<View></View>)}
        </View>
        </View>
{/* PHONE VIEW */}
<View style={{flexDirection: 'row', display: isPhone? 'flex' : 'none', top: 360, width: 340, alignSelf: 'center', justifyContent: 'space-between'}}>
  <View style={[{flex: 1, justifyContent: 'center', height: 100, width: 300, zIndex: 20, overflow: 'hidden', borderWidth: 1, 
  borderColor: theme.colors.onBackground, borderTopLeftRadius: 10, borderTopRightRadius: 10}]}>
    <View style={{alignSelf: 'center', height: 30, position: 'absolute', top : 0, 
    backgroundColor: 'rgba(232, 226, 217, 0.3)', justifyContent: 'center', alignItems: 'center', 
    width: 200, overflow: 'hidden', borderBottomColor: theme.colors.onBackground, borderBottomWidth: 1}}>
          <Text style={{color: theme.colors.onBackground, alignSelf: 'center',
                fontSize:16, fontWeight: 600, 
                marginTop: 0}}>Inspection Steps</Text>
        {/* <View style={{backgroundColor:theme.colors.primary, width: 150, height: 3, marginBottom: 15}}></View> */}
      </View>
<ScrollView style={{top: 25, marginTop: 10}}>
<View style={[styles.inspectText, {paddingLeft: 10}]}>
            <Text style={{width: screenDimension.width * 0.4, color: theme.colors.onBackground, fontSize: isPhone? 16 : 24, marginLeft: isPhone? 'auto' : 25, marginBottom: 10}}>{stepList}</Text>
      </View>
</ScrollView>
<View style={{backgroundColor: theme.colors.onBackground, height: 3, width: 200}}></View>
    </View>

    <View>
    <View style={{display: isPhone? 'flex' : 'none', flex: 0.2, gap: 5, alignSelf: 'flex-end'}}>
          <View>
            <TouchableOpacity onPress={goPreviousStep}>
              <View style={[styles.preNextStepButton, {borderColor: theme.colors.onBackground, borderWidth: 1}]}>
                <Text style={{color: '#E8E2D9', fontSize: isPhone? 15 : 18, alignSelf: 'center'}}>Previous Step</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={goNextStep}>
          <View style={[styles.preNextStepButton, {borderColor: theme.colors.onBackground, borderWidth: 1}]}>
                  <Text style={{color: '#E8E2D9', fontSize: isPhone? 15 : 18, alignSelf: 'center'}}>Next Step</Text>
              </View>             
            </TouchableOpacity>
          </View>
        </View>
    </View>
</View>


{/* END PHONE VIEW */}

    <View style={[styles.imageTitleDisplay, {display: isPhone? 'none' : 'flex', position: 'absolute', bottom: isPhone? 'auto' : 70}]}>
        <View style={{flex: 0.9}}><Text style={{color: '#ffffff', fontSize: isPhone? 20 : 25, fontWeight: 500, alignSelf: 'center'}}>{itemName}</Text></View>
        <View style={{marginRight: 10, flex: 0.1}}>
          <TouchableOpacity onPress={() => navigation.navigate(nextItem)}>
              <View style={{marginTop: 5}}>
              <FontAwesome name="chevron-right" size={isPhone? 20 : 35} color='#ffffff'/>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  {/* THE ABOVE WEB VIEW END*/}
    </View>
  </View>
<View>
</View>

        {isBoxVisible && (
        <View style={[styles.infoBox, {position: 'absolute', paddingTop: isPhone? 10 : 10}]}>
          {/* Close button */}
          <TouchableOpacity onPress={handleCloseBox}>
            <View style={[styles.xBox, {position: 'absolute', justifyContent: 'center', marginLeft: isPhone? 300 :850}]}>
              <Text style={[styles.xStyle, {position: 'absolute'}]}>X</Text>
            </View>
          </TouchableOpacity>
          <View style={{backgroundColor: '#ffcc01', height:1, marginTop: isPhone? 40 : 50}}></View>
          {/* Text content */}
          {extraTitle || extraInfo || extraPhoto ? (
          <View>
            <View style={{height:isPhone? 5 : 15}}></View>
            {extraTitle && <Text style={[styles.infoText, {fontSize: isPhone? 18 : 20, fontWeight: 600}]}>1. {extraTitle}</Text>}
            {extraInfo && <Text style={[styles.infoText, {marginLeft: isPhone? 'auto' : 40, marginRight: isPhone? 'auto':40}]}>{extraInfo}</Text>}
            <View style={{height:isPhone? 5 : 20}}></View>
            {extraPhoto && 
              <Image 
                source={imageSource}
                style={{
                  width: 'auto',
                  height: 230,
                  zIndex: 5,
                  resizeMode: 'contain',
                }}
              />
            }
          <View style={{height:isPhone? 15 : 35}}></View>
          </View>
        ) : (<View></View>)}
        </View>
      )}
            </View>
      </View>
    </ScrollView>
  );
}
