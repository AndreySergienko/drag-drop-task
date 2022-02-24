<template>
  <div class="modal" @click.prevent="closeModalOutSideDialog">
    <div class="modal__dialog">
      <div class="modal__title">{{ title }}</div>
      <div class="modal__description">{{ description }}</div>
      <div class="modal__buttons">
        <button class="btn btn-primary" type="button" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeModalOutSideDialog = (e) => {
      if (!e.target.classList.contains('modal') ) return
      emit('close', false)
    }

    const closeModal = () => {
      emit('close', false)
    }

    return {
      closeModalOutSideDialog,
      closeModal,
    }
  }
}
</script>
