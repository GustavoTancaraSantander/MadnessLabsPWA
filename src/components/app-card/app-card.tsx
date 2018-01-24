import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'app-card',
  styleUrl: 'app-card.scss'
})
export class AppCard {

  @Event() mlIconClick: EventEmitter;

  @Prop() app: {
    icon: string,
    title: string,
    description: string
  };

  @State() iconClass: string;

  spinIcon(event) {
    this.mlIconClick.emit({
      event
    });
    this.iconClass = 'spin';
    setTimeout(() => {
      this.iconClass = '';
    }, 1000);
  }

  render() {
    return (
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col col-12 col-md-4>
              <img src={this.app.icon} class={this.iconClass} onClick={(event: UIEvent) => this.spinIcon(event)} />
            </ion-col>
            <ion-col col-12 col-md-8>
              <h2>{this.app.title}</h2>
              <p>{this.app.description}</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    );
  }
}