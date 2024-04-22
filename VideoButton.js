import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Linking, ScrollView , Alert, Button, Dimensions, ScrollViewBase} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import { AddedVideosContext } from './videoContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import VideoThumbnail from 'react-video-thumbnail';
import { styles } from './styleSheet'; 
import * as VideoThumbnails from 'expo-video-thumbnails';


const screenDimension = Dimensions.get("screen")
const isPhone = screenDimension.width < 800; // Adjust the threshold as needed
const videoWidth = isPhone ? screenDimension.width - 40 : 350; // Adjust the width for phone mode
const videoHeight = isPhone ? (screenDimension.width - 40) * (9 / 16) : 270; // Adjust the height for phone mode

const resolution = 9/16;
const VideoComp = ({video,  handleAddToPlaylist, addedVideos, videoLinks, currentVideoID}) => {
  const navigation = useNavigation();
  const [thumbnail, setThumbnail] = useState(null);
  const[isAdded, setIsAdded] = useState(!!addedVideos[video.link]);
  
  const handleAdd = (video) => {
    handleAddToPlaylist(video);
    setIsAdded(!isAdded);
  }
  /*
  React.useEffect(() => {
    if (isPhone) {
    generateThumbnail();
  }
  }, []);
    const generateThumbnail = async () => {
    try {
      console.log(video.link)
      const { uri } = await VideoThumbnails.getThumbnailAsync(video.link);
      setThumbnail(uri);
      console.log(uri)
      console.log(thumbnail)
    } catch (e) {
      console.log(e)
    }
  };
  */
  return (
    <View style={{alignSelf: 'center', alignItems: 'center', width: 300, marginTop: isPhone? 30: 20}}>
      <View style={[{overflow: 'hidden', height: videoHeight, width: isPhone? 'auto' : videoWidth, marginBottom: isPhone? 30 : -40, 
      alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderWidth:2, borderColor: '#ffcc01', borderRadius: 10, backgroundColor: '#ffcc01'}]}>
      <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>

        <TouchableOpacity onPress={() =>  {
          // navigation push will cause previous videos to continue playing and navigate just doesnt work
          // replace will replace the current stack with new, if navigating from video hub -> video player
          // pressing back will go to air assault home sicne video hub will be replaced by video player stack 
          // if want to avoid this, can modify back button or figure out how to auto pause videos when using push
          // navigate works now and it auto pauses the vid
          navigation.navigate('Video Player', {description: video.description, 
          title: video.title,
          link: video.link,
          handleAddToPlaylist,
          addedVideos, videoLinks, currentVideoID})}} style={{ width: 345, alignSelf: 'center', borderRadius:20, zIndex: 0}}>

          {/* <Image
              source={{ uri: `https://img.youtube.com/vi/${video.link.split('v=')[1]}/0.jpg` }}
              style={{ marginTop: 10, width: 345, height: 290, alignSelf: 'center', borderTopLeftRadius: 8, borderBottomRightRadius: 8 }}
            /> */}
          <Image
  source={{ uri: video.thumbnail }}
  style={{ marginTop: isPhone? 0: 0, width: 345, height: 290, alignSelf: 'center' }}
/>
<View style={{width: 345, position: 'absolute', zIndex: 3, bottom: isPhone ? 35 : 10}} >
          <View style={{position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#ffcc01',

            justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            width: isPhone? 345 : videoWidth,
            zIndex: 1}}>
              <View style={{flex: 0.6}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 15}}>
              {video.title}
            </Text>
              </View>
<View style={{flex: isPhone? 0.5 : 0.3}}>
<TouchableOpacity onPress={() => handleAdd(video)}  style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontSize: 13, alignSelf: 'center', padding: 5}}>
            { isAdded ? 'Remove from' :'Add to'}</Text>

              </TouchableOpacity>
</View>
<View style={{flex: 0.2}}>
<TouchableOpacity onPress={() => handleAdd(video)}  style={{ marginRight: 10}}>
              <IconButton
                icon="playlist-play"
                size={25}
                color="#000000"
              />
              </TouchableOpacity>
</View>

            </View>
            </View>
            </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
