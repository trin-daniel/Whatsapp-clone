class Base64 {
  static getMimeType(urlBase64){
    const regex = /^data:(.+);base64,(.*)$/;
    const result = urlBase64.match(regex);
    console.log(result[1]);
    return result[1];
  }

  static toFile(urlBase64){
    const mimeType = Base64.getMimeType(urlBase64);
    const extension = mimeType.split('/')[1];
    const filename = `file-${Date.now()}.${extension}`;

    return fetch(urlBase64)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((buffer) => {
        return new File([buffer], filename, { type: mimeType });
      })
    }
  };

export default Base64;