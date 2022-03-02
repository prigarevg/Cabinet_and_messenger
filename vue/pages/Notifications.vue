<template>
  <div class="notifications">
    <ul class="main-notifications">
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="main-notifications__item"
      >
        <div class="notification">
          <h5 class="notification__title">{{ notification.title }}</h5>
          <span class="notification__description">{{
            notification.description
          }}</span>

          <span class="notification__status">{{
            notification.status ? "Вкл." : "Выкл."
          }}</span>
          <div class="notification__checkbox ct-checkbox">
            <label>
              <input
                :checked="notification.status"
                type="checkbox"
                v-model="notification.status"
                @input="changeStatus(notification)"
              />
              <span></span>
            </label>
          </div>
        </div>
      </li>
    </ul>

    <div
      class="dropdown"
      v-for="dropdown in dropdownMessages"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenMessages ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenMessages = !dropdownOpenMessages"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenMessages">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownComments"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenComments ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenComments = !dropdownOpenComments"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenComments">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownReminders"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenReminders ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenReminders = !dropdownOpenReminders"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenReminders">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownReviews"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[dropdownOpenReviews ? 'open' : '', 'dropdown__header__icon']"
          @click="dropdownOpenReviews = !dropdownOpenReviews"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenReviews">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownPosition"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenPosition ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenPosition = !dropdownOpenPosition"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenPosition">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div class="dropdown" v-for="dropdown in dropdownRating" :key="dropdown.id">
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[dropdownOpenRating ? 'open' : '', 'dropdown__header__icon']"
          @click="dropdownOpenRating = !dropdownOpenRating"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenRating">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div class="dropdown" v-for="dropdown in dropdownEvents" :key="dropdown.id">
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[dropdownOpenEvents ? 'open' : '', 'dropdown__header__icon']"
          @click="dropdownOpenEvents = !dropdownOpenEvents"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenEvents">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownQuestions"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenQuestions ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenQuestions = !dropdownOpenQuestions"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenQuestions">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownReplies"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[dropdownOpenReplies ? 'open' : '', 'dropdown__header__icon']"
          @click="dropdownOpenReplies = !dropdownOpenReplies"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenReplies">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div class="dropdown" v-for="dropdown in dropdownVideo" :key="dropdown.id">
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[dropdownOpenVideo ? 'open' : '', 'dropdown__header__icon']"
          @click="dropdownOpenVideo = !dropdownOpenVideo"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenVideo">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>

    <div
      class="dropdown"
      v-for="dropdown in dropdownVideobroadcasts"
      :key="dropdown.id"
    >
      <div class="dropdown__header">
        <div class="dropdown__header__title">{{ dropdown.headerTitle }}</div>
        <div class="dropdown__header__description">
          {{ dropdown.headerDescription }}
        </div>
        <div
          :class="[
            dropdownOpenVideobroadcasts ? 'open' : '',
            'dropdown__header__icon',
          ]"
          @click="dropdownOpenVideobroadcasts = !dropdownOpenVideobroadcasts"
        >
          <svg>
            <use xlink:href="/dist/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </div>

      <div class="dropdown__content" v-show="dropdownOpenVideobroadcasts">
        <div class="dropdown__content__description">
          {{ dropdown.contentDescription }}
        </div>
        <span class="dropdown__content__title">{{
          dropdown.contentTitle
        }}</span>
        <div
          v-for="(notification, index) in dropdown.notifications"
          :key="notification.id"
        >
          <div class="notification">
            <span class="notification__title">{{ notification.title }}</span>
            <span class="notification__status">{{
              notification.status ? "Вкл." : "Выкл."
            }}</span>
            <div class="notification__checkbox ct-checkbox">
              <label>
                <input
                  :checked="notification.status"
                  type="checkbox"
                  v-model="notification.status"
                  @input="changeStatus(notification)"
                />
                <span></span>
              </label>
            </div>
          </div>
          <hr v-show="index != dropdown.notifications.length - 1" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  notifications,
  dropdownMessages,
  dropdownComments,
  dropdownReminders,
  dropdownReviews,
  dropdownPosition,
  dropdownRating,
  dropdownEvents,
  dropdownQuestions,
  dropdownReplies,
  dropdownVideo,
  dropdownVideobroadcasts,
  changeStatus,
} from "../api/notification";
export default {
  el: "#notifications-vue",

  data: () => {
    return {
      notifications: notifications(),
      dropdownMessages: dropdownMessages(),
      dropdownComments: dropdownComments(),
      dropdownReminders: dropdownReminders(),
      dropdownReviews: dropdownReviews(),
      dropdownPosition: dropdownPosition(),
      dropdownRating: dropdownRating(),
      dropdownEvents: dropdownEvents(),
      dropdownQuestions: dropdownQuestions(),
      dropdownReplies: dropdownReplies(),
      dropdownVideo: dropdownVideo(),
      dropdownVideobroadcasts: dropdownVideobroadcasts(),
      changeStatus,
      dropdownOpenMessages: false,
      dropdownOpenComments: false,
      dropdownOpenReminders: false,
      dropdownOpenReviews: false,
      dropdownOpenPosition: false,
      dropdownOpenRating: false,
      dropdownOpenEvents: false,
      dropdownOpenQuestions: false,
      dropdownOpenReplies: false,
      dropdownOpenVideo: false,
      dropdownOpenVideobroadcasts: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.notifications {
  .main-notifications {
    background-color: var(--ct-white);
    padding: 2rem 3rem;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    border-radius: 0.5rem;
    &__item {
      .notification {
        display: grid;
        grid-template-columns: 1fr max-content max-content;
        align-items: center;
        column-gap: 2rem;
        &__title {
          grid-area: 1/1/2/2;
          font-weight: 500;
          font-size: var(--text-14);
          line-height: 1.6rem;
        }
        &__description {
          grid-area: 2/1/3/2;
          font-weight: 300;
          font-size: var(--text-11);
          line-height: 1.3rem;
          opacity: 0.7;
        }
        &__status {
          grid-area: 1/2/3/3;
          font-weight: 400;
          font-size: var(--text-14);
          line-height: 2.6rem;
          opacity: 0.7;
        }
        &__checkbox {
          grid-area: 1/3/3/4;
        }
      }
    }
  }
  .dropdown + .dropdown {
    margin-top: 1rem;
  }
  .dropdown {
    background-color: var(--ct-white);
    padding: 2rem 3rem;
    border-radius: 0.5rem;
    &__header {
      display: grid;
      grid-template-columns: 1fr max-content max-content;
      align-items: center;
      &__title {
        grid-area: 1/1/2/2;
        font-weight: 500;
        font-size: var(--text-14);
        line-height: 1.6rem;
      }
      &__description {
        grid-area: 2/1/3/2;
        font-weight: 300;
        font-size: var(--text-11);
        line-height: 1.3rem;
        opacity: 0.7;
      }
      &__icon {
        grid-area: 1/2/3/3;
        transition: transform 0.5s;
        svg {
          width: 1.2rem;
          height: 1.5rem;
        }

        &.open {
          transition: transform 0.5s;
          transform: rotate(180deg);
        }
      }
    }

    &__content {
      &__description {
        margin: 2rem 0 1rem 0;
        font-weight: 300;
        font-size: var(--text-11);
        line-height: 1.3rem;
        opacity: 0.7;
      }
      &__title {
        font-weight: 400;
        font-size: var(--text-14);
      }
      hr {
        background: var(--ct-dark);
        opacity: 0.1;
        width: 100%;
        height: 0.1rem;
        margin-top: 1.5rem;
      }
      .notification {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: 1.5rem;
        &__title {
          flex-grow: 1;
          font-weight: 400;
          font-size: var(--text-14);
          line-height: 2.6rem;
          opacity: 0.7;
        }
        &__status {
          font-weight: 400;
          font-size: var(--text-14);
          line-height: 2.6rem;
          opacity: 0.7;
        }
        &__checkbox {
          margin-left: 2rem;
        }
      }
    }
  }
}
</style>


