import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
  {path : 'Usuario/:userName' , 
  component: PhotoListComponent,
  resolve:{
    photos:PhotoListResolver
}},
  {path: 'Nica',component:PhotoFormComponent},
  {path: '**',component:NotFoundComponent},
];

@NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
})
export class AppRoutingModule{}
