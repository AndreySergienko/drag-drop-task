<template>
  <div class="menu">
    <div class="checkbox-container">
      {{ getButtonName }}
      <div class="checkbox">
        <input type="checkbox" id="unchecked" class="checkbox-input" @click="toggleDraggable"/>
        <label for="unchecked" class="checkbox-label"></label>
      </div>
      </div>
    <router-link class="btn" :to="{name: 'create'}">Добавить</router-link>
  </div>
  <div class="cards">
    <div class="cards__inner" @drop="onDragDrop" @dragover.prevent @dragleave.prevent>
      <div class="cards__item" v-for="(card, idx) in getCards" @dragstart="onDragStart($event, idx)" :draggable="getIsDraggable" :data-id="idx" @click="openModal(card, idx)">
        <div class="cards__title">{{card.title}}</div>
        <div class="cards__description">{{ card.description }}</div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="bounce">
      <ModalCard :description="cardDescription" :title="cardTitle" v-if="getIsOpenModal" @close="closeModal" />
    </transition>
  </teleport>
</template>

<script>
import {computed, onBeforeMount, ref} from "vue"
import ModalCard from "../components/ModalCard"

export default {
  setup() {
    const cards = ref([])
    const selectElementId = ref(null)
    const isDraggable = ref(false)
    const isOpenModal = ref(false)
    const cardTitle = ref('')
    const cardDescription = ref('')
    const body = document.querySelector('body')

    onBeforeMount(() => {
      cards.value = JSON.parse(localStorage.getItem('cards'))
    })

    const getCards = computed(() => {
      return cards.value
    })

    const getIsOpenModal = computed(() => {
      if (isOpenModal.value) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
      return isOpenModal.value
    })

    const  getIsDraggable = computed(() => {
      return isDraggable.value
    })

    const getButtonName = computed(() => {
      return isDraggable.value ? 'Drag on' : 'Drag off'
    })

    const getIsDrag = computed(() => {
      return isDraggable.value
    })

    const toggleDraggable = () => {
      return isDraggable.value = !isDraggable.value
    }

    function arrayMove(arr, fromIndex, toIndex) {
      let element = arr[fromIndex]
      arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, element)
      localStorage.setItem('cards', JSON.stringify(arr))
    }

    const onDragStart = (e, idx) => {
      selectElementId.value = idx
    }

    const onDragDrop = (e) => {
      arrayMove(cards.value, selectElementId.value, e.target.dataset.id)
    }

    const openModal = (card, idx) => {
      isOpenModal.value = true
      cardTitle.value = card.title
      cardDescription.value = card.description
    }

    const closeModal = (boolean) => {
      isOpenModal.value = boolean
    }


    return {
      getButtonName,
      getIsDrag,
      getCards,
      onDragStart,
      onDragDrop,
      toggleDraggable,
      getIsDraggable,
      openModal,
      cardDescription,
      cardTitle,
      getIsOpenModal,
      closeModal
    }
  },
  components: {
    ModalCard
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
