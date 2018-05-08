import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import '../style/PatientDiagnosesTable.css';
import CardDisease from '../components/CardDisease';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
localStorage.removeItem("currentProfession");

class PatientDiagnosesTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          diagnosesArr: [],
          id: 1,
          columnCount:'2',
          elementsCount:'4',
          pageNumber:'1',
          pageCount:'2',
          numberStart:1,
          numberFinish:2
        };
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/1/4/2')
        .then(res => {
             this.setState({
              diagnosesArr: res.data
             })
        });
        axios.get(server_url+'/MedicalCard/GetPageCount/'+this.props.PatientId+'/4')
        .then(res => {
             this.setState({
              pageCount: res.data    
             })
        });
    };
       addPage(e)
       {
        e.preventDefault();
        var caller = e.target;
        var number = caller.innerHTML;
        if((number=='»')|| (number=='<span aria-hidden="true">»</span><span class="sr-only">Next</span>'))
        {
            if((this.state.numberFinish+1)<=this.state.pageCount)
            {
                let tempStart=this.state.numberStart+1;
                let tempFinish=this.state.numberFinish+1;
                this.setState({numberStart:tempStart,numberFinish:tempFinish});
                this.removeActive();
            }
        }
        else
        { if((number=='«') || (number=='<span aria-hidden="true">«</span><span class="sr-only">Previous</span>'))
        {
            if((this.state.numberStart-1)>0)
            {
                let tempStart=this.state.numberStart-1;
                let tempFinish=this.state.numberFinish-1;
                this.setState({numberStart:tempStart,numberFinish:tempFinish});
                this.removeActive();
            }
        }
        else{
            this.activePages(number);
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+number+'/'+this.state.elementsCount+'/'+this.state.columnCount)
        .then(res => {
             this.setState({
              diagnosesArr: res.data,
              pageNumber:number
             })
        });
        }
    }
       }

       activePages(number)
       {
           this.removeActive();
          $('.pages li#mypageitem'+(number)).addClass('active');
       }

       removeActive()
       {
        let i;
        for (i = this.state.numberStart; i <= this.state.numberFinish; i++) { 
            $('.pages li#mypageitem'+i).removeClass('active');
          }
       }

       addCountOfElements(e)
       {
        e.preventDefault();
         var caller = e.target;
        var number = caller.innerHTML;
        var columnCount=this.getColumnsAndRowsNumber(number)[0];
        axios.get(server_url+'/MedicalCard/GetPageCount/'+this.props.PatientId+'/'+number)
        .then(res => {
             this.setState({
              pageCount: res.data    
             })
        });
        this.activePages(1);
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+'1'+'/'+number+'/'+columnCount)
        .then(res => {
             this.setState({
              diagnosesArr: res.data,
              elementsCount: number,
              colCount:columnCount,
              numberStart:1,
              numberFinish:2
             })
        });
       }

       getColumnsAndRowsNumber(elemCount)
       {
           var dimensions=[];
           if(window.innerWidth<700)
           {
               if(elemCount==6)
               {
                   dimensions.push(1);
                   dimensions.push(6);
               }
               if(elemCount==4)
               {
                   dimensions.push(1);
                   dimensions.push(4);
               }
               if(elemCount==2)
               {
                   dimensions.push(1);
                   dimensions.push(2);
               }
           }
           else
           {
            if(window.innerWidth<1200)
            {
                if(elemCount==6)
                {
                    dimensions.push(2);
                    dimensions.push(3);
                }
                if(elemCount==4)
                {
                    dimensions.push(2);
                    dimensions.push(2);
                }
                if(elemCount==2)
                {
                    dimensions.push(2);
                    dimensions.push(1);
                }
            }
            else
            {
             if(window.innerWidth>1200)
             {
                 if(elemCount==6)
                 {
                     dimensions.push(3);
                     dimensions.push(2);
                 }
                 if(elemCount==4)
                 {
                     dimensions.push(2);
                     dimensions.push(2);
                 }
                 if(elemCount==2)
                 {
                     dimensions.push(2);
                     dimensions.push(1);
                 }
             }
            }
           }
           return dimensions;
       }

      generatePages(numberStart,numberFinish)
      {
        var arr=[]
        var item=<li className="page-item mypag-item active" id={"mypageitem"+numberStart}><a className="page-link mypag-link" id="mypagelink">{(numberStart).toString()}</a></li>
        arr.push(item);
        if((this.state.pageCount<2)&&(numberStart==1)) numberFinish=this.state.pageCount;
        for(var i=numberStart;i<numberFinish;i++)
        {
           var item=<li className="page-item mypag-item" id={"mypageitem"+(i+1)}><a className="page-link mypag-link" id="mypagelink">{(i+1).toString()}</a></li>
            arr.push(item);
        }
        return arr;
      }

      generateTable()
      {
          var arr=[];
          var col=this.getColumnsAndRowsNumber(this.state.elementsCount)[0];
          var row=this.getColumnsAndRowsNumber(this.state.elementsCount)[1];
             if(col==2)
             {
                    for(var i=0;i<col;i++)
                    {
                    var item= <div className="card-column col-md-6">
                    {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                    </div>
                    arr.push(item);
                }
        }
             if(col==3)
             {
                 var j=0;
                for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-4">
                {this.state.diagnosesArr.slice(i+j,(i+2+j)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                </div>
                arr.push(item);
                j++;
             }
            }
             if(col==4)
             {
                for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-3">
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                </div>
                arr.push(item);
             }
            }
             if(col==1)
             {
                for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-12">
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                </div>
                arr.push(item);
             }
            }
         return arr;
      }
    render(){   
      return (<div>
          <div className="container-fluid">
<div className="row">
          {this.generateTable()}
          </div>  
      </div>
      <div className="d-flex justify-content-between">
      <div>
      <nav >
  <ul className="pagination pages" onClick={e=>(this.addPage(e))}>
  <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    {this.generatePages(this.state.numberStart,this.state.numberFinish)}
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
 </div>
 <div className="dropdown float-right">
  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Count of cards
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={e=>(this.addCountOfElements(e))}>
    <button type="button" className="dropdown-item" >2</button>
    <button type="button" className="dropdown-item" >4</button>
    <button type="button" className="dropdown-item" >6</button>
  </div>
</div>
</div>
    </div>)
   }
  }

  export default PatientDiagnosesTable;