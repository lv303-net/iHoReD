import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../../../style/Diagnoses.css';
import PropTypes from 'prop-types';

class Diseases extends Component{
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
        return (this.state.selectedOption!==nextState.selectedOption || this.props.idSubCategory!==nextProps.idSubCategory || this.state.options!==nextState.options)
    }

    componentWillUpdate(nextProps, nextState)
    {
        let _that=this;
        if(this.props.idSubCategory!==nextProps.idSubCategory)
        {
            this.setState({
                selectedOption: null
            });
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/api/PatientData/Diseases/' + nextProps.idSubCategory,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(function (response) {
                _that.setState({
                    options: response.data.map( disease => ({ value: disease.Id, label: disease.Name }))
                })
            })
            _that.handleChange(null);
        }
    }

    getInitialState () {
		return {
			clearable: true,
		};
    }

    render() {
    
    return (
        <div className="col-sm-12 mt-3 selectdiagnose">
        <div className="text-center mb-2">Choose disease</div>
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

Diseases.propTypes = {
    callback: PropTypes.func
  };

export default Diseases;