import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Animated, Platform, Appearance, ImageBackground, Linking,TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as rssParser from 'react-native-rss-parser';
import Constants from "expo-constants"
import * as SplashScreen from 'expo-splash-screen';
import { MaterialIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Appbar,
  BottomNavigation,
  Menu,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  Avatar, 
  Card, 
  Divider,
  IconButton,
  List,
  Button, 
  Title,
  Text,
  Paragraph,
  TouchableRipple,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';
import {VideoScreen} from './AirAssaultHome.js';
import { PlaylistScreen } from './AirAssaultHome.js';
import { VideoPlayerScreen } from './VideoButton.js';
import { AddedVideosContext } from './videoContext.js';
import { QuizScoresContext } from './quizScoresContext.js';
import {SlingloadScreen, PlacardScreen, PlacardSequence, PlacardVideo, ApexScreen, 
  ApexVideo, ApexSequence, GrabhookScreen, GrabhookVideo, GrabhookSequence, ChainClevisScreen, 
  ChainClevisVideo, ChainClevisSequence, MediumClevisScreen,MediumClevisSequence,
  MediumClevisVideo, Suspension1Screen,Suspension1Video, Suspension1Sequence, Suspension2Screen, Suspension2Sequence, Suspension2Video, 
   Suspension3Screen, Suspension3Video,Suspension3Sequence, Suspension4Screen, Suspension4Sequence, Suspension4Video,
  SusStrapOrderScreen,SusStrapOrderSequence,SusStrapOrderVideo, 
  TopLateralC1Screen, TopLateralC1Sequence, TopLateralC1Video, MidLateralC1Screen, MidLateralC1Sequence, MidLateralC1Video,
  BotLateralC1Screen, BotLateralC1Sequence, BotLateralC1Video, StrapSideScreen, StrapSideSequence, StrapSideVideo} from './slingload.js';
  import {SlingloadQuizScreen, UntimedQuizScreen, EndQuizScreen, QuizScoresScreen} from './slingloadQuiz.js';
/*import * as rssParser from 'react-native-rss-parser';*/


import {AirAssaultScreen} from './AirAssaultHome.js';
import {Phase1Screen} from './AirAssaultHome.js';
import {Phase2Screen} from './AirAssaultHome.js';
import {PathfinderScreen} from './PathfinderHome.js';
import {RangerScreen} from './RangerHome.js';
//import {TestScreen} from './AirAssaultHome.js';

//version output
const version = Constants.expoConfig.version
console.log("Version: ", version)

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationdark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
      "primary": "rgb(112, 93, 0)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 225, 109)",
      "onPrimaryContainer": "rgb(34, 27, 0)",
      "secondary": "rgb(103, 94, 64)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(239, 226, 188)",
      "onSecondaryContainer": "rgb(33, 27, 4)",
      "tertiary": "rgb(68, 102, 78)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(198, 236, 205)",
      "onTertiaryContainer": "rgb(0, 33, 14)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(29, 27, 22)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(29, 27, 22)",
      "surfaceVariant": "rgb(234, 226, 207)",
      "onSurfaceVariant": "rgb(75, 71, 57)",
      "outline": "rgb(124, 119, 103)",
      "outlineVariant": "rgb(205, 198, 180)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(51, 48, 42)",
      "inverseOnSurface": "rgb(246, 240, 231)",
      "inversePrimary": "rgb(233, 196, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 243, 242)",
        "level2": "rgb(244, 238, 235)",
        "level3": "rgb(239, 234, 227)",
        "level4": "rgb(238, 232, 224)",
        "level5": "rgb(235, 229, 219)"
      },
      "surfaceDisabled": "rgba(29, 27, 22, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 22, 0.38)",
      "backdrop": "rgba(52, 48, 36, 0.4)"
  }
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
    colors: {
      "primary": "rgb(233, 196, 0)",
      "onPrimary": "rgb(58, 48, 0)",
      "primaryContainer": "rgb(84, 70, 0)",
      "onPrimaryContainer": "rgb(255, 225, 109)",
      "secondary": "rgb(210, 198, 161)",
      "onSecondary": "rgb(55, 48, 22)",
      "secondaryContainer": "rgb(78, 70, 42)",
      "onSecondaryContainer": "rgb(239, 226, 188)",
      "tertiary": "rgb(170, 208, 178)",
      "onTertiary": "rgb(21, 55, 34)",
      "tertiaryContainer": "rgb(45, 78, 55)",
      "onTertiaryContainer": "rgb(198, 236, 205)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(29, 27, 22)",
      "onBackground": "rgb(232, 226, 217)",
      "surface": "rgb(29, 27, 22)",
      "onSurface": "rgb(232, 226, 217)",
      "surfaceVariant": "rgb(75, 71, 57)",
      "onSurfaceVariant": "rgb(205, 198, 180)",
      "outline": "rgb(151, 144, 128)",
      "outlineVariant": "rgb(75, 71, 57)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(232, 226, 217)",
      "inverseOnSurface": "rgb(51, 48, 42)",
      "inversePrimary": "rgb(112, 93, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(39, 35, 21)",
        "level2": "rgb(45, 41, 20)",
        "level3": "rgb(51, 46, 20)",
        "level4": "rgb(54, 47, 19)",
        "level5": "rgb(58, 51, 19)"
      },
      "surfaceDisabled": "rgba(232, 226, 217, 0.12)",
      "onSurfaceDisabled": "rgba(232, 226, 217, 0.38)",
      "backdrop": "rgba(52, 48, 36, 0.4)"
  }
};



