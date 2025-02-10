import {Component, Injectable} from '@angular/core';
import {FaceSnap} from '../models/face-snaps';
import {SnapType} from '../models/snap-type.type';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {FaceSnapListComponent} from '../face-snap-list/face-snap-list.component';
import {map} from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  private faceSnaps: FaceSnap[] = [
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
    ),
    new FaceSnap(
      "jean-michel jarre",
      "L'oreille",
      "https://clairetobscur.fr/wp-content/uploads/2014/12/Jarre-Studio.jpg",
      new Date(),
      555
    ).withLocation('dans son garage')
  ];

  // Utilisé avant avec les infos en dur au dessus
  // getFaceSnaps(): FaceSnap[] {
  //   return [...this.faceSnaps];
  // }

  // Utilisé pour récupérer les infos via une url
  getFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  // getFaceSnapById(faceSnapId : string): FaceSnap {
    // const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    // if (!foundFaceSnap) {
    //   throw new Error("FaceSnap not Found")
    // }
    // return foundFaceSnap;
  // }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  // snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
  //   const faceSnap = this.getFaceSnapById(faceSnapId)
  //   faceSnap.like(snapType);
  // }

  snapFaceSnapById(faceSnapId: number, snapType: SnapType): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        likes: faceSnap.likes + (snapType === 'like'? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap)
      )
    );
  }

  // //Ajout d'un service pour créer un snap via un formulaire
  // addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?:string}): void {
  //   const faceSnap : FaceSnap = {
  //     addLike(): void {
  //     }, like(snapType: SnapType): void {
  //     }, removeLike(): void {
  //     }, setLocation(location: string): void {
  //     }, withLocation(location: string): FaceSnap {
  //       this.location = location;
  //       return this
  //     },
  //     ...formValue,
  //     createdAt: new Date(),
  //     likes: 0,
  //     id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
  //   };
  //   this.faceSnaps.push(faceSnap);
  // }
  //

  addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?:string}): Observable<FaceSnap> {
    // @ts-ignore
    return this.getFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map(previousFacesnap => ({
        ...formValue,
        likes:0,
        createdAt: new Date(),
        id: previousFacesnap.id + 1
      })),
      switchMap(newFacesnap => this.http.post(`http://localhost:3000/facesnaps/`, newFacesnap))
    );

  };
}
