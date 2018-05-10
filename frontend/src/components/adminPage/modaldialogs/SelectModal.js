import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectProfessionModal extends Component{
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
        var searchParameter = new URLSearchParams(window.location.search);
        if(selectedOption!==null){
            this.setState({ selectedOption });
            searchParameter.set('prof', selectedOption.value);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        }
        else{
            searchParameter.delete('prof');
        }
    }

    componentDidMount()
    {
        let _that=this;
        axios.get(localStorage.getItem("server_url") + '/AllProfessions')
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
        <div className="col-sm-4 mt-3">
        <div className="text-center mb-2">Choose profession</div>
        <Select
            value={idProf}
            name="form-field-name"
            onChange={this.handleChange}
            options={this.state.options}
        />
      </div>
      );
    }
}
export default SelectProfessionModal;