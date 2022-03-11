import { reactive } from 'vue'
export default function useList() {
  const list = reactive<number[]>([])
  const changeList = (data: number) => {
    list.push(data)
    console.log(list)
  }
  return {
    list,
    changeList
  }
}
