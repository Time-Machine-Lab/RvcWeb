<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted, watch } from 'vue'

export default defineComponent({
  props: {
    data: Array
  },
  setup(props) {
    const minWidth = ref(280)
    const columnCount = ref(5)
    const width = ref(0)
    const height = ref([0, 0, 0, 0, 0])
    const containerRef = ref<HTMLElement | null>(null)
    let containerElement: HTMLElement | undefined
    let childElements: HTMLCollection | undefined


    const sortElement = function () {
      height.value.fill(0, 0, 5)
      columnCount.value = 5
      if (containerRef.value) {
        containerElement = containerRef.value as HTMLElement
        childElements = containerElement.children as HTMLCollection
      }
      while (columnCount.value) {
        if (containerRef.value) {
          width.value = containerRef.value.clientWidth / columnCount.value - 10
        }
        if (width.value > minWidth.value) {
          break
        }
        columnCount.value--
      }
      for (let i = 0; i < (childElements?.length as number); i++) {
        if (childElements && containerElement) {
          const currentElement = childElements[i] as HTMLElement;
          currentElement.style.position = 'absolute';
          currentElement.style.display = 'inline-block';
          currentElement.style.width = width.value + 'px';
          const index = getMinIndex(height.value, columnCount.value);
          currentElement.style.left = index * (width.value + 10) + 'px';
          currentElement.style.top = height.value[index] + 'px';
          currentElement.style.visibility = 'visible';
          height.value[index] += currentElement.clientHeight + 10;
        }
      }
      let maxHeight = Math.max(...height.value)
      if(containerElement)containerElement.style.height = maxHeight + 'px'
    };

    const getMinIndex = function (height:any, len:any) {
      var min = 2147483647;
      var index = 0
      for (let i = 0; i < len; i++) {
        if (min > height[i]) {
          min = height[i]
          index = i
        }
      }
      return index
    }

    onMounted(() => {
      window.addEventListener('resize', function () { sortElement() })
    })
    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          console.log(newValue, oldValue);
          sortElement()
        }, 500);
      },
      { deep: true }

    )

    onUnmounted(() => {
      window.removeEventListener('resize', function () { sortElement() })
    })
    return { containerRef }
  }
})
</script>

<template>
  <div class="waterFall-container" ref="containerRef">
    <slot></slot>
  </div>
</template>
<style scoped>
.waterFall-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
  