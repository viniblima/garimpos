import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MinhaReservaPage } from '../minha-reserva/minha-reserva';
import { CurtidasPage } from '../curtidas/curtidas';


@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {
  public img;
  public nome;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) 
  {
    this.img = sessionStorage.getItem('img');
    this.nome = sessionStorage.getItem('nome');
    console.log(this.nome);
  }
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  
  goToReservas(){
    this.navCtrl.setRoot(MinhaReservaPage);
  }
  
  goToCurtidas(){
    this.navCtrl.setRoot(CurtidasPage);
  }

}
