import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

declare const Typewriter: any;

enum KEY_CODE
{
    RIGHT_ARROW = 39,
    LEFT_ARROW  = 37
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements AfterViewInit
{
    @ViewChild('element') element!: ElementRef<HTMLDivElement>;

    @HostListener('window:keydown', [ '$event' ])
    keyEvent ( event: KeyboardEvent )
    {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW)
        {
            this.next();
        }

        if (event.keyCode === KEY_CODE.LEFT_ARROW)
        {
            this.prev();
        }
    }

    @HostListener('click')
    next ()
    {
        if (this.activeSlideIndex === this.slides.length - 1)
        {
            return;
        }
        this.activeSlideIndex++;
        this.update();
    }

    prev ()
    {
        if (this.activeSlideIndex === 0)
        {
            return;
        }
        this.activeSlideIndex--;
        this.update();
    }

    slides = [
        '~$ ',
        'qui suis-je ?',
        'samuel asensi',
        'un développeur',
        'codeur, programmeur, informaticien, concepteur...',
        'geek bedonnant ----------------- hacker révolutionnaire\n                       ↑\n                       |\n                       |\n                      moi',
        'un écrivain',
        'lu dans le monde entier',
        'des œuvres distribuées en plusieurs millions d\'exemplaires',
        'lu par des machines',
        '01000010010100100011111111101011001010100011110100\n10000000011000100001000000011100101001011001000011\n11111010110111000100001011111011001110000111000100\n00101001011101110111011000000001101001000010100000\n00000110110111110010011011101001001111001001011011\n01100110111011011001010100000110100101010011110111\n10010011101010101001010100000111000111001110100011\n00001000000110010011001110100010110001111010010101\n10100100001101100111010011100010000001111110001011\n10110011001010111000000010011110101111110101000000',
        'const date = new Date();\n\nconst conferenceIsToday = (\n    date.getDate() === 13\n    && date.getMonth() === 12\n    && date.getFullYear() === 2021\n);\n\nif (conferenceIsToday) {\n    console.log(\'hello ESAD !\');\n}',
        '<span class="mtk9 mtki">const</span><span class="mtk1"> </span><span class="mtk12">date</span><span class="mtk1"> </span><span class="mtk7">=</span><span class="mtk1"> </span><span class="mtk7">new</span><span class="mtk1"> </span><span class="mtk5 mtku">Date</span><span class="mtk1">();</span><br><span> </span><br><span class="mtk9 mtki">const</span><span class="mtk1"> </span><span class="mtk5">conferenceIsToday</span><span class="mtk1"> </span><span class="mtk7">=</span><span class="mtk1"> (</span><br><span class="mtk1">    </span><span class="mtk12">date</span><span class="mtk1">.</span><span class="mtk5">getDate</span><span class="mtk1">() </span><span class="mtk7">===</span><span class="mtk1"> </span><span class="mtk4">13</span><br><span class="mtk1">    </span><span class="mtk7">&&</span><span class="mtk1"> </span><span class="mtk12">date</span><span class="mtk1">.</span><span class="mtk5">getMonth</span><span class="mtk1">() </span><span class="mtk7">===</span><span class="mtk1"> </span><span class="mtk4">12</span><br><span class="mtk1">    </span><span class="mtk7">&&</span><span class="mtk1"> </span><span class="mtk12">date</span><span class="mtk1">.</span><span class="mtk5">getFullYear</span><span class="mtk1">() </span><span class="mtk7">===</span><span class="mtk1"> </span><span class="mtk4">2021</span><br><span class="mtk1">);</span><br><span> </span><br><span class="mtk7">if</span><span class="mtk1"> (</span><span class="mtk12">conferenceIsToday</span><span class="mtk1">) {</span><br><span class="mtk1">    </span><span class="mtk9 mtki">console</span><span class="mtk1">.</span><span class="mtk9">log</span><span class="mtk1">(</span><span class="mtk6">\'hello ESAD !\'</span><span class="mtk1">);</span><br><span class="mtk1">}</span><br>',
        '1 2 3 4 5 6 7 8 9 0 ° +\nA Z E R T Y U I O P ¨ $\nQ S D F G H J K L M ù *\n< W X C V B N , ; : ! ^',
        'root\n├── images\n│   ├── image1.png\n│   ├── image2.png\n│   └── ...\n├── app\n│   ├── index.html\n│   ├── index.js\n│   └── ...\n└── ...',
        'concrètement ?',
        'je crée des sites web',
        'dessinés par des designers',
        'mon travail est invisible',
        'client <===> designer <===> développeur',
        'mon parcours ?',
        'master design graphique à l\'isdaT',
        'premières expériences professionnelles pendant mes études',
        'entrée sur le marché du travail',
        'master informatique en alternance',
        'maintenant développeur indépendant',
        'où est la créativité ?',
        'design <===> développement',
        'workshop',
    ].map(( it ) => it.split('\n').join('<br>'));

    activeSlideIndex = 0;

    constructor ()
    {
    }

    typewriter: any;

    ngAfterViewInit ()
    {
        this.update();
    }

    update ()
    {
        const content = this.slides[ this.activeSlideIndex ];
        if (this.typewriter)
        {
            this.typewriter.stop();
        }

        this.typewriter = new Typewriter(this.element.nativeElement, {
            delay: Math.min(75, 1500 / content.length),
            cursor: '_',
            // @ts-ignore
            stringSplitter: content.includes('&') && (it => it.replace(/&amp;/g, '&').split('')),
        });
        this.typewriter.typeString(content);
        this.typewriter.start();
    }
}
