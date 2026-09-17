:3 :3 :3 :3 :3 :3

idk im bored dont look here yet

## not final docs just an overview:
* api.py and api.go have a 2 way tcp connection to give keys logged and llm data back and forth
* rolling window all in memory besides maybe the send to llm i think that might not be
* the insert text works by copying llm response(via api) and pasting it near instantly
* all it expects is plain text(my api will handle that nativly)
* everyting as yet to be tested
* and no config as of now so things can still be adjusted
* no box detection yet(so if you change where you click it doesnt hold old charcters)
* and no passord detection(im thinking windows built in +     if it looks like a password like H3ll0World! dont store)
* likly an algo for above

:3 :3 :3 :3 :3 :3

idk im bored dont look here

## Backend needs
- parser  
- logging
- test
- and possibly more 
- but surprisingly almost done already