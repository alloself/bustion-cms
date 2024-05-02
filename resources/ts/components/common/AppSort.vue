<template>
    <div class="app-sort" :class="{'is-open': state.isOpen}">
        <div class="app-sort__current" @click="onClickHandler">
            <div class="app-sort__value">{{ currentSort?.text }}</div>
            <div class="app-sort__arrow">
                <div class="svg-icon">
                    <svg><use xlink:href="#arrow-down"></use></svg>
                </div>
            </div>
        </div>
        <div 
            v-if="state.sortList.length"
            class="app-sort__dropdown"
            :class="dropdownClass"
        >
            <ul>
                <li
                    v-for="(item, itemIndex) in state.sortList"
                    :key="itemIndex" 
                    :class="{'text-brand': item.current}"
                    @click="onSortChange(item)"
                >{{ item.text }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, computed } from 'vue'

interface SortItem {
    current: boolean,
    key: string,
    text: string,
    value: string
}

const props = withDefaults(
    defineProps<{
        sortItems?: SortItem[],
        dropdownClass?: string
    }>(),
    {
        sortItems: () => [],
        dropdownClass: 'left-0 origin-top-left md:left-auto md:right-0 md:origin-top-right'
    }
)

const emits = defineEmits(['change'])

const state = reactive<{
    isOpen: boolean,
    sortList: SortItem[],
}>({
    isOpen: false,
    sortList: []
})

const currentSort = computed<SortItem | undefined>(() => {
    return state.sortList.find(item => item.current)
})

function onSortChange(sortItem: SortItem) {
    state.isOpen = false

    if (sortItem.current) {
        return
    }

    state.sortList.forEach(item => item.current = false)
    sortItem.current = true
    emits('change', sortItem)
}

function onClickHandler() {
    state.isOpen = !state.isOpen
}

function onClickOutside(event: Event) {
    const target = event.target as HTMLElement

    if (!target.classList.contains('app-sort') && !target.closest('.app-sort')) {
        state.isOpen = false
    }
}

onMounted(() => {
    state.sortList = props.sortItems
    document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
})
</script>

<style lang="scss">
.app-sort {
    @apply 
        relative 
        z-[50]
        text-[16px] 
        font-semibold 
        tracking-[-0.32px]
        select-none
    ;

    &__current {
        -webkit-tap-highlight-color: transparent;
        @apply
            cursor-pointer
            flex 
            items-center 
            gap-2
        ;
    }

    &__arrow {
        @apply 
            w-6 
            h-6 
            rounded-full 
            border 
            border-neutral 
            flex 
            items-center 
            flex-none
            justify-center
            transition-all
            duration-200
        ;
    }

    &__dropdown {
        @apply 
            absolute
            top-[140%]
            transition-all
            duration-200
            px-5
            py-3
            rounded-xl
            shadow-lg
            border
            border-opacity-50
            scale-0
            opacity-0
            pointer-events-none
            border-neutral
            bg-white
        ;

        ul {
            @apply space-y-1;

            li {
                @apply 
                    cursor-pointer
                    whitespace-nowrap
                    hover:text-brand
                    [&.is-active]:text-brand
                ;
            }
        }
    }

    &.is-open {
        .app-sort__arrow {
            @apply 
                rotate-180
            ;
        }

        .app-sort__dropdown {
            @apply 
                scale-100
                opacity-100
                pointer-events-auto
            ;
        }
    }
}
</style>