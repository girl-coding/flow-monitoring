import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeContentComponent } from './home-content/home-content.component';

@NgModule({
  declarations: [HomeComponent, HomeHeaderComponent, HomeContentComponent],
  imports: [HomeRoutingModule, SharedModule, COMPONENTS_MATERIALS],
})
export class HomeModule {}
