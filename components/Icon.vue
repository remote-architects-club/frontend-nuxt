<template>
  <component :is="name" class="w-4 h-4 fill-current" />
</template>

<script>
import Edit from '~/assets/icons/edit.svg?inline'
import Location from '~/assets/icons/location.svg?inline'
import Link from '~/assets/icons/link.svg?inline'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {
    Edit,
    Location,
    Link
  }
}
</script>
