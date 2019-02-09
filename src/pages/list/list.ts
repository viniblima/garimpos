import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Produto } from '../../domain/produto/produto';
import { HomePage } from '../home/home';
import { ProdutoPage } from '../produto/produto';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CarrinhoPage } from '../carrinho/carrinho';
import { MinhaContaPage } from '../minha-conta/minha-conta';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public type;
  public url;
  public produto: Produto[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    private http: Http) 
    {
      
      this.type = this.navParams.get("tipoEscolhido");
      console.log(this.type);
      this.url = 'http://vservices.com.br/servicos/servicos/get_produtos/' + this.type;

      this.http.get(this.url)
      .map(res =>res.json())
      .toPromise()
      .then(produtos => {
        this.produto = produtos
        console.log(this.produto);
      })

      .catch(err =>{
        console.log(err);
      })
    }

    home(){
      this.navCtrl.setRoot(HomePage);
    }
    seleciona(produto){
      this.navCtrl.push(ProdutoPage, {produtoEscolhido: produto});
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
    minhaConta(){
      this.navCtrl.setRoot(MinhaContaPage);
    }
  }

 

