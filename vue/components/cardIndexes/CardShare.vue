<template>
<div v-if="card" class="shareBlock">
<div class="contentBlock">
    <div
         class="giveAccess__block"
    >

        <svg-button class="svgTemplate"
                    icon="owner"
                    width="2rem"
                    height="2rem"
                    bccolor="#fffaef"
                    color="#ffd465"
                    margin="1rem"
        />
        <div class="giveAccess__item">
            <h1 class="giveAccess__header"  @click="showList=false">Добавить пользователя в чат</h1>
        </div>
        <input v-model="user_name" @keypress="searchUser()" placeholder="Добавить пользователя">

            <div @mouseover="showList=true" @mouseleave="showList=false" class="users-list" v-if="showList===true">
            <div   v-for="(userItem, index) in users"
                   :key="userItem.id"
                   @click="addUserRoom(room.roomId,userItem.id)"
                   class="giveAccess__userBlock">
                <img :src=" userItem.images">
                <div class="giveAccess__users">
                    <h1>{{userItem.name}}</h1>
                    <span>{{userItem.email}}</span>
                </div>
            </div>

        </div>


        <div class="giveAccess__list">
            <div v-for="us in user" class="giveAccess__userBlock">
                <img src="https://images.ctfassets.net/hrltx12pl8hq/72HS9gzO2aIo6Ew7f82gmY/ea51b9e5e3549a9844f75c0cf58aec7e/05-nature_1487897981.jpg?fit=fill&w=480&h=270">
                <div class="giveAccess__users">
                    <h1><a class="user-link" :href="'/user/' + us.user_id">{{us.name}}</a></h1>
                </div>
<!--                <a class="item_delete" :href="'/user/' + us.user_id">-->
<!--                    <svg-button-->
<!--                        class="item_delete"-->
<!--                        icon="trash"-->
<!--                        width="2rem"-->
<!--                        height="2rem"-->
<!--                        color="var(&#45;&#45;ct-blue)"-->

<!--                    />-->
<!--                </a>-->

                    <div class="item_delete" @click="removeUserRoom(room.roomId, us.user_id)">
                        <svg-button
                class="item_delete"
                icon="trash"
                width="2rem"
                height="2rem"
                color="var(--ct-blue)"

            />
                    </div>


<!--                <span id="owner">Владелец</span>-->
            </div>
        </div>
        <button class="access-ready-btn" @click="$emit('close')">Закрыть</button>


    </div>
</div>
</div>
</template>

<script>
import SvgButton from "../global/SvgButton";
import Card from "./Card.vue";
export default {
    props: { value: Object, user: Array, cards: Array, room: Object },

    data: function () {
        return {
            card: this.value,
            roles: 'reader',
            share_roles: 'reader',
            access: false,
            link: true,
            showList: false,
            user_message: false,
            selected_user: [],
            added:false,
            user_name:'',
            users:[],
        };

    },
    watch: {
        users: {
            get: function () {
                return this.$store.getters.room_users;
            },
        }
    },
    components: {
        SvgButton,
        Card
    },

  methods: {
      searchUser(){
        if(this.user_name.length > 2){
          axios.post('/ajax', {
            'type': 'get_users',
            'name': this.user_name
          }).then( response => {
            console.log(response)
            this.users = response.data.users
            this.showList = true
          })
        }

      },
      removeUserRoom(room_id, user_id) {
          // this.$store.dispatch("selectUser", {
          //     user_id: this.user_id,
          //     room_id: this.room_id,
          // })
          axios.post('/ajax', {
              'type': 'remove_from_room',
              'room_id': room_id,
              'user_id': user_id
          }).then( response => {
              if(response.data.success == true){
                  location.reload()
              }

          })
              .catch((error) => {
              alert(error.response.data.error.description);
          });
      },

      addUserRoom(room_id,user_id) {
        this.showList = false
        axios.post('/ajax', {
          'type': 'add_to_room',
          'room_id': room_id,
          'user_id': user_id
        }).then( response => {
          if(response.data.success == true){
            location.reload()
          }
        })
      }
    }

}
</script>

<style lang="scss" scoped>
@mixin back{ background-color: var(--ct-white);
    position: relative;
    padding: 3rem;
    width:62rem;
    border-radius: 5px;
    display: grid;
    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
    @media (max-width: 767px){
        width:30rem!important;
        padding: 2rem!important;
    }
}
@mixin head{
    font-style: normal;
    font-weight: 600;
    font-size: var(--text-24);
    line-height: 29px;
}

