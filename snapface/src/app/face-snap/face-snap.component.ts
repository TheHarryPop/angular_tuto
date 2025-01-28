import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snaps';
import { FaceSnapsService } from '../services/face-snaps.service';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  // LowerCasePipe,
  NgClass,
  NgStyle,
  PercentPipe,
  TitleCasePipe,
  // UpperCasePipe
} from '@angular/common';

@Component({
  selector: 'app-face-snap',
  imports: [
    NgStyle,
    NgClass,
    // UpperCasePipe,
    // LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{
  @Input() faceSnap !: FaceSnap;

  snapButtonText!: string;
  alreadyLike!: boolean;
  myLargeNumber: number = 45581445647.7656;
  myPourcent: number = 0.3367;
  myPrice: number = 336.75;

  constructor(private faceSnapsService: FaceSnapsService) {
  }

  ngOnInit(): void{
    this.snapButtonText = "Like";
    this.alreadyLike = false;
  }

  onLike() {
    if (this.alreadyLike) {
      this.unLike();
    } else {
      this.Like();
    }
  }

  Like() {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'like')
      this.alreadyLike = true;
      this.snapButtonText = "Unlike";
    }

  unLike() {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unlike')
    this.alreadyLike = false;
      this.snapButtonText = "Like";
    }

  protected readonly FaceSnap = FaceSnap;
}
