import * as React from 'react';
import { BottomNavigation} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import UserProfile from '../screens/UserProfileScreen';

const HomeRoute = () => <HomeScreen/>;

const CreateRoute = () => <HomeScreen/>;

const ProfileRoute = () => <UserProfile/>;

export default (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'create', title: 'Create', icon: 'plus-circle' },
    { key: 'profile', title: 'Profile', icon: 'account-circle' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    create: CreateRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: "#F8F5F1" }}
      keyboardHidesNavigationBar={true}
    />
  );
};