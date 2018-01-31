import { Component, Prop, State, Listen } from '@stencil/core';


@Component({
  tag: 'app-apps',
  styleUrl: 'app-apps.scss'
})
export class AppApps {

  @State() apps: {
    icon: string,
    title: string,
    description: string
  }[];

  @Listen('mlIconClick')
  iconClicked(event) {
    console.log(event);
    alert('wee');
  }

  componentWillLoad() {
    this.apps = [
      {
        icon: "https://www.madnesslabs.net/img/referAFloodIcon.png",
        title: "Refer A Flood",
        description: "This is the referral app for The Flood Team water remediation company"
      },
      {
        icon: "https://www.madnesslabs.net/img/transitionMethodsLogo.png",
        title: "Transition Methods",
        description: "Transitions Recruiting is an experienced team offering staffing services for a variety of disciplines and industries from key technical talent to C-level candidates. They tailor services to your needs offering retained, contingent, and contract plans."
      }
    ];
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
        </ion-content>
      </ion-page>
    );
  }
}