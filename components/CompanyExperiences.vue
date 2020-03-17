<template>
  <div class="p-8 bg-white shadow-lg">
    <h2 class="mb-8 text-lg font-bold">
      What are other people saying about {{ company.name }}?
    </h2>
    <div>
      <div
        v-for="story in company.experiences"
        :key="story.id"
        class="mb-8 info-grid"
      >
        <p class="font-semibold">
          {{ $dateFns.format(new Date(story.created_at), 'MMMM do') }}
        </p>
        <p>
          {{ story.own_experience }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
