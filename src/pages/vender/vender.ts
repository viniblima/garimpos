import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CameraOptions, Camera } from '@ionic-native/camera';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

import { Produto } from '../../domain/produto/produto';
import { CarrinhoPage } from '../carrinho/carrinho';
import { MinhaContaPage } from '../minha-conta/minha-conta';

@Component({
  selector: 'page-vender',
  templateUrl: 'vender.html',
})
export class VenderPage {
  base64Image: string;
  imageURI:any;
  imageFileName:any;
  public data;
  public return;
  public teste;
  public _http;
  public num;
  public test;
  public produto;
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public toastCtrl: ToastController,
    public http: HttpClient,
    _http: Http) 
    {
      console.log(sessionStorage.getItem("id"));
      this.produto = new Produto(null,null,null,null,null,null,null,null,null, null, null, null, null, null, null);
      this.data = {};
      this.data.response = '';
      this._http = _http;

      this._http.post('http://vservices.com.br/servicos/servicos/get_numero_produtos', '')
      .subscribe(num =>{
        this.num = parseInt(num._body);
        console.log(this.num+1);
      }, err =>{
        console.log(err);
      }
      )

    }
    
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  getCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {
      
    });
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      targetWidth: 300
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.teste = this.base64Image;
      
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }
  uploadFile() {
    var link = 'http://vservices.com.br/upload_foto.php';
    var postData = new FormData();
    postData.append('arquivo', this.base64Image);
    postData.append('cont', this.num+1);
    let data: Observable<any> = this.http.post(link, postData);
    console.log(data);
    console.log(this.teste);
    console.log(this.base64Image);
    data.subscribe((result) => {
      
      console.log(result);
      console.log(result.result);

      if(result.result == true){
        this.produto.id = this.num+1;
        this.produto.img_url = result.image_url;
        this.produto.id_vendedor = sessionStorage.getItem('id');
        console.log(this.produto);
        this.cadastrarProduto(this.produto);
      }else{
        console.log("nao deu");
      }
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  testeObjeto(){
    console.log(this.produto);
  }
  cadastrarProduto(produto){
    let url = 'http://vservices.com.br/servicos/servicos/cadastrar_produto';
    let data = JSON.stringify({
      descricao: this.produto.descricao,
      id: this.produto.id,
      id_vendedor: this.produto.id_vendedor,
      img_url: this.produto.img_url,
      med1: this.produto.med1,
      med2: this.produto.med2,
      med3: this.produto.med3,
      nome: this.produto.nome,
      preco: this.produto.preco,
      tipo: this.produto.tipo,
      nome_vendedor: sessionStorage.getItem('nome'),
      cep_produto: sessionStorage.getItem('cep')
    });
    this._http.post(url,data).subscribe( data => {
      this.data.response = data._body;
      console.log(this.data.response);

      if(this.data.response == 'sucesso'){
        this.navCtrl.setRoot(HomePage);
        this.presentToast('Produto adicionado com sucesso!');
      }
    })
  }
  
  carrinho(){
    this.navCtrl.push(CarrinhoPage);
  }
  minhaConta(){
    this.navCtrl.setRoot(MinhaContaPage);
  }
}
