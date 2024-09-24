<template>
  <div class="parent">
      <NuxtPage />

      <div v-if="messages?.messages_length > 0" class="messages">
          <div v-if="messages.status == 'error'" class="message error" v-for="(error, index) in messages.messages">
              {{ error[0] }}
              <div class="icon" @click="removeError(index)">
                  <ClientOnly>
                      <font-awesome-icon :icon="['fas', 'xmark']" />
                  </ClientOnly>
              </div>
          </div>
          <div v-else class="message success">
              {{ messages.message }}
              <div class="icon" @click="removeSuccess()">
                  <ClientOnly>
                      <font-awesome-icon :icon="['fas', 'xmark']" />
                  </ClientOnly>
              </div>
          </div>
      </div>

  </div>
</template>

<script setup>

    import { useResponseMessagesStore } from '~/stores/useResponseMessagesStore';
    const messages = useResponseMessagesStore();

    // Remove Error Function
    function removeError(index) {

        delete messages.messages[index];

    }

    // Remove Success Function
    function removeSuccess() {

        messages.messages_length = 0;
        messages.message = null;

    }

</script>

<style lang="scss" scoped>

// Include Helpers
@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

// Parent Page
.parent {
    position: relative;
    .messages:not(:empty) {
        position: absolute;
        width: 300px;
        top: 15px;
        @include flex(column, 10px);
        .message {
            color: #fff;
            padding: 10px 8px 10px 15px;
            line-height: 24px;
            position: relative;
            position: relative;
            overflow: hidden;
            &:before {
              content: "";
              width: 100%;
              height: 5px;
              background-color: #fff;
              position: absolute;
              top: 0;
              right: 0;
              animation: message_time 5s forwards linear;
            }
            @keyframes message_time {
                0% {
                    right: 0;
                }
                100% {
                    right: -100%;
                }
            }
            &.success {
                background-color: #277284;
            }
            &.error {
                background-color: #f15;
            }
            > .icon {
                position: absolute;
                left: 7px;
                top: 5px;
                cursor: pointer;
            }
        }
    }
}

// Transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>