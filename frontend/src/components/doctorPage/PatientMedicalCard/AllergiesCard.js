import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import SelectAllergy from './SelectAllergy';

class AllergiesCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idAllergy: 0
        }
    }

    getAllergyId(param) {
        this.setState({
          idAllergy: param
        })
    }

    render(){
        return(
            <div>
            <div className="row mt-5"> 
                <div className="col-sm-6 col-12">
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#AddAllergyModal">Add allergy</button>
                </div>
            </div>

             <div className="modal fade" id="AddAllergyModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Choose allergy to add</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form className="ml-3 mr-3" onSubmit={this.handleAddingAllergy}>
                            <div className="form-row mb-3 justify-content-center">
                                <SelectAllergy callback={this.getAllergyId.bind(this)}/>
                            </div>

                            <div className="row mb-3 mt-5 justify-content-center">
                            <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                                <button type="submit" className="btn btn-info btn-lg mb-3">Submit
                                </button>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 text-center" >
                                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                                </button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AllergiesCard