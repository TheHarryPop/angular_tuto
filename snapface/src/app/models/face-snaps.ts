import {SnapType} from './snap-type.type';

export class FaceSnap {

  location?: string;
  id!: number;

  constructor(public title: string,
              public description: string,
              public imageUrl: string,
              public createdAt: Date,
              public likes: number) {
    // this.id = crypto.randomUUID().substring(0, 8);
  }

  addLike() {
    this.likes++;
  }

  removeLike() {
    this.likes--;
  }

  like(snapType : SnapType) {
    if (snapType === "like") {
      this.addLike()
    } else if (snapType === "unlike") {
      this.removeLike()
    }
  }

  setLocation(location: string) {
    this.location = location;
  }

  withLocation(location: string): FaceSnap {
    this.setLocation(location);
    return this;
  }
}
