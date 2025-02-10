import { Component, OnInit} from '@angular/core';
import { FaceSnap } from '../models/face-snaps';
import { FaceSnapsService } from '../services/face-snaps.service';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  // LowerCasePipe,
  NgClass, NgIf,
  NgStyle,
  PercentPipe,
  TitleCasePipe,
  // UpperCasePipe
} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './single-single-face-snap.component.html',
  styleUrl: './single-single-face-snap.component.scss'
})
export class SingleSingleFaceSnapComponent implements OnInit{
  // faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
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


  onLike(faceSnapId: number) {
    if (this.snapButtonText === 'Like') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'like').pipe(
        tap(() => this.snapButtonText = "Unlike"))
        this.alreadyLike = true
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unlike').pipe(
        tap(() => this.snapButtonText = "Like"))
        this.alreadyLike = false
    }
  }


  private prepareInterface() {
    this.snapButtonText = "Like";
    this.alreadyLike = false;
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId)
  }
}
