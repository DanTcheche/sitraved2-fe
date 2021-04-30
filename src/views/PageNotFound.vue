<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="transparent" flat>
            <div class="display-3 mt-5">Page not found.</div>
            <div class="grey--text lighten-5">
              The page you are trying to get to never existed in this reality,
              or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2">
              <br />
              <br />Try going back to home page and repeating your action. Or,
              contact helpdesk for support.
              <router-link :to="{ name: 'RecommendationsLanding' }" >
                Go to landing.
              </router-link>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style scoped>

</style>