.shareBlock{

    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--ct-dark-02);
    place-items: center;
    .contentBlock{
        display: grid;
        width: 62rem;
        height: 42rem;
        position: absolute;
        top: calc(50% - 21rem);
        left: calc(50% - 31rem);
        @media (max-width: 767px){
            top: calc(50% - 24rem)!important;
            left: calc(50% - 15rem)!important;
            width: 30rem!important;
        }
    }

    .giveAccessShort,{
        height: min-content;
    &__block{
        grid-template-columns: 0.1fr 1fr;
        align-items: center;
        @include back;
        grid-area: 1/1/1/1;
    }
        &__header{
            word-break: break-word;
            grid-area: 1/2/1/2;
            @include head;

        }
        &__description{
            font-style: normal;
            font-weight: 500;
            font-size: var(--text-14);
            line-height: 16px;
        }
    }
    .linkBlockShort{

        &__block{
            grid-template-columns: 0.1fr 1fr;
            @include back;
            margin-top: 1rem;
            height: min-content;
            grid-area: 2/1/2/1;
            align-items: center;
        }
        &__header{
            word-break: break-word;
            grid-area: 1/2/1/2;
            @include head;

        }
        &__description{
            font-style: normal;
            font-weight: 500;
            font-size: var(--text-14);
            line-height: 16px;
        }
    }
    .svgTemplate{
        width: min-content;
        height: 40px;
        border-radius: 50%;
        grid-area: 1/1/1/1;
    }
    .svgInput{
        position: absolute;
        margin-top: -4rem;
        margin-left: 51rem;
    }
    .giveAccess, .userMessage{
        height: 31rem;
        &__letter{
            display: grid;
            grid-area: 2/1/2/3;
            grid-template-rows: 0.3fr 0.1fr 1fr 0.3fr 0.3fr;
        }
        &__block{
            grid-template-columns: 0.1fr 1fr;
            align-items: center;
            @include back;
            grid-area: 1/1/1/1;
            input{
                border: 1px solid #9fa0af;
                box-sizing: border-box;
                border-radius: 5px;
                font-family: Gilroy;
                font-style: normal;
                height: 4rem;
                font-weight: 300;
                font-size: var(--text-18);
                line-height: 21px;
                grid-area: 2/1/2/3;
                margin-top: 2rem;
                &:focus-visible {
                    outline: none;
                }
                &::-webkit-input-placeholder {
                    padding-left: 2rem;
                }
            }
        }
        &__item{
            display: grid;
        }
        &__header{
            word-break: break-word;
            grid-area: 1/1/1/2;
            @include head;

        }
        &__list{
            grid-area: 3/1/3/3;
            overflow-y: scroll;
            height:25rem;
            margin: 2rem 0;
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
        &__userBlock{
            display: grid;
            grid-template-columns: 0.1fr 1fr;
            padding: 1rem 0;
            align-items: center;
            .item_delete{
                visibility: hidden;
                grid-area: 1/3/1/3;
                margin-right: 2rem;
            }
            &:hover{
                background-color: var(--ct-blue-01);
                .item_delete {
                    visibility: visible;
                }
            }
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
        }
        &__users{
            grid-area: 1/2/1/2;
            a{
                &:hover{
                    color: inherit;
                }
            }
            &h1{
                grid-area: 1/1/1/1
            }
            &span{
                grid-area: 2/1/2/1;
            }
        }
    }
    .linkBlock{
        @include back;
        margin-top: 1rem;
        height: 31rem;
        grid-template-columns: 0.1fr auto auto;
        grid-template-rows: auto auto;
        grid-area: 2/1/2/1;
        &__item{
            grid-area: 1/1/1/4;
            display: grid;
            grid-template-columns: 0.1fr 1fr;
            grid-template-rows: min-content;
            align-items: center;
        }
        &__header{
            grid-area: 1/2/1/2;
            @include head;
        }
        &__form{
            grid-area: 2/1/2/4;
            padding: 10px 0 10px 0;
            .linkForm{
                width: 100%;
                height: 4rem;
            }
            input{
                border: 1px solid #33B5E5;
                box-sizing: border-box;
                border-radius: 5px;
                font-family: Gilroy;
                font-style: normal;
                font-weight: 300;
                font-size: var(--text-18);
                line-height: 21px;
                &:focus-visible {
                    outline: none;
                }
            }
        }
        &__footer{
            grid-area: 3/1/3/4;
            display: grid;
            grid-template-columns: 0.1fr 1fr 0.1fr;
            grid-template-rows: min-content;
            align-items: center;
        }
        &__descriptionBlock{
            grid-area: 1/2/1/2;
            margin-left: 0.65rem;

        }
        &__headerDescription{
            grid-area: 1/1/1/1;
            font-style: normal;
            font-weight: 500;
            font-size: var(--text-16);
            line-height: 19px;
        }
        &__description{
            grid-area: 2/1/2/1;
            font-style: normal;
            font-weight: 300;
            font-size: var(--text-14);
            line-height: 16px;
        }
        &__selector{
            grid-area: 1/3/1/3;
            outline: none;
            border: none;
            font-style: normal;
            font-weight: 500;
            font-size: var(--text-16);
            line-height: 19px;
            text-align: right;
            text-transform: capitalize;
            background-color: transparent;
            align-self: baseline

        }
        &__Btn{
            grid-area: 4/3/4/3;
            border: none;
            outline: none;
            padding: 1.2rem 2.8rem;
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

            &:hover {
                transition: background-color 0.2s;
                background-color: var(--ct-white);
                color: var(--ct-blue);

            }
        }
    }
    .users-list{
        position: absolute;
        background-color: white;
        z-index: 3;
        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        height:25rem;
        overflow: scroll;
        top: 20rem;
        left: 0rem;
        margin: 0 3rem 0 3rem;
        padding: 2rem 2rem 0 2rem;
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

}
#owner{
    font-weight: 500;
    font-size: var(--text-16);
    line-height: 19px;
    text-align: right;
    text-transform: capitalize;
    color: #9fa0af;
    grid-area: 1/3/1/3;
}
#email-input{
    grid-area: 1/1/1/3;
    border-color: #33B5E5;
    margin-top: 1rem;
}
#message-input{
    grid-area: 3/1/3/4;
    height: 7.7rem;
    margin-top: 1rem;
    @media (max-width: 767px){
        grid-area: 3/1/3/3;
    }
}
.user-checkbox{
    grid-area: 2/1/2/1;
    display: flex;
    align-items: center;
}
#checkbox-label{
    margin-left: 1rem;
    font-size: var(--text-16);;
}
.mail-selector{
    grid-area: 1/3/1/3;
    outline: none;
    border: none;
    font-style: normal;
    font-weight: 500;
    font-size: var(--text-16);;
    line-height: 19px;
    text-align: right;
    text-transform: capitalize;
    background-color: transparent;
    align-self: center;
    justify-self: end;
    margin-top: 1rem;
    @media (max-width: 767px){
        grid-area: 2/2/2/2!important;
    }
}

