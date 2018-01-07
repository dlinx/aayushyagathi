import { Injectable, ErrorHandler, Injector } from '@angular/core'
import { AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Injectable()
export class ErrorHanderService implements ErrorHandler {
  constructor(private injector: Injector,
    loading: LoadingController) {
    loading.create().dismissAll();
  }
  handleError(error) {
    console.error(error)
    const alert = this.injector.get(AlertController);
    alert.create({
      message: error.Message || 'Unknown Error',
      title: 'Error',
      enableBackdropDismiss: true,
      buttons: ['OK']
    })
      .present()
  }
}
