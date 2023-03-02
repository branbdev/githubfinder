import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component { //React.Fragment will work also, removing the App div from rendering
  state = {
    users: [],
    loading: false
  };

  // async componentDidMount(){
  //   this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data, loading: false});

    // console.log(res.data); <--This goes into state of app data
  // }

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  }

  //Clear Users from State
  clearUsers = () => this.setState({ users:[], loading: false })

  render() {
    return (
      <div className='App'> 
        <Navbar />  {/*'Navbar title=' would be a prop*/}
        <div className='container'>
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} />
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }
}
//  In JSX, content must exist in ONE parent Element!
export default App;


//class based components without State should be converted to functions. Hooks allow functions to have state