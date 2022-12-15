import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorGuard } from 'src/app/guards/browsing/authenticator.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../../pages/browsing/feed/feed.module').then(m => m.FeedPageModule),
        canActivate: [AuthenticatorGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('../../pages/browsing/search/search.module').then(m => m.SearchPageModule),
        canActivate: [AuthenticatorGuard]
      },
      {
        path: 'post',
        loadChildren: () => import('../../pages/browsing/post/post.module').then(m => m.PostPageModule),
        canActivate: [AuthenticatorGuard]
      },
      {
        path: 'messaging',
        loadChildren: () => import('../../pages/browsing/messaging/messaging.module').then(m => m.MessagingPageModule),
        canActivate: [AuthenticatorGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/browsing/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthenticatorGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/profile/',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
