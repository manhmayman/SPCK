import app from "./index.js";
import Login from "./login.js";



class Register {
    form_register;
    txt_name;
    txt_email;
    txt_password;
    txt_confirm_pass;
    error_message;
    txt_go_to_login;
    btn_Submit;

    constructor() {
        // Tạo thẻ form
        this.form_register = document.createElement("form");
        this.form_register.classList.add("sign-up-form");
        // Tạo input name
        this.txt_name = document.createElement("input");
        this.txt_name.type = "text";
        this.txt_name.placeholder = "Enter your name...";

        // Tạo input email
        this.txt_email = document.createElement("input");
        this.txt_email.type = "email";
        this.txt_email.placeholder = "Enter your email...";

        // Tạo input pass
        this.txt_password = document.createElement("input");
        this.txt_password.type = "password";
        this.txt_password.placeholder = "Enter your password...";

        // Tạo input confirm pass
        this.txt_confirm_pass = document.createElement("input");
        this.txt_confirm_pass.type = "password";
        this.txt_confirm_pass.placeholder = "Confirm your password...";

        // Tạo thông báo lỗi
        this.error_message = document.createElement("p");
        this.error_message.classList.add("error");

        // Tạo chuyển sang login
        this.txt_go_to_login = document.createElement("a");
        this.txt_go_to_login.innerHTML = "You already have an account? Login";

        // Tạo button submit
        this.btn_Submit = document.createElement("button");
        this.btn_Submit.type = "submit";
        this.btn_Submit.innerHTML = "Register";

        // Thêm event click, submit vào thẻ a, button
        this.txt_go_to_login.addEventListener("click", this.go_to_login);
        this.btn_Submit.addEventListener("click", this.submit);
    }

    go_to_login() {
        const login = new Login();
        app.change_active_screen(login);
    }

    initRender = (container) => {
        // Tạo tiêu đề register
        const title = document.createElement("h2");
        title.innerText = "Register";

        // Thêm các thẻ h2, input,a, button vào trong thẻ form
        this.form_register.appendChild(title);
        this.form_register.appendChild(this.txt_name);
        this.form_register.appendChild(this.txt_email);
        this.form_register.appendChild(this.txt_password);
        this.form_register.appendChild(this.txt_confirm_pass);
        this.form_register.appendChild(this.error_message);
        this.form_register.appendChild(this.txt_go_to_login);
        this.form_register.appendChild(this.btn_Submit);
        const fb_bt = document.createElement("button");
        fb_bt.innerText = "Facebook";
        this.form_register.appendChild(fb_bt);
        fb_bt.addEventListener('click', (e) => {
            e.preventDefault(e);
            const firebaseConfig = {
                apiKey: "AIzaSyBgBCGn1GN3n-JCxfuOV8nylYGwkcK_H8U",
                authDomain: "mindx-web.firebaseapp.com",
                projectId: "mindx-web",
                storageBucket: "mindx-web.appspot.com",
                messagingSenderId: "707072624812",
                appId: "1:707072624812:web:f0a6f5d483dbfc9a8c7709"
            };
              
              // Khởi tạo Firebase
            //firebase.reset();
            firebase.initializeApp(firebaseConfig);

            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_birthday');
            firebase.auth().useDeviceLanguage();
            provider.setCustomParameters({
                'display': 'popup'
              });
              firebase
              .auth()
              .signInWithPopup(provider)
              .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
            
                // The signed-in user info.
                var user = result.user;
                // IdP data available in result.additionalUserInfo.profile.
                  // ...
            
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
            
                // ...
              })
              .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            
                // ...
              });
            firebase.auth().signInWithRedirect(provider);
            
        })

        // Thêm form vào trong thẻ root(container)
        container.appendChild(this.form_register);
    }
    
    setError = (content) => {
        if (content == "") {
            this.error_message.style.display = "none";
        } else {
            this.error_message.innerHTML = content;
            this.error_message.style.display = "block";
        }
    }

    

    submit = (e) => {
        e.preventDefault(e);

        const email = this.txt_email.value;
        const name = this.txt_name.value;
        const password = this.txt_password.value;
        const cf_pass = this.txt_confirm_pass.value;

        this.setError("");

        // Thông báo lỗi khi không nhập input
        if(email == "") {
            this.setError("Email cannot be empty!");
            return;
        }
        if(name == "") {
            this.setError("Name cannot be empty!");
            return;
        }
        if(password == "") {
            this.setError("Password cannot be empty!");
            return;
        }
        if(cf_pass == "") {
            this.setError("Confirm Password cannot be empty!");
            return;
        }

        // Thông báo lỗi khi password < 6 kí tự

        if (password.length < 6) {
            this.setError("Password cannot be less than 6 character!");
            return;
        }

        // Thông báo khi pass # cfpass
        if (password != cf_pass) {
            this.setError("Password not match");
            return;
        }  

        //Lưu trữ.....
        
        const firebaseConfig = {
            apiKey: "AIzaSyBgBCGn1GN3n-JCxfuOV8nylYGwkcK_H8U",
            authDomain: "mindx-web.firebaseapp.com",
            projectId: "mindx-web",
            storageBucket: "mindx-web.appspot.com",
            messagingSenderId: "707072624812",
            appId: "1:707072624812:web:f0a6f5d483dbfc9a8c7709"
          };
          
          // Khởi tạo Firebase
        //firebase.reset();
        firebase.initializeApp(firebaseConfig);
        
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            firebase.auth().currentUser.updateProfile({displayName: name})
        })
        .catch((err) => {
            console.log(err.message);
        })
        
        // FireStore
        const db = firebase.firestore();

        // Thêm vào FireStore
        // Add a new document in collection "cities"
        db.collection("users").doc(name).set({
            email: email,
            password: password,
            phoneNumber: "Đây là số điện thoại",
            cart: ['iphone', 'macbook', 'sạc iphone']
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

        // Lấy dữ liệu
        var docRef = db.collection("users").doc(name);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
}



}
export default Register;