<template>
  <main>
    <div
      v-if="timer"
      role="timer"
      :style="{
        'animation-duration': `${time}s`,
        'animation-direction': displayResult ? 'reverse' : 'normal',
      }"
    >
      <span class="sr-only">{{ timer }}</span>
    </div>
    <div
      class="operation"
      :class="{ 'operation--display-result': displayResult }"
      v-if="multiplication"
    >
      <span aria-live="polite">
        {{ multiplication.table }}×{{ multiplication.factor }}</span
      ><span
        class="result"
        aria-live="polite"
        :aria-label="
          $t('multiplications.equal', { result: multiplication.result })
        "
        :style="{ visibility: displayResult ? 'visible' : 'hidden' }"
        >={{ multiplication.result }}</span
      >
    </div>
  </main>
</template>

<script>
export default {
  name: "Multiplications",
  data() {
    return {
      factors: [2, 3, 4, 5, 6, 7, 8, 9],
      multiplication: null,
      multiplications: [],
      displayResult: false,
      times: {
        answer: 6,
        result: 3,
      },
      time: null,
      timer: 0,
      interval: null,
    };
  },
  methods: {
    waitFor(seconds) {
      this.time = seconds;
      this.timer = seconds;
      return new Promise((resolve) => {
        this.interval = setInterval(() => {
          this.timer = this.timer - 1;
          if (this.timer === 0) {
            clearInterval(this.interval);
            resolve();
          }
        }, 1000);
        document.addEventListener(
          "mouseup",
          () => {
            this.timer = 0;
            clearInterval(this.interval);
            resolve();
          },
          true
        );
        document.addEventListener(
          "keyup",
          () => {
            this.timer = 0;
            clearInterval(this.interval);
            resolve();
          },
          true
        );
      });
    },
    async start() {
      for (const multiplication of this.multiplications) {
        // display multiplication
        this.multiplication = multiplication;
        // wait for user to answer
        await this.waitFor(this.times.answer);
        // display result
        this.displayResult = true;
        // wait for next multiplication
        await this.waitFor(this.times.result);
        // hide result
        this.displayResult = false;
      }
      // end
      this.$router.push({
        name: "Home",
      });
    },
  },
  mounted() {
    const tables = Array.isArray(this.$route.query.tables)
      ? this.$route.query.tables
      : [this.$route.query.tables];

    // Generate multiplications list
    tables.forEach((table) => {
      table = parseInt(table, 10);
      this.factors.forEach((factor) => {
        this.multiplications.push({
          table,
          factor,
          result: table * factor,
        });
      });
    });

    // shuffle multiplications list
    for (let i = this.multiplications.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.multiplications[i], this.multiplications[j]] = [
        this.multiplications[j],
        this.multiplications[i],
      ];
    }

    // start
    this.start();
  },
};
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  justify-content: center;
  font-size: 24vw;
  user-select: none;
  font-weight: bold;
}

.result {
  opacity: 0;
  transition: flex 250ms ease-out, opacity 0s;
  width: auto;
  flex: 0;
  overflow: hidden;
}

.operation--display-result .result {
  flex: 1;
  opacity: 1;
  transition: flex 250ms ease-out, opacity 250ms ease-out 250ms;
}

[role="timer"] {
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  border-bottom: 0.3rem solid;

  animation-name: timerProgress;
  animation-timing-function: linear;
}

.afficher-resultat [role="timer"] {
  animation-direction: reverse;
}
@keyframes timerProgress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>
