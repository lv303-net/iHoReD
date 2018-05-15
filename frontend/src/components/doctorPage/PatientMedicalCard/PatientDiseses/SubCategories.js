import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../../../style/Diagnoses.css';
import PropTypes from 'prop-types';
import Diseases from'./Diseases';

class SubCategories extends Component{
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
    reloadRows(param) {
        if(param===0){
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            //notify.show("You can not add multiple rates/salaries for one day", "custom", 5000, myColor);
        }

        this.setState({
            shouldUpdate: this.state.shouldUpdate + param
        })
    }

    handleChange = (selectedOption) => {
        if(selectedOption!==null){
            this.setState({ selectedOption });
            this.props.callback(selectedOption.value);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.selectedOption!==nextState.selectedOption)
    }

    componentWillUpdate(nextProps, nextState)
    {
        let _that=this;
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/SubCategories/' + nextProps.idCategory)
        .then(function (response) {
            _that.setState({
                options: response.data.map( profession => ({ value: profession.Id, label: profession.Name }))
            })
          })
    }

    getInitialState () {
		return {
			clearable: true,
		};
    }

    render() {
    
    return (
        <div className="col-sm-12 mt-3 selectdiagnose">
        <div className="text-center mb-2">Choose subcategory</div>
        <Select
            value={this.state.selectedOption}
            name="form-field-name"
            onChange={this.handleChange}
            options={this.state.options}
            clearable={false}
        />
        <Diseases idSubCategory={this.state.selectedOption.value} callback={this.reloadRows.bind(this)}/>
      </div>
      );
    }
}

SubCategories.propTypes = {
    callback: PropTypes.func
  };

export default SubCategories;