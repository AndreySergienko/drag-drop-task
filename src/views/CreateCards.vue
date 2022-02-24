<template>
  <form @submit.prevent="createCards" class="form">
    <div class="form__title">Создать карточку</div>
    <div class="form__control">
      <input type="text" class="input" id="title" v-model="title">
      <label for="title" class="label">Заголовок</label>
    </div>
    <div class="form__control">
      <textarea  class="textarea" id="description" v-model="description"></textarea>
      <label class="label">
        Описание
      </label>
    </div>
    <div class="form__buttons">
      <button class="btn btn-primary" type="button" @click="toMain">Назад</button>
      <button class="btn btn-primary">Создать</button>
    </div>
  </form>
  <transition name="bounce">
    <TheValidate :t-error="tError" :d-error="dError" />
  </transition>
</template>

<script>
import {useRouter} from "vue-router"
import {ref} from "vue"
import TheValidate from "../components/TheValidate"

export default {
  setup() {
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const tError = ref(false)
    const dError = ref(false)

    const toMain = () => {
      router.push({name: 'cards'})
    }

    const createCards = async () => {
      tError.value = !title.value
      dError.value = !description.value
      if (tError.value || dError.value) return
      const cards = JSON.parse(localStorage.getItem('cards'))
      if (!cards) {
        localStorage.setItem('cards', JSON.stringify([{
          title: title.value,
          description: description.value
        }]))
      } else {
        cards.push({
          title: title.value,
          description: description.value
        })
        localStorage.setItem('cards', JSON.stringify(cards))
      }
      toMain()
    }

    return {
      toMain,
      title,
      description,
      createCards,
      dError,
      tError,
    }
  },
  components: {
    TheValidate
  }
}
</script>


<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
