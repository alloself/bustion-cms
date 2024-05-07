<nav class="mb-10 pb-2.5 border-b border-neutral-alpha">
  <div class="text-[12px] leading-[1.4] uppercase mb-5 text-dark">Категории:</div>
  <div class="text-[20px] font-semibold leading-[1.1] tracking-[-0.8px] space-y-1">
      @for ($i = 0; $i < 8; $i++)
      <appdetails>
          <template #title>
              <a href="#" class="text-dark decor-link">Категория {{ $i }}</a>
              <span class="text-[14px] text-dark text-opacity-40 ml-2">40</span>
          </template>
          <template #content>
              <ul class="px-5 py-2.5 text-[16px] font-semibold leading-[1.1] tracking-[-0.8px] space-y-1">
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Подвесные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">270</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Потолочные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">13</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Каскадные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">455</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Хрустальные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">78</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Большие</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">123</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">На штанге</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">4855</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Светодиодные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">1258</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Кольца</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">7</span>
                  </li>
              </ul>
          </template>
      </appdetails>
      @endfor
  </div>
</nav>

<nav class="mb-10 pb-2.5 border-b border-neutral-alpha">
  <div class="text-[12px] leading-[1.4] uppercase mb-5 text-dark">Категории:</div>
  <div class="text-[20px] font-semibold leading-[1.1] tracking-[-0.8px] space-y-1">
      @for ($i = 0; $i < 2; $i++)
      <appdetails>
          <template #title>
              <a href="#" class="text-dark decor-link">Категория {{ $i }}</a>
              <span class="text-[14px] text-dark text-opacity-40 ml-2">32</span>
          </template>
          <template #content>
              <ul class="px-5 py-2.5 text-[16px] font-semibold leading-[1.1] tracking-[-0.8px] space-y-1">
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Подвесные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">270</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Потолочные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">13</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Каскадные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">455</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Хрустальные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">78</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Большие</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">123</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">На штанге</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">4855</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Светодиодные</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">1258</span>
                  </li>
                  <li class="flex items-center">
                      <a href="#" class="decor-link">Кольца</a>
                      <span class="text-[14px] text-dark text-opacity-40 ml-2">7</span>
                  </li>
              </ul>
          </template>
      </appdetails>
      @endfor
  </div>
</nav>