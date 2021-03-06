import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

import { AppService } from '../../../app/app.service'
import { EditProfileComponent } from '../../edit-profile/edit-profile.component'
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  profile
  noPhoto: string = 'assets/imgs/placeholder.png'
  constructor(private navCtrl: NavController,
    private appService: AppService,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.appService.myProfileDoc.valueChanges().subscribe(profile => {
      this.profile = profile;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  viewProfile() {
    this.navCtrl.parent.parent.push(EditProfileComponent, {})
  }

  aboutUs() {

  }
}
