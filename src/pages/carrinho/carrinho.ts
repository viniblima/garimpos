import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Produto } from '../../domain/produto/produto';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { ReservarPage } from '../reservar/reservar';

@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  public produtos: Produto[]=[];
  public produto: Produto;
  public i;
  public total: any;
  public valor;
  public valor1;
  public valor2;

  public entrega;
  public entrega1;
  public entrega2;

  public valor_final;
  public total_final;

  public re;
  public result;

  public http;
  public data;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    http: Http) 
    {
      this.http = http;
      this.data = {};
      this.data.response = '';
      this.total = 0;
      
      if(sessionStorage.getItem('carrinho') == null){
        sessionStorage.setItem('carrinho', '[]');
      }
      
      
      this.produtos = JSON.parse(sessionStorage.getItem('carrinho'));
      console.log(this.produtos);
     
      let cont = this.produtos.length;
      
      
      
      for(let i = 0; i < cont; i++){
        this.valor = this.produtos[i].preco.split(",");
        this.valor1 = parseFloat(this.valor[0]);
        this.valor2 = parseFloat(this.valor[1])/100;
        this.valor = this.valor1+this.valor2;

        console.log(this.valor);

        this.entrega = this.produtos[i].valor_entrega.split(",");
        this.entrega1 = parseFloat(this.entrega[0]);
        this.entrega2 = parseFloat(this.entrega[1])/100;
        this.entrega = this.entrega1+this.entrega2;

        console.log(this.entrega);

        this.valor_final = this.valor + this.entrega;
        
        this.total +=this.valor_final;
        
      }
      console.log(this.total);
      console.log(this.total.toFixed(2));
      this.total_final = ""+this.total.toFixed(2);
      console.log(this.total_final);

      let total = this.total_final.split('.');
      

      this.result = total[0]+","+total[1];

      console.log(this.result);
      
      
    }
  thisItem(i){
    console.log(this.produtos[i]);
  }
  removeAviso(i){
    
    this.alertCtrl.create({
      title: 'Remover '+this.produtos[i].nome+' da sua sacola?',
      
      buttons: [
        {text: "Sim",
        handler: data => {
          this.removeItem(i)
        }
        },
        {text: 'Não'}]
    }).present();
  }
  removeItem(i){

    this.produtos.splice(i,1);
    sessionStorage.setItem('carrinho',JSON.stringify(this.produtos));
    this.navCtrl.setRoot(CarrinhoPage);
  }

  esvaziarCarrinho(){
    sessionStorage.setItem('carrinho', '[]');
    this.navCtrl.setRoot(CarrinhoPage);
  }
  reservarItens(){
    let arrayIndex = this.produtos.length;
    for(var i = 0;i<arrayIndex;i++){
      var link = 'http://vservices.com.br/servicos/servicos/reservar';
      var data = JSON.stringify({
        id_peca: this.produtos[i].id,
        id_comprador: sessionStorage.getItem('id')
      });

      this.http.post(link,data).subscribe( data =>{
        this.data.response = data._body;
        console.log(this.data.response);
        
        sessionStorage.setItem('carrinho','[]');
        
      }, error =>{
        console.log(error);
      })
    }
    this.reserva();
  }
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  reserva(){
    this.navCtrl.setRoot(ReservarPage, {total: this.result});
  }
}
