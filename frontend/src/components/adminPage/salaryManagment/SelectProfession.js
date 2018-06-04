import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

class SelectProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            professionsArr:[],
            id:0,
            selectedOption: '',
            options: [
                { value: '', label: '' }
            ]
        }
    }

    handleChange = (selectedOption) => {
        var searchParameter = new URLSearchParams(window.location.search);
        if(selectedOption!==null){
            this.setState({ selectedOption });
            searchParameter.set('prof', selectedOption.value);
            searchParameter.delete('doc');
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            this.props.callback(selectedOption.value);
        }
        else{
            searchParameter.delete('prof');
            this.props.callback(selectedOption);
        }
    }

    componentDidMount()
    {
        let _that=this;
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/AllProfessions',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(function (response) {
            _that.setState({
                options: response.data.map( profession => ({ value: profession[0], label: profession[1] }))
            })
          })
    }

    getInitialState () {
		return {
			clearable: true,
		};
    }

    render() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let idProf;
    if (url.search !== '') {
        idProf = url.searchParams.get("prof");
    }
    else{
        idProf = 0;
    }
    return (
        <div className="col-sm-8 mt-3">
        <div className="text-center mb-2">Choose profession</div>
        <Select
            value={idProf}
            name="form-field-name"
            onChange={this.handleChange}
            options={this.state.options}
            clearable={false}
        />
      </div>
      );
    }
}

SelectProfession.propTypes = {
    callback: PropTypes.func
  };

export default SelectProfession;