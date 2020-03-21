<template>
  <section>
    <p class="mb-4">What about the <strong>tools</strong> you are using?*</p>

    <ul class="pl-4 mb-8">
      <li class="flex mb-2">
        <input type="radio" id="tools_rating_1" name="tools_rating" value="1" />
        <label for="tools_rating_1" class="ml-2"
          >😤It's just not working, it's hard to get work done</label
        >
      </li>
      <li class="flex mb-2">
        <input type="radio" id="tools_rating_2" name="tools_rating" value="3" />
        <label for="tools_rating_2" class="ml-2"
          >😐They're ok, but there is room for improvement</label
        >
      </li>
      <li class="flex mb-2">
        <input type="radio" id="tools_rating_3" name="tools_rating" value="5" />
        <label for="tools_rating_3" class="ml-2"
          >🤓They're great, we found the right tools and everything is running
          smoothly</label
        >
      </li>
    </ul>
    <p>Any other thoughts about the tools?</p>
    <textarea
      class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
      v-model="tools_thoughts"
      placeholder="Any tool in particular is a pain or a joy to use? Any other tools you wish your company would use?"
      maxlength="280"
    />
  </section>
</template>

<script>
export default {}
</script>

<style scoped></style>
