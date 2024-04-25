import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme, Menu, Appbar,Divider, Button, TouchableWithoutFeedback} from 'react-native-paper';
import { styles } from './styleSheet';
import {SlingloadTitle} from './slingloadTitle.js';
import {SlingloadVideo} from './slingloadVideo.js';
import {SlingloadSequence} from './slingloadSequence.js';
import ModelComp from './ModelComp';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import {SlingloadQuizScreen} from './slingloadQuiz.js';
const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 800;


export function SlingloadScreen({ navigation, route }) {
  const screen = route.name
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const theme = useTheme();
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
      <View style={{marginTop: -10, marginBottom: 8}}>

        <View style={[styles.headerTitleContainer, {height: 55}]}>
          <View style={styles.titleTextBox}>
            <Text style={styles.titleText} variant='headlineLarge'>Slingload Simulator</Text>

          </View>
        </View>
      </View>
      <View>
    <View>

    <Text style={[styles.inspectorTitle]}>SLINGLOAD INSPECTOR</Text>

    </View>

      <View style={[styles.inspectorB1, {width: screenDimension.width}]}>
          <View style={{marginLeft: isPhone? 10 : 80, marginTop: isPhone? 10 : -60, alignSelf: 'center', flex: isPhone? 1 : 0.2, zIndex: 2}}>
            <TouchableOpacity onPress={() => navigation.navigate('Placard')}>
              <View style={[styles.basicButton, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface}]}>
                  <Text style={styles.slButtonText}>Walkthroughs</Text>
              </View>
            </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Slingload Quiz')}>
            <View style={[styles.basicButton, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface}]}>
              <Text style={styles.slButtonText}>Practical Tests</Text>
            </View>
          </TouchableOpacity>
  
        </View>
        <View style={{flex: isPhone? 1 : 0.8}}>
          <View>
            <Image source={require("./assets/BagWithApexWireFrame.gif")} 
              style={{
              marginLeft: isPhone? 'auto' : -50,
              marginTop: isPhone? 'auto' : -15,
              marginBottom: 5,
              width: 'auto',
              height: isPhone? 200 : 500,
              resizeMode: 'contain',
              }}/>
          </View>
        </View>

        </View>

    </View>
    </ScrollView>
  );
}

export function PlacardScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
    <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadTitle title="PLACARD" navigation={navigation} videoName="Placard Video" sequenceName = "Placard Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 :0}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function PlacardVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={{left: '0%'}}>
      {/* <SlingloadDropdown/> */}
    </View>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
    <View style={{width: 40}}>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Placard" sequenceName = "Placard Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}
{/* <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? -15 : 'auto'}}>
<SlingloadDropdown style={{position: 'absolute'}}/>
</View> */}


