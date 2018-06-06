import { Component, Prop } from '@stencil/core';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  @Prop() auth: AuthService;
  @Prop() config: ConfigService;

  componentDidLoad() {
   // ON LOAD
  }

  render() {
    return (
      <ion-content>
        Welcome Home! ^_^
      </ion-content>
    );
  }
}
