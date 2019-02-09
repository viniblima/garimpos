import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { Produto } from '../../domain/produto/produto';
import { ProdutoPage } from '../produto/produto';


@Component({
  selector: 'page-comercial',
  templateUrl: 'comercial.html',
})
export class ComercialPage {
  public id;
  public http;
  public data;
  public usuario: Usuario;
  public produto: Produto[];
  public img;
  public nome;
  public num_curtidas;
  public num_pecas;
  public title;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    http: Http) 
    {
      this.http = http;
      this.data = {};
      this.data.response = '';
      this.id = this.navParams.get('perfil_id');
      console.log(this.id);
    }
      
    ngOnInit(){
      let url = 'http://vservices.com.br/servicos/servicos/get_perfil/'+this.id;
      let data = '';
      /*
      this.http.get(url)
        .map( res => res.json())
        .toPromise()
        .then( perfil =>{
          this.usuario.img = perfil[0].img;
          
          console.log(this.usuario.img);
        }  
      ,
        error =>{
          console.log(error)
        });*/
        //let img = this.usuario.img;
        this.http.post(url,data).subscribe( data =>{
          this.data.response = data._body;
          console.log(JSON.parse(this.data.response));
          this.usuario = JSON.parse(this.data.response);
          console.log(this.usuario[0].img);
          this.img = this.usuario[0].img;
          this.nome = this.usuario[0].nome;
          console.log(this.img);
        }, error => {
          console.log(error);
        });

        let url2 = 'http://vservices.com.br/servicos/servicos/get_numero_curtidas';
        let data2 = JSON.stringify({
          id_vendedor: this.id
        });

        this.http.post(url2,data2).subscribe( data => {
          this.data.response = data._body;
          console.log(this.data.response);
          this.num_curtidas = this.data.response;
        });

        let url3 = 'http://vservices.com.br/servicos/servicos/get_numero_pecas';
        let data3 = JSON.stringify({
          id_vendedor: this.id
        });

        this.http.post(url3,data3).subscribe( data => {
          this.data.response = data._body;
          console.log(this.data.response);
          this.num_pecas = this.data.response;
        });

        let url4 = 'http://vservices.com.br/servicos/servicos/get_produtos_vendedor';
        let data4 = JSON.stringify({
          id_vendedor: this.id
        });
        this.http.post(url4,data4).subscribe( data => {
          this.data.response = data._body;
          console.log(this.data.response);
          this.produto = JSON.parse(this.data.response);
        })
    }
    seleciona(i){
      this.navCtrl.push(ProdutoPage, {produtoEscolhido: this.produto[i]})
    }
    


}
