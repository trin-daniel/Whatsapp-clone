class CameraController{
  constructor(videoCamera){
    this._videoCamera = videoCamera;

    navigator.mediaDevices.getUserMedia({
      video: true,
    }).then(stream =>{
      this._stream = stream;
      this._videoCamera.srcObject = stream;
      this._videoCamera.play();
    }).catch(err=>{
      console.error(err);
    })
  }
  stopCamera(){
    this._stream.getTracks().forEach(track =>{
      track.stop();
    })
  }

  takePicture(mimetype = 'image/jpg'){
    const canvas =  document.createElement('canvas');
    canvas.setAttribute('width', this._videoCamera.videoWidth);
    canvas.setAttribute('height', this._videoCamera.videoHeight);

    const context = canvas.getContext('2d');
    context.drawImage(this._videoCamera, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(mimetype);
  }
}

export default CameraController;