import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  

  constructor(public platform: Platform, private router: Router, private http: HttpClient ) { }




  // addListeners() {

  //   PushNotifications.addListener('registration',
  //     (token: Token) => {
  //       console.log('Push registration success, token: ' + token.value);
  //     }
  //   );

  //   PushNotifications.addListener('registrationError',
  //     (error: any) => {
  //       console.log('Error on registration: ' + JSON.stringify(error));
  //     }
  //   );
    
  //   PushNotifications.addListener('pushNotificationReceived',
  //     (notification: PushNotificationSchema) => {
  //       console.log('Push received: ' + JSON.stringify(notification));

  //       LocalNotifications.schedule({
  //         notifications: [{
  //           title: notification.title,
  //           body: notification.body,
  //           id: 1,
  //           extra: {
  //             data: notification.data
  //           }
  //         }]
  //       });

  //     }
  //   );
    
  //   PushNotifications.addListener('pushNotificationActionPerformed',
  //     (notification: ActionPerformed) => {
  //       console.log('Push action performed: ' + JSON.stringify(notification));
  //     }
  //   );

  //   LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
  //     console.log('Push action performed: ' + JSON.stringify(notification));
  // });

  // }
}
