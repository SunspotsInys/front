import { createVNode, render } from "vue";
import MessageConstructor from './th-message.vue'

class _Message {
    private container: HTMLDivElement;
    timeout: number;
    constructor() {
        this.timeout = 3000;
        this.container = document.createElement("div");
        this.container.className = "messages";
        document.body.appendChild(this.container);
    }

    private add(type: string, msg: string) {
        const container = document.createElement("div");
        const vn = createVNode(MessageConstructor, { msg: msg });
        container.className = type;
        render(vn, container);
        this.container.appendChild(container);
        setTimeout(() => {
            this.container.removeChild(container);
        }, this.timeout);
    }

    Info(msg: string) {
        this.add("info", msg);
    }

    Success(msg: string) {
        this.add("success", msg);
    }
    Warning(msg: string) {
        this.add("warning", msg);
    }
    Error(msg: string) {
        this.add("error", msg);
    }

}

const ThMessage = new _Message();
export default ThMessage;