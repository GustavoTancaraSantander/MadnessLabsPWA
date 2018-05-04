import '@ionic/core';
import 'madnesscast';

import { Component, Prop, Listen, State } from '@stencil/core';
import { OverlayController } from '@ionic/core';

import { DatabaseService } from '../../services/Database';
import { AuthService } from '../../services/Auth';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  Database: DatabaseService;
  Auth: AuthService;

  @State() defaultProps: {
    auth?: AuthService,
    db?: DatabaseService
  };

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: OverlayController;

  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast:any = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss()
    window.location.reload();
  }

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
              <ion-route url='/apps' component='app-apps' componentProps={this.defaultProps} />
              <ion-route url='/profile/:username' component='app-profile' componentProps={this.defaultProps} />
            </ion-router>
            <ion-nav swipeBackEnabled={false} main></ion-nav>
          </div>
        </ion-split-pane>
      </ion-app>
    );
  }
}
