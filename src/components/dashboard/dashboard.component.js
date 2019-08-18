import React from 'react';
import './dashboard.component.scss';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const {app } = window.require('electron').remote

class DashboardComponent extends React.Component {

    state = {
        numPages: null,
        pageNumber: 1,
        item: this.props.item,
        filePath: ''
    }

    componentDidUpdate(prevProps) {
        console.log('dashboard component updated');
        console.log(app.getAppPath());
        console.log(this.props);
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    switchPage(step) {
        this.setState((state) => {
           if (step === 'prev') {
               return this.state.pageNumber > 1 ? --state.pageNumber: console.log('Already at page 1')
           } else {
            return this.state.pageNumber === this.state.numPages ? console.log('Already at last page'): ++state.pageNumber
           }
        } )
    }

    render() {
        const { pageNumber, numPages } = this.state;
        return (
            <div className="row dashboard-block">
                { this.props.item? (
                    <div className="col-10 ">
                        <div className="row dashboard-header">
                            <div className="col-12">
                                <p className="document-label">
                                    <img className="doc-icon" src="icons/Document Icon.svg" alt=""/> <span> { this.props.item.name }</span>
                                </p>
                            </div>
                        </div>

                        <div className="row dashboard-body">
                            <div className="col-12">
                                <div className="doc-meta">
                                    <p> <button className="btn switch-btn"  onClick={ () => this.switchPage('prev')}> Prev </button> <button className="btn switch-btn"  onClick={ () => this.switchPage('next')}> Next </button> <span>Page {pageNumber} of {numPages} </span> </p>
                                </div>
                                <div className="doc-item">
                                    <Document
                                    file = {'file:///' + this.props.item.path }
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                    >
                                    <Page pageNumber={pageNumber} />
                                    </Document>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12">
                        <div className="no-doc-block">
                            <p>No Files Found</p>
                            <p><span>Upload some pdf to checkout this cool app</span></p>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default DashboardComponent