import {Injectable} from '@angular/core';
import {FaceSnap} from '../models/face-snaps';
import {SnapType} from '../models/snap-type.type';


@Injectable({providedIn : 'root'})
export class FaceSnapsService {
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

  getFaceSnaps(): FaceSnap[] {
    return [...this.faceSnaps];
  }

  getFaceSnapById(faceSnapId : string): FaceSnap {
    const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!foundFaceSnap) {
      throw new Error("FaceSnap not Found")
    }
    return foundFaceSnap;
  }

  snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
    const faceSnap = this.getFaceSnapById(faceSnapId)
    faceSnap.like(snapType);
  }
}
