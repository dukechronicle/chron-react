/*
 * Sidebar for the android app
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinksListing from './LinksListing';
import TabView from './TabView.android';
import SidebarItem from './components/SidebarItem.android';

const styles = StyleSheet.create({
  borderBottom: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
})

const Sidebar = React.createClass({

  propTypes: {
    replaceRoute: React.PropTypes.func.isRequired, 
    closeDrawer: React.PropTypes.func.isRequired,
    openDrawer: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    console.log(this.props);
  },

  replaceRoute(route) {
    this.props.replaceRoute(route);
    this.props.closeDrawer();
  },

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 100, backgroundColor: '#083e8c'}}>
          {/* Some kind of account? Can save articles etc. */}  
        </View>
        <SidebarItem 
          icon="md-paper" 
          title="News" 
          onPress={() => this.replaceRoute({
            title: "The Chronicle", 
            component: TabView,
            titleStyleOverride: {
              fontFamily: 'Didot',
              fontSize: 25,
            },
            passProps: { openDrawer: this.props.openDrawer },
          })}
        />
        <SidebarItem 
          icon="md-link"
          title="Links"
          onPress={() => this.replaceRoute({
            title: 'Links',
            component: LinksListing,
          })}
        />
        {/* <View style={styles.borderBottom}/> */}
        <SidebarItem 
          icon="md-settings"
          title="Settings"
          onPress={() => this.replaceRoute({
            title: 'Links',
            component: LinksListing,
          })}
        />
      </View>
    )
  }
})

export default Sidebar;
