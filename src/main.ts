// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()] // Updated way to provide HttpClient
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ViewComponent } from './app/view/view.component';
import { provideHttpClient } from '@angular/common/http'; 
import { AddComponent } from './app/add/add.component';
import { EditComponent } from './app/edit/edit.component';



bootstrapApplication(AppComponent, {
  providers: [provideRouter([
    { path: '', component: ViewComponent },
    { path: 'view', component: ViewComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: EditComponent }
  ]),
  provideHttpClient() 
]
}).catch(err => console.error(err));
