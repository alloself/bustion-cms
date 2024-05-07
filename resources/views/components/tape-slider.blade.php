@props([
    'addClass',
])

<div class="swiper w-full js-tape-slider {{$addClass}}">
    <div class="swiper-wrapper">
        @for ($i = 1; $i < 12; $i++)
        <div class="swiper-slide w-[160px] py-3 px-2 md:w-[220px]">
            <div class="bg-neutral-100 relative group">
                <a href="/product-item" class="absolute left-0 right-0 top-0 bottom-0 z-[5]"></a>
                <img 
                    class="transition-all duration-300 group-hover:drop-shadow-lg w-full" 
                    src="/public/img/product-pic-{{ $i+1 }}.png" 
                    alt=""
                />
            </div>
        </div>
        @endfor
    </div>
</div>