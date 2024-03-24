import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme } from 'react-native-paper';
import { styles } from './styleSheet'; 
import { FontAwesome } from '@expo/vector-icons'; 


export function SlingloadTitle({ title, navigation, videoName, sequenceName }) {
    const theme = useTheme();
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Text style={{color:theme.colors.primary, fontSize: 40}}>{title}</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={{marginBottom: 30, marginTop: 25}}>
          <TouchableOpacity onPress={() => navigation.navigate(videoName)}>
            <View style={styles.walkThrough}>
              <View style={styles.innerBox}>
                <Text style={styles.walkThroughText}>Begin Video</Text>
              </View>
              <View style={{paddingLeft: 11}}>
                <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
              </View>
            </View>
          </TouchableOpacity>
          </View>

          <View>
          <TouchableOpacity onPress={() => navigation.navigate(sequenceName)}>
            <View style={styles.walkThrough}>
              <View style={styles.innerBox}>
                <Text style={styles.walkThroughText}>Sequence</Text>
              </View>
              <View style={{paddingLeft: 11}}>
                <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
              </View>
            </View>          
          </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }


//   <View style={{alignSelf: 'center', marginTop: 50}}>
//   <TouchableOpacity onPress={() => navigation.navigate('Placard')}>
//     <View style={styles.walkThrough}>
//       <View style={styles.innerBox}>
//         <Text style={styles.walkThroughText}>Begin Video</Text>
//       </View>
//       <View style={{paddingLeft: 11}}>
//         <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
//       </View>
//     </View>

//   </TouchableOpacity>
// // </View>

