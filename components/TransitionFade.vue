<template functional>
  <transition
    appear
    appear-active-class="animated fadeIn"
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <slot />
  </transition>
</template>
