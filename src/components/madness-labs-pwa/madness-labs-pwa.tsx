import '@ionic/core';

import { Component, Listen, State } from '@stencil/core';

import { DatabaseService } from '../../services/database';
import { AuthService } from '../../services/auth';

@Component({
  tag: 'madness-labs-pwa',
  styleUrl: 'madness-labs-pwa.scss'
})
export class MyApp {

  Database: DatabaseService;
  Auth: AuthService;

  @State() defaultProps: {
    auth?: AuthService,
    db?: DatabaseService
  };

  //@Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  // @Listen('window:swUpdate')
  // async onSWUpdate() {
  //   const toast:any = await this.toastCtrl.create({
  //     message: 'New version available',
  //     showCloseButton: true,
  //     closeButtonText: 'Reload'
  //   });
  //   await toast.present();
  //   await toast.onWillDismiss()
  //   window.location.reload();
  // }

  componentDidLoad() {
    this.Database = new DatabaseService;
    this.Auth = new AuthService;

    this.defaultProps = {
      auth: this.Auth,
      db: this.Database
    };
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  closeMenu() {
    var ionMenu: HTMLIonMenuElement = document.querySelector('ion-menu');
    ionMenu.close();
  }

  render() {
    return (
      <ion-app>
        <ion-split-pane when="lg">
          <ion-menu content-id="app-content">
            <ion-content>
              <ion-list>
                <ion-item href="/apps">
                  <ion-icon name="md-grid" />
                  Apps
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-menu>
          <div main id="app-content">
            <ion-router id="router" useHash={false}>
              <ion-route url='/' component='app-home' componentProps={this.defaultProps} />
            </ion-router>
            <ion-nav swipeBackEnabled={false} main />
          </div>
        </ion-split-pane>
      </ion-app>
    );
  }
}
