import { Component } from '@angular/core'
import { NavParams, NavController } from 'ionic-angular'
import { AngularFirestore } from 'angularfire2/firestore';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular/components/slides/slides';
import { AppService } from '../../app/app.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.component.html',
  styles: [`
    .photo {
      height: 350px !important;
      width: calc(100vw - 20px) !important;
      margin: auto;
    }`]
})
export class ProfileComponent {
  private favourites: any
  profileData: any
  CONSTANTS
  noPhoto: string = 'assets/imgs/placeholder.png'
  profileId: string;
  @ViewChild('slides') slides: Slides;

  constructor(private params: NavParams,
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private appService: AppService,
    private loader: LoadingController) {
  }

  ngOnInit() {
    const loader = this.loader.create({});
    loader.present();
    this.profileId = this.params.get('profileId')
    this.afs.collection('profiles')
      .doc(this.profileId).valueChanges()
      .subscribe(data => {
        loader.dismiss();
        if (data) {
          this.profileData = data;
        }
      });
    this.appService.constants$.subscribe(constants => this.CONSTANTS = constants);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  markFavourite(id, favourites) {
    if (favourites) {
      this.favourites.push(id)
    } else {
      this.favourites.splice(this.favourites.indexOf(id))
    }
  }
}
