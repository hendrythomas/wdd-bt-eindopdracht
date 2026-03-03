# wdd-bt-eindopdracht

[!NOTE] Dit is een schoolopdracht

## Check-outs

### 16/2/26

Vandaag heb ik een begin gemaakt door eerst direct de originele layout te kopiëren.
<br>
Ik heb zelf meer geleerd over input en de soorten lists. Ik heb `<dl>` gebruikt om de input en labels in 2 kolommen te verdelen.
<br>
Toch heb ik besloten om `<fieldset>` te gaan gebruiken, omdat dit minder syntax nodig heeft en ingebouwde functionaliteit heeft.
<br>
Morgen ga ik mijn HTML verbeteren en patterns onderzoeken en implementeren. Ik heb geleerd om pas achteraf aan responsiveness te werken.

### 17/2/26

Vandaag heb ik geleerd over input en validation. Ik heb dit met JavaScript geïmplementeerd voor de `date` inputs.
<br>
Ik heb met klasgenoten verschillende input types vergeleken. Ik heb bijvoorbeeld geleerd dat `tel` meer styling en validation toelaat dan `number`.
<br>
Morgen ga ik meer validation toevoegen en het overslaan van vragen implementeren.

### 20/2/26

Vandaag heb ik een gezamelijke review gedaan. Ik ga aan de volgende dingen werken:

*  `<fieldset>` met `counter` gebruiken in plaats van `<ol>`
*  Nadenken over het ontwerp

### 2/3/26

regex research
regex builder

## Ontwerp

### 22/2/26

Omdat dit een simpele website is heb ik alleen een literature study gedaan. https://ictresearchmethods.nl/library/literature-study/

De volgende eigenschappen leken mij uniek voor papieren formulieren haha dat rijmt:
*  Kortere zinnen
*  Instructies voor de gebruiker
*  Horizontale layout

uniek voor web
*  Uitgeschreven text en onder elkaar
*  Vragen overslaan
*  Pop up informatie

weet niet zeker (/ feedback?)
*  nummers

nummers: hebben een doel maar in dit geval ook titels

letters: hebben een doel
*  sowieso legend ipv list 
*  voor extra duidelijkheid maar niet per se nodig, dus css mag

### 27/2/26

valid/invalid style getest

### 2/3/26

javascript skipping, slapen, research

hulp van klasgenoot


### Patterns

Vragen overslaan

Hoewel het javascript gebruikt is het de beste oplossing
Niet mogelijk zonder javascript want required toggle heeft sowieso javascript nodig


Eén van de drie
  javascript

ontwerp: 
alles begint als hidden behalve volgende, first-of-type en :target, tenzij de huidige data-skip heeft

op deze manier worden vragen overgeslagen tot de target, wanneer een antwoord data-skip heeft  

javascript zorgt alleen voor required? dus het werkt ook zonder javascript

```
    hide if
    not:
      first child in first fieldset in first question, or:
      child in fieldset in question after interacted question
      and:
        first child in first fieldset, or:
        child in fieldset after interacted fieldset
        and:
          first child, or:
          child after interacted child
```