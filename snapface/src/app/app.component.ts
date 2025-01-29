import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {RouterOutlet} from '@angular/router';
import {filter, interval, of, Observable} from 'rxjs';
import {concatMap,mergeMap, delay, exhaustMap, map,switchMap, take, tap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
 /*
Explications notion "Observable"
Un observable est un évènement dans le code
L'élément qui va déclencher l'exécution de l'observable s'appelle "l'observable extérieur"
                                                                                        ______
Le déclenchement de cet observable est une souscription                                      |
L'élément est issu du déclenchement de cet observable est une émission                       | Observable intérieur
Quand l'exécution de l'observable est terminée, on dit que l'observable est complété    _____| (opérateur haut niveau)

Stratégie parallèle (-- mergeMap --) : Les observables intérieurs sont déclenchés en parallèle sans contrôler que le précédent soit terminé
Stratégie en série (-- concatMap --) : Les observables intérieurs sont déclenchés en série en contrôlant que le précédent soit terminé
Stratégie "ignorer" (-- exhaustMap --) : Les observables intérieurs ne prennent pas en compte les observables extérieurs tout pendant que l'actuel n'est pas terminé (ils seront ignorés)
Stratégie "annulation" (-- switchMap --) : Si un observable extérieur est déclenché pendant l'exécution d'un observable intérieur, l'observable en cours d'exécution sera annulé et un nouvel observable intérieur sera lancé
*/

export class AppComponent implements OnInit {

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit() {
    // @ts-ignore
    interval(500).pipe(
      take(10),
      // map permet de transformer les émissions d'un observable
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      // tap est un effet secondaire, il va interagir avec la valeur de l'observable mais sans la modifier
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(color => this.getTrainObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
    }

getTrainObservable$(color: 'rouge' | 'jaune') {
const isRedTrain = color === 'rouge';
isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
return of({ color, trainIndex }).pipe(
delay(isRedTrain ? 5000 : 6000)
);
}

translateColor(color: 'rouge' | 'jaune') {
return color === 'rouge' ? 'red' : 'yellow';
}
}
