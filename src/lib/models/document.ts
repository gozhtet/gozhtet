export class Document {
  id: string;
  name: string;
  content?: string;
  children?: Document[];

  constructor(name: string, content: string, children?: Document[]) {
    this.name = name;
    this.content = content;
    this.children = children;
  }
}
