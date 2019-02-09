import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProdutoPage } from '../pages/produto/produto';
import { VenderPage } from '../pages/vender/vender';
import { ReservarPage } from '../pages/reservar/reservar';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { MinhaReservaPage } from '../pages/minha-reserva/minha-reserva';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { MinhaContaPage } from "../pages/minha-conta/minha-conta";
import { ComercialPage } from '../pages/comercial/comercial';
import { CurtidasPage } from '../pages/curtidas/curtidas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SessionProvider } from '../providers/session/session';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProdutoPage,
    VenderPage,
    ReservarPage,
    LoginPage,
    SignUpPage,
    MinhaReservaPage,
    CarrinhoPage,
    MinhaContaPage,
    ComercialPage,
    CurtidasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProdutoPage,
    VenderPage,
    ReservarPage,
    LoginPage,
    SignUpPage,
    MinhaReservaPage,
    CarrinhoPage,
    MinhaContaPage,
    ComercialPage,
    CurtidasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionProvider
  ]
})
export class AppModule {}
