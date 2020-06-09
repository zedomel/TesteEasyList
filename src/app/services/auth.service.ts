import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }
  login(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.afa.signInWithEmailAndPassword(user.email, user.senha)
      .then((res: any) => {
        console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error);
      });
    });
  }
  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.senha)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }
  logout() {
    return this.afa.signOut();
  }
  getAuth() {
    return this.afa;
  }
  userDetails() {
    return this.afa.user;
  }
}