import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../domain/usuario/usuario';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  base64Image: string;
  imageURI:any;
  imageFileName:any;
  public usuario: Usuario;
  private _http;
  public data;
  public url;
  public teste;
  public num;
  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public http: HttpClient,
    _http: Http) 
    {
      this._http = _http;
      this.usuario = new Usuario(null,null,null,null,null, null,null);
      this.data = {};
      this.data.response = '';
      this.url = 'http://vservices.com.br/servicos/servicos/cadastrar_usuario_garimpos'
    }

    submit(){
      let cep = '';
      console.log(this.usuario.cep);
      this.usuario.cep.split("-");
      for(let i=0;i<=4;i++){
        cep += this.usuario.cep[i];
      }
      for(let i=6;i<=8;i++){
        cep += this.usuario.cep[i];
      }
      
      console.log(cep);
      console.log(this.url);
      var data = JSON.stringify({
        nome: this.usuario.nome,
        email: this.usuario.email,
        password: this.usuario.senha,
        cep: cep,
        img: this.usuario.img
      })
      this._http.post(this.url,data).subscribe(data => {
        this.data.response = data._body;
        console.log(this.data.response);
        if(this.data.response == 'sucesso'){
          this.navCtrl.setRoot(LoginPage);
          let toast = this.toastCtrl.create({
            message: "Usuário criado!",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }else{
          let toast = this.toastCtrl.create({
            message: "Ocorreu algum erro",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }, error =>{
        console.log(error);
      })
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
        
      });
    }
    uploadFile() {
      var link = 'http://vservices.com.br/upload_foto.php';
      var postData = new FormData();
      postData.append('arquivo', this.base64Image);
      postData.append('cont', this.usuario.email);
      let data: Observable<any> = this.http.post(link, postData);
      console.log(data);
      console.log(this.teste);
      console.log(this.base64Image);
      data.subscribe((result) => {
        
        console.log(result);
        console.log(result.result);
  
        if(result.result == true){
          this.usuario.img = result.image_url;
          this.submit();
        }else{
          console.log("nao deu");
        }
      });
    }
    teste1(){
      
      

    }

}
