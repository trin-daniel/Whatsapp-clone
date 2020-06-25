import path from "path";
import PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc = path.resolve(
  __dirname,
  "../../dist/pdf.worker.bundle.js"
);
class DocumentPreviewController {
  constructor(file) {
    this._file = file;
  }

  getPreviewData() {
    return new Promise((resolve, reject) => {
      let read = new FileReader();
      switch (this._file.type) {
        case "image/jpg":
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          read.onload = (event) => {
            resolve({
              src: read.result,
              info: this._file.name,
            });
          };
          read.onerror = (event) => {
            reject(event);
          };
          read.readAsDataURL(this._file);
          break;
 
        case "application/pdf":
          read.onload = (event) => {
            PDFJS.getDocument(new Uint8Array(read.result))
              .then((pdf) => {
                console.log(pdf);
                pdf
                  .getPage(1)
                  .then((page) => {
                    let viewport = page.getViewport(1);
                    let canvas = document.createElement("canvas");
                    let canvasContext = canvas.getContext("2d");

                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    page
                      .render({
                        canvasContext,
                        viewport,
                      })
                      .then(() => {
                        let pluralPages =
                          pdf.numPages === 1 ? "Pagina" : "Paginas";
                        resolve({
                          src: canvas.toDataURL("image/jpg"),
                          info: `${pdf.numPages} ${pluralPages}`,
                        });
                      })
                      .catch((err) => {
                        reject(err);
                      });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          };
          read.readAsArrayBuffer(this._file);
          break;
        default:
          reject();
      }
    });
  }
}

export default DocumentPreviewController;