//Navbar
function CustomNavigationBar({ navigation, back, route, isDarkMode, toggleDarkMode }) {
  const screen = route.name
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  return (
    <Appbar.Header style={{backgroundColor: "#221f20", borderBottomWidth: 5, borderColor: "#ffcc01", height: 55, justifyContent: "space-around"}}>
      <View style={{position: "absolute", left: 0, justifyContent: "center"}}>
        {(screen == ("Home") || screen == ("News") || screen == ("About")|| screen == ("Feedback")) &&
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" onPress={openMenu} color={"#FFFFFF"} />}
          style={{position: "absolute", marginTop: 48, left: 0}}
        >
          <Image source={require("./assets/AirbornePatch.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 5,
          width: 100,
          height: 100,
          resizeMode:"contain"
          }}/>
          <Divider style= {{backgroundColor: "#ffcc01", height: 3}}></Divider>
          <Menu.Item onPress={() => { navigation.navigate('HomeScreen'); closeMenu(); }} title="Home" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('NewsScreen'); closeMenu(); }} title="News" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('AboutScreen'); closeMenu(); }} title="About" />
          <Divider style= {{backgroundColor: "#ffcc01", height: 3}}></Divider>
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('FeedbackScreen'); closeMenu(); }} title="Feedback" />
          <Divider style= {{backgroundColor: "#ffcc01", height: 3}}></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Air Assault Program'); closeMenu(); }} title="Air Assault" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Pathfinder Program'); closeMenu(); }} title="Pathfinder" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Ranger Program'); closeMenu(); }} title="Ranger" />
          <Divider style= {{backgroundColor: "#ffcc01", height: 3, marginBottom: -10}}></Divider>
        </Menu>}
      </View>
      {(screen != ("Home") && screen != ("About") && screen != ("News") && screen != ("Feedback")) && <Appbar.BackAction 
        style={{position: "absolute", left: 0, bottom: 0}} onPress={navigation.goBack} color={"#FFFFFF"}/>
      }
      <Appbar.Action
        icon={isDarkMode ? 'brightness-2' : 'white-balance-sunny'}
        style={{ position: 'absolute', right: 0, bottom: 0 }}
        onPress={toggleDarkMode}
        color={'#FFFFFF'}
      />
      {(screen == ("Home") || screen == ("News") || screen == ("About") || screen == ("Video Hub") || screen  == ("Your Playlist") || screen == ("Video Player")|| screen == ("Feedback") ) && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/AllBadgesClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {(screen == ("Air Assault Program") || screen == ("Air Assault Program: Phase I") || screen == ("Air Assault Program: Phase II")) && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/AssaultBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {screen == "Pathfinder Program" && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/PathBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {screen == "Ranger Program" && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/RangerBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {(screen == "Slingload Integration" || screen == "Slingload Quiz" || screen == "Placard" || screen == "Apex" || screen == "Untimed Quiz" || screen == "Quiz Scores") && <TouchableRipple
        onPress={() => navigation.navigate('Air Assault Program')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/AssaultBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
    </Appbar.Header>
  );
}  

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation, route }) {
  const screen = route.name
  const screenHeight = Dimensions.get('screen').height - 50;
  return (
    <View style={{justifyContent: "center", flex: 1}}>
        <View style={{marginTop: 10}}>
          <View style={styles.card}>
            <TouchableRipple
              onPress={() => navigation.navigate('Air Assault Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Assault1.png")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    borderTopLeftRadius: 12,
                    marginBottom: -1,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Assault1.png")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Air Assault Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;Gateway to the 101&quot;"
                  right={(props) => <Image source={require("./assets/AssaultBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
          <View style = {{marginTop: 10}}></View>
          <View style={styles.card}>
          <TouchableRipple
              onPress={() => navigation.navigate('Pathfinder Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Path1.jpg")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    marginBottom: -1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Path1.jpg")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Pathfinder Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;First In, Last Out&quot;"
                  right={(props) => <Image source={require("./assets/PathBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
          <View style = {{marginTop: 10}}></View>
          <View style={styles.card}>
          <TouchableRipple
              onPress={() => navigation.navigate('Ranger Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Ranger1.png")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    marginBottom: -1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Ranger1.png")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Ranger Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;Rangers Lead the Way&quot;"
                  right={(props) => <Image source={require("./assets/RangerBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
        </View>
    </View>
  );
}

import cheerio from 'cheerio';

function News() {
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolateRight: 'clamp',
  });

  async function loadArticles() {
    const response = await fetch('https://www.army.mil/news');
    const htmlString = await response.text();

    const $ = cheerio.load(htmlString);

    const articles = [];

    $('.news-item').each((index, element) => {
      const title = $(element).find('.title a').text();
      const date = $(element).find('.date').text();
      const regions = $(element).find('.sections a');
      let region = "";
      if (regions.length > 0) {
        const regionArray = [];
        regions.each((index, element) => {
          regionArray.push($(element).text());
        });
        region = regionArray.join(', ');
      } else {
        region = "Unknown District";
      }
      const imageUrl = $(element).find('.image-wrap img').attr('src');
      const scrapedLink = $(element).find('.more a').attr('href');
      const link = `https://www.army.mil${scrapedLink}`;

      articles.push({
        title,
        date,
        region,
        imageUrl,
        link,
      });
    });

    setArticles(articles);
    setLoaded(true);
  }

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const searchLower = searchQuery.toLowerCase();
    const titleLower = article.title.toLowerCase();
    const dateLower = article.date.toLowerCase();
    const regionLower = article.region.toLowerCase();
    return (
      titleLower.includes(searchLower) ||
      dateLower.includes(searchLower) ||
      regionLower.includes(searchLower)
    );
  });

return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Searchbar
          placeholder="Search News"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Animated.View>
      <ScrollView>
        {loaded ? (
          articles
          .filter(
            article =>
              article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              article.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
              article.region.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((article, index) => (
            <List.Item style={{borderBottomWidth: 2, borderColor: "#ffcc01"}}
              key={index}
              
              title={`${article.date} | ${article.region}`}
              titleStyle={{fontSize: 12, marginBottom: 5}}

              description={article.title}
              descriptionStyle={{fontSize: 17, fontWeight: 'bold', paddingRight: 12 }}

              descriptionNumberOfLines={2}
              onPress={() => Linking.openURL(article.link)}
              right={(props) => (
                <List.Image
                  {...props}
                  source={{ uri: article.imageUrl }}
                  style={{ width: 100, height: 100, borderRadius: 10}}
                />
              )}
            />
          ))
        ) : (
          <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        )}
      </ScrollView>
    </View>
  );
}


function About({ navigation, route }) {
  const theme = useTheme();
  const screen = route.name
  return(
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 0}}>
        <View style={styles.card}>
          <Card style={{marginTop: -5, marginBottom: 20}}>
            <View style={{borderBottomWidth: 3, borderBottomColor: "#ffcc01"}}>
              <Image source={require("./assets/TSAAS.jpg")}
                style={{
                  width: 'auto',
                  height: 230,
                }}
              />
            </View>
            <TouchableRipple
              onPress={() => {Linking.openURL('https://home.army.mil/campbell/index.php/tsaas');}}
              borderless={true}
              style={{borderRadius: 0}}
            >
              <Card.Title
                title="Webpage"
                titleVariant="titleLarge"
                left={(props) => <Icon name='web' color={theme.colors.primary} size={24} style={{marginLeft:8}}/>}
                right={(props) => <Icon name='open-in-new' color={theme.colors.primary} size={24} style={{marginRight: 32}}/>}
              />
            </TouchableRipple>
            <Divider></Divider>
            <Card.Content>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Phone:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                TSAAS: (270) 798-4410 {"\n"}
                Pre Ranger: (270) 412-1111
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Email:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                usarmy.campbell.101-abn-div.mbx.air-assault-school@army.mil
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Location:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                6883 Air Assault St. {"\n"}
                Fort Campbell, KY 42223
              </Text>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Hours of Operation:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                Class Report Times {"\n"}{"\n"}
                Air Assault Day Zero - 6:00 a.m. {"\n"}{"\n"}
                FRIES/SPIES Master Day One - 8:30 a.m. {"\n"}{"\n"}
                Pathfinder Day One - 8:00 a.m. {"\n"}{"\n"}
                Pre-Ranger Day Zero - 9:00 a.m. {"\n"}{"\n"}
                Rappel Master Day One - 8:30 a.m. 
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Graduation Times:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
              Air Assault - 11 a.m.{"\n"}
              Pathfinder - 11 a.m.
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Note:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                ATTENTION SERVICE MEMBERS AND ATRRS MANAGERS - Please coordinate directly with The 
                Sabalauski Air Assault School (TSAAS) via phone or email on class availability and ATRRS 
                reservations. Unit ATRRS Managers are NOT allowed to slot Service Members into any TSAAS 
                courses through ATRRS, under any circumstances. TSAAS Operations executes all course 
                ATRRS slotting – any course reservations made outside of TSAAS Operations are invalid and 
                will be cancelled. Service Members attempting to “walk-on” to any course are NOT 
                guaranteed a slot in the course.
              </Text>
              <Divider></Divider>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}


function FeedbackScreen({ navigation, route }) {
  const theme = useTheme();
  const [feedback, setFeedback] = useState('');
  const [school, setSchool] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [length, setLength] = useState('');
  const [iconColors, setIconColors] = useState(['#ffcc01','#ffcc01','#ffcc01','#ffcc01','#ffcc01']);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  //styling
  const handleBold = () => {
    setBold(!bold);
    console.log(bold)
  };

  const handleItalic = () => {
    setItalic(!italic);
    console.log(italic)
  };

  const handleUnderline = () => {
    setUnderline(!underline);
    console.log(underline)
  };
  const handleFeedbackChange = (text) => {
    if (text.length < 50) {
      setLength('short');
    } else if (text.length < 100) {
      setLength('medium');
    } else {
      setLength('long');
    }
    setFeedback(text);
  }
  const handleSchoolChange = (value) => {
    setSchool(value);
  }
  const handleTitleChange = (text) => {
    setTitle(text);
  }
  const handleRating = (value) => {
    setRating(value);
    console.log(rating)
  };

  const submitFeedback = () => {
    if (!school || !title || !feedback) {
      alert('Incomplete Feedback, Please fill in all fields.');
      return;
    }
    let formattedFeedback = feedback;
    if (bold) {
      formattedFeedback = `<bold>${formattedFeedback}</bold>`;
    }

    if (italic) {
      formattedFeedback = `<italic>${formattedFeedback}</italic>`;
    }

    if (underline) {
      formattedFeedback = `<underline>${formattedFeedback}</underline>`;
    }
    const data = {
      data: {
        School: school,
        Title: title,
        FeedbackBody: [
          {
            type: 'paragraph',
            children: [
              {
                text: formattedFeedback,
                type: 'text'
              }
            ]
          }
        ],
        length: length
      },
    };
    console.log(data)
    //post feedback to STrapi

    axios.post(
      "https://airdbnew.onrender.com/api/feedbacks",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer " + "2f30ba70854a898c7ec8c7e9bec66d3a7365c62feeea4d12e540c6cacebc3f169b1db46cc6b2b7b9367e5a60bfdd8488c4866cb97f0dc80ac7356caafe17d927397d26b52669a2bf3be2160346eed23a6f3043b08749e7fffa0ed3f0dd3e6c35bdaa42a756258cd95a864b4136f295c02ed9e4a4aff8b0128118e53cc44085b9",
        },
      }
    )

      setFeedback('');
      setSchool('');
      setTitle('');
  };
  const submitRating = () => {
    if (!rating) {
      alert('Rating not filled');
      return;
    }
    const data = {
      data: {
          rating: rating,
      },
    };
    console.log(data)
    //post feedback to STrapi

    axios.post(
      "https://airdbnew.onrender.com/api/ratings",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "bearer " + "2f30ba70854a898c7ec8c7e9bec66d3a7365c62feeea4d12e540c6cacebc3f169b1db46cc6b2b7b9367e5a60bfdd8488c4866cb97f0dc80ac7356caafe17d927397d26b52669a2bf3be2160346eed23a6f3043b08749e7fffa0ed3f0dd3e6c35bdaa42a756258cd95a864b4136f295c02ed9e4a4aff8b0128118e53cc44085b9",
        },
      }
    )

      setFeedback('');
      setSchool('');
      setTitle('');
  };
  const TextStylingBar = ({ onBold, onItalic, onUnderline }) => (
    <View style={styles.textStylingBar}>
      <TouchableOpacity onPress={onBold}>
        <MaterialIcons name="format-bold" size={24} color={bold ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onItalic}>
        <MaterialIcons name="format-italic" size={24} color={italic ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onUnderline}>
        <MaterialIcons name="format-underlined" size={24} color={underline ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.feedbackForm}>
      <View style={styles.schoolSelector}>
        {/* <Text style={styles.pickerText}>Select a school to give feedback to</Text> */}
        <Picker style={styles.picker}
          onValueChange={handleSchoolChange}
          value={school}>
          <Picker.Item label="Select school for feedback" value="" />
          <View style={styles.separator} />
          <Picker.Item label="Air Assault School" value="Air Assault School" />
          <View style={styles.separator} />
          <Picker.Item label="Pathfinder School" value="Pathfinder School" />
          <View style={styles.separator} />
          <Picker.Item label="Ranger School" value="Ranger School" />
        </Picker>

        <TextInput
          style={styles.titleBox}
          placeholder="Please enter title!"
          onChangeText={handleTitleChange}
          value={title}
        />
        <Text style={{fontWeight: 500}}></Text>
        <View style={[styles.feedbackContainer, {margin: 10}]}>
        <TextStylingBar
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
        />
      <TextInput
        style={[
          styles.commentBox,
          bold && styles.bold,
          italic && styles.italic,
          underline && styles.underline
        ]}
        placeholder="Give your feedback here!"
        onChangeText={handleFeedbackChange}
        value={feedback}
      />
        </View>
                    <View style={[styles.submitButton, {marginTop: 30}]}> 
        <Button title="Submit Feedback" onPress={submitFeedback}><Text style={styles.buttonText}>Submit Feedback</Text></Button>
      </View>
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={[styles.buttonText, {marginTop: 10}]}>Rate your experience:</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <MaterialIcons
                  name={star <= rating ? 'star' : 'star'}
                  size={30}
                  color={star <= rating ? '#ffcc01' : 'white'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.submitButton}>
          <Button title="Submit Rating" onPress={submitRating}><Text style={styles.buttonText}>Submit Rating</Text></Button>
        </View>
      </View>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

// Create a context object to hold the state and function
const AppContext = React.createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function HomeStackScreen({navigation, route}) {
  const theme = useTheme();
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);
  const [addedVideos, setAddedVideos] = React.useState({});
  const [quizScores, setQuizScores] = React.useState([]);
  return (
    <QuizScoresContext.Provider value={{ quizScores, setQuizScores }}>
    <AddedVideosContext.Provider value={{ addedVideos, setAddedVideos }}>
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Air Assault Program' component={AirAssaultScreen} />
      <Stack.Screen name='Air Assault Program: Phase I' component={Phase1Screen} />
      <Stack.Screen name='Air Assault Program: Phase II' component={Phase2Screen} />
      <Stack.Screen name='Pathfinder Program' component={PathfinderScreen}/>
      <Stack.Screen name='Ranger Program' component={RangerScreen}/>
      <Stack.Screen name='Video Hub' component={VideoScreen} />
      <Stack.Screen name='Your Playlist' component={PlaylistScreen} />
      <Stack.Screen name='Video Player' component={VideoPlayerScreen}/>
      <Stack.Screen name='Slingload Integration' component={SlingloadScreen} />
      <Stack.Screen name='Placard' component={PlacardScreen} />
      <Stack.Screen name='Placard Video' component={PlacardVideo} />
      <Stack.Screen name='Placard Sequence' component={PlacardSequence} />
      <Stack.Screen name='Apex' component={ApexScreen} />
      <Stack.Screen name='Apex Video' component={ApexVideo} />
      <Stack.Screen name='Apex Sequence' component={ApexSequence} />
      <Stack.Screen name='Grabhook' component={GrabhookScreen} />
      <Stack.Screen name='Grabhook Video' component={GrabhookVideo} />
      <Stack.Screen name='Grabhook Sequence' component={GrabhookSequence} />
      <Stack.Screen name='ChainClevis' component={ChainClevisScreen} />
      <Stack.Screen name='ChainClevis Video' component={ChainClevisVideo} />
      <Stack.Screen name='ChainClevis Sequence' component={ChainClevisSequence} />
      <Stack.Screen name='MediumClevis' component={MediumClevisScreen} />
      <Stack.Screen name='MediumClevis Video' component={MediumClevisVideo} />
      <Stack.Screen name='MediumClevis Sequence' component={MediumClevisSequence} />
      <Stack.Screen name='Suspension1' component={Suspension1Screen} />
      <Stack.Screen name='Suspension1 Video' component={Suspension1Video} />
      <Stack.Screen name='Suspension1 Sequence' component={Suspension1Sequence} />
      <Stack.Screen name='Suspension2' component={Suspension2Screen} />
      <Stack.Screen name='Suspension2 Video' component={Suspension2Video} />
      <Stack.Screen name='Suspension2 Sequence' component={Suspension2Sequence} />
      <Stack.Screen name='Suspension3' component={Suspension3Screen} />
      <Stack.Screen name='Suspension3 Video' component={Suspension3Video} />
      <Stack.Screen name='Suspension3 Sequence' component={Suspension3Sequence} />
      <Stack.Screen name='Suspension4' component={Suspension4Screen} />
      <Stack.Screen name='Suspension4 Video' component={Suspension4Video} />
      <Stack.Screen name='Suspension4 Sequence' component={Suspension4Sequence} />
      <Stack.Screen name='SusStrapOrder' component={SusStrapOrderScreen} />
      <Stack.Screen name='SusStrapOrder Video' component={SusStrapOrderVideo} />
      <Stack.Screen name='SusStrapOrder Sequence' component={SusStrapOrderSequence} />
      <Stack.Screen name='StrapSide' component={StrapSideScreen} />
      <Stack.Screen name='StrapSide Video' component={StrapSideVideo} />
      <Stack.Screen name='StrapSide Sequence' component={StrapSideSequence} />
      <Stack.Screen name='S1P2' component={SusStrapOrderScreen} />
      <Stack.Screen name='S1P2 Video' component={SusStrapOrderVideo} />
      <Stack.Screen name='S1P2 Sequence' component={SusStrapOrderSequence} />
      <Stack.Screen name='TopLateralC1' component={TopLateralC1Screen} />
      <Stack.Screen name='TopLateralC1 Video' component={TopLateralC1Video} />
      <Stack.Screen name='TopLateralC1 Sequence' component={TopLateralC1Sequence} />
      <Stack.Screen name='MidLateralC1' component={MidLateralC1Screen} />
      <Stack.Screen name='MidLateralC1 Video' component={MidLateralC1Video} />
      <Stack.Screen name='MidLateralC1 Sequence' component={MidLateralC1Sequence} />
      <Stack.Screen name='BotLateralC1' component={BotLateralC1Screen} />
      <Stack.Screen name='BotLateralC1 Video' component={BotLateralC1Video} />
      <Stack.Screen name='BotLateralC1 Sequence' component={BotLateralC1Sequence} />
      <Stack.Screen name="Slingload Quiz" component={SlingloadQuizScreen} />
      <Stack.Screen name="Untimed Quiz" component={UntimedQuizScreen} />
      <Stack.Screen name="End Quiz" component={EndQuizScreen} />
      <Stack.Screen name="Quiz Scores" component={QuizScoresScreen} />
    </Stack.Navigator>
    </AddedVideosContext.Provider>
    </QuizScoresContext.Provider>
  );
}

function NewsStackScreen({navigation, route}) {
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='News' component={News} />
    </Stack.Navigator>
  );
}

function AboutStackScreen({navigation, route}) {
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  );
}

function FeedbackStackScreen({navigation, route}) {
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='Feedback' component={FeedbackScreen} />
    </Stack.Navigator>
  );
  
}
//SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from hiding automatically, for debugging

function AnimatedSplashScreen({ children }) {
  const theme = useTheme();
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Change this to force minimum splash time
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.colors.background,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            //source={splash}
            source={require('./assets/splash_screen_500.gif')}
            onLoadEnd={onImageLoaded}
            //fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(Appearance.getColorScheme() === 'dark');

  // Define the toggleDarkMode function
  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(isDarkMode ? "#221f20" : "rgb(255, 251, 255)");
  }

  return (
      <AppContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <PaperProvider theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <StatusBar style="light" translucent={true} />
          <AnimatedSplashScreen>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
            barStyle={{ backgroundColor: isDarkMode ? "#221f20" : "rgb(255, 251, 255)", height: Platform.OS === 'ios' ? 85 : 75 }}
          >
            <Tab.Screen
              name='HomeScreen'
              component={HomeStackScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color}) => (
                  <Icon name={focused ? 'home' : 'home-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name='NewsScreen'
              component={NewsStackScreen}
              options={{
                tabBarLabel: 'News',
                tabBarIcon: ({ focused, color }) => (
                  <Icon name={focused ? 'newspaper-variant' : 'newspaper-variant-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name='AboutScreen'
              component={AboutStackScreen}
              options={{
                tabBarLabel: 'About',
                tabBarIcon: ({ focused, color }) => (
                  <Icon name={focused ? 'information': 'information-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name='FeedbackScreen'
              component={FeedbackStackScreen}
              options={{
                tabBarLabel: 'Feedback',
                tabBarIcon: ({ focused, color }) => (
                  <Icon name={focused ? 'message' : 'message-outline'} color={color} size={24} />
                  ),
              }}
            />
          </Tab.Navigator>
          </AnimatedSplashScreen>
          </NavigationContainer>
        </PaperProvider>
      </AppContext.Provider>
    );
  }

      const styles = StyleSheet.create({
        card: {
          marginTop: 0,
          justifyContent: 'center',
          marginHorizontal: 0,
        },
        cardBtn: {
          borderRadius: 10,
          marginHorizontal: 10,
        },
        container: {
          flex: 1,
          paddingLeft: 8,
          paddingRight: 8,
          marginHorizontal: 0,
        },
        scrollView: {
          marginHorizontal: 0,
        },
        newsImage: {
          borderWidth: 2,
          borderRadius: 8
        },
        rectangle: {
          height: 8,
          backgroundColor: '#ffcc01',
          position: 'relative', 
        },
      });
