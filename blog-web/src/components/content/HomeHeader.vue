<script setup lang="ts">
import { useSystemStore } from "@/stores";
import { storeToRefs } from "pinia";
import { queryConfigBanner } from "@/api/services/config"

interface IBanner {
  id: number;
  sort: number;
  url: string;
}
const banner = ref<{
  list: IBanner[],
  title: string
}>({
  list: [],
  title: ""
})
const { clientSize } = storeToRefs(useSystemStore());

const headerRef = ref<HTMLHeadElement>();

watch(
  () => clientSize.value.clientHeight,
  () => setHeaderHeight()
);

onMounted(() => {
  queryConfigBanner().then(({ data }) => {
    const b = JSON.parse(data.banner)
    banner.value.list = b?.list || []
    banner.value.title = b?.title || ""
  })
  setHeaderHeight();
  let startingPoint: number;
  headerRef.value?.addEventListener("mouseenter", (e) => {
    startingPoint = e.clientX;
  });
  headerRef.value?.addEventListener("mouseout", (e) => {
    headerRef.value?.classList.remove("moving");
    headerRef.value?.style.setProperty("--percentage", "0.5");
  });
  headerRef.value?.addEventListener("mousemove", (e) => {
    let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;
    headerRef.value?.style.setProperty("--percentage", `${percentage}`);
    headerRef.value?.classList.add("moving");
  });
});

//根据可视窗口高度，动态改变首图大小
const setHeaderHeight = () => {
  headerRef.value!.style.height = clientSize.value.clientHeight + "px";
};

//平滑滚动至正文部分
const scrollToMain = () => {
  window.scrollTo({ top: clientSize.value.clientHeight, behavior: "smooth" });
};
</script>

<template>
  <header ref="headerRef">
    <div class="view">
      <div v-for="(b, index) in banner.list" :class="`bg${index + 1}`" :style="{ backgroundImage: 'url(' + b.url + ')' }">
      </div>
    </div>
    <div class="text-malfunction" :data-word="banner.title">
      {{ banner.title }}
      <div class="line"></div>
    </div>
    <div class="wrapper">
      <i class="iconfont icon-down" @click="scrollToMain"></i>
    </div>
    <div class="wave1"></div>
    <div class="wave2"></div>
  </header>
</template>

<style scoped>
header {
  --percentage: 0.5;
  user-select: none;
}

.view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  transform: translatex(calc(var(--percentage) * 100px));
}

.view div {
  background-position: center center;
  background-size: cover;
  position: absolute;
  width: 110%;
  height: 100%;
}

.view .bg1 {
  z-index: 10;
  opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

.view .bg2 {
  z-index: 20;
  opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

.view .bg3 {
  left: -10%;
}

header .view,
header .bg1,
header .bg2 {
  transition: 0.2s all ease-in;
}

header.moving .view,
header.moving .bg1,
header.moving .bg2 {
  transition: none;
}

.text-malfunction {
  position: absolute;
  padding: 0 4px;
  top: 40%;
  left: 50.5%;
  transform: translate(-50%, -50%) scale(2.5);
  font-size: 34px;
  font-family: sans-serif;
  color: transparent;
}

.line {
  position: absolute;
  width: calc(100% - 8px);
  left: -0.5px;
  height: 1px;
  background: black;
  z-index: 50;
  animation: lineMove 5s ease-out infinite;
}

.text-malfunction:before,
.text-malfunction:after {
  content: attr(data-word);
  position: absolute;
  top: 0;
  line-height: 50px;
  overflow: hidden;
  filter: contrast(200%);
}

.text-malfunction:before {
  left: 0;
  color: red;
  text-shadow: 1px 0 0 red;
  z-index: 30;
  animation: malfunctionAni 0.95s infinite;
}

.text-malfunction:after {
  left: -1px;
  color: cyan;
  text-shadow: -1px 0 0 cyan;
  z-index: 40;
  mix-blend-mode: lighten;
  animation: malfunctionAni 1.1s infinite 0.2s;
}

@keyframes lineMove {
  9% {
    top: 38px;
  }

  14% {
    top: 8px;
  }

  18% {
    top: 42px;
  }

  22% {
    top: 1px;
  }

  32% {
    top: 32px;
  }

  34% {
    top: 12px;
  }

  40% {
    top: 26px;
  }

  43% {
    top: 7px;
  }

  99% {
    top: 30px;
  }
}

@keyframes malfunctionAni {
  10% {
    top: -0.4px;
    left: -1.1px;
  }

  20% {
    top: 0.4px;
    left: -0.2px;
  }

  30% {
    left: 0.5px;
  }

  40% {
    top: -0.3px;
    left: -0.7px;
  }

  50% {
    left: 0.2px;
  }

  60% {
    top: 1.8px;
    left: -1.2px;
  }

  70% {
    top: -1px;
    left: 0.1px;
  }

  80% {
    top: -0.4px;
    left: -0.9px;
  }

  90% {
    left: 1.2px;
  }

  100% {
    left: -1.2px;
  }
}

.wrapper {
  position: absolute;
  width: 100px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 26px;
  z-index: 100;
}

.wrapper i {
  font-size: 60px;
  color: #ddd;
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  top: 55px;
  left: 20px;
  animation: opener 0.5s ease-in-out alternate infinite;
  transition: opacity 0.2s ease-in-out, transform 0.5s ease-in-out 0.2s;
}

.wrapper i:hover {
  opacity: 1;
}

@keyframes opener {
  100% {
    top: 65px;
  }
}

.wave1,
.wave2 {
  position: absolute;
  bottom: 0;
  transition-duration: 0.4s, 0.4s;
  z-index: 80;
}

.wave1 {
  background: url("/img/header/wave1.png") repeat-x;
  height: 75px;
  width: 100%;
}

.wave2 {
  background: url("/img/header/wave2.png") repeat-x;
  height: 90px;
  width: calc(100% + 100px);
  left: -100px;
}
</style>
