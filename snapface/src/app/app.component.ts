import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snaps';

@Component({
  selector: 'app-root',
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  faceSnaps!: FaceSnap[];

  ngOnInit(): void {

    this.faceSnaps = [
      new FaceSnap(
        "Bill Gates",
        "Best dev ever",
        "https://cdn.futura-sciences.com/cdn-cgi/image/width=1920,quality=60,format=auto/sources/images/scientist/persov6/Gates-1000.jpg",
        new Date(),
        100
      ),
      new FaceSnap(
        "Steve Jobs",
        "Best dev ever too",
        "https://m.media-amazon.com/images/I/81yP+dpbmeL._AC_UF1000,1000_QL80_.jpg",
        new Date(),
        202
      ),
      new FaceSnap(
        "Elon MUSK",
        "L'inventeur",
        "https://media.hachette.fr/fit-in/780x1280/imgArticle/FAYARD/2023/9782213722313-001-X.jpeg?source=web",
        new Date(),
        152
      )
    ]
    this.faceSnaps[1].setLocation('Dans le garage')
  }
}
