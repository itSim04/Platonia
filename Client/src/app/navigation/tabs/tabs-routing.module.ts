import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../../pages/browsing/feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../pages/browsing/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../../pages/browsing/post/post.module').then(m => m.PostPageModule)
      },
      {
        path: 'messaging',
        loadChildren: () => import('../../pages/browsing/messaging/messaging.module').then( m => m.MessagingPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/browsing/profile/profile.module').then(m => m.ProfilePageModule)
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
