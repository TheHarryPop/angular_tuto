import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaceSnap} from '../models/face-snaps';
import {FaceSnapComponent} from '../face-snap/face-snap.component';
import {FaceSnapsService} from '../services/face-snaps.service';
import {interval, Subject, takeUntil} from 'rxjs';
import {take, tap} from 'rxjs/operators';

/*
Deux manières de détruire un observable pour éviter les fuites de mémoire :
  → Indiquer un nombre de retours autorisé avant la destruction → take()
  → Détruire l'observable à un moment donné (changement de page par exemple) → takeUntil()
*/


@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapsService) {}

  // Évènement qui concerne l'initialisation du composant (ouverture de la page)
  ngOnInit(): void {

    this.faceSnaps = this.faceSnapsService.getFaceSnaps()
    this.destroy$ = new Subject<boolean>();

    interval(1000).pipe(
      //take() va nous servir à contrôler le nombre d'émissions de l'observable pour éviter les fuites mémoire. L'observable est ensuite détruit
      // take(3),

      //takeUntil() va attendre ici la fermeture de la page pour compléter l'observable.
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }

  // Évènement qui concerne la destruction du composant (fermeture de la page)
  ngOnDestroy() {
    this.destroy$.next(true);
  }

}
