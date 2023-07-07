// Import Firebase and Firebase Functions SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyBFRK33knMWfGFDjSl1ScIxCT4iYeWrVFc",
    authDomain: "dnk-photography.firebaseapp.com",
    projectId: "dnk-photography",
    storageBucket: "dnk-photography.appspot.com",
    messagingSenderId: "953595284741",
    appId: "1:953595284741:web:1d1b6143046d15034cbb6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Get a reference to your callable function
const submitForm = httpsCallable(functions, 'submitForm');

document.getElementById('messageForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  let data = {
    name: document.getElementById('Full-Name').value,
    date: document.getElementById('Date').value,
    description: document.getElementById('Description').value,
    location: document.getElementById('Event-Location').value,
    email: document.getElementById('Email').value,
    phone: document.getElementById('Phone').value
  };

  try {
    const result = await submitForm(data);

    if(result.data.success) {
      document.getElementById("successAlert").innerHTML = Swal.fire({
        title: 'Success!',
        text: 'Form successfully submitted',
        icon: 'success',
        confirmButtonText: 'Close'
      });
      document.getElementById("successAlert").style.visibility = "hidden";
    } else {
      // Handle the error returned from the function
      alert(result.data.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