export function PlacardSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Check Load: A-22 Cargo Bag", "2. Check Aircraft", "3. Check Load Weight", "4. Check Hand Tight"]} navigation={navigation} itemName="Placard" videoName="Placard Video" nextItem = 'Apex'
  extraTitle="Check the load: A-22" extraInfo="Ensure the load listed is for the correct mission" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function ApexScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="APEX" navigation={navigation} videoName="Apex Video" sequenceName = "Apex Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 :0}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function ApexVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Apex" sequenceName = "Apex Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function ApexSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Check Aluminum Spacer", "2. Check BCC's", "3. Bolt", "4. Castellated Nut", "5. Cotter Pin"]} navigation={navigation} itemName= 'Apex' videoName="Apex Video" nextItem = "Grabhook"

  extraTitle="Check Aluminum Spacer" extraPhoto= "Apex"
  extraInfo="If the Aircraft is a UH-60, the 10k apex must have an aluminum spacer.\n Another deficiency can exist if a 25k aluminum spacer is rigged on a 10 apex. The 25k spacer is not only a bigger thank the 10k spacer, but when the rigger to the 10k apex and gets shaken, it'll sound like a cow bell." />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function GrabhookScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="GRABHOOK" navigation={navigation} videoName="Grabhook Video" sequenceName = "Grabhook Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function GrabhookVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Grabhook" sequenceName = "Grabhook Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function GrabhookSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Ensure the link from the grabhook has a count of 3", "2. Ensure the grabhook is not inverted", "3. Ensure the dome nut/locking nut is present", "4. Check Snap Ring is present"]} navigation={navigation} itemName= 'Grabhook' videoName="Grabhook Video" nextItem = "ChainClevis"
  extraTitle="Ensure link count of 3" extraInfo="Ensure the 3rd link is secure into the keeper" extraPhoto="Grabhook"/>
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function ChainClevisScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="CHAIN-CLEVIS" navigation={navigation} videoName="ChainClevis Video" sequenceName = "ChainClevis Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function ChainClevisVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="ChainClevis" sequenceName = "ChainClevis Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function ChainClevisSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Ensure chain can slide freely through clevis", "2. Ensure chain is not looped more than once enough"]} navigation={navigation} itemName='ChainClevis' videoName="MediumClevis Video" nextItem = "MediumClevis"
   extraTitle="Ensure the chain can slide freely through the clevis"/>
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function MediumClevisScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="MEDIUM CLEVIS" navigation={navigation} videoName="MediumClevis Video" sequenceName = "MediumClevis Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function MediumClevisVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="MediumClevis" sequenceName = "MediumClevis Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function MediumClevisSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Ensure the nut and bolt are taped", "2. Grab the clevis like a coffee cup and check"]} navigation={navigation} itemName = 'MediumClevis' videoName="MediumClevis Video" nextItem = "Suspension1"

    extraTitle="Ensure nut and bolt are taped" extraPhoto="MedClevis" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 'auto'}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension1Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="SUSPENSION STRAP 1" navigation={navigation} videoName="Suspension1 Video" sequenceName = "Suspension1 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension1Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Suspension1" sequenceName = "Suspension1 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function Suspension1Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Trace 1st 24\" Sus. Strap", "2. Ensure it is not twisted", "3. Ensure Butterfly snaphook is secured with tape", "4. Ensure Butterfly snaphook faces inside of load"]} navigation={navigation} itemName= 'Suspension1' videoName="Suspension1 Video" nextItem = "Suspension2" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension2Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="SUSPENSION STRAP 2" navigation={navigation} videoName="Suspension2 Video" sequenceName = "Suspension2 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension2Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Suspension2" sequenceName = "Suspension2 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function Suspension2Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Trace 2nd 24\" Sus. Strap", "2. Ensure it is not twisted", "3. Ensure Butterfly snaphook is secured with tape", "4. Ensure Butterfly snaphook faces inside of load"]} navigation={navigation} itemName= 'Suspension2-4' videoName="Suspension2 Video" nextItem = "Suspension3" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension3Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="SUSPENSION STRAP 3" navigation={navigation} videoName="Suspension3 Video" sequenceName = "Suspension3 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension3Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Suspension3" sequenceName = "Suspension3 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function Suspension3Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Trace 3rd 24\" Sus. Strap", "2. Ensure it is not twisted", "3. Ensure Butterfly snaphook is secured with tape", "4. Ensure Butterfly snaphook faces inside of load"]} navigation={navigation} itemName= 'Suspension2-4' videoName="Suspension3 Video" nextItem = "Suspension4" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension4Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="SUSPENSION STRAP 4" navigation={navigation} videoName="Suspension4 Video" sequenceName = "Suspension4 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function Suspension4Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="Suspension4" sequenceName = "Suspension4 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function Suspension4Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Trace 4th 24\" Sus. Strap", "2. Ensure it is not twisted", "3. Ensure Butterfly snaphook is secured with tape", "4. Ensure Butterfly snaphook faces inside of load"]} navigation={navigation} itemName= 'Suspension2-4' videoName="Suspension4 Video" nextItem = "SusStrapOrder" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function SusStrapOrderScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="SUS. STRAP ORDER" navigation={navigation} videoName="SusStrapOrder Video" sequenceName = "SusStrapOrder Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function SusStrapOrderVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="SusStrapOrder" sequenceName = "SusStrapOrder Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function SusStrapOrderSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>

  <SlingloadSequence inspectionSteps={["1. Ensure the straps are in clockwise or", "2. Strap 1 - Front of Load", "3. Strap 2 - Left of Load", "4. Strap 3 - Across the Load", "5. Strap 4 - Right of load"]} navigation={navigation} itemName= 'SusStrapOrder' videoName="SusStrapOrder Video" nextItem = "StrapSide"

    extraTitle="Ensure straps are in clockwise or counterclockwise order." extraPhoto="SusOrder" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}