export const VideoPlayerScreen = ({navigation, route}) => {
const {id, description, title, videoLinks, addedVideos, handleAddToPlaylist, link} = route.params;
const [playing, setPlaying] = useState(false);
const screen = route.name;
const [showDescription, setShowDescription] = useState(false);
  const resolution = 9/16;
  const video = {link, id, description, title}; // create video item for playlist button
  const videoRef = useRef(null);
  const theme = useTheme();

  const showDesc = () => {
    setShowDescription(!showDescription);
  }

  // used to rerender the remove from / add to playlist button
  const[isAdded, setIsAdded] = useState(!!addedVideos[link]);
  const handleAdd = (video) => {
    handleAddToPlaylist(video);
    setIsAdded(!isAdded);
  }

  const handleFullScreen = async () => {
    await videoRef.current.presentFullscreenPlayer();
  };

  const handleExitFullScreen = async () => {
    await videoRef.current.dismissFullscreenPlayer();
  };

  return (
    <ScrollView style={{ marginTop: -10, marginBottom: 0 }} showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 55, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>{screen}</Text>
                </View>
       </View>
      <View style={{height: isPhone? 30 : 25}}></View>
      <View style ={{ justifyContent: 'center', alignItems:'center', alignItems: 'center'}} >
{/* <YoutubePlayer
        stlye={{  width:'100%', }}
        height={resolution*(screenDimension.height)}
        width={resolution*(screenDimension.width)}
        play={playing}
        videoId={id}
                /> */} 
        <View>
          <View style={{position: 'absolute', alignSelf: 'center'}}>
            <Video 
              ref={videoRef}
              source={{ uri: link}}
              style={[styles.videoStyle, {width: isPhone? videoWidth : 800, height: isPhone? videoHeight : 450}]}
              useNativeControls
              resizeMode={Video.RESIZE_MODE_CONTAIN}
            />   
            <TouchableOpacity onPress={handleFullScreen}>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExitFullScreen}>
            </TouchableOpacity>
          </View>  
          {showDescription &&  (<View style = {{backgroundColor: 'rgba(225, 225, 225, 0.1)', borderWidth: 1, borderColor: theme.colors.onBackground, top: isPhone? 255 : 500, left: 30, position: 'absolute', borderRadius:5, width:'auto', zIndex: 20, height: 'auto', padding: 10}}>
          <Text style={{color: theme.colors.onBackground}}> {description}</Text>
        </View>)}
          <View style={{marginTop: isPhone? 210 : 448, backgroundColor: '#ffcc01', height: isPhone? 45 : 50,  flexDirection: 'row', justifyContent: 'space-between', width: isPhone?  videoWidth : 800, alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} >
          <View style={{flex: isPhone? 0.1 : 0.05}}>
              <TouchableOpacity onPress={() => setShowDescription(!showDescription)} style={{ flexDirection: 'row' }}>
                <IconButton
                  icon={showDescription ? 'information' : 'information-outline'}
                  size={25}
                  color="#000000"
                />
              </TouchableOpacity>

            </View>
            <View style={{flex: isPhone?  0.5 : 0.8}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: isPhone? 10 : 20, paddingBottom:5}}>
                {title}
              </Text>
            </View>

            <View style={{flex: isPhone? 0.3 : 0.25}}>
              <TouchableOpacity onPress={() => handleAdd(video)}  style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16,alignSelf: 'center', padding: 5 }}>
                  { isAdded ? 'Remove from' :'Add to'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={{flex: 0.15}}>
              <TouchableOpacity onPress={() => handleAdd(video)}  style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton
                  icon="playlist-play"
                  size={30}
                  color="black"
                  style={{marginRight: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
        <View style={{justifyContent: 'center', alignSelf: isPhone?  'center': 'auto', flexDirection: isPhone? 'column' : 'row', marginTop: isPhone? 40 : 60, flexWrap: 'wrap', alignItems: isPhone? 'center' : 'stretch'}}>
          <VideoButton videoLinks={videoLinks} currentVideoID={link}/>
        </View>
      </View>
    </ScrollView>
  );
}

const VideoButton = ({ videoLinks, currentVideoID }) => {

  const { addedVideos, setAddedVideos } = React.useContext(AddedVideosContext);
  const otherVideos = videoLinks.filter(video => video.link !== currentVideoID);
  const handleVideoPress = (video) => {
    // Open YouTube app or browser with the video link
    Linking.openURL(video.link);
  };


  const handleAddToPlaylist = (video) => {
    // Toggle the added status of the video
    setAddedVideos(prevState => ({
      ...prevState,
      [video.link]: !prevState[video.link]
    }));
    console.log(addedVideos)
  };
  return (


<View style ={{  gap: isPhone? 'auto' : 100, alignItems: isPhone? 'center' : 'auto', marginTop: isPhone? 'auto' : 20,
justifyContent: 'center', flexDirection: isPhone? 'column' : 'row',
 flexWrap: isPhone? 'nowrap' : 'wrap', alignSelf: 'center', width: isPhone? 'auto' : 800,
 marginTop: isPhone? 'auto' : 30}}>
         {otherVideos.map((video) => (
          <VideoComp key={video.link} video={video}
          handleAddToPlaylist={handleAddToPlaylist} 
          addedVideos={addedVideos}
          videoLinks={videoLinks}
          currentVideoID = {currentVideoID}
          />
         ))}

    </View>
      


    /*
    <ScrollView vertical showsVerticalScrollIndicator={true}>
      {videoLinks.map((video, index) => (
        <View key={index} style={{ marginRight: 16 }}>

  

      {<TouchableOpacity onPress={() => handleVideoPress(video)} style={{ width: 320, alignSelf: 'center' }}>
            <Image
              source={{ uri: `https://img.youtube.com/vi/${video.link.split('v=')[1]}/0.jpg` }}
              style={{ marginTop: 20, width: 320, height: 180, alignSelf: 'center', borderTopLeftRadius: 8, borderBottomRightRadius: 8 }}
            />
            <View style={{backgroundColor: '#ffcc01', width: 320, alignSelf: 'center', borderBottomLeftRadius:8, borderBottomRightRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', padding: 5 }}>
                {video.title}
              </Text>
              {/* Below changes depending on if user added it to playlist already or not}
              <TouchableOpacity onPress={() => handleAddToPlaylist(video)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', padding: 5 }}>
                  {addedVideos[video.link] ? 'Remove from' : 'Add to'}
                </Text>
                <IconButton
                  icon="playlist-play"
                  size={20}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          *</TouchableOpacity>}
        
          
          
        </View>
      ))}
    </ScrollView>
    */
  );
};


export default VideoButton;
