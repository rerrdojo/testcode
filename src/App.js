import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Map from './components/map/map'
import { Grid, Segment } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Grid>
          <Grid.Column width={16}>
          <Segment>
            <Map/>
          </Segment>
          </Grid.Column>
      </Grid>
    );
  }
}

export default App;
