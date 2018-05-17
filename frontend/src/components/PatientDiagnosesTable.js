import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import '../style/PatientDiagnosesTable.css';
import CardDisease from '../components/CardDisease';
import { EALREADY } from 'constants';

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
          pageCount:2,
          numberStart:1,
          numberFinish:2,
          ifArrow:false
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
          var page = Number(url.searchParams.get("page"));
          var count = Number(url.searchParams.get("elem"));
          this.activePages(page);
          var colCount=this.getColumnsAndRowsNumber(count)[0];
          var tempPageStart;
          var tempPageEnd;
          if((page-1)==0)
          {
              tempPageStart=1;
              tempPageEnd=2;
          }
          else
          {
              tempPageStart=page-1;
              tempPageEnd=page;
          }
          axios.get(localStorage.getItem("server_url")+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+page+'/'+count+'/'+colCount)
          .then(res => {
               this.setState({
                diagnosesArr: res.data,
                pageNumber:page,
                elementsCount:count,
                columnCount:colCount,
                numberStart:tempPageStart,
                numberFinish:tempPageEnd
               },this.activePages(page))
          });
          axios.get(localStorage.getItem("server_url")+'/MedicalCard/GetPageCount/'+this.props.PatientId+'/'+count)
          .then(res => {
               this.setState({
                pageCount: res.data,
               })
          });
        }
        else
        {
            var searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('page', 1);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios.get(localStorage.getItem("server_url")+'/medicalcard/getbyuserid/'+this.props.PatientId+'/1/4/2')
            .then(res => {
                 this.setState({
                  diagnosesArr: res.data
                 },this.activePages(1))
            });
            var searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('elem', 4);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios.get(localStorage.getItem("server_url")+'/MedicalCard/GetPageCount/'+this.props.PatientId+'/4')
            .then(res => {
                 this.setState({
                  pageCount: res.data    
                 })
            });
        }
       
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
                var searchParameter = new URLSearchParams(window.location.search);
                searchParameter.delete('page');
                let tempStart=this.state.numberStart+1;
                let tempFinish=this.state.numberFinish+1;
                this.setState({numberStart:tempStart,numberFinish:tempFinish,ifArrow:true});
                this.removeActive();
            }
        }
        else
        { if((number=='«') || (number=='<span aria-hidden="true">«</span><span class="sr-only">Previous</span>'))
        {
            if((this.state.numberStart-1)>0)
            {
                var searchParameter = new URLSearchParams(window.location.search);
                searchParameter.delete("page");
                let tempStart=this.state.numberStart-1;
                let tempFinish=this.state.numberFinish-1;
                this.setState({numberStart:tempStart,numberFinish:tempFinish,ifArrow:true});
                this.removeActive();
            }
        }
        else{
            var searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('page', number);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            this.activePages(number);
        axios.get(localStorage.getItem("server_url")+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+number+'/'+this.state.elementsCount+'/'+this.state.columnCount)
        .then(res => {
             this.setState({
              diagnosesArr: res.data,
              pageNumber:number,
              ifArrow:false
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
            $('.pages li#mypageitem'+(i)).removeClass('active');
          }
       }

       addCountOfElements(e)
       {
        var url_string = window.location.href;
        var url = new URL(url_string);
        e.preventDefault();
         var caller = e.target;
        var number = parseInt(caller.innerHTML);
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('elem', number);
        var newPageNumber;
        axios.get(localStorage.getItem("server_url")+'/MedicalCard/GetPageCount/'+this.props.PatientId+'/'+number)
        .then(res => {
             this.setState({
              pageCount: res.data    
             })
        });
        if(this.state.elementsCount<number)
        {
            for(var i=1;i<number;i++)
            {
                var start=this.state.elementsCount*(this.state.pageNumber-1)+1;
                if((start>=((i-1)*number+1))&&((start+this.state.elementsCount-1)<=((i-1)*number+number)))
                {
                    newPageNumber=i;
                }
                else
                {
                    if((start>=((i-1)*number+1))&&((start)<=((i-1)*number+number)))
                    {
                        newPageNumber=i;
                    }
                }
            }
            if(newPageNumber==null)
            {
                 newPageNumber=1;
            }
        }
        else
        {
            newPageNumber=1;
        }
        if((newPageNumber+1)<this.state.pageCount)
        {
            this.setState({numberStart:newPageNumber,numberFinish:newPageNumber+1})
        }
        else
        {
            if((newPageNumber-1)>=1)
        {
            this.setState({numberStart:newPageNumber-1,numberFinish:newPageNumber})
        }
        else
        {
            this.setState({numberStart:newPageNumber,numberFinish:newPageNumber})
        }
        }
        this.setState({pageNumber:newPageNumber});
        searchParameter.set('page', newPageNumber);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        this.AddDropdown(number);
        var columnCount=this.getColumnsAndRowsNumber(number)[0];
        axios.get(localStorage.getItem("server_url")+'/medicalcard/getbyuserid/'+this.props.PatientId+'/'+newPageNumber+'/'+number+'/'+columnCount)
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

       AddDropdown(number)
       {
         var  button=$('#dropdownMenuButton');
        button.innerHTML=number;
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
                   dimensions.push(20)
               }
               if(elemCount==4)
               {
                   dimensions.push(1);
                   dimensions.push(4);
                   dimensions.push(20)
               }
               if(elemCount==2)
               {
                   dimensions.push(1);
                   dimensions.push(2);
                   dimensions.push(20)
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
                    dimensions.push(20)
                }
                if(elemCount==4)
                {
                    dimensions.push(2);
                    dimensions.push(2);
                    dimensions.push(20)
                }
                if(elemCount==2)
                {
                    dimensions.push(2);
                    dimensions.push(1);
                    dimensions.push(20)
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
                     dimensions.push(20);
                 }
                 if(elemCount==4)
                 {
                     dimensions.push(2);
                     dimensions.push(2);
                     dimensions.push(50);
                 }
                 if(elemCount==2)
                 {
                     dimensions.push(2);
                     dimensions.push(1);
                     dimensions.push(50);
                 }
             }
            }
           }
           return dimensions;
       }

      generatePages(numberStart,numberFinish)
      {
        var arr=[]
        var url_string = window.location.href;
        var url = new URL(url_string);
        var item=<li className="page-item mypag-item active" id={"mypageitem"+numberStart}><a className="page-link mypag-link" id="mypagelink">{(numberStart).toString()}</a></li>
        arr.push(item);
        if((this.state.pageCount<2)&&(numberStart==1)) numberFinish=this.state.pageCount;
        for(var i=numberStart;i<numberFinish;i++)
        {
           var item=<li className="page-item mypag-item" id={"mypageitem"+(i+1)}><a className="page-link mypag-link" id="mypagelink">{(i+1).toString()}</a></li>
            arr.push(item);
        }
        if(!this.state.ifArrow)
        {
            this.activePages(Number(url.searchParams.get("page")));
        }
        return arr;
      }

      generateTable()
      {
          var arr=[];
          var col=this.getColumnsAndRowsNumber(this.state.elementsCount)[0];
          var row=this.getColumnsAndRowsNumber(this.state.elementsCount)[1];
          var width=this.getColumnsAndRowsNumber(this.state.elementsCount)[2];
             if(col==2)
             {
                    for(var i=0;i<col;i++)
                    {
                    var item= <div className="card-column col-md-6">
                    {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime.slice(0,10)} diagnosis={diagnoses.Description.slice(0,width)+'...'}/>)}
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
                {this.state.diagnosesArr.slice(i+j,(i+2+j)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime.slice(0,10)} diagnosis={diagnoses.Description.slice(0,width)+'...'}/>)}
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
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime.slice(0,10)} diagnosis={diagnoses.Description.slice(0,width)+'...'}/>)}
                </div>
                arr.push(item);
             }
            }
             if(col==1)
             {
                for(var i=0;i<col;i++)
                {
                var item= <div className="card-column col-md-12">
                {this.state.diagnosesArr.slice(row*i,row*(i+1)).map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.DoctorFirstname+diagnoses.Doctorlastname} date={diagnoses.StartDateTime.slice(0,10)} diagnosis={diagnoses.Description.slice(0,width)+'...'} />)}
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
 <div className="dropdown mydropdown float-right">
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