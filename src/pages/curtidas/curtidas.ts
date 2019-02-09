import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Produto } from '../../domain/produto/produto';

@Component({
  selector: 'page-curtidas',
  templateUrl: 'curtidas.html',
})
export class CurtidasPage {
  public data;
  public http;
  public id;
  public curtida = [];
  public produtos: Produto[];
  public produto: Produto[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    http: Http) 
    {
      this.produtos = [];
      this.http = http;
      this.data = {};
      this.data.response = '';
      console.log(sessionStorage.getItem("id"));
      this.getCurtidas();
    }

    getCurtidas(){
      let data = JSON.stringify({
        id_cliente: sessionStorage.getItem("id")
        
      });
      let url = 'http://vservices.com.br/servicos/servicos/get_curtidas';
      this.http.post(url, data).subscribe( data => {
        this.data.response = data._body;
        //console.log(JSON.parse(this.data.response));

        if(this.data.response == '[]'){
          console.log("nenhum");
        }else{
          let length = JSON.parse(this.data.response).length;
          this.id = JSON.parse(this.data.response);

          for(let i = 0; i< length; i ++){
            let url = 'http://vservices.com.br/servicos/servicos/get_produtos_curtidos';
            let data = JSON.stringify({
              id_produto: this.id[i].id
            })
            
            this.http.post(url, data).subscribe( data => {
              this.data.response = data._body;
              console.log(this.data.response);
              let aux = JSON.parse(this.data.response);
              console.log(aux[0]);
              this.produtos[i] = aux[0];
              
            });
          
          }
          console.log(this.produtos);
          
        }
      }, error => {
        console.log(error);
      });
    }
    home(){
      this.navCtrl.setRoot(HomePage);
    }


  

}
