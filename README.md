# DesKartes

This library is an extension of the work I did for a 2017 Information Initiative @ Duke summer project analyzing the dissemination of Syrian Refugee photographs by media outlets. One of the end results were data visualizations I programmed myself in JavaScript using Raphaël JS as an SVG handler, Velocity.js for animations, and the ubiquitous JQuery, including interactive SVG maps that could 

* switch between color palettes to show different data, 
* switch between maps of the Mediterranean and the United States,
* display information about Syrian Refugees of a country on hovering,
* display a gallery element on clicking showcasing photographs from the AP database that were published from that country

You can visit the example here: [Summer 2017 Syrian Refugee Map](https://ortega-alejandro.github.io/syrian-refugee-crisis-project/map.html)

This was my first time working with JavaScript, but I spent a significant amount of time in the final weeks of the project refactoring the code for generalizability and would like to continue that work now. 

Admittedly, this work was inspired by limitations I found using amCharts JS and Leaflet JS, as I take a different approach that emphasizes data visualization and a different aesthetic; if you are looking for a production ready chart mapping software you should check those libraries.

## To-Do
* Migrate the SVG handler from Raphaël JS to the newer Snap SVG 
* Use a database backend for information from a particular country
* General Refactoring

## Libraries
* JQuery
* Raphaël (will be migrated to Snap SVG at some point)
* Velocity
