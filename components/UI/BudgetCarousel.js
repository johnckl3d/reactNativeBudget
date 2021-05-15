import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,StyleSheet,Dimensions } from 'react-native';

  const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../../utils/animations';

export default class BudgetCarousel extends React.Component {

  state = {
    index: 0
  }
    constructor(props){
      super(props);
      this._renderItem = this._renderItem.bind(this)
      }

    _renderItem({item}){
      console.log("budget::item::" + JSON.stringify(item));
        return (
          <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Item ${item.name}`}</Text>
      </View>

        )
    }

    render() {
      const { data } = this.props;
      return !data ? (
        <View></View>
      ) : (
        <View>
        <Carousel
          ref={(c) => this.carousel = c}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
      </View>
        );
    }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
    borderColor: 'black',
    borderWidth: 5,
    height: 500
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
