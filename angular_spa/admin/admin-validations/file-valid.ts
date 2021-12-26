
export class FileValidator{
  static checkExtension(fileType:string): boolean{
    switch(fileType.trim().toLowerCase()){
      case "image/jpg":
        return true;
      case "image/jpeg":
        return true;
      case "image/png":
        return true;
      default:
        return false;
    };
  }
}
