import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

class SubCategories extends Component{
    constructor(props){
        super(props);
        this.state = {
            professionsArr:[],
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
        <div className="col-sm-12 mt-3">
        <div className="text-center mb-2">Choose profession</div>
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

SubCategories.propTypes = {
    callback: PropTypes.func
  };

export default SubCategories;