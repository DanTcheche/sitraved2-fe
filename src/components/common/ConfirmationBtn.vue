<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template #activator="{ on }">
            <v-btn v-bind="$attrs" v-on="on" class="recommendation-card-like-button">
                <slot />
            </v-btn>
        </template>
        <v-card>
            <v-card-text class="confirmation-btn__text">
                {{ text }}
            </v-card-text>

            <v-divider />

            <v-card-actions>
                <v-spacer />
                <v-btn text @click="dialog = false">
                    {{ cancelCaption }}
                </v-btn>
                <v-btn :color="confirmColor" outlined @click="dialog = false" v-on="$listeners">
                    {{ confirmCaption }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationBtn",
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: "Are you sure you want to continue?"
    },
    cancelCaption: {
      type: String,
      default: "No"
    },
    confirmCaption: {
      type: String,
      default: "Yes"
    },
    confirmColor: {
      type: String,
      default: "warning"
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    outlined() {
      if (this.$attrs.outlined !== undefined) {
        return this.$attrs.outlined;
      }
      return true;
    }
  }
};
</script>
