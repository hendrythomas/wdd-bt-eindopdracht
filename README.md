> [!IMPORTANT]
> Dit is een schoolopdracht

# Eindopdracht Browser Technology

*  Alleen getest op FireFox
*  Werkt zonder JavaScript
*  Werkt op mobiel

## Check-outs

### 16/2/26

Ik ben begonnen door eerst de originele layout van het document te proberen te kopiëren.
<br>
Ik heb zelf meer geleerd over input en de soorten lists. Ik heb eerst `<dl>` gebruikt om de input en labels in 2 kolommen te verdelen.
<br>
Hoewel het formulier nu responsive is, heb ik hierdoor de HTML in deze fase nog veel aan moeten passen.
<br>
Ik heb geleerd om pas achteraf aan responsiveness te werken. Morgen ga ik mijn HTML verbeteren en patterns onderzoeken.

### 17/2/26

Vandaag heb ik geleerd over input en validation. Ik heb dit met JavaScript geïmplementeerd voor de `date` inputs.
<br>
Ik heb met klasgenoten verschillende input types vergeleken. Ik heb bijvoorbeeld geleerd dat `tel` meer styling en validation toelaat dan `number`.
<br>
Morgen ga ik meer validation toevoegen en het overslaan van vragen implementeren.

### 20/2/26

Vandaag heb ik een gezamelijke review gedaan. Ik ga aan de volgende dingen werken:

*  `<fieldset>` met `counter` gebruiken in plaats van `<dl>`
*  Nadenken over het ontwerp

### 27/2/26

Vandaag heb ik geleerd over `:valid`/`:invalid`. Ik heb dit getest met tijdelijke styling.
<br>
Ik heb de HTML opnieuw geschreven met `fieldset`s.
<br>
Volgende keer ga ik verder met validation en de styling.

### 2/3/26

