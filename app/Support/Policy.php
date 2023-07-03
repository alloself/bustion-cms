<?php

namespace App\Support;

use Spatie\Csp\Directive;
use Spatie\Csp\Policies\Policy as BasePolicy;
use Spatie\Csp\Keyword;

class Policy extends BasePolicy
{
    public function configure()
    {
        $this
            ->addDirective(Directive::BASE, Keyword::SELF)
            ->addDirective(Directive::CONNECT, Keyword::SELF)
            ->addDirective(Directive::IMG, Keyword::SELF)
            ->addDirective(Directive::STYLE, Keyword::SELF)
            ->addDirective(Directive::FORM_ACTION, Keyword::SELF)
            ->addDirective(Directive::IMG, [
                Keyword::SELF,
                'data:',
                'blob:'
            ])
            ->addDirective(Directive::FONT, [
                Keyword::SELF,
                'data:',
                'blob:'
            ])
            ->addDirective(Directive::SCRIPT, [
                Keyword::SELF,
                'data:',
                'blob:'
            ])
            ->addDirective(Directive::STYLE, [
                Keyword::SELF,
                'data:',
                'blob:'
            ])
            ->addDirective(Directive::MEDIA, Keyword::SELF)
            ->addDirective(Directive::SCRIPT, [
                Keyword::SELF,
                'www.google.com',
                'www.gstatic.com'
            ])
            ->addDirective(Directive::OBJECT, Keyword::NONE)
            ->addDirective(Directive::FONT, 'fonts.gstatic.com')
            ->addDirective(Directive::SCRIPT, 'fonts.googleapis.com')
            ->addDirective(Directive::STYLE, 'fonts.googleapis.com');
    }
}
