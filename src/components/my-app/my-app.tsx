import '@ionic/core';
import '@stencil/core';

import { Component, Prop, Listen, State } from '@stencil/core';
import { ToastController } from '@ionic/core';

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
    auth: AuthService,
    db: DatabaseService
  };

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentDidLoad() {
    this.Database = new DatabaseService;
    this.Auth = new AuthService;

    this.defaultProps = {
      auth: this.Auth,
      db: this.Database
    };

    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a 
      new version available. When they click the
      reload button it then reloads the page 
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        toast.present();
      });
    })
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
                <ion-item icon-left href="/apps" onClick={this.closeMenu.bind(this)}>
                  <ion-icon name="md-" />
                  Apps
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-menu>
          <div main id="app-content">
            <ion-router id="router" useHash={false}>
              <ion-route url='/' component='app-home' componentProps={this.defaultProps} />
              <ion-route url='/apps' component='app-apps' componentProps={this.defaultProps} />
              <ion-route url='/profile/:name' component='app-profile' componentProps={this.defaultProps} />
              <ion-nav></ion-nav>
            </ion-router>
          </div>
        </ion-split-pane>
      </ion-app>
    );
  }
}
