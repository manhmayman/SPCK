import Register from "./register.js";
import app from "./index.js";

class Login {
    form_register;
    txt_email;
    txt_password;
    error_message;
    txt_go_to_register;
    btn_Submit;

    constructor() {
        // Tạo thẻ form
        this.form_register = document.createElement("form");


        // Tạo input email
        this.txt_email = document.createElement("input");
        this.txt_email.type = "email";
        this.txt_email.placeholder = "Enter your email...";

        // Tạo input pass
        this.txt_password = document.createElement("input");
        this.txt_password.type = "password";
        this.txt_password.placeholder = "Enter your password...";


        // Tạo thông báo lỗi
        this.error_message = document.createElement("p");
        this.error_message.classList.add("error");

        // Tạo chuyển sang register
        this.txt_go_to_register = document.createElement("a");
        this.txt_go_to_register.innerHTML = "You don't have an account? Register";

        // Tạo button submit
        this.btn_Submit = document.createElement("button");
        this.btn_Submit.type = "submit";
        this.btn_Submit.innerHTML = "Login";

        // Thêm event click, submit vào thẻ a, button
        this.txt_go_to_register.addEventListener("click", this.go_to_register);
        this.btn_Submit.addEventListener("click", this.submit);
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
        const password = this.txt_password.value;

        this.setError("");

        // Thông báo lỗi khi không nhập input
        if(email == "") {
            this.setError("Email cannot be empty!");
            return;
        }
        if(password == "") {
            this.setError("Password cannot be empty!");
            return;
        }

        // Thông báo lỗi khi password < 6 kí tự

        if (password.length < 6) {
            this.setError("Password cannot be less than 6 character!");
            return;
        }

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
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
         // Signed in
            console.log("Login successful");
            var user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
        
    }

    go_to_register = () => {
        const register = new Register();
        app.change_active_screen(register);
    }

    initRender = (container) => {
        // Tạo tiêu đề login
        const title = document.createElement("h2");
        title.innerText = "Login";

        // Thêm các thẻ h2, input,a, button vào trong thẻ form
        this.form_register.appendChild(title);
        this.form_register.appendChild(this.txt_email);
        this.form_register.appendChild(this.txt_password);
        this.form_register.appendChild(this.error_message);
        this.form_register.appendChild(this.txt_go_to_register);
        this.form_register.appendChild(this.btn_Submit);

        // Thêm form vào trong thẻ root(container)
        container.appendChild(this.form_register);
    }
}

export default Login;