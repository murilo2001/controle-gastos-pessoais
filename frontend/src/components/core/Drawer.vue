<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      clipped
      dark
      :expand-on-hover="expandOnHover"
      mobile-break-point="960"
      mini-variant-width="80"
      width="300"
      v-bind="$attrs"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-content
            align="center"
            justify="center"
          >
            <router-link to='/'>
              <v-img
                width="150"
                height="50"
                src="@/assets/example_logo.png"
              />
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-1" style="margin-top:10px" />

        <v-list-item @click="navegateTo('Home')">
          <v-list-item-action>
            <v-icon>mdi-widgets</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navegateTo('Contabilidade')">
          <v-list-item-action>
            <v-icon>mdi-account-cash-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Contabilidade
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="mb-1" style="margin-top:10px" />
        <div style="position:fixed; bottom:0px; left: 50%; transform: translate(-50%, 0);">
          <div
            align="center"
            justify="center"
          >
            <v-btn
              color="white"
              dark
              icon
              min-width="0"
              href="https://www.linkedin.com/in/murilo-jose/" target="_blank"
            >
              <v-icon
                size="25"
                color="white"
              >
                mdi-linkedin
              </v-icon>
            </v-btn>
          </div>
        </div>
    </v-navigation-drawer>

    <v-content>
      <div class="expand-comp">
        <v-app-bar-nav-icon style="margin-left:10px; background-color:#efefef; border:solid; border-color:#e2e2e2; border-radius:50%; width:40px; height:40px;" @click.native="expandOnHover = !expandOnHover"></v-app-bar-nav-icon><span style="font-size: 1.25rem; margin-left:5px;">Dashboard</span>
      </div>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
          style="margin-top: -30px;"
        >
          <!-- <v-flex shrink style="width: 98%; margin-top:-55px; border:solid 1px blue;"> -->
            <router-view />
          <!-- </v-flex> -->
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>

export default {
    name: 'Drawer',

    data () {
      return {
        expandOnHover: true
      }
    },
    methods: {
      navegateTo(where) {
        this.$router.push({name: where});
      }
    }

}

</script>

<style scoped>
.expand-comp{
  height: 86px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
</style>