<template>
    <modal-card v-if="card" @close="$emit('close')">
        <span slot="header">{{ text }} {{ item }}</span>

        <ct-input
            :disabled="type == 'destroyCard'"
            placeholder="Название"
            slot="body"
            v-model="card.name"
            type="text"
        />

        <ct-button
            slot="footer"
            @click="handleFunction(type)"
            color="blue"
            :text="text"
        />
    </modal-card>
</template>
<script>
import CtButton from "../global/CtButton.vue";
import CtInput from "../global/CtInput.vue";
import ModalCard from "../global/ModalCard.vue";

export default {
    name: "CardModal",
    props: {value: Object, type: String, text: String, item: String},
    components: {ModalCard, CtInput, CtButton},
    data: function () {
        return {
            card: this.value,
        };
    },
    computed: {},
    methods: {
        async addCard() {
            await this.$store.dispatch("addCard", this.card);
            this.$emit("close");
            this.scrollToLast();
        },

        async updateCard() {
            await this.$store.dispatch("updateCard", this.card);
            this.$emit("close");
        },

        async destroyCard() {
            await this.$store.dispatch("destroyCard", this.card);
            this.$emit("close");
        },
        scrollToLast() {
            const el = this.$parent.$refs.cardsList.$refs.cards;

            if (el) {
                el.scrollLeft = el.scrollWidth;
            }
        },
        handleFunction(name) {
            this[name]();
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
