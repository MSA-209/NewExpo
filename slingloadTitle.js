import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, TextInput, FlatList, screen} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme } from 'react-native-paper';
import { styles } from './styleSheet'; 
import { FontAwesome } from '@expo/vector-icons'; 
const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 800;

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
          <View style={[{marginBottom: isPhone? 'auto' : 20, width: isPhone? 220 : 380, flexDirection: 'row', borderColor: theme.colors.inverseSurface, borderWidth: 1, height: isPhone? 40 : 70, borderRadius: isPhone? 12 : 20}]}>
          <View style={[styles.basicButton, {justifyContent: 'center',alignItems: 'center', padding: 0, backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface, height: isPhone? 40 : 70, width: isPhone? 170 : 310, borderRadius: isPhone? 12 : 20, right: 1}]}>
          <Text style={[{color: theme.colors.onBackground, fontSize: isPhone? 'auto' : 25, alignSelf: 'center'}]}>Begin Video</Text>
              </View>
              <View style={{paddingLeft: isPhone? 11 : 22, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="chevron-right" size={isPhone? 20 : 30} color="#ffcc01" style={{alignSelf: 'flex-end'}}/>
              </View>
            </View>
          </TouchableOpacity>
          </View>

          <View>
          <TouchableOpacity onPress={() => navigation.navigate(sequenceName)}>
            <View style={[{marginBottom: isPhone? 'auto' : 20, width: isPhone? 220 : 380, flexDirection: 'row', borderColor: theme.colors.inverseSurface, borderWidth: 1, height: isPhone? 40 : 70, borderRadius: isPhone? 12 : 20}]}>
            <View style={[styles.basicButton, {justifyContent: 'center',alignItems: 'center', padding: 0, backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface, height: isPhone? 40 : 70, width: isPhone? 170 : 310, borderRadius: isPhone? 12 : 20, right: 1}]}>
                <Text style={[{color: theme.colors.onBackground, fontSize: isPhone? 'auto' : 25, alignSelf: 'center'}]}>Sequence</Text>
              </View>
              <View style={{paddingLeft: isPhone? 15 : 22, justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome name="chevron-right" size={isPhone? 20 : 30} color="#ffcc01" style={{alignSelf: 'flex-end'}}/>
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

