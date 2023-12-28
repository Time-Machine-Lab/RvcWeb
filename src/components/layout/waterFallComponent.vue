<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    minWidth: {
      type: Number,
      default: 280
    }
  },
  setup(props) {

    const minWidth = ref<number>(props.minWidth)
    const columnCount = ref(6)
    const margin = ref(15)
    const width = ref(0)
    const height = ref([0, 0, 0, 0, 0])
    const containerRef = ref<HTMLElement | null>(null)
    let containerElement: HTMLElement | undefined
    let childElements: HTMLCollection | undefined


    const sortElement = function () {
      height.value.fill(0, 0, 6)
      columnCount.value = 6
      if (containerRef.value) {
        containerElement = containerRef.value as HTMLElement
        childElements = containerElement.children as HTMLCollection
      }
      while (columnCount.value) {
        if (containerRef.value) {
          width.value = containerRef.value.clientWidth / columnCount.value - margin.value
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
          currentElement.style.left = index * (width.value + margin.value) + 'px';
          currentElement.style.top = height.value[index] + 'px';
          currentElement.style.visibility = 'visible';
          height.value[index] += currentElement.clientHeight + margin.value;
        }
      }
      let maxHeight = Math.max(...height.value)
      if (containerElement) containerElement.style.height = maxHeight + 2 * margin.value + 'px'
    };

    const getMinIndex = function (height: any, len: any) {
      var min = 2147483647
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
      const observer = new MutationObserver(handleMutation)
      const container = containerRef.value
      const config = { childList: true, subtree: true }
      observer.observe(container as Node, config)
      if (childElements) {
        for (let i = 0; i < childElements.length; i++) {
          const imgElement = childElements[i].querySelectorAll('img');
          if (imgElement.length != 0) {
            for (let i = 0; i < imgElement.length; i++) {
              imgElement[0].addEventListener('onload', sortElement);

            }
          }
        }
      }
      sortElement()

    })
    // watch(
    //   () => childElements,
    //   (newValue, oldValue) => {
    //     setTimeout(() => {
    //       console.log(newValue, oldValue);
    //       sortElement()
    //     }, 500);
    //   },
    //   { deep: true,immediate: true }

    // )
    const handleMutation = function () { //mutationsList: any, observer: any
      // mutationsList.forEach((mutation:any) => {
      //   switch (mutation.type) {
      //     case "childList":
      //       /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
      //          mutation.removedNodes */
      //       setTimeout(function () {
      //         sortElement()
      //       }, 200)
      //       break;
      //     case "attributes":
      //       /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
      //          该属性之前的值为 mutation.oldValue */
      //       break;
      //   }
      // });
      setTimeout(function () {
        sortElement()
      }, 200)
    }
    onUnmounted(() => {
      window.removeEventListener('resize', function () { sortElement() })
      const observer = new MutationObserver(() => { })
      observer.disconnect()
      if (childElements) {
        for (let i = 0; i < childElements.length; i++) {
          const imgElement = childElements[i].querySelector('img');
          if (imgElement) {
            imgElement.removeEventListener('load', sortElement);
          }
        }
      }
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
  /* height: 100vh; */
}
</style>
  