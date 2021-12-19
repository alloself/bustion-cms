<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Block extends Component
{

    public $block;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($block)
    {
        $this->block = $block;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $template = $this->block->template->name;

        return view("blocks.$template", [
            'block' => $this->block,
            'template' => $template
        ]);
    }
}
