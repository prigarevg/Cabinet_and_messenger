<template>
    <div class="forwardBlock">
        <div class="forwardBlock__content">
            <h1 class="forwardBlock__header">Переслать</h1>
            <div @click="$emit('close')">
                <svg-button class="svgClose"
                             icon="close"
                             width="2rem"
                             height="2rem"
                             margin="1rem"
                />
            </div>
            <input type="text" v-model="searchValue" placeholder="Искать пользователя">
            <div class="scrolling-cards">
                <div   v-for="userItem in users"
                       :key="userItem.id"
                       @click="user_message=true"
                       class="forwardBlock__users">

                    <img :src=" userItem.images">
                    <div class="forwardBlock__items">
                        <h1>{{userItem.name}}</h1>
                        <span>{{userItem.email}}</span>
                    </div>

                </div>
            </div>
            <div class="forwardBlock__buttons">
                <button class="ready-btn" @click="$emit('close')">Отправить</button>
            </div>

        </div>



    </div>
</template>

<script>
import Card from "./Card.vue";
import SvgButton from "../global/SvgButton";

export default {
    props: { value: Object, user: Object,},
    data: function () {
        return {
            searchValue: '',
            card: {
                id: null,
                name: "",
                user_id: Number,
            },
        };

    },
    computed:{
        users: {
            get: function () {
                return this.$store.getters.users;
            },

        },
        /*filteredUsers() {
            let tempUsers = this.users
            //let result = tempUsers.map(({ tempUsers}) => tempUsers)
           // let result = {...tempUsers=> {tempUsers.name}};
            console.log(result)
            // Process search input
            if (this.searchValue) {
                console.log(tempUsers);
                tempUsers = tempUsers.id.name.filter((item) => {
                    return item.title
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase())
                })
            }
            return tempUsers
        }*/
    },
    components: {
        Card,
        SvgButton,
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@mixin back {
    background-color: var(--ct-white);
    position: relative;
    width: 62rem;
    min-height: 42rem;
    height: max-content;
    border-radius: 5px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    padding-bottom: 2rem;
    @media (max-width: 767px) {
        width: 30rem !important;
        padding: 2rem !important;
    }
}
.forwardBlock{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--ct-dark-02);
    &__header{
        text-align: center;
        padding: 4rem;
    }
    &__content{
        @include back;
        top: calc(50% - 21rem);
        left: calc(50% - 31rem);
        @media (max-width: 767px){
            top: calc(50% - 24rem)!important;
            left: calc(50% - 15rem)!important;
            width: 30rem!important;
        }
        svg{
            width: 2rem;
            height: 2rem;
        }
        input{
            border: 1px solid #9fa0af;
            box-sizing: border-box;
            border-radius: 5px;
            font-family: Gilroy;
            font-style: normal;
            height: 4rem;
            margin: 0 3rem 0 3rem;
            width: -webkit-fill-available;
            font-weight: 300;
            font-size: var(--text-18);
            line-height: 21px;
            grid-area: 2/1/2/3;
            &:focus-visible {
                outline: none;
            }
            &::-webkit-input-placeholder {
                padding-left: 2rem;
            }
        }
    }
    &__users{

        display: grid;
        grid-template-columns: min-content 1fr;
        align-items: center;
        padding: 1.5rem;
        img{
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            grid-area: 1/1/1/1;
        }
        h1{
            font-style: normal;
            font-weight: 500;
            font-size: var(--text-16);
            line-height: 19px;
            margin-left: 1rem;
        }
        span{
            font-style: normal;
            font-weight: 300;
            font-size: var(--text-14);
            line-height: 16px;
            margin-left: 1rem;
        }
        &:hover{
            background-color: #ebf8fc;
        }
    }
    &__buttons{
        display: flex;
        justify-content: flex-end;
        margin-right: 4rem;
    }
}
.ready-btn
{
    border: none;
    outline: none;
    background-color: var(--ct-blue);
    color: var(--ct-white);
    cursor: pointer;
    width: 13.5rem;
    height: 4.6rem;
    font-weight: 800;
    font-size: var(--text-18);
    line-height: 2.2rem;
    border-radius: 0.5rem;
    justify-self: end;
    @media (max-width: 767px){
        margin: 16px 16px 0 0!important;
    }

    &:hover {
        transition: background-color 0.2s;
        background-color: var(--ct-white);
        color: var(--ct-blue);

    }

}
.cancel-btn
{
    border: none;
    outline: none;
    padding: 1.2rem 2.8rem;
    background-color: var(--ct-white);
    color: #6f7087;
    cursor: pointer;
    width: 13.5rem;
    height: 4.6rem;
    font-weight: 800;
    font-size: var(--text-18);
    line-height: 2.2rem;
    border-radius: 0.5rem;
    justify-self: end;
}

.scrolling-cards{
    overflow-y: scroll;
    height: 21rem;
    margin-right: 0.5rem;
    &::-webkit-scrollbar
    {
        width: 0.3rem;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        height: 6.5rem;
        padding-right: 1rem;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #95d6ef;
    }
}
.svgClose{
    cursor: pointer;
    position: absolute;
    right: 2rem;
    top: 2rem;
}

</style>
