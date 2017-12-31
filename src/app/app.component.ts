import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginComponent } from '../pages/login/login.component'
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginComponent;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    afire: AngularFireAuth,
    afs: AngularFirestore) {
    afire.authState.subscribe((user) => {
      if (user) {
        this.rootPage = HomePage;
        const profileDoc = afs.collection('profile').doc(user.uid);

        profileDoc.valueChanges()
          .subscribe(profile => {
            console.log(profile)
          }, (err) => {
            profileDoc.set({ name: user.displayName })
          })
      }
      else
        this.rootPage = LoginComponent;
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

