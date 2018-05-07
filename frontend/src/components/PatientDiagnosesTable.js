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
        };
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/1/4/2')
        .then(res => {
             this.setState({
              diagnosesArr: res.data
             })
        });
    };
       addPage(e)
       {
        e.preventDefault();
        var caller = e.target;
        var number = caller.innerHTML;
        this.activePages(number);
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+number+'/'+this.state.elementsCount+'/'+this.state.columnCount)
        .then(res => {
             this.setState({
              diagnosesArr: res.data,
              pageNumber:number
             })
        });
       }

       activePages(number)
       {
        let i;
        for (i = 0; i < $(".pages li").length; i++) { 
            $('.pages li#mypageitem'+i).removeClass('active');
          }
          $('.pages li#mypageitem'+(number-1)).addClass('active');
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
              colCount:columnCount
             })
        });
       }

       getColumnsAndRowsNumber(elemCount)
       {
           var dimensions=[];
           if(window.innerWidth<700)
           {
               if(elemCount===6)
               {
                   dimensions.push(1);
                   dimensions.push(6);
               }
               if(elemCount===4)
               {
                   dimensions.push(1);
                   dimensions.push(4);
               }
               if(elemCount===2)
               {
                   dimensions.push(1);
                   dimensions.push(2);
               }
           }
           else
           {
            if(window.innerWidth<1200)
            {
                if(elemCount===6)
                {
                    dimensions.push(2);
                    dimensions.push(3);
                }
                if(elemCount===4)
                {
                    dimensions.push(2);
                    dimensions.push(2);
                }
                if(elemCount===2)
                {
                    dimensions.push(2);
                    dimensions.push(1);
                }
            }
            else
            {
             if(window.innerWidth>1200)
             {
                 if(elemCount===6)
                 {
                     dimensions.push(3);
                     dimensions.push(2);
                 }
                 if(elemCount===4)
                 {
                     dimensions.push(2);
                     dimensions.push(2);
                 }
                 if(elemCount===2)
                 {
                     dimensions.push(2);
                     dimensions.push(1);
                 }
             }
            }
           }
           return dimensions;
       }

      generatePages()
      {
        var arr=[]
        var item=<li className="page-item mypag-item active" id={"mypageitem0"}><a className="page-link mypag-link" id="mypagelink">{(1).toString()}</a></li>
        arr.push(item);
        for(var i=1;i<this.state.pageCount;i++)
        {
           var item=<li className="page-item mypag-item" id={"mypageitem"+i}><a className="page-link mypag-link" id="mypagelink">{(i+1).toString()}</a></li>
            arr.push(item);
        }
        return arr;
      }

      generateTable()
      {
          var arr=[];
          var col=this.getColumnsAndRowsNumber(this.state.elementsCount)[0];
          var row=this.getColumnsAndRowsNumber(this.state.elementsCount)[1];
             if(col===2)
             {
                 if(this.state.diagnosesArr.length==1)
                 {
                    var item= <div className="card-column col-xl-12">
                    {this.state.diagnosesArr.map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                    </div>
                    arr.push(item);
                 }
                 else
                 {
                    for(var i=0;i<col;i++)
                    {
                    var item= <div className="card-column col-md-6">
                    {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                    </div>
                    arr.push(item);
                }
                 }
        }
             if(col===3)
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
             if(col===4)
             {
                for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-3">
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                </div>
                arr.push(item);
             }
            }
             if(col===1)
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
    {this.generatePages()}
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