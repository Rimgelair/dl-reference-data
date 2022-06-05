class Tag {
  id?: number;
  name: string;

  static fromJson(json: object) {
    return Object.assign(new Tag(), json);
  }
}

export default Tag;
