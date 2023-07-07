const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.submitForm = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();

  try {
    const docRef = await db.collection("ScheduledCalls").add({
      name: data.name,
      date: data.date,
      location: data.location,
      email: data.email,
      phone: data.phone,
      description: data.description,
    });
    console.log("Document created with ID:", docRef.id);

    // you can return any data you want to send back to the client here
    return {success: true, message: "Form submitted", docId: docRef.id};
  } catch (error) {
    // you can return any error message you want to send back to the client here
    return {success: false, message: error.message};
  }
});
