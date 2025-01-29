import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snaps';
import {TitleCasePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-face-snap',
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent {
  @Input() faceSnap !: FaceSnap;

  constructor(private router: Router) {
  }

  onViewFaceSnap(): void {
    void this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
  }
}
