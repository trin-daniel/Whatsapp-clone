import Model from './Model';
import firebase from '../utils/Firebase';

class Chat extends Model {
  constructor(){
    super();
  }

  get users(){this._data.users};
  set users(value){this._data.users = value};

  get timestamp(){this._data.timestamp};
  set timestamp(value){this._data.timestamp = value};

  static getRef(){
    return firebase.database().collection('/chats')
  }
  static create(myEmail, contactEmail){
    return new Promise((resolve, reject) =>{
      const users = {};
      // pode ocorrer erros devido ao valor constante do obejeto users.
      users[btoa(myEmail)] =  true,
      users[btoa(contactEmail)] = true;
      Chat.getRef().add({
        users,
        timestamp: new Date(),
      })
      .then(doc =>{
        Chat.getRef().doc(doc.id).get().then(chat=>{
          resolve(chat);
        })
      .catch(err =>{
        reject(err);
        })
      })
      .catch(err =>{
        reject(err);
      })
    });
  }

  static find(myEmail, contactEmail){
    return Chat.getRef()
    .where(btoa(myEmail), '==', true)
    .where(btoa(contactEmail), '==', true)
    .get();
  }

  static createIfNotExist(myEmail, contactEmail){
    return new Promise((resolve, reject)=>{
      Chat.find(myEmail, contactEmail).then(chats =>{
        if(chats.empty){
          Chat.create(myEmail, contactEmail)
          .then(chat =>{
            resolve(chat);
          })
        }else{
          chats.forEach(chat =>{
            resolve(chat);
          });
        }
      })
      .catch(err =>{
        reject(err);
      })
    })
  }
}

export default Chat;