<template>
  <div class="validate" v-if="tError || dError">
    <div class="validate__title">Упс!</div>
    <div class="validate__error" v-if="tError">Заголовок не может быть пустым</div>
    <div class="validate__error" v-if="dError">Описание не может быть пустым</div>
  </div>
</template>

<script>
export default {
  props: {
    tError: {
      type: Boolean,
      required: true
    },
    dError: {
      type: Boolean,
      required: true
    }
  }
}
</script>
