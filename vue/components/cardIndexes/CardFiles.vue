<template>
  <div class="files">
    <ul class="files__list">
      <li v-for="files_item in files_list" :key="files_item.id" class="files__list__item">
        <card-file :files="files_item"/>
      </li>
    </ul>
  </div>
</template>
<script>
import CardFile from "./CardFile.vue";
export default {
  name: "CardFiles",
  props: {},
  components: { CardFile },
  data: () => {
    return {
        files_list: [
            {
                id: 1,
                name: "И нет сомнений, что предприниматели в сети интернет формируют.pdf",
                size: "28,3 MB",
                date: "21.01.2021",
                type: "PDF"

            },
            {
                id: 2,
                name: "И нет сомнений, что предприниматели в сети интернет формируют.txt",
                size: "28,3 MB",
                date: "21.01.2021",
                type: "TXT"

            },
        ]
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.files {
  border-radius: 0.5rem;

  &__list {
    &__item {
      padding: 1rem 1rem 1rem 3rem;
      &:hover {
        background-color: var(--ct-blue-01);
      }
    }
  }
}
</style>
