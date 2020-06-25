import FireBase from './Firebase';

class Upload {

  static send(file, from ){
    return new Promise((resolve, reject) => {
      const uploadFile = FireBase.disk()
        .ref(from)
        .child(`${Date.now()}-${file.name}`)
        .put(file);
      uploadFile.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },
        () => {
          uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
}

export default Upload;