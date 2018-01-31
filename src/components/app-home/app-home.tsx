import { Component, State } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() networks: {
    link: string,
    icon: string
  }[];

  componentWillLoad() {
    this.networks = [
      {
        link: 'https://twitter.com/MadnessLabs',
        icon: 'logo-twitter'
      },
      {
        link: 'https://facebook.com/MadnessLabs',
        icon: 'logo-facebook'
      },
      {
        link: 'https://youtube.com/MadnessLabs',
        icon: 'logo-youtube'
      },
      {
        link: 'https://github.com/MadnessLabs',
        icon: 'logo-github'
      }
    ];
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <img src="https://www.madnesslabs.net/img/madnesslabs-logo.png" />
          <b>Madness Labs</b>
        </ion-header>

        <ion-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <div class="bubble apps">
                  <ion-icon name="phone-portrait"></ion-icon>
                  <p>Apps</p>
                </div>
              </ion-col>
              <ion-col>
                <div class="bubble services">
                  <ion-icon name="ios-build"></ion-icon>
                  <p>Services</p>
                </div>
              </ion-col>
              <ion-col>
                <div class="bubble about">
                  <ion-icon name="ios-information"></ion-icon>
                  <p>About</p>
                </div>
              </ion-col>
              <ion-col>
                <div class="bubble swag">
                  <ion-icon name="ios-bowtie"></ion-icon>
                  <p>Swag</p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-content>
        <madness-footer networks={this.networks}></madness-footer>
      </ion-page>
    );
  }
}
