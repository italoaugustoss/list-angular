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
  count: any;

  hidden: boolean = false;

  
  constructor(private service: ListService){}
  
  ngOnInit() {
    this.listarPersonagem();
  }


  showLoader(){
    return this.list.length > 0; 
  }


  handleCustomGet(endpoint){

    this.service.customGet(endpoint).subscribe(
      data => {
        this.list     = data['results'];
        this.nextPage = data['next'];
        this.prevPage = data['previous'];
        this.count    = data['count'];
      },
      err => console.log(err),
      () => console.log(this.list)
    );
  }


  handleNext(){
   
    if(this.nextPage === null){   //se a última página for = nulo, retornar falso.
      return false;
    }
    this.handleCustomGet(this.nextPage);    //ir para próxima página.
  }
  


  handlePrev(){
    
    if(this.prevPage === null){   //se a última página for = nulo, retornar falso.
      return false;
    }
    this.handleCustomGet(this.prevPage); // voltar para a página anterior.
  }



  listarPersonagem(){
    
    this.service.listarPersonagem().subscribe(
      data => {
        this.list     = data['results'];
        this.nextPage = data['next'];
        this.prevPage = data['previous'];
        this.hidden = this.showLoader();
        this.count = data['count'];

        // console.log(this.hidden);
      },
      err => console.log(err),
      () => console.log(this.list)
    );
  }



  showIndex(index){
    
    if(this.nextPage === null){
      index = (this.count - this.list.length) + (index + 1); // Caso seja ultima pagina, o contador subtrai o tamanho da lista de array, que retorna index "80", assim somamos mais 1 para começar  do "81".
                                                                
      return index;
    }



    let pageNumber = this.nextPage.split("?page=")[1] - 1;
      // console.log(pageNumber)//RETORNA 1                    // página 1, - 10
                                                            // método Split separa uma string utilizando como critério um delimitador fornecido pelo usuário.
                                                            // Onde string é a string a ser dividida, delimitador é o caractere utilizado como critério para divisão e limite o máximo de divisões. 

    index = ((pageNumber * 10 + index) - 10) + 1; // Lista começa apartir do 01 e não do 00


    
    if(index < 10){
      index = `0${index}`; // se index for menor que 10, index recebe um "0" usando uma `template string`.
    }

    return index;
  }


  disableButton(buttonType){   // Se a nextPage ou prevPage foram nulos bloqueia o botão.
    if(this[buttonType] === null){
      return true;
    }

    return false;
  }


}

