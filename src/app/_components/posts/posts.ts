import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../_services/post';

@Component({
  selector: 'app-posts',
  standalone: true, // Recommandé pour les versions récentes
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  private http = inject(HttpClient);
  protected postService = inject(PostService);
  loadPosts() {
    console.log("Loading posts...");
    this.postService.getPosts().subscribe({
      error: (error) => {
        console.error("Error loading posts:", error);
      }
    });
  }
}
