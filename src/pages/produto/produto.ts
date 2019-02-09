import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Produto } from '../../domain/produto/produto';

import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { CarrinhoPage } from '../carrinho/carrinho';
import { ComercialPage } from '../comercial/comercial';

@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  public med1;
  public med2;
  public med3;
  public produto: Produto;
  public sacola: Produto;
  public entrega;
  public http;
  public url;
  public data;
  public flag;
  public produtos: Produto[]=[];
  public relacionados: Produto[];
  public valor_frete;
  public valor1;
  public valor;
  public valor2;
  public preco;
  public preco1; 
  public preco2;
  public preco_final;
  public valor_peca;
  public valor_total;
  public valor_produto;
  public valor_real;
  public preco_split;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    http: Http) 
    {
      let loader = this.loadingCtrl.create({
        content: 'Carregando. Aguarde...'
      });
      loader.present();
      this.data = {};
      this.data.response = '';
      this.produto = this.navParams.get('produtoEscolhido');
      
      console.log(this.produto);
      
      this.http = http;
      
      let url = 'http://vservices.com.br/servicos/servicos/get_frete';
    let data = JSON.stringify({
      cep_origem: this.produto.cep,
      cep_destino: sessionStorage.getItem('cep_usuario')
    });
    console.log(data);
    this.http.post(url,data).subscribe( data =>{
      this.data.response = data._body;
      console.log(this.data.response);
      this.valor = this.data.response.split(",");
      console.log(this.valor);
      this.valor1 = parseFloat(this.valor[0]);
      this.valor2 = parseFloat(this.valor[1])/100;

      console.log(this.valor1);
      console.log(this.valor2);

      this.valor = this.valor1+this.valor2;
      console.log(this.valor);
      this.valor_frete = this.valor.toFixed(2);


      console.log(this.produtos);
      
    }, error => {
      console.log('ocorreu um erro');
    })

      if(this.produto.tipo == 'higher'){
        this.med1 = 'Manga:';
        this.med2 = 'Ombro:';
        this.med3 = 'Altura:';
      }else{
        this.med1 = 'Cintura:';
        this.med2 = 'Comprimento:';
        this.med3 = 'Barra:';
      }
      if(sessionStorage.getItem('carrinho')=='null'){
        sessionStorage.setItem('carrinho', '[]');
      }
      if(sessionStorage.getItem('carrinho') == null){
        sessionStorage.setItem('carrinho', '[]');
      }
      this.produtos = JSON.parse(sessionStorage.getItem('carrinho'));
      
      console.log(sessionStorage.getItem('id'));
      console.log(this.produto.id);
      console.log(sessionStorage.getItem('carrinho'));
      
      
      
      console.log(this.produtos);
      console.log(this.produtos.length);
      this.verificaCurtida();
      this.produtosRelacionados();
      loader.dismiss();
    } 
  reservarAlert(){
    this.alertCtrl.create({
      title: 'Já escolheu a peça? Agora escolha como vai ser a entrega:',
      inputs: [
                {type: 'radio',
                label: 'via Correio',
                
                handler: data =>{
                    this.produto.entrega = 'correio';
                    console.log(this.produto.entrega);
                    this.produto.valor_entrega = this.data.response;
                  }  
                },
                {type: 'radio',
                label: 'Entregar em mãos',
                
                handler: data => {
                  this.produto.entrega = 'estacao';
                  console.log(this.produto.entrega);
                  this.produto.valor_entrega = '0,00';
                  }
                }
              ],

      buttons: [
              {text: 'OK',
              handler: data =>{
              console.log(this.entrega);
              this.adicionaCarrinho(this.valor_real);
              }}, 
              {text: 'Cancelar'}
              ]
    }).present();

  }
  
  
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  carrinho(){
    this.navCtrl.push(CarrinhoPage);
  }
  adicionaCarrinho(valor){
    
    let arrayIndex = this.produtos.length;
    if(arrayIndex == null){
     this.produtos.length = 0; 
    }
    console.log(this.produtos.length);
    
    if(sessionStorage.getItem('carrinho') != '[]'){
      console.log("carrinho nao ta vazio, faz os testes");
      this.flag = false;
      for(let i = 0; i<arrayIndex; i++){
        
        if(this.produto.id == this.produtos[i].id){
          console.log("este produto já está no carrinho");
          this.flag = true;
          break;
        }
      }
      console.log(this.flag);

      if(this.flag == true){
        this.alertCtrl.create({
          title: 'Ops!',
          subTitle: "Esse item já se encontra no seu carrinho!",
          buttons: [{text:'OK'}]
        }).present();
      }else{
        this.produtos[arrayIndex] = this.produto;
        console.log(this.produtos);
        sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
      }


    }else{
      console.log('carrinho ta vazio');
      this.produtos[0] = this.produto;
      sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
    }
    
  }
  verificaCurtida(){
    var url = 'http://vservices.com.br/servicos/servicos/get_curtida';
    var data = JSON.stringify({
      id_cliente: sessionStorage.getItem('id'),
      id_produto: this.produto.id
    });
    this.http.post(url,data).subscribe( data =>{
      this.data.response = data._body;
      this.produto.curtido = this.data.response;
      console.log(this.produto.curtido);
    }, error =>{
      console.log(error);
    })
  }
  descurtir(){
    this.produto.curtido = 'nao curtiu';
    var url = 'http://vservices.com.br/servicos/servicos/descurtir';
    var data = JSON.stringify({
      id_cliente: sessionStorage.getItem('id'),
      id_produto: this.produto.id
    });
    this.http.post(url,data).subscribe( data =>{
      this.data.response = data._body;
      
      console.log(this.data.response);
      if(this.data.response == 'descurtiu'){
        let msg = 'Você descurtiu essa peça';
        this.toastMsg(msg);
      }
    }, error =>{
      console.log(error);
    })
  }
  curtir(){
    this.produto.curtido = 'curtiu';
    var url = 'http://vservices.com.br/servicos/servicos/curtir';
    var data = JSON.stringify({
      id_cliente: sessionStorage.getItem('id'),
      id_produto: this.produto.id,
      id_vendedor: this.produto.id_vendedor
    });
    this.http.post(url,data).subscribe( data =>{
      this.data.response = data._body;
      
      console.log(this.data.response);
      if(this.data.response == 'curtiu'){
        let msg = 'Você curtiu essa peça';
        this.toastMsg(msg);
      }
    }, error =>{
      console.log(error);
    })
  }

  toastMsg(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
  perfil(){
    this.navCtrl.push(ComercialPage, {perfil_id: this.produto.id_vendedor});
  }
  produtosRelacionados(){
    let url = 'http://vservices.com.br/servicos/servicos/get_produtos_relacionados/';
    let data = JSON.stringify({
      id_vendedor: this.produto.id_vendedor,
      id_produto: this.produto.id
    });
    console.log(data);
    this.http.post(url,data).subscribe( data => {
      this.data.response = data._body;
      
      
      this.relacionados = JSON.parse(this.data.response);
      console.log(this.relacionados)
      
    },
    error => {
      console.log(error);
    });
  }
  seleciona(i){
    console.log(this.relacionados[i]);
    this.navCtrl.push(ProdutoPage, {produtoEscolhido: this.relacionados[i]});
  }
}
