import CameraController from './CameraController';
import MicrophoneController from './MicrophoneController';
import DocumentPreviewController from './DocumentPreviewController';
import Firebase from '../utils/Firebase';
import Format from '../utils/Format';
import User from '../model/User';
import Chat from '../model/Chat';

class WhatsappController {
  constructor() {
    this._firebase = new Firebase();
    this.AuthenticateFirebase();
    this.PrototypeElements();
    // Antes chamado de loadElements;
    this.loadHTMLElements();
    this.initializeEvents();
  }

  AuthenticateFirebase() {
    this._firebase
      .AuthenticateFirebase()
      .then((response) => {
        console.log();
        this._user = new User(response.user.email);
        this._user.on('datachange', (data) => {
          document.querySelector('title').innerHTML =
            data.name + '-' + 'Whatsapp-clone';
          this.element.inputNamePanelEditProfile.innerHTML = data.name;
          if (data.photo) {
            let photo = this.element.imgPanelEditProfile;
            photo.src = data.photo;
            photo.show();
            this.element.imgDefaultPanelEditProfile.hide();

            let myphoto = this.element.myPhoto.querySelector('img');
            myphoto.src = data.photo;
            myphoto.show();
          }
        });

        this._user.name = response.user.displayName;
        this._user.email = response.user.email;
        this._user.photo = response.user.photoURL;

        this.initializeContacts();
        this._user
          .save()
          .then(() => {
            this.element.appContent.css({
              display: 'flex',
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  initializeContacts() {
    this._user.on('contactschange', (docs) => {
      this.element.contactsMessagesList.innerHTML = '';
      docs.forEach((doc) => {
        let div = document.createElement('div');
        let contact = doc.data();
        div.className = 'contact-item';
        div.innerHTML = `
        <div class="dIyEr">
            <div class="_1WliW" style="height: 49px; width: 49px;">
                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                <div class="_3ZW2E">
                    <span data-icon="default-user" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                            <g fill="#FFF">
                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="_3j7s9">
            <div class="_2FBdJ">
                <div class="_25Ooe">
                    <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                </div>
                <div class="_3Bxar">
                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                </div>
            </div>
            <div class="_1AwDx">
                <div class="_itDl">
                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                  <span class="_2_LEW last-message">
                    <div class="_1VfKB">
                        <span data-icon="status-dblcheck" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                            </svg>
                        </span>
                    </div>
                    <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                    <div class="_3Bxar">
                      <span>
                        <div class="_15G96">
                            <span class="OUeyt messages-count-new" style="display:none;">1</span>
                        </div>
                    </span>
                    </div>
                  </span>
                </div>
            </div>
        </div>
    `;
        if (contact.photo) {
          let img = div.querySelector('.photo');
          img.src = contact.photo;
          img.show();
        }
        div.on('click', (event) => {
          this.element.activeName.innerHTML = contact.name;
          this.element.activeStatus.innerHTML = contact.status;
          if (contact.photo) {
            let img = this.element.activePhoto;
            img.src = contact.photo;
            img.show();
          }
          this.element.home.hide();
          this.element.main.css({
            display: 'flex',
          });
        });
        this.element.contactsMessagesList.appendChild(div);
      });
    });
    this._user.getContacts();
  }

  initializeEvents() {
    this.element.myPhoto.on('click', (event) => {
      this.closeAllPanelsInLeft();
      this.element.panelEditProfile.show();
      setTimeout(() => {
        this.element.panelEditProfile.addClass('open');
      }, 200);
    });

    this.element.btnNewContact.on('click', (event) => {
      this.closeAllPanelsInLeft();
      this.element.panelAddContact.show();
      setTimeout(() => {
        this.element.panelAddContact.addClass('open');
      }, 200);
    });

    this.element.btnClosePanelAddContact.on('click', (event) => {
      this.element.panelAddContact.removeClass('open');
    });

    this.element.btnClosePanelEditProfile.on('click', (event) => {
      this.element.panelEditProfile.removeClass('open');
    });

    this.element.photoContainerEditProfile.on('click', (event) => {
      this.element.inputProfilePhoto.click();
    });

    this.element.inputNamePanelEditProfile.on('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.element.btnSavePanelEditProfile.click();
      }
    });

    this.element.btnSavePanelEditProfile.on('click', (event) => {
      this.element.btnSavePanelEditProfile.disabled = true;
      this._user.name = this.element.inputNamePanelEditProfile.innerHTML;
      this._user.save().then(() => {
        this.element.btnSavePanelEditProfile.disabled = false;
      });
    });

    this.element.formPanelAddContact.on('submit', (event) => {
      event.preventDefault();
      const form = new FormData(this.element.formPanelAddContact);
      const contact = new User(form.get('email'));

      contact.on('datachange', (data) => {

        if (data.name) {
          Chat.createIfNotExist(this._user.email, contact.email).then(chat =>{
          contact.chatId = chat.id;
          this._user.chatId = chat.id;
          contact.addContact(this._user);


          this._user.addContact(contact).then(() => {
            this.element.btnClosePanelAddContact.click();
            // console.info('Contato adicionado');
            })
          });
        } else {
          console.error('Usuario nao existe');
        }
      });
    });

    this.element.contactsMessagesList
      .querySelectorAll('.contact-item')
      .forEach((item) =>
        item.on('click', (event) => {
          this.element.home.hide();
          this.element.main.css({
            display: 'flex',
          });
        })
      );

    this.element.btnAttach.on('click', (event) => {
      event.stopPropagation();
      this.element.menuAttach.addClass('open');

      document.addEventListener('click', this.closeMenuAttach.bind(this));
    });

    this.element.btnAttachPhoto.on('click', (event) => {
      this.element.inputPhoto.click();
    });

    this.element.inputPhoto.on('change', (event) => {
      console.log(this.element.inputPhoto.files);
      [...this.element.inputPhoto.files].forEach((file) => {
        console.log(file);
      });
    });

    this.element.btnAttachCamera.on('click', (event) => {
      this.closeAllMainPanel();
      this.element.panelCamera.addClass('open');
      this.element.panelCamera.css({
        height: '100%',
      });
      this._Camera = new CameraController(this.element.videoCamera);
    });

    this.element.btnClosePanelCamera.on('click', (event) => {
      this.closeAllMainPanel();
      this.element.panelMessagesContainer.show();
      this._Camera.stopCamera();
    });

    this.element.btnTakePicture.on('click', (event) => {
      const dataURL = this._Camera.takePicture();
      this.element.pictureCamera.src = dataURL;
      this.element.pictureCamera.show();
      this.element.videoCamera.hide();
      this.element.btnReshootPanelCamera.show();
      this.element.containerTakePicture.hide();
      this.element.containerSendPicture.show();
      // console.log('take picture');
    });

    this.element.btnSendPicture.on('click', (event) => {
      console.log(this.element.pictureCamera.src);
    });

    this.element.btnReshootPanelCamera.on('click', (event) => {
      this.element.pictureCamera.hide();
      this.element.videoCamera.show();
      this.element.btnReshootPanelCamera.hide();
      this.element.containerTakePicture.show();
      this.element.containerSendPicture.hide();
    });

    this.element.btnAttachDocument.on('click', (event) => {
      this.closeAllMainPanel();
      this.element.panelDocumentPreview.addClass('open');
      this.element.panelDocumentPreview.css({
        height: '100%',
      });

      this.element.inputDocument.click();
    });

    this.element.inputDocument.on('change', (event) => {
      if (this.element.inputDocument.files.length) {
        this.element.panelDocumentPreview.css({
          height: '1%',
        });
        const file = this.element.inputDocument.files[0];
        this._documentPreviewController = new DocumentPreviewController(file);
        this._documentPreviewController
          .getPreviewData()

          .then((response) => {
            this.element.imgPanelDocumentPreview.src = response.src;
            this.element.infoPanelDocumentPreview.innerHTML = response.info;
            this.element.imagePanelDocumentPreview.show();
            this.element.filePanelDocumentPreview.hide();

            this.element.panelDocumentPreview.css({
              height: '100%',
            });
          })
          .catch((err) => {
            // console.log(file.type)
            switch (file.type) {
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              case 'application/msword':
                this.element.iconPanelDocumentPreview.className =
                  'jcxhw icon-doc-doc';
                break;
              case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
              case 'application/vnd.ms-excel':
              case 'text/csv':
                this.element.iconPanelDocumentPreview.className =
                  'jcxhw icon-doc-xls';
                break;
              case 'application/vnd.ms-powerpoint':
              case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                this.element.iconPanelDocumentPreview.className =
                  'jcxhw icon-doc-ppt';
                break;
              default:
                this.element.iconPanelDocumentPreview.className =
                  'jcxhw icon-doc-generic';
            }
            this.element.filenamePanelDocumentPreview.innerHTML = file.name;
            this.element.imagePanelDocumentPreview.hide();
            this.element.filePanelDocumentPreview.show();
          });
      }
    });

    this.element.btnSendDocument.on('click', (event) => {
      console.log('send-document');
    });

    this.element.btnClosePanelDocumentPreview.on('click', (event) => {
      this.closeAllMainPanel();
      this.element.panelMessagesContainer.show();
    });

    this.element.btnAttachContact.on('click', (event) => {
      this.element.modalContacts.show();
    });

    this.element.btnCloseModalContacts.on('click', (event) => {
      this.element.modalContacts.hide();
    });
    /// Eventos de Microfone.
    this.element.btnSendMicrophone.on('click', (event) => {
      this.element.recordMicrophone.show();
      this.element.btnSendMicrophone.hide();

      this._microphoneController = new MicrophoneController();
      this._microphoneController.on('ready', (audio) => {
        this._microphoneController.startRecord();
      });
      this._microphoneController.on('recordTimer', (timer) => {
        this.element.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
      });
    });

    this.element.btnCancelMicrophone.on('click', (event) => {
      this._microphoneController.stopRecord();
      this.closeRecordMicrophone();
    });

    this.element.btnFinishMicrophone.on('click', (event) => {
      this._microphoneController.stopRecord();
      this.closeRecordMicrophone();
    });
    // Eventos de campo de mensagem.
    this.element.inputText.on('keypress', (event) => {
      if (event.key === 'Enter' && !event.ctrlKey) {
        event.preventDefault();
        this.element.btnSend.click();
      }
    });

    this.element.inputText.on('keyup', (event) => {
      if (this.element.inputText.innerHTML.length) {
        this.element.inputPlaceholder.hide();
        this.element.btnSendMicrophone.hide();
        this.element.btnSend.show();
      } else {
        this.element.inputPlaceholder.show();
        this.element.btnSendMicrophone.show();
        this.element.btnSend.hide();
      }
    });

    this.element.btnSend.on('click', (event) => {
      console.log(this.element.inputText.innerHTML);
    });

    this.element.btnEmojis.on('click', (event) => {
      this.element.panelEmojis.toggleClass('open');
    });

    this.element.panelEmojis.querySelectorAll('.emojik').forEach((emoji) => {
      emoji.on('click', (event) => {
        console.log(emoji.dataset.unicode);
        let images = this.element.imgEmojiDefault.cloneNode();
        images.style.cssText = emoji.style.cssText;
        images.dataset.unicode = emoji.dataset.unicode;
        images.alt = emoji.dataset.unicode;

        emoji.classList.forEach((name) => {
          // pode causar erros, se ocorrer, substitua-o por .classList.add(name);
          images.addClass(name);
        });
        let cursor = window.getSelection();
        if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
          this.element.inputText.focus();
          cursor = window.getSelection();
        }
        let range = document.createRange();
        range = cursor.getRangeAt(0);
        range.deleteContents();

        let fragment = document.createDocumentFragment();
        fragment.append(images);
        range.insertNode(fragment);
        range.setStartAfter(images);

        this.element.inputText.dispatchEvent(new Event('keyup'));
      });
    });
  }

  closeRecordMicrophone() {
    this.element.recordMicrophone.hide();
    this.element.btnSendMicrophone.show();
  }

  closeAllMainPanel() {
    this.element.panelMessagesContainer.hide();
    this.element.panelDocumentPreview.removeClass('open');
    this.element.panelCamera.removeClass('open');
  }

  closeMenuAttach(event) {
    document.removeEventListener('click', this.closeMenuAttach);
    this.element.menuAttach.removeClass('open');
  }

  closeAllPanelsInLeft() {
    this.element.panelAddContact.hide();
    this.element.panelEditProfile.hide();
  }

  PrototypeElements() {
    Element.prototype.hide = function () {
      this.style.display = 'none';
      return this;
    };

    Element.prototype.show = function () {
      this.style.display = 'block';
      return this;
    };

    Element.prototype.toggle = function () {
      this.style.display = this.style.display === 'none' ? 'block' : 'none';
      return this;
    };

    Element.prototype.on = function (events, fn) {
      events.split(' ').forEach((event) => {
        this.addEventListener(event, fn);
      });
      return this;
    };

    Element.prototype.css = function (styles) {
      for (let name in styles) {
        this.style[name] = styles[name];
      }
      return this;
    };

    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    };

    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    };

    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    };

    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    };

    HTMLFormElement.prototype.toJSON = function () {
      const json = {};
      this.getForm().forEach((value, key) => {
        json[key] = value;
      });
      return json;
    };
  }

  loadHTMLElements() {
    this.element = {};
    document.querySelectorAll('[id]').forEach((element) => {
      this.element[Format.ConvertToCamelCase(element.id)] = element;
    });
  }
}

export default WhatsappController;
