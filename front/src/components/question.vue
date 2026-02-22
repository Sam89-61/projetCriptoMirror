<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from 'lucide-vue-next'

type Question = {
  question: string;
  choix: { [key: string]: number };
}
defineProps<{
  question: Question;
  selectedValue?: number | null; 
}>()

const emit = defineEmits<{
  vote: [choice: number]
}>()

function vote(choice: number) {
  emit('vote', choice);
}
</script>

<template>
  <Card class="border border-white/10 bg-black/40 backdrop-blur-sm shadow-none p-6">
    <CardHeader class="px-0 pt-0 mb-4 ">
      <CardTitle class="text-2xl font-bold text-white leading-tight ">
        {{ question.question }}
      </CardTitle>
    </CardHeader>
    <CardContent class="px-0 flex flex-col gap-3">
      <div
        v-for="(value, key) in question.choix"
        :key="key"
        class="relative group"
      >
        <button
          @click="vote(value)"
          class="w-full flex items-center justify-between text-left h-auto py-4 px-6 text-base font-medium transition-all duration-300 rounded-xl border"
          :class="selectedValue === value
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100'
            : 'bg-white/5 border-white/10 text-slate-300 hover:border-emerald-500/50 hover:bg-white/10'"
        >
          <span class="flex-1">{{ key }}</span>

          <div class="ml-4 flex-none">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
              :class="selectedValue === value ? 'bg-emerald-400 border-emerald-400 scale-110' : 'border-white/30 bg-transparent'"
            >
              <Check v-if="selectedValue === value" class="w-3 h-3 text-black" />
            </div>
          </div>
        </button>
      </div>
    </CardContent>
  </Card>
</template>