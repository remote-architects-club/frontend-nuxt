<template>
  <p class="flex items-center">
    <v-icon icon="location" class="w-4 h-4" />{{ city }},
    {{ countryIso }}
  </p>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      required: true,
    },
    countryIso: {
      type: String,
      required: true,
    },
  },
}
</script>
