import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Produto } from '../../domain/produto/produto';
import { ProdutoPage } from '../produto/produto';
import { ListPage } from '../list/list';
import { Usuario } from '../../domain/usuario/usuario';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CarrinhoPage } from '../carrinho/carrinho';
import { MinhaContaPage } from '../minha-conta/minha-conta';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public usuario: Usuario;
  public produtos: Produto[]=[];
  
  public produto: Produto[];
  public test;
  public type;
  public data;
  public nome;
  public i;
  public num = 11;
  private _http;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    _http: Http) 
  {
    console.log(this.num % 2);
    if(this.num %= 0){
      console.log('é par');
    }else{
      console.log('é ímpar');
    }
    
    this.data = {};
    this.data.response = '';
    this.test = '';
    this._http = _http;
    this.usuario = this.navParams.get("usuarioLogado");
    
    if(sessionStorage.getItem('carrinho')=='null'){
      sessionStorage.setItem('carrinho', '[]');
    }
    if(sessionStorage.getItem('carrinho') == null){
      sessionStorage.setItem('carrinho', '[]');
    }
    this.produtos = JSON.parse(sessionStorage.getItem('carrinho'));
    
  }
  print(){
    let url = 'http://vservices.com.br/servicos/servicos/get_frete';
    let data = JSON.stringify({
      url: 'qryxt7jx515x'
    });
    this._http.post(url,data).subscribe( data =>{
      this.data.response = data._body;
      console.log(this.data.response);
    }, error => {
      console.log('ocorreu um erro');
    })
  }
  ngOnInit(){

    this.storage.get('usuario').then( res => {
       console.log(res);
      if(res != 'null'){
        if(res != null){
        this.usuario = res;
        sessionStorage.setItem('nome',this.usuario.nome);
        sessionStorage.setItem('id',this.usuario.id);
        sessionStorage.setItem('img',this.usuario.img);
        sessionStorage.setItem('perfil',this.usuario.perfil);
        sessionStorage.setItem('cep_usuario',this.usuario.cep);
        this.nome = sessionStorage.getItem('nome');
      }
      }else{
        
      }
      
      
    });
    this._http
    .get('http://vservices.com.br/servicos/servicos/get_novidades')
    .map(res =>res.json())
    .toPromise()
    .then(produtos =>{
      this.produto = produtos;
      console.log(this.produto);
      this.i = this.produto.length;
      console.log(this.i);
      for(let num = 0; num<this.i;num++){
        if(this.produto[num].curtido == undefined){
          this.produto[num].curtido = 'false';
        }
      }
      console.log(this.produto[0].curtido);
    })
    
    .catch(err =>{
      console.log(err);
    })
    
  
  }
  teste(){
    console.log("");
  }
  seleciona(produto){
    this.navCtrl.push(ProdutoPage, {produtoEscolhido: produto});
  }

  higher(type){
    this.type = "higher";
    console.log(this.type);
    this.navCtrl.push(ListPage, {tipoEscolhido: this.type});
  }
  bottom(type){
    this.type = "bottom";
    console.log(this.type);
    this.navCtrl.push(ListPage, {tipoEscolhido: this.type});
  }
  acessorios(type){

    this.type = "acessorios";
    console.log(this.type);
    this.navCtrl.push(ListPage, {tipoEscolhido: this.type});
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
  esvaziar(){
    sessionStorage.setItem('carrinho','[]');
    console.log(sessionStorage.getItem('carrinho'));
  }
  curtir(i){
    this.produto[i].curtido = 'true';
  }
  minhaConta(){
    this.navCtrl.setRoot(MinhaContaPage);
  }
  signUp(){
    this.navCtrl.setRoot(SignUpPage);
  }
}
