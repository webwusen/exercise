import { defineComponent, ref, watch, reactive } from 'vue'
import Child from './child.vue'

const Index = defineComponent({
  setup() {
    const value = ref(0)
    const list = reactive([1, 2, 3, 4, 5])
    const addFunc = () => {
      value.value += 1
    }
    watch(
      () => value.value,
      (val) => {
        console.log(val)
        list[list.length] = val
      },
      {
        immediate: true
      }
    )

    return () => (
      <div>
        <button onClick={addFunc}>add</button>
        <span>{value.value}</span>
        <Child list={list} />
      </div>
    )
  }
})

export default Index
