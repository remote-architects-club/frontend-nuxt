<template>
  <div>
    <div v-if="wfh === 'yes'">
      <section class="mb-8">
        <p class="mb-4">
          In general, how would you rate your overall experience so far? *
        </p>
        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input type="radio" id="own_rating_1" name="own_rating" value="1" />
            <label for="own_rating_1" class="ml-2"
              >😭I hate it, wanna go back to the office</label
            >
          </li>
          <li class="flex mb-2">
            <input type="radio" id="own_rating_2" name="own_rating" value="3" />
            <label for="own_rating_2" class="ml-2"
              >🙄Meh, it's alright...</label
            >
          </li>
          <li class="flex mb-2">
            <input type="radio" id="own_rating_3" name="own_rating" value="5" />
            <label for="own_rating_3" class="ml-2">🥳I'm loving it!</label>
          </li>
        </ul>

        <p>Care to elaborate?</p>
        <textarea
          v-model="experience"
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          placeholder="Is everything working as expected? Are you having any difficulties? Anything you particular like/hate?"
          maxlength="280"
        />
        <p class="text-sm text-right">{{ experience.length }}/280</p>
      </section>
      <!-- TOOLS -->
      <personal-tools class="mb-8" />
      <section class="mb-8">
        <p class="mb-4">
          What do you think about <strong>your company's response</strong> to
          COVID-19?*
        </p>

        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_1"
              name="company_rating"
              value="1"
            />
            <label for="company_rating_1" class="ml-2"
              >🖕Too slow/not comprehensive enough</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_2"
              name="company_rating"
              value="3"
            />
            <label for="company_rating_2" class="ml-2"
              >👍It's ok, but there is room for improvement</label
            >
          </li>
          <li class="flex mb-2">
            <input
              type="radio"
              id="company_rating_3"
              name="company_rating"
              value="5"
            />
            <label for="company_rating_3" class="ml-2"
              >👏It was perfect, timely and efficient</label
            >
          </li>
        </ul>
        <p>
          Any other thoughts about it?
        </p>
        <textarea
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          v-model="company_policy_thoughts"
          placeholder="Any deserved praise? Or would you have done things differently?"
          maxlength="280"
        />
      </section>
    </div>

    <div v-if="wfh === 'no'">
      <section>
        <p class="mb-4">
          Why not? *
        </p>

        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input
              v-model="notWFH.reason"
              type="radio"
              id="not_wfh_reason_1"
              value="1"
            />
            <label for="not_wfh_reason_1" class="ml-2"
              >😔My position does not allow me to</label
            >
          </li>
          <li class="flex mb-2">
            <input
              v-model="notWFH.reason"
              type="radio"
              id="not_wfh_reason_2"
              value="3"
            />
            <label for="not_wfh_reason_2" class="ml-2"
              >😠My company/boss does not allow me to</label
            >
          </li>
          <li class="flex mb-2">
            <input
              v-model="notWFH.reason"
              type="radio"
              id="not_wfh_reason_3"
              value="5"
            />
            <label for="not_wfh_reason_3" class="ml-2"
              >😶I just prefer coming to the office</label
            >
          </li>
        </ul>
        <p>Care to elaborate?</p>
        <textarea
          v-model="notWFH.reasonText"
          class="w-full p-4 mt-2 transition duration-150 ease-in-out border border-black shadow-inner focus:outline-none focus:shadow-focus"
          placeholder="What about your position/job that does not let you work from home? Or why do you prefer going to the office?"
          maxlength="280"
        />
        <p class="text-sm text-right">{{ experience.length }}/280</p>
      </section>
      <section>
        <p class="mb-4">
          What about your colleagues? *
        </p>

        <ul class="pl-4 mb-8">
          <li class="flex mb-2">
            <input
              v-model="notWFH.colleagues"
              type="radio"
              id="not_wfh_colleagues_1"
              value="1"
            />
            <label for="not_wfh_colleagues_1" class="ml-2"
              >🖐Most of them are here as well</label
            >
          </li>
          <li class="flex mb-2">
            <input
              v-model="notWFH.colleagues"
              type="radio"
              id="not_wfh_colleagues_2"
              value="2"
            />
            <label for="not_wfh_colleagues_2" class="ml-2">✌️Half-half</label>
          </li>
          <li class="flex mb-2">
            <input
              v-model="notWFH.colleagues"
              type="radio"
              id="not_wfh_colleagues_3"
              value="3"
            />
            <label for="not_wfh_colleagues_3" class="ml-2"
              >✊I am mostly on my own</label
            >
          </li>
        </ul>
      </section>
      <!-- TOOLS -->
      <personal-tools
        v-if="notWFH.colleagues && notWFH.colleagues !== '1'"
        class="mb-8"
      />
    </div>
  </div>
  <div
    v-if="context.showActions"
    class="flex items-center justify-center mt-12"
  >
    <button
      type="submit"
      class="px-4 py-2 mx-4 font-bold transition duration-150 ease-in-out bg-white border-2 border-black shadow hover:bg-yellow-500 focus:outline-none focus:shadow-focus"
    >
      finish
    </button>
    <button
      @click="cancel"
      class="px-4 py-2 mx-4 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-black focus:outline-none focus:shadow-focus"
    >
      cancel
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
