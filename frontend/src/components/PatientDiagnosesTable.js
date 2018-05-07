import React from 'react';
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
        
       }

       addCountOfElements(e)
       {
        e.preventDefault();
         var caller = e.target;
        var number = caller.innerHTML;
        var columnCount=this.getColumnsAndRowsNumber(number)[0];
        axios.get(server_url+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+this.state.pageNumber+'/'+number+'/'+columnCount)
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

      generatePages(count)
      {
        var arr=[]
        for(var i=0;i<count;i++)
        {
           var item=<li class=" mypag-item"><a class="page-link mypag-link">{(i+1).toString()}</a></li>
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
                 for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-6">
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseName}/>)}
                </div>
                arr.push(item);
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
          <div class="container-fluid">
<div class="row">
          {this.generateTable()}
          </div>  
      </div>
      <div className="d-flex justify-content-between">
      <div>
      <nav >
  <ul class="pagination" onClick={e=>(this.addPage(e))}>
    {this.generatePages(3)}
  </ul>
</nav>
 </div>
 <div class="dropdown float-right">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Count of cards
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={e=>(this.addCountOfElements(e))}>
    <button type="button" class="dropdown-item" >2</button>
    <button type="button" class="dropdown-item" >4</button>
    <button type="button" class="dropdown-item" >6</button>
  </div>
</div>
</div>
    </div>)
   }
  }

  export default PatientDiagnosesTable;