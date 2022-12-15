import { ExitCodes } from 'src/app/helper/constants/db_schemas';
import { UtilityService } from './../../../linking/apis/utility.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/linking/apis/storage.service';
import { UserService } from 'src/app/linking/apis/user.service';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage {

  disabled: boolean = false;
  ready: boolean = false;

  password: string = "";
  confirm: string = "";
  email: string = "";

  verification: string = "";
  correct_verification: string = "";

  loading: boolean = false;

  constructor(private utilityService: UtilityService, private userService: UserService, private storageService: StorageService, private router: Router, private toastController: ToastController) { }

  public goToLogin() {

    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 50);

  }

  private async displayWarning(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }

  ionViewDidLeave() {
    this.disabled = false;
  }

  send() {

    this.correct_verification = String(Math.floor(Math.random() * (999999 - 100000 + 1) + 100000));
    this.ready = true;
    console.log(this.correct_verification);
    this.utilityService.sendCode(this.email!, this.correct_verification).subscribe(r => {
      console.log(r);
      this.displayWarning("Email sent");

    });

  }

  onSubmit() {

    if (this.password == this.confirm) {

      if (this.verification == this.correct_verification) {

        this.loading = true;

        this.userService.getFromEmail({ email: this.email }).subscribe(l => {

          console.log(l);

          this.userService.updateUser({ user_id: l.user!.user_id, password: this.password }).subscribe(r => {

            if (r.status == ExitCodes.USERS_UPDATE) {
              this.disabled = true;
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 50);
            } else {
              this.displayWarning("Connection Error");
            }
          });
        });

      } else {

        this.displayWarning("Incorrect verification Code");

      }
    } else {

      this.displayWarning("Passwords do not Match");

    }

  }
}
