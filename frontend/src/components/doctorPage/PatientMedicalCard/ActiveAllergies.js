import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../../style/Diagnoses.css';
import PropTypes from 'prop-types';

class ActiveAllergies extends Component{
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
        return (this.state.selectedOption!==nextState.selectedOption || this.props.reload!==nextProps.reload || this.state.options!==nextState.options)
    }

    componentWillUpdate(nextProps, nextState)
    {
        if(this.props.reload!==nextProps.reload){
            let _that=this;
                this.setState({
                    selectedOption: null
                })
                axios({
                    method: 'get',
                    url: localStorage.getItem("server_url") + '/api/PatientData/ActiveAllergies/' + this.props.PatientId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    }
                })
                .then(function (response) {
                        _that.setState({
                            options: response.data.map( subDisease => ({ value: subDisease.Id, label: subDisease.Name }))
                        })
                    });
            _that.handleChange(null);
            }
    }
    componentWillMount()
    {
        let _that=this;
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/api/PatientData/ActiveAllergies/' + this.props.PatientId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(function (response) {
                    _that.setState({
                        options: response.data.map( subDisease => ({ value: subDisease.Id, label: subDisease.Name }))
                    })
                });
           _that.handleChange(null);
    }

    render() {
    
    return (
        <div className="col-sm-12 mt-3 selectdiagnose">
        <div className="text-center mb-2">Choose allergy</div>
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

ActiveAllergies.propTypes = {
    callback: PropTypes.func
  };

export default ActiveAllergies;