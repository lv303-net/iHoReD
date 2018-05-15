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
            this.props.callback(selectedOption.value);
        }
    }

    reloadRows(param) {
        if(param===0){
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            //notify.show("You can not add multiple rates/salaries for one day", "custom", 5000, myColor);
        }
        this.setState({
            shouldUpdate: this.state.shouldUpdate + param
        })
    }
    componentDidMount()
    {
        let _that=this;
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/ActiveAllergies/' +  _that.props.id)
        .then(function (response) {
            _that.setState({
                options: response.data.map( allergy => ({ value: allergy.Id, label: allergy.Name }))
            })
          })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.selectedOption!==nextState.selectedOption)
    }

    getInitialState () {
		return {
			clearable: true,
		};
    }


    render() {
        return (
            <div className="col-sm-8 mt-3">
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