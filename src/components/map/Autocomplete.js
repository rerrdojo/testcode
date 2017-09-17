import React, {Component} from 'react'

export default class ReactGoogleAutocomplete extends Component {

  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  componentDidMount() {
   
    this.autocomplete = new window.google.maps.places.Autocomplete(this.refs.input);

    this.autocomplete.addListener('place_changed', this.onSelected);
  }

  onSelected = () => {
    if (this.props.onPlaceSelected) {
      this.props.onPlaceSelected(this.autocomplete.getPlace());
    }
  }

  render() {
    return (
        <input
          ref="input"
        />
    );
  }
}
