import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { RootRoutesEnum } from './core';
import { HomeModule } from './modules/home/home.module';
import { ChartsModule } from './modules/charts/charts.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RootRoutesEnum.HOME,
        loadChildren: () =>
          import(
            `./modules/${RootRoutesEnum.HOME}/${RootRoutesEnum.HOME}.module`
          ).then(() => HomeModule),
      },
      {
        path: RootRoutesEnum.CHARTS,
        loadChildren: () =>
          import(
            `./modules/${RootRoutesEnum.CHARTS}/${RootRoutesEnum.CHARTS}.module`
          ).then(() => ChartsModule),
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
