import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

class SelectAllergy extends Component{
    constructor(props){
        super(props);
        this.state = {
            allergiesArr:[],
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
        return (this.state.selectedOption!==nextState.selectedOption || this.props.idAllergy!==nextProps.idAllergy || this.props.reload!==nextProps.reload || this.state.options!==nextState.options)
    }

    componentWillUpdate(nextProps, nextState)
    {
        let _that=this;
        if((this.props.idAllergy!==nextProps.idAllergy || this.props.reload!==nextProps.reload) && (nextProps.idAllergy!==0))
        {
            this.setState({
                selectedOption: null
            });
            axios.get(localStorage.getItem("server_url") + '/api/PatientData//NonActiveAllergies/' +  _that.props.PatientId)
            .then(function (response) {
                _that.setState({
                    options: response.data.map( subDisease => ({ value: subDisease.Id, label: subDisease.Name }))
                })
            })
            _that.handleChange(null);
        }
    }

    // SaveAll(){
    //     var data = {
    //         Visit:this.props.Visit,
    //         PatientId:this.props.PatientId
    //     }
    // }

    componentDidMount()
    {
        let _that=this;
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/NonActiveAllergies/' +  _that.props.PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(function (response) {
            _that.setState({
                options: response.data.map( allergy => ({ value: allergy.Id, label: allergy.Name }))
            })
        })
    }

    render() {
        return (
            <div className="col-sm-12 mt-3">
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

SelectAllergy.propTypes = {
    callback: PropTypes.func
  };

export default SelectAllergy;