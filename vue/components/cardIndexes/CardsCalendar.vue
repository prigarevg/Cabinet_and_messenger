<template>
    <div class="calendar">
        <vue-cal
            :events="tasks"
            active-view="month"
            locale="ru"
            :disable-views="['years', 'year']"
            events-on-month-view="short"
            small
            :onEventClick="tooltipShow"
        >
            <template v-slot:title="{ view }">
        <span v-if="view.id === 'month' || view.id === 'week'">{{
                view.startDate.format("MMMM YYYY")
            }}</span>
                <span v-else-if="view.id === 'day'">{{
                        view.startDate.format("DD MMMM YYYY")
                    }}</span>
            </template>
            <template v-slot:event="{ event }">
<!--            <template v-slot:event="{ event }">-->
            <div v-if="user.id===event.card_index.user_id"
                class="vuecal__event-title"
                    :class="event.status===1? 'blue' : (event.status===2? 'green' : '')"
                    v-html="event.name"
                />
            </template>
        </vue-cal>

        <div
            v-if="tooltip.task"
            :style="{
        top: tooltipTop + 'px',
        left: tooltipLeft + 'px',
      }"
            class="calendar__task__tooltip"
        >
            <div class="tooltip__header">
                <h5 class="task__date">{{ tooltip.task.date }}</h5>
                <div @click="tooltip.task = false">
                    <svg-button icon="close" width="1rem" height="1rem"/>
                </div>
            </div>
            <div class="tooltip__body">
                <span class="task__time">{{ tooltip.task.time }}</span>
                <span class="task__title">{{ tooltip.task.name }}</span>
                <span class="task__card-label">Дело</span>
                <span v-if="tooltip.task.card_index" class="task__card">{{ tooltip.task.card_index.name }}</span>
                <span v-if="!tooltip.task.card_index" class="task__card">{{ card.name }}</span>
                <span class="task__description-label">Описание</span>
                <span class="task__description">{{ tooltip.task.description }} </span>
            </div>
            <div class="tooltip__footer">
                <div class="task__buttons">
                    <div @click="showModal('updateTask', tooltip.task)">
                        <svg-button
                            icon="pencil"
                            width="1.5rem"
                            height="1.5rem"
                            color="var(--ct-dark-05)"
                            margin="1rem"
                        />
                    </div>

                    <div @click="showModal('destroyTask', tooltip.task)">
                        <svg-button
                            icon="trash"
                            width="1.5rem"
                            height="1.5rem"
                            color="var(--ct-dark-05)"
                            margin="1rem"
                        />
                    </div>
                </div>

                <div
                    class="task__status"
                    :class="tooltip.task.status > 0 ? 'done' : ''"
                >
          <span>{{
                  tooltip.task.status > 0 ? "Задача выполнена" : "Задача не выполнена"
              }}</span>
                </div>
            </div>
        </div>
        <!-- Для появляющегося из cardIndexes ближайшего дела, которое появляется при нажатии на дело
        <div
        v-if="selected_card"
        :style="{
        top: tooltipTop + 'px',
        left: tooltipLeft + 'px',
      }"
        class="calendar__task__tooltip"
    >
        <div class="tooltip__header">
            <h5 class="task__date">{{ selected_card.card_index_tasks.date }}</h5>
            <div @click="selected_card= false">
                <svg-button icon="close" width="1rem" height="1rem"/>
            </div>
        </div>
        <div class="tooltip__body">
            <span class="task__time">{{ selected_card.card_index_tasks.time }}</span>
            <span class="task__title">{{ selected_card.card_index_tasks.name }}</span>
            <span class="task__card-label">Дело</span>

        </div>
        <div class="tooltip__footer">
            <div class="task__buttons">
                <div @click="showModal('updateTask', tooltip.task)">
                    <svg-button
                        icon="pencil"
                        width="1.5rem"
                        height="1.5rem"
                        color="var(--ct-dark-05)"
                        margin="1rem"
                    />
                </div>

                <div @click="showModal('destroyTask', tooltip.task)">
                    <svg-button
                        icon="trash"
                        width="1.5rem"
                        height="1.5rem"
                        color="var(--ct-dark-05)"
                        margin="1rem"
                    />
                </div>
            </div>

            <div
                class="task__status"
                :class="tooltip.task.status > 0 ? 'done' : ''"
            >
          <span>{{
                  tooltip.task.status > 0 ? "Задача выполнена" : "Задача не выполнена"
              }}</span>
            </div>
        </div>
    </div>-->

        <div class="calendar__task__button" @click="showModal('addTask', task)">
            <svg-button
                icon="plus"
                width="1.2rem"
                height="1.2rem"
                radius="50%"
                bccolor="var(--ct-blue)"
                color="var(--ct-white)"
                padding="0.4rem"
            />

            <span>Создать</span>
        </div>

        <task-modal
            v-if="modal.task"
            :card="card"
            :value="modal.task"
            :type="modal.type"
            :text="modal.text"
            @close="modal.task = false"
        />
    </div>
</template>
<script>
import CtButton from "../global/CtButton.vue";
import SvgButton from "../global/SvgButton.vue";
import TaskModal from "./TaskModal.vue";

