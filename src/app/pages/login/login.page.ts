import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }  
  async login() {
    await this.presentLoading();

    this.authService.login(this.userLogin)
      .then(res => {
        console.log('User logged in' + this.authService.userDetails());
        console.log(res);
        this.loading.dismiss();        
      }, err => {
        console.log('Error!');
        console.log(err);
        this.loading.dismiss();
      });   
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