Ik heb geleerd en gelezen over regex.
<br>
Vandaag heb ik de pattern stappen overslaan geïmplementeerd met JavaScript. Ik heb dit gedocumenteerd onder [patterns](#JavaScript).
<br>
Er is een probleem met de selector die ik morgen op wil lossen.

### 3/3/26

Ik heb tips gekregen van de docent en klasgenoten. Ik heb vandaag geprobeerd de stappen overslaan pattern te implementeren met alleen CSS. Ik heb hiervoor `:valid`/`:invalid` gebruikt. Ik heb dit gedocumenteerd onder [patterns](#Methode-1).
<br>
Ik heb voor een BT opdracht meer geleerd over `input` en `label`.
<br>
Morgen ga ik verder met de pattern.

### 4/3/26

Ik meerdere CSS oplossingen geprobeerd. Uiteindelijk heb ik mijn originele JavaScript hergebruikt in CSS. Nu werkt de pattern in CSS, maar er is nog steeds hetzelfde probleem dat niet alles geselecteerd wordt.

### 9/3/26

Ik heb verder gewerkt aan de CSS voor de pattern.
<br>
Ik heb geleerd over progressive disclosure met een klasgenoot.
<br>
Morgen wil ik dit proberen te gebruiken om mijn probleem op te lossen.

### 10/3/26

Ik heb geprobeerd een indicator toe te voegen voor verplichte vragen. Er is een probleem dat dit na de input komt, in plaats van de label.
<br>
Ik heb progressive disclosure gebruikt. Hoewel de pattern voeldoet aan de eisen, zijn er nu ongewenste UX problemen.
<br>
Volgende keer zal ik kijken naar hoe ik de HTML kan aanpassen om deze problemen op te lossen; bijvoorbeeld door het gebruik van aparte labels en nesting.

### 13/3/26

Feedback:

*  Required tekst bovenaan, could have met javascript (niet content want niet vertaalbaar)
*  Mag html tags zoals span gebruiken in formulier
*  White space
*  Position fixed voor positie fixed

### Week 3?

### 16/3/26

html nesting en aparte labels
nieuwe css voor nieuwe html

## Ontwerp

Omdat dit een simpele website is heb ik een literature study gedaan. Ik heb de formulieren van NS (web) en de overheid vergeleken.

De volgende eigenschappen zijn uniek voor papieren formulieren:
*  Kortere zinnen, afkortingen
*  Instructies voor de gebruiker
*  Horizontale layout

De volgende eigenschappen zijn uniek voor web-formulieren:
*  Uitgeschreven text en onder elkaar
*  Vragen automatisch overslaan
*  Informatie popups

De rede dat ik nummers en titels gebruik in het formulier is omdat deze zorgen voor overzicht. In beide soorten formulieren is het bijvoorbeeld mogelijk dat gebruikers gerelateerde informatie moeten verzamelen.

### Thema

Het thema van het formulier moet gebaseerd zijn op NS. Ik hiervoor de website gebruikt van NS International, omdat ik dit serieuze thema meer vond passen bij het formulier.

### Validatie

niet voor dit ...

wel voor dit ...

*  datum
   *  max today
*  bsn
   *  min 8 max 9
*  

`*` styling

### Patterns

#### Stappen overslaan

Mijn criteria voor deze pattern waren:
*  De CSS moet herbruikbaar zijn (hetzelfde voor elk formulier)

##### Methode 1

Ik wil dat de volgende stappen worden weggehaald:

*  Stappen tussen skipper en target
*  Stappen in vragen tussen de vraag met de skipper en de vraag met de target
*  Stappen na de skipper
*  Stappen voor de target

In CSS zou dit er zo uitzien:

```css
&:not(:has(:target)) > .question:has([data-skip]:checked) ~ *,
> .question:has([data-skip]:checked) ~ .question:has(~ .question:has(:target)),
&:not(:has([data-skip]:checked)) > .question:has(~ .question:has(:target)) {

    &:not(:has(:target)) > fieldset:has([data-skip]:checked) ~ *,
    > fieldset:has([data-skip]:checked) ~ fieldset:has(~ fieldset:has(:target)),
    &:not(:has([data-skip]:checked)) > fieldset:has(~ fieldset:has(:target)) {

        &:not(:has(:target)) > :has([data-skip]:checked) ~ *,
        > :has([data-skip]:checked) ~ :has(~ :target),
        &:not(:has([data-skip]:checked)) > :has(~ :target) {

            pointer-events: none;
        }
    }
}
```

Helaas is :has() nesting nog niet ondersteund door browsers, dus moet ik een andere oplossing bedenken.

##### Methode 2

Mijn tweede idee was om HTML nesting te gebruiken:

```html
<fieldset class="step">
    <legend>Had de overledenen kinderen?</legend>
    <label>
        <input type="radio" name="had-kinderen" data-skip>
        Nee
    </label>
    <label>
        <input type="radio" name="had-kinderen">
        Ja
    </label>

    <fieldset class="step">...</fieldset>

    <fieldset class="step">...</fieldset>
</fieldset>

<fieldset class="step">...</fieldset>

<fieldset class="step">...</fieldset>
```

Dit kan dan worden gestyled met simpele CSS:

```css
&:not(:has(> label > :checked:not([data-skip]))) > .step {
    display: none;
}
```

Dit is het uiteindelijke ontwerp geworden.

##### JavaScript

###### Required

Voor progressive enhancement begint alles als optioneel. JavaScript zorgt ervoor dat de juiste stappen verplicht worden. Hiervoor heb ik `data` gebruikt:

1. Stappen zonder [data-required] required = false
2. Stappen met [data-required] required = true
3. Stappen die worden overgeslagen required = false

###### Clear input

#### één van de drie invullen

javascript

### Accessibility

debugger


## Bronnen

*  HTML:
*  CSS:
*  JavaScript: 
*  Theme: NS International https://www.nsinternational.com/nl/treintickets-v3/#/search/NLASC/NLSHL/20260401?pax=A&inboundDate=20260401
*  Research methods: ICT Research Methods https://ictresearchmethods.nl/library/literature-study/