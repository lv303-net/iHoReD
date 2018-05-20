import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../../../style/Diagnoses.css';
import PropTypes from 'prop-types';

class ActiveDiseases extends Component{
    constructor(props){
        super(props);
        this.state = {
            professionsArr:[],
            id:0,
            selectedOption: '',
            options: [
                { value: '0', label: '' }
            ]
        }
    }

    handleChange = (selectedOption) => {
        if(selectedOption!==null){
            this.setState({ selectedOption });
            this.props.callback(selectedOption.value);
        }
        else{
            this.setState({ 
                options: [{ value: '0', label: '' } ]
            });
            this.props.callback(selectedOption)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.selectedOption!==nextState.selectedOption || this.props.idDisease!==nextProps.idDisease || this.props.reload!==nextProps.reload || this.state.options!==nextState.options)
    }

    componentWillUpdate(nextProps, nextState)
    {
        let _that=this;
        if(this.props.idDisease!==nextProps.idDisease || this.props.reload!==nextProps.reload)
        {
            this.setState({
                selectedOption: null
            });
            axios.get(localStorage.getItem("server_url") + '/api/PatientData/ActiveDiseases/' + this.props.PatientId)
            .then(function (response) {
                _that.setState({
                    options: response.data.map( subDisease => ({ value: subDisease.Id, label: subDisease.Name }))
                })
            })
            _that.handleChange(null);
        }
    }

    render() {
    
    return (
        <div className="col-sm-12 mt-3 selectdiagnose">
        <div className="text-center mb-2">Choose subdisease</div>
        <Select
            value={this.state.selectedOption}
            name="form-field-name"
            onChange={this.handleChange}
            options={this.state.options}
            clearable={false}
        />
      </div>
      );
    }
}

ActiveDiseases.propTypes = {
    callback: PropTypes.func
  };

export default ActiveDiseases;