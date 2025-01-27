export class FaceSnap {

  location?: string;

  constructor(public title: string,
              public description: string,
              public imageUrl: string,
              public createdAt: Date,
              public likes: number) {}

  addLike() {
    this.likes++;
  }

  removeLike() {
    this.likes--;
  }

  setLocation(location: string) {
    this.location = location;
  }
}
