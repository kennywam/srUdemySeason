import React from "react";
import ReactDOM from "react-dom/client"
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import "./style/style/App.css"


class App extends React.Component{
    state = {pos: null, errorMessage: ''}

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) =>this.setState({lat: position.coords.latitude}),
            (err) =>this.setState({errorMessage: err.message})
        );
    }
    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Spinner message="Please wait while we access your location" /> 
    }

    
    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );
        }
 }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)