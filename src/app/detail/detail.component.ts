import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private storage : AngularFireStorage,public sanitizer: DomSanitizer,
    private router : Router) { }

  NameModal : string;
  synonymModal : string;
  meaningModal : string;
  exampleModal : string;
  VideoModal : string;
  search : string;
  imgUrl : string;
  gifUrl : string;

  ngOnInit() {
    this.showdata();
  }

  showdata(){
    this.NameModal = localStorage.getItem('word')
    this.synonymModal = localStorage.getItem('synonym')
    this.meaningModal = localStorage.getItem('meaning')
    this.exampleModal = localStorage.getItem('example')
    this.VideoModal = localStorage.getItem('videoUrl')
    this.imgUrl = '/assets/img/no_image.png';
    this.gifUrl = '/assets/img/no_gif.png';

    let imageRef = this.storage.ref('Picture/'+this.NameModal+'.png');
    let imageUrl = imageRef.getDownloadURL();
    imageUrl.subscribe(
      value => {
        this.imgUrl = value;
      })

    let gifRef = this.storage.ref('Gif/'+this.NameModal+'.gif');
    let gifUrl = gifRef.getDownloadURL();
    gifUrl.subscribe(
      value => {
        this.gifUrl = value;
      })
  }
  close(){
    this.router.navigate(['./'])
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
