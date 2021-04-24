<template>
<div>
<div>
    <v-app>
        <v-app-bar app color="primary" dark elevation="0">
            <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn @click="toggleTheme" color="primary" class="mr-2">{{buttonText}}</v-btn>
            <v-icon>mdi-account</v-icon>
        </v-app-bar>
        <v-navigation-drawer 
            v-model="sidebarMenu" 
            app
            floating
            :permanent="sidebarMenu"
            :mini-variant.sync="mini"
            >
            <v-list dense color="primary" dark>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon @click.stop="sidebarMenu = !sidebarMenu">mdi-chevron-left</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3 class="font-weight-thin">Vuetify Dashboard</h3>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list-item class="px-2" @click="toggleMini = !toggleMini">
                <v-list-item-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content class="text-truncate">
                    Jane Doeski
                </v-list-item-content>
                <v-btn icon small>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon color="primary">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-container class="px-4 py-0 fill-height" fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer class="py-3">
            <span class="ml-auto overline">Iatek &copy;2020</span>
        </v-footer>
    </v-app>
</div>

<v-container id="home">
    <div>
        <v-row>
            <v-col lg="4" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="cyan fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 cyan--text">
                            <h5 class="text-truncate text-uppercase">Sales</h5>
                            <h1>53</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="4" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="primary fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 primary--text">
                            <h5 class="text-truncate text-uppercase">Growth</h5>
                            <h1>23%</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="4" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="success fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 success--text">
                            <h5 class="text-truncate text-uppercase">Calls</h5>
                            <h1>213</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card height="170" scrollable elevation="4" class="overflow-y-auto">
                    <v-card-text>
                        <p>Codeply Kickstarter PBR 
                        asymmetrical lo-fi. Dreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan 
                        Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb 
                        readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy 
                        leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies, 
                        forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>
                        <a href="//www.codeply.com" target="_new">Codeply</a>
                        <p>Codeply Kickstarter PBR 
                        asymmetrical lo-fi. Dreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan 
                        Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb 
                        readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy 
                        leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies, 
                        forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="mx-auto text-center">
                    <v-card-title class="primary--text">
                        Sales
                    </v-card-title>
                    <v-sparkline 
                        :value="sparklineData" 
                        padding="18"
                        label-size="4"
                        color="cyan"
                        :gradient="['#007bff','cyan']" 
                        :line-width="2"
                        :stroke-linecap="'round'">
                    </v-sparkline>
                    <v-card-actions class="py-4 justify-center">
                        <v-btn color="primary" to="/reports">View Report</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</v-container>

<v-container id="page">
    <v-row>
        <v-col cols="12" class="py-0">
            <h1 class="font-weight-light mb-0">Page {{ $route.path }}...</h1>
            <span class="overline">Add other views</span>
        </v-col>
    </v-row>
</v-container>

<v-container id="navbar"> 
    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i" :item="item" :to="item.href">
        {{ item.text }}
      </v-list-item>
    </v-list>
</v-container>
</div>
</template>

<script>
// import Drawer from '@/components/core/Drawer';
// import HelloWorld from '@/components/HelloWorld';
  export default {
    name: 'Home',

    components: {
        // Drawer,
        // HelloWorld,
    },
    data () {
      return {
        sparklineData: [
          423,
          446,
          675,
          510,
          590,
          610,
          423,
        ],
        sidebarMenu: true,
        toggleMini: false,
        items: [
          { title:"Home", href:"/", icon:"mdi-home-outline" },
          { title:"Detections", href:"/detections", icon:"mdi-shield-account" },
          { title:"Components", href:"/comp", icon:"mdi-palette-swatch" },
          { title:"Customers", href:"/customers", icon:"mdi-account-search-outline" },
          { title:"Orders", href:"/orders", icon:"mdi-bus-clock" },
          { title:"Settings", href:"/settings", icon:"mdi-settings-outline" },
        ],
      }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }     
    },
    computed: {
      mini() {
        return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
      },
      buttonText() {
          return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
      }
    },
  }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: black;
}

.theme--dark.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application ::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
  background: white;
}

</style>