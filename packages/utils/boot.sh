
#!/bin/bash

echo "Faccio partire la rete"

npm run env:restart

echo "Istanzio il chaincode"

npm run cc:start -- cartellaclinica

#Per avviare il server 

#npx lerna run start --scope @convector-sample/server-rest --stream

echo "Registriamo alcune identità in Fabric"
node register.js dottore1 dottore ortopedico
node register.js dottore2 dottore cardiologo
node register.js dottore3 dottore virologo
node register.js dottore4 dottore fisioterapista
node register.js paziente1 paziente
node register.js paziente2 paziente
node register.js paziente3 paziente
node register.js paziente4 paziente
echo "FINE"


echo "Registrazione identità con convector"

echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 2

echo "Medici/pazienti"
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot1\", \"firstname\": \"Mario\", \"lastname\": \"Rossi\", \"username\": \"mr1976\", \"password\": \"mario123\", \"email\": \"mario@email.com\", \"roles\": [\"DOC\"] }" -u dottore1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz1\", \"firstname\": \"Andrea\", \"lastname\": \"Bianchi\", \"username\": \"ab1996\", \"password\": \"andrea123\",  \"email\": \"andrea@email.com\" }" -u paziente1

hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot2\", \"firstname\": \"Giuseppe\", \"lastname\": \"Simari\", \"username\": \"gs1986\", \"password\": \"giuseppe123\", \"email\": \"giuseppe@email.com\", \"roles\": [\"DOC\"] }" -u dottore2
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz2\", \"firstname\": \"Giacomo\", \"lastname\": \"Calabresi\", \"username\": \"gc1996\", \"password\": \"giacomo123\",  \"email\": \"giacomo@email.com\" }" -u paziente2

hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot3\", \"firstname\": \"Paolo\", \"lastname\": \"Giughi\", \"username\": \"pg1954\", \"password\": \"paolo123\",  \"email\": \"paolo@email.com\", \"roles\": [\"DOC\"] }" -u dottore3
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot4\", \"firstname\": \"Daniele\", \"lastname\": \"Bigoli\", \"username\": \"db1973\", \"password\": \"daniele123\",  \"email\": \"daniele@email.com\" , \"roles\": [\"DOC\"]}" -u dottore4

hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz3\", \"firstname\": \"Alice\", \"lastname\": \"Comodi\", \"username\": \"ac1999\", \"password\": \"alice123\",  \"email\": \"alice@email.com\" }" -u paziente3
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz4\", \"firstname\": \"Paola\", \"lastname\": \"Paglia\", \"username\": \"pp1982\", \"password\": \"paola123\",  \"email\": \"paola@email.com\" }" -u paziente4

sleep 2

echo "Cartelle cliniche"
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart1\", \"pazienteID\": \"Paz1\", \"dottoreID\": \"Dot1\", \"patologia\": \"Frattura\",\"stato\": true, \"consenso\": true }" -u dottore1
#hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart5\", \"pazienteID\": \"Paz3\", \"dottoreID\": \"Dot1\", \"patologia\": \"Lussazione\",\"stato\": true, \"consenso\": true }" -u dottore1

hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart2\", \"pazienteID\": \"Paz2\", \"dottoreID\": \"Dot2\", \"patologia\": \"Trauma\", \"stato\": true, \"consenso\": true }" -u dottore2
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart3\", \"pazienteID\": \"Paz3\", \"dottoreID\": \"Dot3\", \"patologia\": \"Polmonite\", \"stato\": true, \"consenso\": true }" -u dottore3
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart4\", \"pazienteID\": \"Paz4\", \"dottoreID\": \"Dot4\", \"patologia\": \"Riabilitazione\", \"stato\": true, \"consenso\": true }" -u dottore4
echo "FINE"



# {
#  "personale": {
#"id": "Paz11", 
#"firstname": "Andrea", 
#"lastname": "Bianchi", 
#"username": "ar1996", 
#"password": "andrea123",  
#"email": "fhrueurf@email.com"}
#}

# {
#  "cartellaclinica": {"id": "Cart111", 
#"pazienteID": "Paz111", 
#"dottoreID": "Dot1", 
#"patologia": "trauma", 
#"stato": "true",  
#"consenso": "true"}
#}