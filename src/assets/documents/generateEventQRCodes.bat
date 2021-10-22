if "%1" NEQ "" cwa-event-qr-code file --csv %1 --dest qr-codes-results
if "%1" ==  "" cwa-event-qr-code file --csv tables.csv --dest qr-codes-results