export default {
    name: "CardsCalendar",
    props: {
        card: Object, selected_card: Object,
    },
    components: {
        CtButton,
        SvgButton,
        TaskModal,
    },
    data() {
        return {
            task: {
                name: "",
                description: "",
                card_index_id: Number,
                date: "",
                time: "",
                status: 0,
                user_Id: "",
            },

            modal: {
                type: "",
                text: "",
                task: false,
            },

            tooltip: {
                task: false,
            },

            tooltipTop: null,
            tooltipLeft: null,
        };
    },
    mounted() {

        window.addEventListener("scroll", () => {
            this.tooltip.task = false;
        });
    },
    computed: {
        tasks: {
            get: function () {
                return this.$store.getters.tasks;
            },
        },
        cards: {
            get: function () {
                return this.$store.getters.cards;
            },
        },
        user : {
            get : function() {
                return this.$store.getters.user
            }
        }
    },
    methods: {
        tooltipShow(task, e) {
            this.tooltip = {
                task: task,
            };
            this.tooltipTop = e.y;

            this.tooltipLeft = e.x;
        },

        showModal(type, task) {
            this.tooltip.task = false;
            this.modal.type = type;
            this.modal.task = task;

            switch (type) {
                case "addTask":
                    this.modal.text = "Создать";
                    break;
                case "updateTask":
                    this.modal.text = "Обновить";
                    break;
                case "destroyTask":
                    this.modal.text = "Удалить";
                default:
                    break;
            }
        },
    },
};
</script>

<style lang="scss">
.calendar {
    background-color: var(--ct-white);
    border-radius: 0.5rem;
    height: 62.1rem;
    font-size: 14px;
    line-height: 16px;
    position: relative;

    &__task {
        &__tooltip {
            position: fixed;
            background-color: var(--ct-white);
            border-radius: 0.5rem;
            z-index: 100;

            display: flex;
            flex-flow: column nowrap;

            max-width: 30rem;

            .tooltip {
                &__header {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-between;

                    padding: 1.5rem;
                    border-bottom: 0.1rem solid var(--ct-dark-02);

                    .task__date {
                        font-weight: normal;
                        font-size: var(--text-16);
                        line-height: 1.9rem;
                    }
                }

                &__body {
                    display: grid;
                    grid-template-rows: repeat (4, max-content);
                    grid-gap: 2rem;
                    padding: 1.5rem;

                    .task {
                        & > span {
                            font-weight: normal;
                            font-size: var(--text-14);
                            line-height: 1.6rem;
                        }

                        &__time {
                            grid-area: 1/1/2/2;
                        }

                        &__title {
                            grid-area: 1/2/2/3;
                            color: var(--ct-blue);
                            font-style: normal;
                            font-weight: 500;

                        }

                        &__card-label {
                            grid-area: 2/1/3/2;
                        }

                        &__card {
                            font-weight: 500;
                            color: var(--ct-black);
                            grid-area: 2/2/3/3;
                        }

                        &__description-label {
                            grid-area: 3/1/4/3;
                        }

                        &__description {
                            grid-area: 4/1/5/3;
                            font-size: var(--text-13) !important;

                        }
                    }
                }

                &__footer {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;

                    .task {
                        &__buttons {
                            display: flex;
                            flex-flow: row nowrap;
                        }

                        &__status {
                            margin-left: 1rem;
                            padding: 0.5rem 1rem;

                            border-radius: 0.5rem;

                            span {
                                font-weight: 500;
                                font-size: var(--text-14);
                                line-height: 1.6rem;
                                color: var(--ct-dark-05);
                            }

                            &.done {
                                background-color: var(--ct-dark-01);
                            }
                        }
                    }
                }
            }
        }

        &__button {
            cursor: pointer;
            position: absolute;
            top: 1.3rem;
            right: 1.2rem;
            display: flex;
            flex-flow: row nowrap;

            span {
                margin-left: 1rem;
                font-weight: 500;
                font-size: var(--text-16);
                line-height: 1.9rem;
            }
        }
    }
}

.vuecal {
    background-color: var(--ct-white);
    font-size: var(--text-15);

    &__event {
        cursor: pointer;
        margin: 0.2rem;

        &-title {
            border-radius: 0.2rem;

            &.blue {
                color: var(--ct-blue);
                background-color: var(--ct-blue-01);
            }

            &.green {
                color: var(--ct-green);
                background-color: var(--ct-green-01);
            }
        }
    }

    &__header {
        display: grid;
        grid-template-columns: max-content max-content 1fr;
        grid-template-rows: repeat (3, max-content);
        background-color: var(--ct-white);
        border: none;
    }

    &__menu {
        grid-area: 1/2/3/3;
        justify-self: center;
        background-color: var(--ct-white);
        align-items: center;
        border-radius: 0.5rem;
    }

    &__title {
        width: max-content;
    }

    &__title-bar {
        grid-area: 1/1/3/2;
        background-color: var(--ct-white);
        border-radius: 0.5rem;

        span {
            font-weight: 400;
            font-size: var(--text-18);
            color: var(--ct-dark);
        }
    }

    &__arrow {
        color: var(--ct-dark-02);
        padding: 1rem;
    }

    &__weekdays-headings {
        grid-area: 3/1/4/4;
        padding-right: 0px !important;
    }

    &__cell {
        &-content {
            font-size: var(--text-14);
            justify-content: start !important;
        }

        &-date {
            margin: 0.2rem auto;
            height: 2rem;
        }

        &--today {
            background-color: var(--ct-white);

            .vuecal__cell-date {
                background-color: var(--ct-blue);
                width: 2rem;
                border-radius: 50%;
                color: var(--ct-white);
            }
        }
    }

    &__view-btn {
        font-weight: 400;
        font-size: var(--text-14);

        &--active {
            border: none;
            color: var(--ct-blue);
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .vuecal {
            &__title-bar {
                grid-area: 1/1/2/2;
            }

            &__menu {
                grid-area: 2/1/3/2;
            }
        }
    }

    @media (max-width: 767px) {
        .vuecal {
            &__title-bar {
                grid-area: 1/1/2/2;
            }

            &__menu {
                grid-area: 2/1/3/2;
            }
        }
    }
}
</style>
