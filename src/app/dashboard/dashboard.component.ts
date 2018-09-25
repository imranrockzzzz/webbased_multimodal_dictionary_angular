import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from 'angularfire2/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private CsvService : CsvService, private router : Router) { }
  DataArr : any;
  GlobalDataArr :any;
  closeResult: string;
  NameModal : string;
  synonymModal : string;
  meaningModal : string;
  exampleModal : string;
  VideoModal : string;
  search : string;
  imgUrl : string;
  gifUrl : string;

  ngOnInit() {
    this.CsvService.getResult()
    .subscribe(
        data => {
            let jsonData = data;
            this.GlobalDataArr = jsonData;
            this.DataArr = jsonData;
            let windowHeight = window.innerHeight - 100;
            (<HTMLElement>document.querySelector('.my-table')).style.height = windowHeight + 'px';            
        },
        error => {
            console.log(error);
        }
    );
  }

  open(content,data) {
    this.NameModal = data.word;
    this.synonymModal = data.synonym;
    this.meaningModal = data.meaning;
    this.exampleModal = data.example
    this.VideoModal = data.video;

    // save values on localstorage
    localStorage.setItem('word', this.NameModal);
    localStorage.setItem('synonym', this.synonymModal);
    localStorage.setItem('meaning', this.meaningModal);
    localStorage.setItem('example', this.exampleModal);
    localStorage.setItem('videoUrl', this.VideoModal);
    localStorage.setItem('imgUrl', this.imgUrl);
    localStorage.setItem('gifUrl', this.gifUrl);

    this.router.navigate(['./detail']);    
  }

  getSearch(value){
    let data  = this.GlobalDataArr;
    let filteredData = data.filter(function(val){
      value = value.toLocaleLowerCase();
      val = val.word.toLocaleLowerCase();
      let match = val.indexOf(value);
      if(match > -1){
        return val;
      }
      console.log(value)
    })
    this.DataArr = filteredData;
  }

  csvJSON(csv){
    var lines=csv.split("\n");
  
    var result = [];
  
    var headers= ['word','synonym','meaning','example','video']
    for(var i=0;i<lines.length;i++){  
      var obj = {};
      var currentline=lines[i].split(";");
  
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }  
      result.push(obj);  
    }
    console.log(result);
    return result;
  }

}