export const msg = {
    data() {
        return {
            alert: "",
            success: "",
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
        successFun(msg) {
            this.success = msg;

            if (document.querySelector(".successMsg")) {
                document.querySelector(".successMsg").style = "";
            }
            clearTimeout(this.t1);
            clearTimeout(this.t2);
            this.t1 = setTimeout(() => {
                const block = document.querySelector(".successMsg");
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
        },
        confirmFun(title,text){
            this.code =0;
            var self =this;

            return new Promise(function(resolve,reject){
                self.confirmtitle=title;
                self.confirm=text;
                self.$refs.confirm.active=1;
                self.interval=setInterval(function(){
                    if(self.code>0) resolve();
                },100);

            }).then(function(){
                clearInterval(self.interval);
                self.$refs.confirm.active=0;
                if(self.code==1){
                    return true;
                }
                if(self.code==2){
                    return false;
                }
            });

        }
    },
    template: `
    <div class="alertMsg" v-if="alert">
        <div class="wrapper al">
            <i class="fas fa-times-circle"></i> {{alert}}
        </div>
    </div>

    <div class="successMsg" v-if="success">
        <div class="wrapper al">
            <i class="fas fa-check-circle"></i> {{success}}
        </div>
    </div>

    <popup ref="confirm" :title="confirmTitle">
        <div class=" al">
            <i class="fas fa-info-circle"></i> {{confirm}}
            <div class="botBtns">
                <a href="#"  class="btnS" @click.prevent="code=1">Yes</a>
                <a href="#" class="btnS" @click.prevent="code=2">No</a>
            </div>
        </div>
    </popup>  
    `
};
