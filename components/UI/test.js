/**
 *
 * Selection
 * @format
 * @flow
 *
 */

 import React, {useRef, useEffect} from 'react';
 import {View, Dimensions} from 'react-native';
 import Carousel from 'react-native-snap-carousel';
 
 import AppStyles from '@styles';
 import Text from '../Text';
 
 import {ITEM_WIDTH, ITEM_HEIGHT} from './config';
 
 //import type {PropsType} from './types';
 import SelectionStyles from './styles';
 
 const {width: viewportWidth} = Dimensions.get('window');
 const Selection = (props) => {
   const {answers, selected, unit, onPress} = props;
   const containerRef = useRef(null);
   const carouselRef = useRef();
 
   const resetSnap = () => {
     const {current} = carouselRef || {};
     let selectedIndex = 0;
     if (selected && answers) {
       selectedIndex = answers.indexOf(selected);
     }
     if (current) {
       current.snapToItem(selectedIndex);
     }
   };
 
   useEffect(() => {
     resetSnap();
   }, [selected]);
 
   const renderItem = ({item}) => {
     return (
       <View>
         <Text customStyle={[SelectionStyles.carouselSelectedText]}>{item}</Text>
       </View>
     );
   };
 
   return (
     <View ref={containerRef} style={[SelectionStyles.componentContainer]}>
       <View style={SelectionStyles.carouselContainer}>
         <Carousel
           data={answers}
           renderItem={renderItem}
           sliderWidth={viewportWidth}
           itemWidth={ITEM_WIDTH}
           itemHeight={ITEM_HEIGHT}
           inactiveSlideScale={1}
           inactiveSlideOpacity={0.4}
           firstItem={answers ? answers.indexOf(selected) : 0}
           ref={carouselRef}
           onSnapToItem={(slideIndex) => {
             if (onPress && answers) {
               onPress(answers[slideIndex]);
             }
           }}
           useScrollView
         />
       </View>
       <View style={[SelectionStyles.centerBoxContainer]}>
         <View style={SelectionStyles.centerBox} />
         <Text customStyle={[SelectionStyles.unit, AppStyles.marginTop_5]}>{unit}</Text>
       </View>
     </View>
   );
 };
 
 export default Selection;