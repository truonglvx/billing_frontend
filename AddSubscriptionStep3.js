/**
 * Created by mnace on 11/12/2018.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
import Dropzone from 'react-dropzone';
var customFunctions = require('./customFunctions');


class AddSubscriptionStep3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confFile: require('./backend.json'), selectedPlanSteps: this.props.selectedPlan().feature.plan_steps, files: [] };
        this.removeFile=this.removeFile.bind(this);
        this.onDrop=this.onDrop.bind(this);
    }

    componentDidMount() {
        console.log(this.state.selectedPlanSteps);
    }

    onDrop(files){
            var previousFiles=this.state.files;
            console.log('Previous files', previousFiles);
            console.log('Files', files);
            previousFiles.push.apply(previousFiles, files);
            var uniqueFiles=[...new Set(previousFiles)];
            console.log(uniqueFiles);
            this.setState({files: uniqueFiles});
    }

    removeFile(file){
        var file_index=this.state.files.indexOf(file);
        var files=this.state.files;
        console.log('Removed file index', file_index);
        files.splice(file_index, 1);
        this.setState({files: files});
    }

    isValidated() {
        this.saveMetaData();
        return true;
    }

    getInputValuesSelect(input_values) {
        var niza = []
        for (var j = 0; j < input_values.length; j++) {
            niza.push(
                <option value={input_values[j]}>{input_values[j]}</option>);
        }
        return niza;
    }

    getInputValuesCheckbox(input_values) {
        var niza = []
        for (var j = 0; j < input_values.length; j++) {
            niza.push(
                <div className="custom-control custom-checkbox" key={input_values[j]}>
                    <input type="checkbox" className="custom-control-input" id={input_values[j]}/>
                    <label className="custom-control-label">{input_values[j]}</label>
                </div>
            );
        }
        return niza;
    }

    saveMetaData() {
        var fileUploads=[];
        var metaData = {};
        var default_data={};
        var default_data_flag=false;
        var input_types_array=['text', 'password', 'select'];
        for (var i = 0; i < this.state.selectedPlanSteps.length; i++) {
            if (input_types_array.includes(this.state.selectedPlanSteps[i].input_type)) {
                metaData[this.state.selectedPlanSteps[i].input_name] = document.getElementById(this.state.selectedPlanSteps[i].input_name).value;
            }
            else if (this.state.selectedPlanSteps[i].input_type == "checkbox") {
                var values = {};
                var input_values = this.state.selectedPlanSteps[i].input_value.split(",");
                for (var j = 0; j < input_values.length; j++) {
                    values[input_values[j]] = document.getElementById(input_values[j]).checked;
                }
                metaData[this.state.selectedPlanSteps[i].input_name] = values;
            }

            else if (this.state.selectedPlanSteps[i].input_type == "hidden"){

                default_data[this.state.selectedPlanSteps[i].input_name]=this.state.selectedPlanSteps[i].input_value;
                default_data_flag=true;
            }

            else if (this.state.selectedPlanSteps[i].input_type == "file"){
                var file_element=document.getElementById(this.state.selectedPlanSteps[i].input_name);
                var file=file_element.files[0];
                if(file != undefined){
                    fileUploads.push(file);
                }
            }            

            if(default_data_flag == true){
                metaData['default_data']=default_data;
            }
        }
        fileUploads.push.apply(fileUploads, this.state.files);
        this.props.saveStateStepThree(metaData, fileUploads);
    }


    showContent() {
        var index=0;
        const files = this.state.files.map(file => (
        <tr>
            <td><a onClick={() => this.removeFile(file)} style={{ cursor: 'pointer', fontSize: '20px' }}><i className="fa fa-times"/></a></td>
            <td>{file.name}</td>
            <td>{customFunctions.bytesToSize(file.size, " ")}</td>
        </tr>));


        var metaFields = [];
        for (var i = 0; i < this.state.selectedPlanSteps.length; i++) {
            if (this.state.selectedPlanSteps[i].input_type == "text") {
                metaFields.push(
                    <div className="form-group">
                        <label style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</label>
                        <input id={this.state.selectedPlanSteps[i].input_name} className="form-control form-control-lg" type="text" style={{ fontSize: '1em' }} />
                    </div>);
            }
            else if (this.state.selectedPlanSteps[i].input_type == "password") {
                metaFields.push(
                    <div className="form-group">
                        <label style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</label>
                        <input id={this.state.selectedPlanSteps[i].input_name} className="form-control form-control-lg" type="password" style={{ fontSize: '1em' }} />
                    </div>);
            }
            else if (this.state.selectedPlanSteps[i].input_type == "select") {
                var input_values = this.state.selectedPlanSteps[i].input_value.split(",");
                metaFields.push(<div className="form-group">
                    <label style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</label>
                    <select name={this.state.selectedPlanSteps[i].input_name} id={this.state.selectedPlanSteps[i].input_name} className="form-control form-control-lg" style={{ minWidth: '265px', minHeight: '45px', fontSize: '20px' }}>
                        {this.getInputValuesSelect(input_values)}
                    </select>
                </div>
                );
            }

            else if (this.state.selectedPlanSteps[i].input_type == "checkbox") {
                var input_values = this.state.selectedPlanSteps[i].input_value.split(",");
                metaFields.push(<div className="custom-controls-stacked">
                    <h3 className="divider" style={{ fontSize: '1.1em' }}>{this.state.selectedPlanSteps[i].input_name}</h3>
                    {this.getInputValuesCheckbox(input_values)}
                    <br/>
                </div>
                );
            }

            else if (this.state.selectedPlanSteps[i].input_type == "file") {
                metaFields.push(<div class="form-group">
                                    <label for={this.state.selectedPlanSteps[i].input_name}>{this.state.selectedPlanSteps[i].input_name}</label>
                                    <input type="file" class="form-control-file" id={this.state.selectedPlanSteps[i].input_name} webkitdirectory/>
                                </div>
                );
            }

            else if (this.state.selectedPlanSteps[i].input_type == "multiplefile") {
                metaFields.push(
                               <div>
                               <Dropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps}) => (
                                      <section>
                                        <div {...getRootProps({className: 'dropzone'})}>
                                          <input {...getInputProps()} />
                                          <div className="multipleFileUpload">Drag 'n' drop some files here, or click to select files</div>
                                        </div>
                                      </section>)}
                                </Dropzone>
                                <br/>
                                </div>
                );
            }

        }

        if(this.state.files.length > 0){
            metaFields.push(<aside>
                        <h4>Files</h4>
                        <div className="table-responsive-md">
                            <table className="table table-bodered table-hover">
                                <thead>
                                    <tr>
                                      <th scope="col">Action</th>
                                      <th scope="col">File Name</th>
                                      <th scope="col">File Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {files}
                                </tbody>
                            </table>
                        </div>
                        </aside>);
        }
        return metaFields;
    }
    render() {
        return (

            <div>
                <br />
                <p style={{ fontSize: '1.3em' }}>Meta data: </p>
                {this.showContent()}
                <br /> <br /> <br /> <br />
            </div>
        );
    }
}

module.exports = AddSubscriptionStep3;
