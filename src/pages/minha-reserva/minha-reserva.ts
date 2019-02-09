import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Produto } from '../../domain/produto/produto';
import { HomePage } from '../home/home';
import { CarrinhoPage } from '../carrinho/carrinho';
import { MinhaContaPage } from '../minha-conta/minha-conta';


@Component({
  selector: 'page-minha-reserva',
  templateUrl: 'minha-reserva.html',
})
export class MinhaReservaPage {
  public id;
  public url;
  public http;
  public produto: Produto[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    http: Http) 
    {
      this.http = http;
      this.id = sessionStorage.getItem('id');
      console.log(this.id);
      this.url = 'http://vservices.com.br/servicos/servicos/get_reservas/'+this.id;

    }
    ngOnInit(){
      this.http.get(this.url).
      map( res => res.json()).
      toPromise().
      then( produtos =>{
        this.produto = produtos;
        console.log(this.produto);
        console.log(this.produto);
      })  
      .catch(err =>{
        console.log(err);
      });
      
    }
    home(){
      this.navCtrl.setRoot(HomePage);
    }
    carrinho(){
      this.navCtrl.push(CarrinhoPage);
    }
    minhaConta(){
      this.navCtrl.setRoot(MinhaContaPage);
    }

}
