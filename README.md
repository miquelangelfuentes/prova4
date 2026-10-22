# 🎓 App de Benvinguda per al Taller de Docents

Benvinguts i benvingudes! Aquesta aplicació web interactiva ha estat dissenyada específicament per donar la benvinguda, engrescar i dinamitzar les sessions d'un **taller de formació per a docents**.

Funciona de manera autònoma i sense necessitat d'instal·lar cap biblioteca pesada, sent perfecta tant per a sessions presencials com en línia o híbrides.

---

## 🌟 Funcionalitats Principals

1. **🎉 Salutació i Celebració de Benvinguda**
   - Animació interactiva de confeti mitjançant HTML5 Canvas.
   - Efectes sonors d'alegria amb la Web Audio API (sense arxius d'àudio externs).

2. **🪪 Generador d'Acreditació Digital del Docent**
   - Els assistents poden crear a l'instant el seu carnet oficial del taller amb el seu nom, centre educatiu, etapa docent (Infantil, Primària, ESO, Batxillerat, FP, CFA, etc.), especialitat i el seu "superpoder" docent.
   - Disseny tipus targeta d'identificació amb codi de verificació.
   - Opció directa per imprimir o desar en PDF.

3. **💬 Mur Virtual d'Expectatives i Reflexions**
   - Espai col·laboratiu tipus post-it perquè els docents comparteixin què esperen aprendre o quins reptes porten a la sessió.
   - Selecció de colors clàssics de post-it (groc, verd, blau, rosa, lila).
   - Emmagatzematge automàtic al navegador (`localStorage`).

4. **🎲 Dinàmiques i Preguntes Trencaglaç (Icebreakers)**
   - Selecció de preguntes pensades per activar la reflexió pedagògica i compartir experiències d'aula reals en parelles o en petit grup.
   - Generador aleatori de preguntes amb transicions suaus.

5. **⏱️ Temporitzador d'Aula per a Activitats**
   - Cronòmetre configurable amb botons ràpids per a dinàmiques de grup (1 min de reflexió, 2 min en parelles, 5 min de treball en equip, 10 min de tasca pràctica, 15 min de debat).
   - Avisos visuals i sonors al finalitzar el temps.

6. **💡 Píndoles d'Inspiració Pedagògica**
   - Cites de grans referents de l'educació (Paulo Freire, Maria Montessori, Jean Piaget, Sir Ken Robinson, etc.) per alimentar la motivació i el debat pedagògic.

---

## 🚀 Com Executar l'Aplicació

Tens tres maneres molt fàcils d'utilitzar-la:

### Opció 1: Directament al navegador (Sense instal·lar res)
Fes doble clic sobre l'arxiu **`index.html`** per obrir-lo al teu navegador preferit (Chrome, Firefox, Safari, Edge). Funciona fins i tot sense connexió a Internet!

### Opció 2: Amb el servidor local de Python
Si tens Python instal·lat:
```bash
python app.py
```
O a Windows, simplement fes doble clic a **`run_app.bat`**. S'iniciarà un servidor local i s'obrirà automàticament al teu navegador a `http://localhost:8080`.

### Opció 3: Publicar a GitHub Pages (Perquè tothom hi accedeixi des del mòbil)
Aquest repositori ja inclou el flux de GitHub Actions per a desplegar a GitHub Pages:
1. Ves a la pestanya **Settings** del repositori a GitHub: `https://github.com/miquelangelfuentes/prova4/settings/pages`.
2. A **Build and deployment > Source**, selecciona **GitHub Actions**.
3. En pocs segons, l'aplicació estarà disponible públicament a l'enllaç de GitHub Pages (p. ex. `https://miquelangelfuentes.github.io/prova4/`), llesta perquè tots els docents hi entrin amb un codi QR o enllaç directe!

---

## 📁 Estructura del Projecte

```text
prova4/
├── index.html                  # Pàgina principal interactiva
├── app.py                      # Servidor local en Python amb auto-obertura de navegador
├── run_app.bat                 # Llançador ràpid per a Windows
├── css/
│   └── styles.css              # Estils visuals moderns, responsive i per a impressió
├── js/
│   └── app.js                  # Lògica: confeti, sintetitzador d'àudio, post-its, timer
├── .github/
│   └── workflows/
│       └── deploy.yml          # Desplegament automàtic a GitHub Pages
└── README.md                   # Documentació del projecte
```

---

Que tinguis un taller molt profitós, participatiu i enriquidor amb els docents! 🌟