export function StrapSideScreen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="188 IN STRAP SIDE 1" navigation={navigation} videoName="StrapSide Video" sequenceName = "StrapSide Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function StrapSideVideo({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="StrapSide" sequenceName = "StrapSide Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function StrapSideSequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Grab Strap where sewn into web", "2. Twice Strap up", "3. Check Friction Adapter for GGMG", "4. Ensure Excess isn't secured over the Friction Adapter"]} navigation={navigation} itemName = 'StrapSide1&2' videoName="StrapSide" nextItem = "S1P2" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}
export function S1P2Screen({ navigation, route }) {
  const theme = useTheme();
  return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
      <View style={{marginTop: -10, marginBottom: 8}}>
      <View style={styles.headerTitleContainer}>
        <View style={styles.titleTextBox}>
          <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
        </View>
      </View>
      <SlingloadTitle title="188 in S1 P2" navigation={navigation} videoName="S1P2 Video" sequenceName = "S1P2 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
      </View>
    </ScrollView>  
      );
}

export function S1P2Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="S1P2" sequenceName = "S1P2 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function S1P2Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>

  <SlingloadSequence inspectionSteps={["1. Trace Strap across top of load", "2. Ensure strap isn't misrouted", "3. Ensure strap is not twisted", "4. Ensure Excess is secured with tape"]} navigation={navigation} itemName = 'StrapSide1&2' videoName="S1P2 Video" nextItem = "TopLateralC1" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function TopLateralC1Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="TOP LATERAL C1" navigation={navigation} videoName="TopLateralC1 Video" sequenceName = "TopLateralC1 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function TopLateralC1Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="TopLateralC1" sequenceName = "TopLateralC1 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function TopLateralC1Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadSequence inspectionSteps={["1. Trace Step and ensure it is not twisted", "2. Friction Adapter should be GGMG", "3. Ensure Excess is secured with tape", "4. Ensure Excess is not secured over FA"]} navigation={navigation} itemName = 'TopLateralC1' videoName="TopLateralC1 Video" nextItem = "MidLateralC1"

   extraPhoto="TopLateralC1" extraTitle="Trace strap and ensure it is not twisted"/>
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function MidLateralC1Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
      <SlingloadTitle title="MIDDLE LATERAL C1" navigation={navigation} videoName="MidLateralC1 Video" sequenceName = "MidLateralC1 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function MidLateralC1Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="MidLateralC1" sequenceName = "MidLateralC1 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function MidLateralC1Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>

  <SlingloadSequence inspectionSteps={["1. Trace Step and ensure it is not twisted", "2. Friction Adapter should be GGMG", "3. Ensure Excess is secured with tape", "4. Ensure Excess is not secured over FA", "5. Ensure strap is not routed behind lacing"]} navigation={navigation} itemName= 'MidLateralC1' videoName="MidLateralC1 Video" nextItem = "LateralC1"

     extraPhoto="TopLateralC1_Extra" extraTitle="Trace strap and ensure it is not twisted" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function BotLateralC1Screen({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <View style={{height: isPhone? 10 : 'auto'}}></View>
      <SlingloadTitle title="BOTTOM LATERAL C1" navigation={navigation} videoName="BotLateralC1 Video" sequenceName = "BotLateralC1 Sequence" />
      <View style={{position: 'absolute', zIndex: 10, right: isPhone? 230 : 0, top: isPhone? 38 : 'auto'}}>
          <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}

export function BotLateralC1Video({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>
  <SlingloadVideo  navigation={navigation} videoName="BotLateralC1" sequenceName = "BotdLateralC1 Sequence" />
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 220 : 0, top: isPhone? 50 : 0}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


export function BotLateralC1Sequence({ navigation, route }) {
  const theme = useTheme();
  return (
  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
  <View style={{marginTop: -10, marginBottom: 8}}>
  <View style={styles.headerTitleContainer}>
    <View style={styles.titleTextBox}>
      <Text style={{color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Slingload Simulator</Text>
    </View>
  </View>

  <SlingloadSequence inspectionSteps={["1. Trace Step and ensure it is not twisted", "2. Friction Adapter should be GGMG", "3. Ensure Excess is secured with tape", "4. Ensure Excess is not secured over FA", "5. Ensure strap is not routed behind lacing"]} navigation={navigation} itemName = 'BotLateralC1' videoName="BotLateralC1 Video" nextItem = "Slingload Integration" 

     extraPhoto="TopLateralC1_Extra" extraTitle="Trace strap and ensure it is not twisted"/>
  <View style={{position: 'absolute', zIndex: 10, right: isPhone? 270 : 0, top: isPhone? 110 : 63}}>
            <SlingloadDropdown style={{position: 'absolute'}}/>
        </View>
  </View>
</ScrollView>  
  );
}


const SlingloadDropdown = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleHamburgerClick = () => {
    setMenuVisible(!menuVisible);
  };
  const handleItemClick = (element) => {
    title = element;
    navigation.navigate(element);
    setMenuVisible(false);
};

  const titles = ["Placard", "Apex", "Grabhook", "ChainClevis", "MediumClevis", "Suspension1" , "Suspension2" , "Suspension3",
  "Suspension4", "SusStrapOrder", "StrapSide", "S1P2", "TopLateralC1", "MidLateralC1", "BotLateralC1"];

  return (      
    <View style={{top: isPhone? 8 : 55, alignItems: 'flex-end', right: isPhone? -230 : 0}}>
      <View style={{flexDirection: 'row', justifyContent: 'centers', zIndex: 30}}>
      <View style={{flex: 0.1, left: isPhone? -20 :30}}>
        <TouchableOpacity onPress={handleHamburgerClick}>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingTop: 8, paddingBottom: 8,
          paddingRight: 12, paddingLeft: 12, borderRadius: 10, position: 'absolute', zIndex: 10, right: isPhone? 0 : 45, top: isPhone? 5 : 10}}>
                  <FontAwesome name="list-ul" size={isPhone? 24 : 40} color='#E8E2D9'/>
              </View>
      </TouchableOpacity>
      </View>

      </View>

      <View style={{alignItems: 'center', top: isPhone? 0 : 0, zIndex: 16}}>
      {menuVisible && (       
      <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)',position: 'absolute', borderRadius: 0, width: isPhone? 250 : 400, alignSelf: 'flex-end'}}>
          <View style={[styles.menuSection, {top: isPhone? 'auto' : 0, backgroundColor: '#5d5e5e', height: isPhone? 50 : 75, marginBottom: isPhone? 5 : 5, borderRadius: 0}]}>
            <Text style={[styles.sectionMenuTitle, {fontSize: isPhone? 15 : 23, alignSelf: 'center', zIndex: 15}]}>SECTION MENU</Text>
        </View>
      <ScrollView style={{height: isPhone? 360 : 420, top: isPhone? 10 : 15, paddingRight: isPhone? 15 : 20}} showsVerticalScrollIndicator={true}>
      {titles.map((title, index) => (
        <TouchableOpacity key={index} onPress={() =>  {handleItemClick(title)}}>
        <View style={[styles.menuItemBox,  {marginLeft: isPhone? 10 : 20, marginBottom: isPhone? 10 : 10,  marginRight: isPhone? 10 : 20, backgroundColor: '#232425', paddingLeft: isPhone? 10 : 25, justifyContent: 'center'}]}>
          <Text style={{color: '#ffffff', fontSize: isPhone? 16 : 18}}>{titles[index]}</Text>
        </View>
      </TouchableOpacity>
    ))}
        </ScrollView>
    <View style={{height: isPhone? 15 : 40, shadowColor: 'white', 
    backgroundColor: '#E8E2D940', marginTop: 20 }}></View>
        </View>
          
        )}
      </View>


    </View>
  );
};


export default SlingloadDropdown;