import { Component } from '@stencil/core';


@Component({
  tag: 'madness-header',
  styleUrl: 'madness-header.scss'
})
export class MadnessHeader {

  toggleMenu(event: UIEvent) {
    event.preventDefault();
    var ionMenu: HTMLIonMenuElement = document.querySelector('ion-menu');
    console.dir(ionMenu);
    ionMenu.toggle();
  }

  render() {
    return (
      <ion-header>
        <ion-toolbar color='primary'>
          <img onClick={this.toggleMenu.bind(this)} src="https://www.madnesslabs.net/img/madnesslabs-logo.png" />
          <b>Madness Labs</b>
        </ion-toolbar>
      </ion-header>
    );
  }
}