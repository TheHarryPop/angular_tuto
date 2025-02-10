import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {FaceSnap} from '../models/face-snaps';
import {map, tap} from 'rxjs/operators';
import {AsyncPipe, DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {FaceSnapsService} from '../services/face-snaps.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    TitleCasePipe,
    DatePipe,
    NgIf,
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})

//Implementation d'un formulaire réactif

export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;

  //On crée une variable pour observer le formulaire
  faceSnapPreview$!: Observable<FaceSnap>;

  //On crée une expression régulière pour tester la validité du format adresse mail
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private faceSnapService: FaceSnapsService,
              private router: Router) { }

  ngOnInit(): void {
    //On initialise la regex
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    //On déclare le formulaire ainsi que ses champs qui seront appelé unitairement dans le html
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null],
    }, {
      //Sert à déclencher l'observable seulement si on passe à un champ différent
      updateOn: 'blur'
      });

    //Gestion de l'observable en direct
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdAt: new Date(),
        id: 0,
        likes: 0
      }))
    );
  }

  // onSubmitForm(): void {
  //   this.faceSnapService.addFaceSnap(this.snapForm.value);
  //   this.router.navigateByUrl('/facesnaps');
  // }

  onSubmitForm(): void {
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe()
  }
}
