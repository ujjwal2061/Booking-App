const admin=require("firebase-admin")
const serveaccout=require("./firebase1-sdk.json")
admin.initializeApp({
    credential:admin.credential.cert(serveaccout,{
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    storageBucket: "homy-290ac.appspot.com"
})
const bucket=admin.storage().bucket()
module.exports={bucket}