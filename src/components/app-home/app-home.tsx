import { Component, State, Element, Prop } from '@stencil/core';
import { ModalController } from '@ionic/core';

import { AuthService } from '../../services/Auth';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Element() appHomeEl: HTMLAppHomeElement;

  @Prop() auth: AuthService;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: ModalController;

  @State() networks: {
    link: string,
    icon: string
  }[];

  @State() session: any;
  @State() modal: any;

  componentDidLoad() {
    // this.modalCtrl.create({
    //   component: 'madness-cast-rater'
    // }).then((modal) => {
    //   this.modal = modal;
    //   this.modal.present();
    // }).catch((error) => {
    //   console.error(error.message);
    // });

    // setTimeout(() => {
    //   this.auth.onAuthChanged((data) => {
    //     this.session = data;
    //   });
    // }, 100);

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

  login(event, type: string = 'email') {
    event.preventDefault();
    const emailInputEl: HTMLInputElement = this.appHomeEl.querySelector('#email-input input');
    const passwordInputEl: HTMLInputElement = this.appHomeEl.querySelector('#password-input input');

    if (type === 'email') {
      this.auth.withEmail(emailInputEl.value, passwordInputEl.value).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.error(error.message);
      });
    } else {
      this.auth.withSocial(type).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.error(error.message);
      });
    }
  }

  logout() {
    this.auth.logout();
  }

  register(event) {
    event.preventDefault();
    const emailInputEl: HTMLInputElement = this.appHomeEl.querySelector('#email-register-input input');
    const passwordInputEl: HTMLInputElement = this.appHomeEl.querySelector('#password-register-input input');

    this.auth.createUser(emailInputEl.value, passwordInputEl.value).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error.message);
    });
  }

  renderLoginCard() {
    return (
      <ion-card class="login-card">
        <form onSubmit={(event) => this.login(event)}>
          <h2>Login</h2>
          <ion-item>
            <ion-input placeholder="Email Address" id="email-input" />
          </ion-item>
          <ion-item>
            <ion-input type="password" placeholder="Password" id="password-input" />
          </ion-item>
          <ion-button type="submit">Login</ion-button>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-icon name="logo-facebook" onClick={(event: UIEvent) => this.login(event, 'facebook')} />
              </ion-col>
              <ion-col>
                <ion-icon name="logo-google" onClick={(event: UIEvent) => this.login(event, 'google')} />
              </ion-col>
            </ion-row>
          </ion-grid>
        </form>
      </ion-card>
    );
  }

  renderRegisterCard() {
    return (
      <ion-card>
        <form onSubmit={(event) => this.register(event)}>
          <h2>Register</h2>
          <ion-item>
            <ion-input placeholder="Email Address" id="email-register-input" />
          </ion-item>
          <ion-item>
            <ion-input type="password" placeholder="Password" id="password-register-input" />
          </ion-item>
          <ion-button type="submit">Register</ion-button>
        </form>
      </ion-card>
    );
  }

  render() {
    return (
      <ion-page>
        <madness-header />

        <ion-content>
          {this.session ? <ion-button onClick={this.logout.bind(this)}>Logout</ion-button> : this.renderLoginCard()}
          {this.session ? null : this.renderRegisterCard()}
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
