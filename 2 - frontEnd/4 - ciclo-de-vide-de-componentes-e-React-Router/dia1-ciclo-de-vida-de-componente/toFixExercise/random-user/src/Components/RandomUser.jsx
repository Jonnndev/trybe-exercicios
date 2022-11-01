import React, { Component } from 'react'
import Loading from './Loading';
import PersonalData from './PersonalData';

class RandomUser extends Component {
  constructor() {
    super();



    this.state = {
      personalData: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const requestResults = await fetch('https://api.randomuser.me/');
        const requestObject = await requestResults.json();
        const data = await requestObject.results;
        this.setState({
          loading: false,
          personalData: data
        });
      }
    )
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   const age = 50;
    
  //   console.log(nextState.personalData[0])
  // }

  getUserElements = (user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      age: user.dob.age,
      image: user.picture.thumbnail,
    };
  }

  render() {
    const { loading, personalData } = this.state;
    
    if (loading) return <Loading />

    return (
      <PersonalData person={ this.getUserElements(personalData[0]) } />
    )
  }
}

export default RandomUser;
