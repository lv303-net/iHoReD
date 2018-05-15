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
    getDiseaseId(param) {
        this.setState({
          idDisease: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }
    handleChange = (selectedOption) => {
        if(selectedOption!==null){
            this.setState({ selectedOption });
            this.props.callback(selectedOption.value);
        }
        else{
            this.props.callback(selectedOption);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.selectedOption!==nextState.selectedOption || this.props.idCategory!==nextProps.idCategory || this.state.options!==nextState.options)
    }

    componentWillUpdate(nextProps, nextState)
    {
        let _that=this;
        // _that.setState({
        //     options: []
        // });
        if(this.props.idCategory!==nextProps.idCategory)
        {
            this.setState({
                selectedOption: null
            });
            
            axios.get(localStorage.getItem("server_url") + '/api/PatientData/SubCategories/' + nextProps.idCategory)
            .then(function (response) {
                _that.setState({
                    options: response.data.map( profession => ({ value: profession.Id, label: profession.Name }))
                })
            })
            _that.handleChange(null);
        }
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
        {/* <Diseases idSubCategory={this.state.selectedOption.value} callback={this.reloadRows.bind(this)}/> */}
      </div>
      );
    }
}

SubCategories.propTypes = {
    callback: PropTypes.func
  };

export default SubCategories;