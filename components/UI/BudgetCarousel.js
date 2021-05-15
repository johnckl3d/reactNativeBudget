import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,StyleSheet,Dimensions } from 'react-native';

  const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

import Carousel from 'react-native-snap-carousel';

export default class BudgetCarousel extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0
      }
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
          <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={data}
                  sliderWidth={300}
                  itemWidth={300}
                  containerCustomStyle={styles.carouselContainer}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
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
