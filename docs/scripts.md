# Documentation / Scripts

## Overview

The `/scripts` folder is just a place to put misc. scripts that make be helpful in the future.

## Scripts

#### upload-sheet.js

This script takes RAI's internal spreadsheet format (downloaded from google sheets as `.csv`) and populates the MongoDB (whatever is `MONGODB_URL`) with the objects it finds. It's very quick, dirty, and error-prone but it can be very useful for quickly populating an empty database. Use caution and take note of any errors logged when running.
