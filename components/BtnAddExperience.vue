<template functional>
  <!-- <router-link :to="`/add/${props.companyId}/personal`" class="btn btn-regular"> -->
  <router-link
    :to="`/add/personal?id=${props.companyId}`"
    class="btn btn-regular"
  >
    &plus; add your experience
  </router-link>
</template>

<script>
export default {
  props: {
    companyId: {
      type: String,
      required: true
    }
  }
}
</script>
