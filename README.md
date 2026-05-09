# skillapp

**Codice delle Arti Minori** — un manuale tipografico per la pratica deliberata di piccole, specifiche abilità umane.

Online: <https://www.alessandropezzali.it/skillapp/>

---

## Cos'è

Diciassette abilità minuscole, antiche, peculiari — di quelle che richiedono dieci minuti concentrati al giorno per una stagione e lasciano un segno permanente sul corpo. La moltiplicazione mentale di numeri a due cifre. Il Sistema di Major per memorizzare cifre. L'algoritmo Doomsday. Il nodo bolina del marinaio. Il riconoscimento di intervalli musicali. Il cerchio a mano libera. Infilare un ago.

Ogni articolo del codice porta con sé:

- una breve descrizione poetica e un paragrafo di storia;
- un **protocollo di pratica** numerato — cinque istruzioni brevi, non di più;
- un **test di calibrazione** — uno strumento misurabile che produce un numero;
- un brano di **marginalia** in corsivo, un aforisma da tenere accanto;
- un **grafico** delle rilevazioni passate.

Otto dei diciassette articoli ospitano il test direttamente nella pagina (la moltiplicazione mentale propone cinque problemi casuali contro il cronometro; appaiono dieci quadranti analogici da leggere ad alta voce; il sintetizzatore Web Audio suona cinque intervalli da nominare; il timer nascosto da un minuto riferisce l'errore in secondi; e così via). Gli altri nove registrano rilevazioni manuali — secondi tenuti, nodi annodati, centri colpiti nel cestino.

L'applicazione tiene un **registro**. Il registro raggruppa per giorno, somma in calce, esporta come testo. Non ci sono streak, livelli, badge, punti. La rilevazione è l'unica valuta e il grafico è l'unica storia.

Un **Rito Quotidiano** sceglie tre articoli in modo deterministico a partire dalla data — gli stessi tre su ogni dispositivo per la stessa data — e assegna a ciascuno un timer di cinque minuti. Domani ne saranno tre altri.

## Cosa non è

- Non è Duolingo. Non ci sono gufetti verdi né alcuno streak quotidiano da spezzare.
- Non è Habitica. Non ci sono statistiche, missioni, comitive.
- Non è uno strumento di produttività. Cinque dei diciassette articoli non miglioreranno la tua carriera in nessuna direzione.
- Non è una checklist. Non si spunta. Si registra una rilevazione, oppure no.

## Come si usa

Apri `index.html` in un qualsiasi browser moderno. Tutto qui.

Per comodità in fase di sviluppo c'è uno script minimo:

```sh
python3 -m http.server 4173    # oppure:  npm start
# poi apri http://localhost:4173
```

Tutte le rilevazioni vivono nel `localStorage` del browser, sotto la chiave `skillapp.calibrations.v1`. Non lasciano mai il dispositivo. Non ci sono account, server, analytics, né richieste verso terze parti oltre a Google Fonts (che si possono bloccare senza conseguenze — al loro posto verranno caricati il monospaziato di sistema e un serif di ripiego).

## Lingue / Languages

L'app è bilingue, inglese e italiano. Un selettore discreto in alto a destra (**EN · IT**) permette di passare dall'una all'altra senza ricaricare la pagina. La scelta persiste nel `localStorage` sotto `skillapp.locale.v1`. Alla prima visita la lingua viene dedotta da `navigator.language`: l'italiano per i browser configurati su `it` o `it-*`, l'inglese altrimenti.

Tutto è tradotto: l'interfaccia, il colofone, le date, i diciassette articoli (descrizione, paragrafo storico, protocollo, marginalia, avvertenza), il brano di Stevenson per la prova di lettura, gli aforismi a margine. Le marginalie di Calvino, Vasari e Arrighi compaiono nella loro forma italiana autentica; le altre sono traduzioni curate.

L'architettura è semplice: ogni testo traducibile vive in `i18n.js` sotto la sua chiave di locale (`UI.en`, `UI.it`, `META.en`, `META.it`, `SKILL_TEXT.en`, `SKILL_TEXT.it`). Aggiungere una terza lingua si riduce a copiare la sezione inglese e tradurla. Le chiavi mancanti ricadono automaticamente sull'inglese, articolo per articolo.

The app is bilingual, English and Italian. A discreet **EN · IT** switch at the top-right toggles instantly without reloading. The choice persists in `localStorage` under `skillapp.locale.v1`; on first visit it follows `navigator.language`. Adding a third language means duplicating the English block in `i18n.js` and translating it; missing keys fall back to English per-key.

## File

```
index.html      pagina singola, gli script in fondo
style.css       carta crema, inchiostro nero, accento ruggine, JetBrains Mono + EB Garamond
data.js         struttura dei diciassette articoli (numerali, glifi, categorie, tipo di calibrazione)
i18n.js         tutto il testo traducibile, per locale: UI, META, contenuti degli articoli
app.js          routing, viste, persistenza, grafici, widget di calibrazione, locale
.nojekyll       perché GitHub Pages non si mangi i file con underscore iniziale
```

Niente build step. Niente bundler. Niente `node_modules`. Il `package.json` contiene soltanto i metadati e lo script del dev server.

## Pubblicazione

Pubblicato sul branch `main` di <https://github.com/pezzaliapp/skillapp>. GitHub Pages lo serve sotto <https://pezzaliapp.github.io/skillapp/>, e il dominio personalizzato a livello utente `alessandropezzali.it` (configurato altrove) risolve <https://www.alessandropezzali.it/skillapp/> sullo stesso contenuto.

Tre regole hanno evitato che si rompesse:

1. Tutti gli asset stanno nella root della repository. Non c'è `public/` né `dist/`.
2. Tutti i percorsi sono relativi (`app.js`, non `/app.js`) così il sito sopravvive sotto un sotto-percorso.
3. In questa repository non c'è alcun file `CNAME`. Il dominio personalizzato è impostato a livello utente su `pezzaliapp.github.io`; aggiungere un `CNAME` qui lo sovrascriverebbe.

Un file `.nojekyll` in root disabilita l'elaborazione Jekyll su Pages.

## Estetica

Il registro visivo è brutalist-monospace alla maniera di un manuale di consultazione di Oxford: una carta crema con una grana CSS appena percepibile, una colonna unica alla larghezza di un tascabile, filetti sottili con etichette di capitolo in maiuscoletto, marginalia in corsivo Garamond contro un sottile filetto color ruggine, capilettera nell'inchiostro di secondo colore. I numeri sono romani; le testate dei capitoli sono in Garamond corsivo da 30 a 34px; l'apparato — pulsanti, input, righe di stato, il timer — è monospaziato con tracking ampio.

Esiste esattamente un colore d'accento. È ruggine (`#a93f2c`).

## Crediti e licenza

Compilato nella primavera del 2026 da Alessandro Pezzali, con la paziente assistenza di Claude Opus.

Le marginalia e gli aforismi parafrasano o evocano Italo Calvino, John Conway, Persi Diaconis, Zoltán Kodály, Ludovico degli Arrighi, Jacques Cousteau, l'*Aṅguttara Nikāya*, e l'aula scolastica britannica. Il brano per il ritmo di lettura proviene dallo *Strange Case of Dr Jekyll and Mr Hyde* di Stevenson, 1886, di pubblico dominio.

MIT.
