import { Component, State, Element } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Element() appHomeEl: HTMLAppHomeElement;

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

  login(event, _type: string = 'email') {
    event.preventDefault();
    const emailInputEl: HTMLInputElement = this.appHomeEl.querySelector('#email-input input');
    const passwordInputEl: HTMLInputElement = this.appHomeEl.querySelector('#password-input input');

    console.dir(emailInputEl);
    console.dir(passwordInputEl);
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <img src="https://www.madnesslabs.net/img/madnesslabs-logo.png" />
          <b>Madness Labs</b>
        </ion-header>

        <ion-content>
          <ion-card>
            <form onSubmit={(event) => this.login(event)}>
              <ion-item>
                <ion-input placeholder="Email Address" id="email-input" />
              </ion-item>
              <ion-item>
                <ion-input type="password" placeholder="Password" id="password-input" />
              </ion-item>
              <ion-button type="submit">Login</ion-button>
            </form>
          </ion-card>
          <ion-grid>
            <ion-row>
              <ion-col>
                <stencil-route-link url='/apps'>
                  <div class="bubble apps">
                    <ion-icon name="phone-portrait"></ion-icon>
                    <p>Apps</p>
                  </div>
                </stencil-route-link>
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
        <madness-footer></madness-footer>
      </ion-page>
    );
  }
}
