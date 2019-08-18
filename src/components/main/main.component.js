import React from 'react';
import './main.component.scss';
import SidebarComponent from '../sidebar/sidebar.component.js';
import DashboardComponent from '../dashboard/dashboard.component.js';

class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };    
    };

    myCallback = (dataFromChild, type) => {
        console.log('callback hit');
        console.log(dataFromChild, ' || ',type);
        this.setState((state) => {
            if (type === 'updateAll') {
                return state.items = dataFromChild;
            }
            return state.items.push(dataFromChild);
        })
        console.log(this.state.items);
    }


    render() {
        return (
            <container-fluid>
                <div className="row">
                    <div className="col-3">
                        <SidebarComponent callbackFromParent = {this.myCallback} items = {this.state.items}></SidebarComponent>
                    </div>
                    <div className="col-9">
                        <DashboardComponent item = {this.state.items.find(item => item.selected === true)}></DashboardComponent>
                    </div>
                </div> 
            </container-fluid>
        );
    }
}

export default MainComponent