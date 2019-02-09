import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { VenderPage } from '../pages/vender/vender';
import { LoginPage } from '../pages/login/login';


import { MinhaReservaPage } from '../pages/minha-reserva/minha-reserva';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public storage: Storage, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Vender', component: VenderPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToReservas(){
    this.nav.setRoot(MinhaReservaPage);
  }
  goToHigher(){
    this.nav.setRoot(ListPage, {tipoEscolhido: 'higher'});
  }

  goToBottom(){
    this.nav.setRoot(ListPage, {tipoEscolhido: 'bottom'});
  }

  goToAcessorios(){
    this.nav.setRoot(ListPage, {tipoEscolhido: 'acessorios'});
  }
  vender(){
    this.nav.setRoot(VenderPage);
  }
  logout(){
    let alert = this.alertCtrl.create({
      
      title: "Deseja sair?",
      
    });
    alert.addButton({
      text: "Sim",
      handler: data => {
        this.storage.remove('usuario');
        this.nav.setRoot(LoginPage);
      }
    });
    alert.addButton({
      text: "Não"
    });
    alert.present();
  }
}
