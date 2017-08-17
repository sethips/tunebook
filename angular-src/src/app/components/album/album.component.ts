import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../Artist';
import { Album } from '../../Album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Album[];

  constructor(
    private spotifyService:SpotifyService,
    private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotifyService.getToken()
          .subscribe(data => {
            this.spotifyService.getAlbum(id, data.access_token)
              .subscribe(album => {
                this.album = album;
              })
          })
      })
  }

}