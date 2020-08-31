import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'my-posts', component: MyPostsComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }