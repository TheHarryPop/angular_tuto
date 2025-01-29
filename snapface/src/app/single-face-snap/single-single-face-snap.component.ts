import { Component, OnInit} from '@angular/core';
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
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  imports: [
    NgStyle,
    NgClass,
    // UpperCasePipe,
    // LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './single-single-face-snap.component.html',
  styleUrl: './single-single-face-snap.component.scss'
})
export class SingleSingleFaceSnapComponent implements OnInit{
  faceSnap !: FaceSnap;
  snapButtonText!: string;
  alreadyLike!: boolean;
  myLargeNumber: number = 45581445647.7656;
  myPourcent: number = 0.3367;
  myPrice: number = 336.75;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.prepareInterface()
    this.getFaceSnap()
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

  private prepareInterface() {
    this.snapButtonText = "Like";
    this.alreadyLike = false;
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId)
  }
}
