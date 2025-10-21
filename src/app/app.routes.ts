import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'room/:id',
    loadComponent: () => import('./components/chat-room/chat-room').then(m => m.ChatRoomComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  }
];