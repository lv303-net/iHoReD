import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import SubCategories from'./SubCategories';
import 'react-select/dist/react-select.css';
import '../../../../style/Diagnoses.css';
import PropTypes from 'prop-types';

class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            professionsArr:[],
            id:0,
            selectedOption: '',
            shouldUpdate:1,
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

    componentDidMount()
    {
        let _that=this;
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/Categories')
        .then(function (response) {
            _that.setState({
                options: response.data.map( category => ({ value: category.Id, label: category.Name }))
            })
          })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.selectedOption!==nextState.selectedOption || this.state.shouldUpdate!==nextState.shouldUpdate || this.state.options!==nextState.options)
    }
    getInitialState () {
		return {
			clearable: true,
		};
    }

    render() {
    
    return (
        <div className="col-sm-12 mt-3 selectdiagnose">
        <div className="text-center mb-2">Choose category</div>
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

Categories.propTypes = {
    callback: PropTypes.func
  };

export default Categories;