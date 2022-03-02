<template>
    <modal-card v-if="task" @close="$emit('close')">
        <span slot="header">{{ text }} событие</span>
        <div slot="body" class="task__form">
            <template v-if="type == 'destroyTask'">
                <span>Вы действительно хотите удалить {{ task.name }}?</span>
            </template>
            <template v-else>
                <ct-input
                    class="task__form--name"
                    v-model="task.name"
                    placeholder="Название"
                    type="text"
                />
                <ct-select
                    v-model="task.card_index_id"
                    class="task__form--card"
                    :options="cards"
                    :selected="task.card_index_id"
                >
                </ct-select>

                <ct-input
                    class="task__form--date"
                    v-model="task.date"
                    placeholder="Дата"
                    type="date"
                />

                <ct-input
                    class="task__form--time"
                    v-model="task.time"
                    placeholder="Время"
                    type="time"
                />

                <ct-textarea
                    v-model="task.description"
                    class="task__form--description"
                />
            </template>
        </div>

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
import CtSelect from "../global/CtSelect.vue";
import CtTextarea from "../global/CtTextarea.vue";
import ModalCard from "../global/ModalCard.vue";

export default {
    name: "TaskModal",
    props: {value: Object, type: String, text: String},
    components: {ModalCard, CtInput, CtSelect, CtTextarea, CtButton},
    data() {
        return {
            task: this.value,
        };
    },
    computed: {
        cards: {
            get: function () {
                return this.$store.getters.cards;
            },
        },
        user: {
            get: function () {
                return this.$store.getters.user;
            }
        }
    },
    methods: {
        async addTask() {
            await this.$store.dispatch("addTask", this.task);
            this.task = false;
        },

        async updateTask() {
            await this.$store.dispatch("updateTask", this.task);
            this.task = false;
        },

        async destroyTask() {
            await this.$store.dispatch("destroyTask", this.task);
            this.task = false;
        },

        handleFunction(name) {
            this.task.user_Id = this.user.id
                this[name]();
        },
    },
};
</script>
<style lang="scss" scoped>
.task {
    &__form {
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-gap: 1.5rem;
        padding: 0.1rem;

        &--name {
            grid-column: 1/3;
        }

        &--card {
            grid-column: 1/3;
        }

        &--date {
            grid-column: 1/2;
        }

        &--time {
            grid-column: 2/3;
        }

        &--description {
            grid-column: 1/3;
        }
    }
}
</style>
