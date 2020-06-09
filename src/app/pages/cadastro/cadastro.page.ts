import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user";
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService} from '../../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  login() {
  }
  async register() {
    await this.presentLoading();    
      this.authService.register(this.userRegister)
      .then(res => {
        console.log(res);
        this.loading.dismiss();
        this.toastCtrl.create({
          message: "Logged in:" + this.authService.userDetails
        });

      }, err => {
        console.log('Error!');
        console.log(err);
        this.loading.dismiss();
      })              
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...', });    
    return this.loading.present();
  }
}
