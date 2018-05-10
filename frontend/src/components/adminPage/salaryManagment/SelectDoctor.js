import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            doctorsArr:[],
            idDoc:0,
            idProf:0,
            selectedOption: '',
            options: [
                { value: '0', label: 'j' }
            ]
        }
    }
    handleChange = (selectedOption) => {
        var searchParameter = new URLSearchParams(window.location.search);
        if(selectedOption!==null){
            searchParameter.set('doc', selectedOption.value);
            this.setState({ 
                selectedOption: selectedOption,
                idDoc: selectedOption.value
            });
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);

        }
        else{
            //searchParameter.delete('doc');
        }
    }

    setStateIdProf()
    {
        let url_string = window.location.href;
        let url = new URL(url_string);
        if (url.search !== '') {
            let idProf = url.searchParams.get("prof");
                this.setState({
                    idProf: idProf
                })
        }
    }

    componentDidMount(){
        let url_string = window.location.href;
        let url = new URL(url_string);
        let _that = this;
        if (url.search !== '')
        {
            this.setStateIdProf();
        }
        else{
            axios.get(localStorage.getItem("server_url") + '/api/Doctor')
                .then(function (response) {
                    _that.setState({
                        options: response.data.map( doctor => ({ value: doctor.Id, label: doctor.FirstName + " " + doctor.LastName}))
                    })
                })
            }
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.state.idProf !== nextState.idProf || this.state.options!==nextState.options || this.props.idProf !==nextProps.idProf || this.state.idDoc!==nextState.idDoc)
      }
    componentWillUpdate(nextProps, nextState){
        // if(this.state.idProf === nextState.idProf)
        // {
            this.setStateIdProf();
        //}
        let _that = this;
        if(this.state.idProf !== nextState.idProf)
        {
        axios.get(localStorage.getItem("server_url") + '/GetDoctors/' + nextState.idProf)
            .then(function (response) {
                _that.setState({
                    options: response.data.map( doctor => ({ value: doctor[2], label: doctor[0] + " " + doctor[1]}))
                })
            })
        }
    }
    render() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let idDoc;
    if (url.search !== '') {
        idDoc = url.searchParams.get("doc");
    }
    else{
        idDoc = 0;
    }
    return (
        <div className="col-sm-4 mt-3">
        <div className="text-center mb-2">Choose doctor</div>
        <Select
            value={idDoc}
            name="form-field-name"
            onChange={this.handleChange}
            options={this.state.options}
            clearable={false}
        />
      </div>
      );
    }
}
export default SelectProfession;