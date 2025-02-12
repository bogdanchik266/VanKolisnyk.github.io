export const popup = {
    props: ['title', 'fullscreen'],
    data() {
        return {
            active: 0,
            top: 0,
            widthVal: '500px',
            ml: '-250px',
            left: '50%',
            height: 'auto',
            isMobile: window.innerWidth < 768
        };
    },
    watch: {
        active: function (o, n) {
            this.updatePopupSize();
        }
    },
    mounted() {
        window.addEventListener('resize', this.updatePopupSize);
        this.updatePopupSize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updatePopupSize);
    },
    methods: {
        updatePopupSize() {
            this.isMobile = window.innerWidth < 768;
            if (this.active == 1) {
                if (this.isMobile || this.fullscreen) {
                    this.top = 0;
                    this.widthVal = '100%';
                    this.ml = 0;
                    this.left = 0;
                    this.height = '100%';
                } else {
                    this.widthVal = '500px';
                    this.ml = '-250px';
                    this.left = '50%';
                    this.height = 'auto';
                    this.$nextTick(() => {
                        let height = this.$refs.popup.clientHeight / 2;
                        this.top = `calc(50% - ${height}px)`;
                    });
                }
            }
        }
    },
    template: `
    <template v-if="active == 1">
        <div class="popup-back"></div>
        <div class="popup" :style="{top: top, 'min-width': widthVal, 'margin-left': ml, left: left, height: height}" ref="popup">
            <div class="flex head-popup">
                <div class="w80 ptb20">
                    <div class="head-title">{{ title }}</div>
                </div>
                <div class="w20 al ptb20">
                    <a href="#" @click.prevent="active = 0"><i class="fas fa-window-close"></i></a>
                </div>
            </div>
            <div class="popup-inner">
                <slot />
            </div>
        </div>
    </template>
    `
};