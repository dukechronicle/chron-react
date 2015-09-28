const React = require('react-native');
const {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  Text,
} = React;
const DrawerLayoutAndroid = require('DrawerLayoutAndroid');
const ToolbarAndroid = require('ToolbarAndroid');

const Frontpage = require('./src/Frontpage');
const Sections = require('./src/Sections');
const TabBar = require('./src/TabBar');

const NavigationActionCreators = require('./src/actions/NavigationActionCreators');

const store = require('./src/store');
const tabCursor = store.select('views', 'tab');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#cccccc',
    height: 56,
  },
});


const chronreact = React.createClass({
  getInitialState() {
    return {
      selectedTab: tabCursor.get()
    };
  },

  componentDidMount() {
    tabCursor.on('change', this.updateTab);
  },

  componentWillUnmount() {
    tabCursor.off('change', this.updateTab);
  },

  updateTab() {
    this.setState({
      selectedTab: tabCursor.get(),
    });
  },

  tabIsSelected(name) {
    return this.state.selectedTab === name;
  },

  switchTabHandler(name) {
    return () => {
      NavigationActionCreators.selectSection(name);
      this.setState({selectedTab: name});
    }
  },

  onActionSelected: function(e) {
    console.log('onActionSelected', e);
  },

  render: function() {
    const navigationView = (
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    );
    //const image = require('image!ic_launcher.png');
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title="The Chronicle"
          style={styles.toolbar}
          actions={[{title: 'Settings', show: 'always'}]}
          onActionSelected={this.onActionSelected} />
        <DrawerLayoutAndroid
            style={styles.drawer}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
          <Frontpage title='News' />
        </DrawerLayoutAndroid>
      </View>
    );
  },
});

AppRegistry.registerComponent('chronreact', () => chronreact);
