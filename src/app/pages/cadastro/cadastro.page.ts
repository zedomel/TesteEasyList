import { Component, OnInit } from '@angular/core';
import { User } from "src/app/interfaces/user";
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService
  ) { }

  ngOnInit() {
  }
  login() {
  }
  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss;
    }
    this.loading.dismiss;
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...', });
    return loading.present();
  }
}
