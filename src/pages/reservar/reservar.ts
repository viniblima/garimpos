import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CarrinhoPage } from '../carrinho/carrinho';

@Component({
  selector: 'page-reservar',
  templateUrl: 'reservar.html',
})
export class ReservarPage {
  public data;
  private _http;
  public entrega;
  public produto;
  public valor_frete;
  public valor_total;
  public valor;
  public valor_produto;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    _http: Http,
    public storage: Storage,
    public alertCtrl: AlertController) 
    {
      this.data = {};
      this.data.response = '';
      this._http = _http;
      
      this.valor_total = this.navParams.get('total');
      
    }
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  
  logout(){
    let alert = this.alertCtrl.create({
      
      title: "Deseja sair?",
      
    });
    alert.addButton({
      text: "Sim",
      handler: data => {
        this.storage.remove('usuario');
        this.navCtrl.setRoot(LoginPage);
      }
    });
    alert.addButton({
      text: "Não"
    });
    alert.present();
  }

  carrinho(){
    this.navCtrl.push(CarrinhoPage);
  }

}
