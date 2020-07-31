<template functional>
  <!-- <router-link
    :to="`/add/${props.companyId}?editing=true`"
    class="btn btn-regular"
  > -->
  <router-link
    :to="`/add/company?id=${props.companyId}&editing=true`"
    class="btn btn-regular"
  >
    <v-icon icon="edit" class="w-4 h-4" /> edit company info
  </router-link>
</template>

<script>
export default {
  props: {
    companyId: {
      type: String,
      required: true,
    },
  },
}
</script>
