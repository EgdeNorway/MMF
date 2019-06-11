/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerItems,
} from 'react-navigation';
import { Dimensions, Animated, Easing, View } from 'react-native';
import CardMain from '../cards/CardMain';
import CAExample from '../views/CAExample';
import Swipe from '../stats/Statistics';
import Settings from '../usersettings/Settings';
import SettingsDetails from '../usersettings/SettingsDetails';
import Profile from '../profile/Profile';
import ProfileDetails from '../profile/ProfileDetails';
import Support from '../support/Support';
import { handleLogOut } from '../logout/Logout';
import Calendar from '../calendar/Calendar';
import CalendarView from '../calendar/CalendarView';
import HeaderLogo from './Logos/HeaderLogo';
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Container,
  Content,
  Header,
  Icon,
  Title,
  Body,
} from 'native-base';

const CalendarStack = createStackNavigator(
  {
    Calendar: {
      screen: props => <Calendar {...props} />,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Calendar',
          headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            flex:1
            },
          headerRight: (<View />),
          headerLeft: (
            <Icon
              style={{ paddingLeft: 17, color: '#ffff' }}
              name="md-menu"
              size={30}
              onPress={() => navigation.openDrawer()}
            />
          ),
          backBehaviour: 'none',
        };
      },
    },
    CalendarView: { screen: props => <CalendarView {...props} /> },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Calendar',
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          flex:1
          },
        headerRight: (<View />),
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1C2224',
        },

        headerLeft: (
          <Icon
            style={{ paddingLeft: 17, color: '#ffff' }}
            name="arrow-back"
            transparent
            onPress={() => navigation.goBack(null)}
          />
        ),
        backBehaviour: 'none',
      };
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: { screen: props => <Profile {...props} /> },
    ProfileDetails: { screen: props => <ProfileDetails {...props} /> },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1C2224',
        },

        headerLeft: (
          <Icon
            style={{ paddingLeft: 17, color: '#ffff' }}
            name="arrow-back"
            transparent
            onPress={() => navigation.goBack(null)}
          />
        ),
        backBehaviour: 'none',
      };
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: props => <Settings {...props} /> },
    SettingsDetails: { screen: props => <SettingsDetails {...props} /> },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1C2224',
        },

        headerLeft: (
          <Icon
            style={{ paddingLeft: 17, color: '#ffff' }}
            name="arrow-back"
            transparent
            onPress={() => navigation.goBack(null)}
          />
        ),
        backBehaviour: 'none',
      };
    },
  }
);

const SupportStack = createStackNavigator(
  {
    Support: { screen: props => <Support {...props} /> },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1C2224',
        },

        headerLeft: (
          <Icon
            style={{ paddingLeft: 17, color: '#ffff' }}
            name="arrow-back"
            transparent
            onPress={() => navigation.goBack(null)}
          />
        ),
        backBehaviour: 'none',
      };
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: props => <CardMain {...props} />,
      navigationOptions: {
        headerTitle: <HeaderLogo />,
      },
    },
    example: { screen: props => <CAExample {...props} /> },
    Maine: { screen: props => <WelcomeView {...props} /> },
    Swipe: {
      screen: props => <Swipe {...props} />,
      navigationOptions:  {
        title: 'Statistics',
      },
    },
    CalendarStack: {
      screen: props => <CalendarStack {...props} />,
    },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    defaultNavigationOptions: ({ navigation }) => {
      return {
        initialHomeRoute: 'Calendar',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1C2224',
        },
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          flex:1
          },
        headerRight: (<View />),
        headerTintColor: '#fff',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 17, color: '#ffff' }}
            name="md-menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        ),

        backBehaviour: 'none',
      };
    },
  }
);

const BottomNavigator = createBottomTabNavigator(
  {
    Stack: { screen: StackNavigator },
    // SettingsStack: { screen: SettingsStack },
    // ProfileStack: { screen: ProfileStack },
    // SupportStack: { screen: SupportStack },
    CalendarStack: { screen: CalendarStack },
  },

  {
    tabBarComponent: props => {
      /*
      console.log('props: ', props);
      console.log('state: ', props.navigation.state);
      //console.log('props: ', props);
      //console.log('state: ', props.navigation.state);

      //console.log('state.routes[0]: ', props.navigation.state.routes[0]);
      //console.log('state.routes[0].routes[0]: ', props.navigation.state.routes[0].routes[0]);

      console.log('indexen for route 0: ', props.navigation.state.routes[0].index);
      console.log('indexen for route 4: ', props.navigation.state.routes[4].index);
*/
      //console.log('indexen for route 0: ', props.navigation.state.routes[0].index);
      //console.log('indexen for route 4: ', props.navigation.state.routes[4].index);

      return (
        <Footer>
          <FooterTab>
            <Button
              verticals
              active={props.navigation.state.index == 1}
              onPress={() => props.navigation.navigate('Calendar')}
            >
              <Icon name="calendar" />
              <Text>Calendar</Text>
            </Button>
            <Button
              vertical
              active={
                props.navigation.state.routes[0].index == 0 && props.navigation.state.index == 0
              }
              onPress={() => props.navigation.navigate('Home')}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button
              vertical
              active={
                props.navigation.state.routes[0].index == 1 && props.navigation.state.index == 0
              }
              onPress={() => props.navigation.navigate('Swipe')}
            >
              <Icon name="stats" />
              <Text>Statistics</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    },
  }
);

const CustomDrawerContentComponent = ({ items, ...props }) => (
  <Container>
    <Header style={{ backgroundColor: '#1C2224' }}>
      <Body>
        <Title>Menu</Title>
      </Body>
    </Header>
    <Content>
      <DrawerItems
        {...props}
        items={items.filter(
          item =>
            item.routeName == 'Profile' ||
            item.routeName == 'Settings' ||
            item.routeName == 'Support' ||
            item.routeName == 'DigiMe'
        )}
      />
      <Button onPress={() => handleLogOut()}>
        <Text>Logout</Text>
        <Icon name="exit" />
      </Button>
    </Content>
  </Container>
);

const WIDTH = Dimensions.get('window').width;

const Navigators = createDrawerNavigator(
  {
    DigiMe: { screen: CAExample },
    Home: { screen: BottomNavigator },
    Swipe: { screen: Swipe },
    Settings: { screen: SettingsStack },
    CalendarStack: { screen: CalendarStack },
    Profile: { screen: ProfileStack },
    Support: { screen: SupportStack },
  },

  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
    drawerWidth: WIDTH * 0.7,
    drawerPosition: 'left',
    drawerBackgroundColor: '#1C2224',
    swipeEnabled: true,
    contentComponent: CustomDrawerContentComponent,

    contentOptions: {
      activeTintColor: '#ffff',
      inactiveTintColor: '#ffff',
      activeBackgroundColor: '#1C2224',
      itemStyle: '#ffff',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  }
);

export default createAppContainer(Navigators);
