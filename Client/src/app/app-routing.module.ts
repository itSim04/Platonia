import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./navigation/folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/outline/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/outline/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'friend-list',
    loadChildren: () => import('./pages/browsing/friend-list/friend-list.module').then(m => m.FriendListPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/outline/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./navigation/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/browsing/search/search.module').then( m => m.SearchPageModule)
  },  {
    path: 'chats',
    loadChildren: () => import('./pages/browsing/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./pages/browsing/meeting/meeting.module').then( m => m.MeetingPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
