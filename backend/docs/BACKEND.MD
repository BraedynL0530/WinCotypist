idk im bored don't look here yet

## not final docs just an overview:
* api.py and api.go have a 2 way tcp connection to give keys logged and llm data back and forth
* rolling window all in memory besides maybe to send to llm I think that might not be
* the insert text works by copying llm response(via api) and pasting it near instantly
* all it expects is plain text(my api will handle that natively)
* everything as yet to be tested
* and no config as of now so things can still be adjusted
* no box detection yet(so if you change where you click it doesn't hold old characters)
* and no password detection(im thinking windows built in +     if it looks like a password like H3ll0World! don't store)
* likely an algo for above

:3 :3 :3 :3 :3 :3

idk im bored don't look here

## Backend needs
- parser  
- test
- and possibly more 
