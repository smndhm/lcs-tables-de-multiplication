<template>
  <header>
    <h1>{{ $t("multiplication") }}</h1>
  </header>
  <main>
    <fieldset>
      <legend v-html="$t('home.legend')"></legend>
      <ul>
        <li v-for="table in tables" :key="table">
          <label :for="`table-${table}`"
            ><input
              type="checkbox"
              v-model="selectedTables"
              :value="table"
              :id="`table-${table}`"
              name="table"
              @change="updateSelectedTables"
            />
            <span>{{ table }}</span></label
          >
        </li>
        <li>
          <label for="table-all"
            ><input
              type="checkbox"
              id="table-all"
              ref="table-all"
              @change="allSelected"
            />
            <span>{{ $t("home.all") }}</span></label
          >
        </li>
      </ul>
    </fieldset>
  </main>
  <footer>
    <router-link
      class="btn"
      :class="{ 'btn--disabled': !selectedTables.length }"
      :to="{
        name: 'Multiplications',
        query: {
          tables: this.selectedTables,
        },
      }"
    >
      {{ $t("home.start") }}
    </router-link>
  </footer>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tables: [2, 3, 4, 5, 6, 7, 8, 9],
      selectedTables: [],
    };
  },
  mounted() {
    if (localStorage.getItem("selectedTables")) {
      this.selectedTables = JSON.parse(localStorage.getItem("selectedTables"));
    }
    this.updateSelectedTables();
  },
  methods: {
    storeSelectedTables() {
      localStorage.setItem(
        "selectedTables",
        JSON.stringify(this.selectedTables)
      );
    },
    allSelected() {
      if (this.$refs["table-all"].checked) {
        this.selectedTables = this.tables;
      } else {
        this.selectedTables = [];
      }
      this.storeSelectedTables();
    },
    updateSelectedTables() {
      this.$refs["table-all"].checked = false;
      this.$refs["table-all"].indeterminate = false;
      if (this.selectedTables.length === this.tables.length) {
        this.$refs["table-all"].checked = true;
      } else if (
        this.selectedTables.length < this.tables.length &&
        this.selectedTables.length !== 0
      ) {
        this.$refs["table-all"].indeterminate = true;
      }
      this.storeSelectedTables();
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: calc(var(--font-size) * 2);
}

fieldset {
  border: none;
  legend {
    font-size: calc(var(--font-size) * 1.125);
  }
}

ul {
  // Display
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  // Decoration
  list-style: none;

  li {
    label {
      input[type="checkbox"] {
        position: absolute;
        opacity: 0;
      }

      span {
        font-size: calc(var(--font-size) * 1.125);
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.2rem solid;
        border-radius: 1em;
        padding: 0 0.5em;
        min-width: 2em;
        height: 2em;
      }

      &:hover span,
      input[type="checkbox"]:focus + span {
        cursor: pointer;
        box-shadow: 0 0 0 0.4rem rgba(0, 0, 0, 0.1);
      }

      input[type="checkbox"]:active + span {
        box-shadow: 0 0 0 0.4rem rgba(0, 0, 0, 0.2);
      }

      input[type="checkbox"]:checked:not(:indeterminate) + span {
        box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.6);
      }

      input[type="checkbox"]:checked:focus + span,
      &:hover input[type="checkbox"]:checked + span {
        box-shadow: 0 0 0 0.4rem rgba(0, 0, 0, 0.6);
      }

      input[type="checkbox"]:checked:focus:active + span {
        box-shadow: 0 0 0 0.4rem rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
