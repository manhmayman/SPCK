import Login from "./login.js";
import Register from "./register.js";

class App {
    active_screen;
    container;

    constructor(container) {
        this.container = container;
    }

    change_active_screen(screen) {
        if(this.active_screen !== undefined) {
            this.container.innerHTML = "";
        }

        this.active_screen = screen;
        this.active_screen.initRender(this.container);
    }
}

const container = document.getElementById("root");

const app = new App(container);
const register = new Register();
const login = new Login();

app.change_active_screen(register);

export default app