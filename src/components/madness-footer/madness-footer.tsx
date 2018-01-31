import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'madness-footer',
  styleUrl: 'madness-footer.scss'
})
export class MadnessFooter {

  @Prop() networks: {
    link: string,
    icon: string
  }[];

  render() {
    return (
      <footer>
        <div class="social-icons">
          {this.networks.map((network) =>
            <a href={network.link}>
              <ion-icon name={network.icon}></ion-icon>
            </a>
          )}
        </div>
      </footer>
    );
  }
}