import { Component, State, Listen, Element } from '@stencil/core';

import { AppService } from '../../services/App';

@Component({
  tag: 'app-apps',
  styleUrl: 'app-apps.scss'
})
export class AppApps {

  @Element() appsPageEl: HTMLElement;

  @State() apps: {
    icon: string,
    title: string,
    description: string
  }[] = [];

  App: AppService = new AppService;


  @Listen('mlIconClick')
  iconClicked(event) {
    console.log(event);
    alert('wee');
  }

  componentWillLoad() {
    this.getApps();
  }

  getApps() {
    this.App.all().then((apps: any) => {
      this.apps = apps;
    });
  }

  onSubmit(event) {
    event.preventDefault();

    var nameFieldEl: HTMLInputElement = this.appsPageEl.querySelector('input[name="name"]');
    var iconFieldEl: HTMLInputElement = this.appsPageEl.querySelector('input[name="icon"]');
    var descriptionFieldEl: HTMLInputElement = this.appsPageEl.querySelector('input[name="description"]');

    var newApp: any = {
      icon: iconFieldEl.value,
      title: nameFieldEl.value,
      description: descriptionFieldEl.value
    };

    this.App.add(newApp).then(() => {
      this.getApps();
    });
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar color='primary'>
            <ion-title>Apps</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-grid>
            <ion-row>
              {this.apps.map(app =>
                <ion-col col-12 col-sm-6>
                  <app-card app={app} />
                </ion-col>
              )}
            </ion-row>
          </ion-grid>
          <form onSubmit={(event: UIEvent) => this.onSubmit(event)}>
            <ion-card>
              <ion-item>
                <ion-input name="name" placeholder="Name" />
              </ion-item>
              <ion-item>
                <ion-input name="icon" placeholder="Icon" />
              </ion-item>
              <ion-item>
                <ion-input name="description" placeholder="Description" />
              </ion-item>
              <button type="submit">Submit</button>
            </ion-card>
          </form>
        </ion-content>
      </ion-page>
    );
  }
}