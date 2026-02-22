<script setup lang="ts">
import { ref } from 'vue'
import {
  NavigationMenu,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-vue-next'

const navigationItems = ref([
  { label: 'Accueil', path: '#/' },
  { label: 'Profils XAI', path: '#/xai' },
  { label: 'RGPD', path: '#/rgpd' },
])
</script>

<template>
  <header class="py-4 sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
    <div class="px-4">
      <div class="hidden xl:flex items-center gap-8 justify-between">
        <a href="/" class="text-2xl font-bold text-emerald-400 tracking-wider hover:text-emerald-300 transition">
          CryptoMirror
        </a>
        <NavigationMenu>
          <NavigationMenuList class="gap-4">
            <NavigationMenuItem
              v-for="item in navigationItems"
              :key="item.path"
            >
              <NavigationMenuLink
                as-child
                :class="navigationMenuTriggerStyle()"
              >
                <a :href="item.path" class="text-slate-300 hover:text-emerald-400 transition bg-transparent hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md px-3 py-2 text-sm font-medium">
                  {{ item.label }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="xl:hidden flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-emerald-400 tracking-wider">CryptoMirror</a>
        <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" class="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Menu :size="24" />
            </Button>
          </SheetTrigger>
          <SheetContent class="border-none bg-black/90 backdrop-blur-md">
            <SheetTitle class="sr-only">Menu de navigation</SheetTitle>
            <nav class="flex flex-col gap-4 mt-8">
              <a
                v-for="item in navigationItems"
                :key="item.path"
                :href="item.path"
                class="text-lg font-medium text-slate-300 hover:text-emerald-400 transition"
              >
                {{ item.label }}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>