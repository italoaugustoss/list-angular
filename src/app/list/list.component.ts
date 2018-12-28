import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{


  list: Object[];
  nextPage: any;
  prevPage: any;
  labelPrev: string = "Anterior";
  labelNext: string = "Próximo";
  classPrev: string = "anterior";
  

  constructor(private service: ListService){}
  
  ngOnInit() {
    this.listarPersonagem();
  }



  handleCustomGet(endpoint){

    this.service.customGet(endpoint).subscribe(
      data => {
        this.list     = data['results'];
        this.nextPage = data['next'];
        this.prevPage = data['previous'];
      },
      err => console.log(err),
      () => console.log(this.list)
    );
  }


  handleNext(){
   
    if(this.nextPage === null){
      return false;
    }
    this.handleCustomGet(this.nextPage);    
  }
  


  handlePrev(){
    
    if(this.prevPage === null){
      return false;
    }
    this.handleCustomGet(this.prevPage);
  }



  listarPersonagem(){
    
    this.service.listarPersonagem().subscribe(
      data => {
        this.list     = data['results'];
        this.nextPage = data['next'];
        this.prevPage = data['previous'];
      },
      err => console.log(err),
      () => console.log(this.list)
    );
  }



  showIndex(index){
    index = index + 1;
    if(index < 10 && index > 0){
      index = `0${index}`;
    }

    return index;
  }
}
