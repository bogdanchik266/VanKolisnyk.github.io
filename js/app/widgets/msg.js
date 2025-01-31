export const msg = {
    data() {
        return {
            alert: "",
            succes: "",
            t1: "",
            t2: "",
            confirmTitle: "Please confirm next action",
            confirming: "",
            code: 0,
            interval: ""
        };
    },
    mounted() {
        this.parent = this.$parent?.$parent?.$parent;
    },
    methods: {
        fadein(el, timeout, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            el.style.transition = `opacity ${timeout}ms`;
            setTimeout(() => {
                el.style.opacity = 1;
            }, 10);
        },
        fadeout(el, timeout) {
            el.style.opacity = 1;
            el.style.transition = `opacity ${timeout}ms`;
            el.style.opacity = 0;

            setTimeout(() => {
                el.style.display = "none";
            }, timeout);
        },
        succesFun(msg) {
            this.succes = msg;

            if (document.querySelector(".succesMsg")) {
                document.querySelector(".succesMsg").style = "";
            }
            clearTimeout(this.t1);
            clearTimeout(this.t2);
            this.t1 = setTimeout(() => {
                const block = document.querySelector(".succesMsg");
                this.fadein(block, 1000, "flex");
                this.t2 = setTimeout(() => {
                    this.fadeout(block, 1000);
                }, 3000);
            }, 100);
        },

        alertFun(msg) {
            this.alert = msg;

            if (document.querySelector(".alertMsg")) {
                document.querySelector(".alertMsg").style = "";
            }
            clearTimeout(this.t1);
            clearTimeout(this.t2);
            this.t1 = setTimeout(() => {
                const block = document.querySelector(".alertMsg");
                this.fadein(block, 1000, "flex");
                this.t2 = setTimeout(() => {
                    this.fadeout(block, 1000);
                }, 3000);
            }, 100);
        }
    },
    template: `
    <div class="alertMsg" v-if="alert">
        <div class="wrapper al">
            <i class="fas fa-times-circle"></i> {{ alert }}
        </div>
    </div>

    <div class="succesMsg" v-if="succes">
        <div class="wrapper al">
            <i class="fas fa-check-circle"></i> {{ succes }}
        </div>
    </div>
    `
};