.mail-card{
    grid-area: 4/1/4/1;
    margin-top: 1rem;
    width: max-content;
}
.access-ready-btn
{
    grid-area: 4/2/4/2;
    border: none;
    outline: none;
    padding: 1.2rem 2.8rem;
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

    &:hover {
        transition: background-color 0.2s;
        background-color: var(--ct-white);
        color: var(--ct-blue);

    }

}
.ready-btn
{
    grid-area: 5/3/5/3;
    border: none;
    outline: none;
    padding: 1.2rem 2.8rem;
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
        grid-area: 5/2/5/2!important;
    }

    &:hover {
        transition: background-color 0.2s;
        background-color: var(--ct-white);
        color: var(--ct-blue);

    }

}
.cancel-btn
{
    grid-area: 5/2/5/2;
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
    @media (max-width: 767px){
        grid-area: 5/1/5/1!important;
        justify-self: start!important;
    }
}
.user-email{
    top: 8.4rem;
    left: 4rem;
    width: max-content;
    position: absolute;
    height: 3.3rem;
    background-color: #ebf8fc;
    border-radius: 100px;
    display: flex;
    align-items: center;
    @media (max-width: 767px){
        top: 9.1rem!important;
        left: 2.7rem!important;
    }
    span{
        font-style: normal;
        font-weight: 300;
        font-size: var(--text-14);;
        line-height: 17px;
    }
    img{
        width: 2.3rem;
        height: 2.3rem;
        margin: 1rem;
    }
}
.scroll-list{
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


}

</style>
