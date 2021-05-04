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
                height="47"
                src="@/assets/logo.png"
              />
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-1" style="margin-top:10px; padding-left:" />
    
        <v-list-item @click="showSubmenuPerfil = !showSubmenuPerfil">
          <v-list-item-action>
            <v-icon size="45">mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title-item-drawer">{{user.nome+' '+user.sobrenome}}</span>
            </v-list-item-title>
          </v-list-item-content>
          <span class="arrow-expand-btn">
            <v-icon v-if="showSubmenuPerfil == true" size="15">mdi-arrow-down-drop-circle-outline</v-icon>
            <v-icon v-else size="15">mdi-arrow-up-drop-circle-outline</v-icon>
          </span>
        </v-list-item>

        <div v-if="showSubmenuPerfil == true">
          <v-list-item @click="navegateTo('Perfil')">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title-item-drawer">Perfil</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navegateTo('Logout')">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title-item-drawer">Logout</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <!-- <v-list-item-avatar
          class="align-self-center"
          color="white"
        >
          <v-img
            src="@/assets/usuario_default.png"
          />
        </v-list-item-avatar> -->

        <v-divider class="mb-1" style="margin-top:10px" />

        <v-list-item @click="navegateTo('Home')">
          <v-list-item-action>
            <v-icon>mdi-widgets-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title-item-drawer">Home</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navegateTo('Contabilidade')">
          <v-list-item-action>
            <v-icon>mdi-trending-up</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title-item-drawer">Contabilidade</span>
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
                size="45"
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
        <v-app-bar-nav-icon 
          style="margin-left:10px; background-color:#efefef; border:solid; border-color:#e2e2e2; border-radius:50%; width:40px; height:40px;" 
          @click.native="expandOnHover = !expandOnHover">
        </v-app-bar-nav-icon>
        <span style="font-size: 1.25rem; margin-left:5px;">{{breadcrumb}}</span>
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
        expandOnHover: true,
        showSubmenuPerfil: false,
      }
    },

    methods: {
      navegateTo(where) {
        this.$router.push({name: where});
      }
    },

    computed: {
      user () {
        return JSON.parse(localStorage.getItem('user'));
      },
      breadcrumb() {
        let bc = this.$route.meta.breadcrumb;
        if (bc) {
          return bc[0].name;
        } else {
          return "";
        }
      }
    }
}

</script>

<style scoped>
.arrow-expand-btn {
    width: 20px;
    height: 20px;
    bottom:0px; 
    left: 50%; 
    transform: translate(-50%, 0);


}

.expand-comp {
  height: 86px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
}

.title-item-drawer {
  font-size: 12px;
  letter-spacing: 0.07em;
}
</style>