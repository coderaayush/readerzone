import React from 'react';
import './sidebar.component.scss';
const fs = window.require('fs-extra');
const path = window.require('path');
// const { dialog } = window.require('electron');
const { dialog, app } = window.require('electron').remote
class SidebarComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            items: this.props.items
        }; 
    }
    
    componentDidMount() {
        document.getElementById('sblock').style.height = `${window.innerHeight}px`;
    }

    componentDidUpdate(prevProps) {
        console.log(this.props);
        console.log('component updated');
    }

    itemBlockClicked(selectedIndex) {
        console.log('clicked :  ', selectedIndex)
        this.props.items.map((value, index) => {
            if(index === selectedIndex) {
                value.selected = true;
            } else {
                value.selected = false;
            }
        })
        this.props.callbackFromParent(this.props.items, 'updateAll');
        console.log(this.props.items);
    }

    uploadBtnClick() {
        dialog.showOpenDialog({ properties: ['openFile'] }, files => {
            console.log(files);
            //copy files to appData
            console.log(app.getPath('userData'));
            let filesDir = path.join(app.getPath('userData'), 'myfiles');

            try {
                files.forEach(async file => {
                    await fs.ensureDir(filesDir);
                    let pathParse = path.parse(file);
                    let copyToFilePath = path.join(filesDir, pathParse.base);
                    await fs.copy(file, copyToFilePath);
                    console.log('File copied to user appdata : ', filesDir);
                    this.props.callbackFromParent({name: pathParse.name, path: copyToFilePath, selected: this.props.items.length < 1 ? true: false});
                });
            } catch (err) {
                console.error(err)
            }
        })        
    };
    render() {
        return (
            <div className="row sidebar-block" id="sblock">
                <div className="col-12">
                    <div className="row sidebar-body-header">
                        <div className="col-12">
                            <div className="app-logo"><img src="icons/logo_sm_white.svg" alt=""/></div>
                        </div>          
                    </div>
                    <div className="row sidebar-body-block">
                        <div className="col-12">
                            <div className="block-item-header">
                                <p><span> Files</span></p>
                            </div>
                            <div className="block-items-body">
                                {this.props.items.map((item, index) => {
                                    return  <div className={"block-item" + (item.selected ? ' selected': '')} onClick={() => this.itemBlockClicked(index)}>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <img className="doc-icon" src="icons/Document Icon.svg" alt=""/>
                                                    </div>
                                                    <div className="col-10 item-labels">
                                                        <p className="heading"><span>Document {(index < 10) ? '0' + (index + 1) : index + 1}</span></p>
                                                        <p className="sub-heading"><span>{item.name}</span></p>                                    
                                                    </div> 
                                                </div>
                                            </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row sidebar-footer-block">
                        <div className="col-12">
                            <button className="upload-btn btn" onClick={this.uploadBtnClick.bind(this)}>
                                <img className="upload-icon" src="icons/upload.svg"/>
                                <span>Upload Files</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarComponent