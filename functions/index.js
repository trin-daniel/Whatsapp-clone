const functions = require('firebase-functions');
const admin = require('firebase-admin');

// ************ Função para Base64 em String (encode e decode) *************//


// ***************************** FIM ********************************//

admin.initializeApp(functions.config().firebase);

// Para usar o banco de dados do FireStore
const db = admin.firestore();

exports.saveLastMessage = functions.firestore.document('/chats/{chatId}/messages/{messageId}').onCreate((change, context) => {

    let chatId = context.params.chatId;
    let messageId = context.params.messageId;

    console.log('[CHAT ID]', chatId)
    console.log('[MESSAGE ID]', messageId)

    return new Promise((resolve, reject) => {

        
        // Carregando os documentos
        let chatRef = db.collection('chats').doc(chatId)
        chatRef.onSnapshot( snapChat => {

            let chatDoc = snapChat.data();

            console.log('[CHAT DATA]', chatDoc)

            // Carregando as mensagens
            let messageRef = chatRef.collection('messages').doc(messageId).onSnapshot(snapMessage => {

                let messageDoc = snapMessage.data();

                console.log('[MESSAGE DATA]', messageDoc)

                // Quem está enviando a mensagem 
                let userFrom = messageDoc.from;

                // Para quem está sendo enviado a mensagem
                // Temos que usar o "Object.Keys" para transformar o 
                // objeto em array
                let userTo = Object.keys(chatDoc.users).filter( key => {

                    return (key !== btoa(userFrom))

                })[0];

                console.log('[FROM]', userFrom)
                console.log('[TO]', userTo)

                db.collection('users').doc(atob(userTo)).collection('contacts').doc(btoa(userFrom)).set({

                    lastMessage: messageDoc.context,
                    lastMessageTime: new Date()

                }, {
                    merge: true
                }).then( e=> {

                    console.log('[FINISH]', new Date())

                    resolve(e);
                    return true;

                }).catch( err => {

                    console.log('[ERROR]', err)

                    throw new Error(err);

                })
            })

        })

    })

})