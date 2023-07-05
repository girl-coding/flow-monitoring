import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { RootRoutesEnum } from './core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RootRoutesEnum.HOME,
        loadChildren: () =>
          import(
            `./modules/${RootRoutesEnum.HOME}/${RootRoutesEnum.HOME}.module`
          ).then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: RootRoutesEnum.DEFAULT_ROUTE,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
