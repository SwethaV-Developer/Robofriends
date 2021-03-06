import React from 'react';
import './App.css';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

class App extends React.Component{
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        }).then(users => this.setState({robots:users}))

    }
    OnSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });       
    }
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => { return robot.name.toLowerCase().includes(searchfield.toLowerCase()) });
        return (!robots.length)?
             <h1>Loading...</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox SearchChange={this.OnSearchChange} />
                    <Scroll>
                         <ErrorBoundry>
                           <CardList robots={filteredRobots} />
                         </ErrorBoundry>
                    </Scroll>
                </div>
            );
        
    }
}

export default App;
