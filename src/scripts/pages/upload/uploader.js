class UploaderModel {
  constructor() {
    this.imageData = null;
  }

  setImageData(data) {
    this.imageData = data;
  }

  getImageData() {
    return this.imageData;
  }
}

export default UploaderModel;
