import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Linking, ScrollView , Alert, Button, Dimensions} from 'react-native';
import {IconButton} from 'react-native-paper';
import { AddedVideosContext } from './videoContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import VideoThumbnail from 'react-video-thumbnail';
import { styles } from './styleSheet'; 
import * as VideoThumbnails from 'expo-video-thumbnails';


const screenDimension = Dimensions.get("screen")
const isPhone = screenDimension.width < 1000; // Adjust the threshold as needed

const VideoComp = ({video,  handleAddToPlaylist, addedVideos, videoLinks, currentVideoID}) => {
  const navigation = useNavigation();
  const [thumbnail, setThumbnail] = useState(null);
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
      /* console.log(e) */
    }
  };
  return (
    <View style={{display:'flex'}}>
      <View style={styles.videoCard}>
<View>

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
          <View>
            {!isPhone &&<VideoThumbnail
              videoUrl={video.link}
              thumbnailHandler={(thumbnail) => console.log(thumbnail)} 
            />}
            {/* {isPhone && <Image
              source = {{uri: thumbnail}}
            />} */}

          </View>
                <View style={{width: 345, height: 45, position: 'absolute', zIndex: 1, marginTop: 223}} >
          <View style={styles.videoStyle.videoDescriptionContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', padding: 5}}>
              {video.title}
            </Text>
            <TouchableOpacity onPress={() => handleAddToPlaylist(video)}  style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', padding: 5 }}>
                { addedVideos[video.link] ? 'Remove from' :'Add to'}</Text>
              <IconButton
                icon="playlist-play"
                size={20}
                color="#000000"
              />
            </TouchableOpacity>
          </View>

          </View>

            </TouchableOpacity>
    {/* </TouchableOpacity> */}
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
    <ScrollView style={{ marginTop: -10, marginBottom: 0 }} showsVerticalScrollIndicator={true}>
      <View style={styles.videoHubHeader}>
        <Text style={styles.videoHubHeader.videoTitle} variant='headlineLarge'>{screen}</Text>
      </View>
      <View style ={{ justifyContent: 'center', alignItems:'center'}} >
{/* <YoutubePlayer
        stlye={{  width:'100%', }}
        height={resolution*(screenDimension.height)}
        width={resolution*(screenDimension.width)}
        play={playing}
        videoId={id}
                /> */} 
        <View>
          <View style={{marginTop: 50, justifyContent: 'center', alignItems:'center'}}>
            <Video 
              ref={videoRef}
              source={{ uri: link}}
              style={styles.videoStyle}
              useNativeControls
              resizeMode={Video.RESIZE_MODE_CONTAIN}
            />   
            <TouchableOpacity onPress={handleFullScreen}>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExitFullScreen}>
            </TouchableOpacity>
          </View>  
          <View style={styles.videoStyle.videoDescriptionContainer} >
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setShowDescription(!showDescription)} style={{ flexDirection: 'row' }}>
                <IconButton
                  icon={showDescription ? 'information' : 'information-outline'}
                  size={25}
                  color="#000000"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', paddingTop: 5, paddingBottom:5}}>
                {title}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleAdd(video)}  style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', padding: 5 }}>
                  { isAdded ? 'Remove from' :'Add to'}
                </Text>
                <IconButton
                  icon="playlist-play"
                  size={20}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style = {{ backgroundColor: '#ffcc01', borderRadius:8, marginBottom: 50, width: resolution*(screenDimension.width), alignSelf: 'center'}}>
          {showDescription &&  <Text> {description}</Text> }
        </View>
        <View>
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

     <View style ={styles.container1}>
        
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
