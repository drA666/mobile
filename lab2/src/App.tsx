import * as React from 'react';
import { BottomNavigation} from 'react-native-paper';
import {About} from "./pages/About";
import {Graphics} from "./pages/Graphics";

const App = () => {
  const [index, setIndex] = React.useState(0);
  const routes =[
    {key: 'about', title: 'About', icon: require('../public/img/about-icon.png')},
      {key: 'graphics', title: 'Graphics', icon: require('../public/img/graphics-icon.png')},
  ];

  const renderScene = BottomNavigation.SceneMap({
    about: About,
      graphics: Graphics,
  });

  return (
      <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle = {{
            backgroundColor: 'purple',
          }}
      />
  );
};

export default App;
