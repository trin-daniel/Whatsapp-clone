import ClassEvent from "../utils/ClassEvent";

class MicrophoneController extends ClassEvent {
  constructor(){
    super();
    this._available = false;
    this._mimeType = 'audio/webm';
    navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    .then(stream =>{
      this._available = true;
      this._stream = stream;

      this.trigger('ready', this._stream);
    })
    .catch(err=>{
      console.error(err);
    })
  };

  stop(){
    this._stream.getTracks().forEach(track =>{
      track.stop();
    })
  };

  startRecord(){
    if(this._available === true){
      this._mediaRecorder = new MediaRecorder(this._stream, {
        mimeType: this._mimeType,
      });
      this._recordedChunks = [];
      this._mediaRecorder.addEventListener('dataavailable', event =>{
        if(event.data.size > 0){
          this._recordedChunks.push(event.data);
        }
      });

      this._mediaRecorder.addEventListener("stop", (event) => {
        const blob = new Blob(this._recordedChunks, {
          type: this._mimeType,
        });
        const filename = `rec${Date.now()}.webm`;
        const audioContext = new AudioContext();
        const reader = new FileReader();
        reader.onload = (event) => {
          audioContext.decodeAudioData(reader.result).then((decode) => {
            const file = new File([blob], filename, {
              type: this._mimeType,
              lastModified: Date.now(),
            });
            this.trigger('recorded', file, decode)
          });
        };
        reader.readAsArrayBuffer(blob);
      });
      this._mediaRecorder.start();
      this.startTimer();
    }
  };

  stopRecord(){
    if(this._available === true){
      this._mediaRecorder.stop();
      this.stop();
      this.stopTimer();
    }
  };

  startTimer(){
    const hourCurrent = Date.now();
    this._recordMicrophoneInterval = setInterval(()=>{
      this.trigger('recordTimer', (Date.now() - hourCurrent));
    }, 100);
  };

  stopTimer(){
    clearInterval(this._recordMicrophoneInterval);
  }

}

export default MicrophoneController;