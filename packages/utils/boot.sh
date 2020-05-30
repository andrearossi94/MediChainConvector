
#!/bin/bash

echo "Faccio partire la rete"

#npm run env:restart

#npm run cc:start -- cartellaclinica

#Per avviare il server 

#npx lerna run start --scope @convector-sample/server-rest --stream

echo "Registriamo alcune identità in Fabric"
node register.js dottore1 dottore ortopedico
node register.js dottore2 dottore cardiologo
node register.js paziente1 paziente
node register.js paziente2 paziente
echo "FINE"


echo "Registrazione identità con convector"
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot1\", \"firstname\": \"Mario\", \"lastname\": \"Rossi\", \"username\": \"mr1976\", \"password\": \"mario123\", \"email\": \"mario@email.com\", \"roles\": [\"DOC\"] }" -u dottore1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz1\", \"firstname\": \"Andrea\", \"lastname\": \"Bianchi\", \"username\": \"ab1996\", \"password\": \"andrea123\",  \"email\": \"andrea@email.com\" }" -u paziente1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot2\", \"firstname\": \"Giuseppe\", \"lastname\": \"Simari\", \"username\": \"gs1986\", \"password\": \"giuseppe123\", \"email\": \"giuseppe@email.com\", \"roles\": [\"DOC\"] }" -u dottore2
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz2\", \"firstname\": \"Giacomo\", \"lastname\": \"Calabresi\", \"username\": \"gc1996\", \"password\": \"giacomo123\",  \"email\": \"giacomo@email.com\" }" -u paziente2
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart1\", \"pazienteID\": \"Paz1\", \"dottoreID\": \"Dot1\", \"patologia\": \"Frattura\",\"stato\": true, \"consenso\": true }" -u dottore1
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart2\", \"pazienteID\": \"Paz2\", \"dottoreID\": \"Dot2\", \"patologia\": \"Trauma\", \"stato\": true, \"consenso\": true }" -u dottore2
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