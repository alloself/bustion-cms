<template>
    <div class="pb-2.5 border-b border-neutral-alpha">
        <div class="text-[12px] leading-[1.4] uppercase mb-5 text-dark">Параметры:</div>
        <div class="text-[20px] font-semibold leading-[1.1] tracking-[-0.8px] space-y-1">
            <appdetails v-for="(filter, filterIndex) in filtersList">
                <template #title="{ toggle }">
                    <div @click="toggle" class="cursor-pointer">{{ filter.name }}</div>
                </template>
                <template #content>
                    <template v-if="filterIndex === 0">
                        <div class="py-3">
                            <appselect
                                v-model="models.select"
                                :options="[
                                    { value: '', text: '' },
                                    { value: 'asc', text: 'Пункт 1' },
                                    { value: 'desc', text: 'Пункт 2' },
                                    { value: 'rating_asc', text: 'Пункт 3' },
                                    { value: 'rating_desc', text: 'Пункт 4' },
                                    { value: 'some_one', text: 'Пункт 5' },
                                    { value: 'some_two', text: 'Пункт 6' },
                                ]"
                            ></appselect>
                        </div>
                    </template>
                    <template v-else-if="filterIndex === 1">
                        <div class="grid grid-cols-2 gap-4 py-3">
                            <label class="inline-flex items-center gap-2">
                                <div class="app-checkmark w-[22px] h-[22px]">
                                    <input type="checkbox" name="some_checkbox" />
                                    <div class="svg-icon">
                                        <svg><use xlink:href="#checkmark"></use></svg>
                                    </div>
                                </div>
                                <div>Выбор 1</div>
                            </label>
                            <label class="inline-flex items-center gap-2">
                                <div class="app-checkmark w-[22px] h-[22px]">
                                    <input type="checkbox" name="some_checkbox" />
                                    <div class="svg-icon">
                                        <svg><use xlink:href="#checkmark"></use></svg>
                                    </div>
                                </div>
                                <div>Выбор 2</div>
                            </label>
                            <label class="inline-flex items-center gap-2">
                                <div class="app-checkmark w-[22px] h-[22px]">
                                    <input type="checkbox" name="some_checkbox" />
                                    <div class="svg-icon">
                                        <svg><use xlink:href="#checkmark"></use></svg>
                                    </div>
                                </div>
                                <div>Выбор 3</div>
                            </label>
                            <label class="inline-flex items-center gap-2">
                                <div class="app-checkmark w-[22px] h-[22px]">
                                    <input type="checkbox" name="some_checkbox" />
                                    <div class="svg-icon">
                                        <svg><use xlink:href="#checkmark"></use></svg>
                                    </div>
                                </div>
                                <div>Выбор 4</div>
                            </label>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex py-2 gap-4">
                            <div class="flex-1 min-w-0">
                                <input class="app-form-control" type="text" placeholder="от" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <input class="app-form-control" type="text" placeholder="до" />
                            </div>
                        </div>
                    </template>
                </template>
            </appdetails>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FiltersItem {
    name: string
}

const models = reactive({
    select: '',
})

const filtersList = ref<FiltersItem[]>([
    { name: 'Тип лампы' },
    { name: 'Стиль' },
    { name: 'Цоколь' },
    { name: 'Бренд' },
    { name: 'Цена' },
    { name: 'Материал' },
    { name: 'Цветовая температура, К' },
    { name: 'Световой поток, Лм' },
    { name: 'Мощность лампы, W' },
    { name: 'Количество ламп' },
    { name: 'Напряжение, W' },
])
</script>
