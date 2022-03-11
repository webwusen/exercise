import { defineComponent, ref, watch, reactive } from 'vue'
import Child from './child.vue'
import useList from '@/hook/list'

const Index = defineComponent({
  setup() {
    const value = ref(0)
    const list = reactive([1, 2, 3, 4, 5])
    const { list: l, changeList } = useList()
    const addFunc = () => {
      value.value += 1
      changeList(value.value)
    }
    watch(
      () => value.value,
      (val) => {
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
        <Child list={l} />
      </div>
    )
  }
})

export default Index
