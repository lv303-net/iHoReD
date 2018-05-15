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
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }
            ]
        }
    }

    handleChange = (selectedOption) => {
        if(selectedOption!==null){
            this.setState({ selectedOption });
            //searchParameter.set('allergy', selectedOption.value);
            // //searchParameter.delete('doc');
            // window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            this.props.callback(selectedOption.value);
        }
    }

    componentDidMount()
    {
        let _that=this;
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/NonActiveAllergies/' + 111)//this.props.PatientId)
        .then(function (response) {
            _that.setState({
                options: response.data.map( allergy => ({ value: allergy.Id, label: allergy.Name }))
            })
          })
    }

    getInitialState () {
		return {
			clearable: true,
		};
    }

    render() {
    let idAllergy;
    return (
        <div className="col-sm-8 mt-3">
            <Select
                value={idAllergy}
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