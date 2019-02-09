import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../domain/usuario/usuario';
import { Http } from '@angular/http';
import { SessionProvider } from '../../providers/session/session';
import { Storage } from '@ionic/storage';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public http;
  public data;
  public load;
  public dados;
  public resposta;
  public dados_json;
  public usuario: Usuario;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: SessionProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    http: Http) 
    {
      
      this.data = {};
      this.data.response = '';
      this.http = http;
      this.usuario = new Usuario(null,null,null,null,null, null,null);
      
    }
    login(){
      let url = 'http://vservices.com.br/servicos/servicos/login_garimpos';
      let data = JSON.stringify({
        email: this.usuario.email,
        password: this.usuario.senha
      })
      this.http.post(url,data).subscribe(
        data => {
          this.data.response = data._body;
          console.log(this.data.response);
          this.dados_json = JSON.parse(this.data.response);
          console.log(this.dados_json);
          this.resposta = this.dados_json.resposta;
          /*
          this.dados = this.dados_json[0];
          console.log(this.dados);
          
          this.usuario.id = this.dados.id;
          this.usuario.cep = this.dados.cep;
          this.usuario.nome = this.dados.nome;
          this.usuario.img = this.dados.img;
          this.usuario.perfil = this.dados.perfil;
          this.storage.set('usuario', this.usuario);
          */
          if(this.resposta == 'sucesso'){
            this.dados = this.dados_json;
            //console.log(this.dados);
          
            this.usuario.id = this.dados.id;
            this.usuario.cep = this.dados.cep;
            this.usuario.nome = this.dados.nome;
            this.usuario.img = this.dados.img;
            this.usuario.perfil = this.dados.perfil;
            this.storage.set('usuario', this.usuario);
            console.log('LOGADO!');
            this.log(this.usuario);
            console.log(this.usuario);
            return this.dados;
          }
          else{
            
            if(this.resposta == 'Email ou senha inválido'){
            this.toastCtrl.create({
              message: 'Email ou senha inválido',
              duration: 3000,
              position: 'bottom'
            }).present();
          }
          }
        
        }, error => {
          console.log("ocorreu algum erro");
          return this.dados;
        }
      );
      
    }
    
    ngOnInit(){
      
      this.storage.get('usuario').then( res => {
        console.log(res);
        if(res != 'null'){
          if(res != null){
          this.usuario = res;
          this.login();
          
        }
        }else{
          
        }
        
        
      });
      
    }
    
    log(usuario){
      this.navCtrl.setRoot(HomePage, {usuarioLogado: this.usuario});
    }
    goToSignup(){
      this.navCtrl.push(SignUpPage);
    }

}
