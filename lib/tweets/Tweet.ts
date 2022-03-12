export class Tweet {
  id?: string;
  content: string;
  likes?: number;
  createdAt?: Date;

  constructor(content: string) {
    this.content = content;
  }
}
