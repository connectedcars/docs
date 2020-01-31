# Dataoversigt

## Mine ture

Denne funktion giver dig mulighed for at få historik over bilens kørte ture. Du kan se hvor du har kørt, hvor langt du har kørt, hvor lang tid du har kørt og hvor langt på literen du har kørt.

| Parameter | Formål med behandling | Opbevaring |
|-----------|-----------------------|------------|
| Bilens GPS position | Så brugeren kan se bilens rute på et kort | Gemmes indtil brugeren anmoder om sletning af turen |
| Bilens retning | Så brugeren kan se bilens rute på et kort, anvendes til at kvalitetsoptimere rutevisning | Gemmes indtil brugeren anmoder om sletning af turen |
| Bilens brændstofniveau | Så brugeren kan se bilens estimeret brændstofforbrug | 60 dages historisk data. Udregnet brændstofforbrug gemmes indtil brugeren anmoder om sletning af turen |
| Bilens kilometerstand | Så brugeren kan se antal kørte kilometer for hver tur | 60 dages historisk data. Udregnet distance på ture gemmes indtil brugeren anmoder om sletning af turen |
| Bilens brændstofforbrug | Så brugeren kan se bilens estimeret brændstofforbrug for hver tur | 60 dages historisk data. Udregnet brændstofforbrug gemmes indtil brugeren anmoder om sletning af turen |
| Køreturen i tid | Så brugeren kan se køreturens varighed | Gemmes indtil brugeren anmoder om sletning af turen |

## Aktuel status på din bil

Denne funktion, giver dig et overblik over din bils aktuelle tilstand/ status og tid til næste service og olieskift

| Parameter | Formål med behandling | Opbevaring |
|-----------|-----------------------|------------|
| Bilens GPS position | Så brugeren kan se hvor bilen er | 1 times historisk data og seneste værdi |
| Tænding slået til | Anvendes til logikker, som kvalitetssikrer data | 60 dages historisk data og seneste værdi |
| Tænding slået fra | Anvendes til logikker, som kvalitetssikrer data | 60 dages historisk data og seneste værdi |
| Bilens kilometerstand | Så brugeren kan se bilens kilometerstand i app'en | 60 dages historisk data og seneste værdi |
| Bilens brændstofniveau | Så brugeren kan se bilens brændstofniveau i app'en | 60 dages historisk data og seneste værdi |
| Bilens serviceinterval i dage | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Bilens serviceinterval i kilometer | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Antal dage siden sidste service | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Antal kilometer siden sidste service | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Antal kilometer til næste olieskift | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Antal dage til næste olieskift | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Bilens oliekvalitet (dårlig/god) | Bruges til beregning, så brugeren kan se hvornår bilen skal til service igen | 60 dages historisk data og seneste værdi |
| Batteriets spænding | Så brugeren kan få advarsel hvis bilens batterispænding er lav | Gemmes indtil brugeren anmoder om sletning |
| Batteriets helbred | Så brugeren kan få advarsel hvis bilens batterispænding er lav | Gemmes indtil brugeren anmoder om sletning |
| Advarsel hvis bilen bliver bugseret | Så brugeren kan få advarsel hvis bilen skulle blive bugseret | 7 dages historisk data og seneste værdi |
| Spinklervæskelampe | Så brugeren kan få advarsel hvis sprinklervæskelampen lyser i bilen | 7 dages historisk data og seneste værdi |
| Kølervæskelampe | Så brugeren kan få advarsel hvis kølervæskelampen lyser i bilen | 7 dages historisk data og seneste værdi |
| Bremsesystemslampe | Så brugeren kan få advarsel hvis bremsystemslampen lyser i bilen | 7 dages historisk data og seneste værdi |
| Fejlkoder fra bilen | Så brugeren kan få advarsel om tekniske fejl på bilen, som ikke udløser advarselslamper | 7 dages historisk data og seneste værdi |
| Strømafbrydelse på OBD-enhed | Så brugeren kan få advarsel hvis OBD-enheden i bilen demonteres | 7 dages historisk data og seneste værdi |
| Mistanke om kollision | Så brugeren kan få advarsel hvis der er mistanke om en kollision | 7 dages historisk data og seneste værdi |
| Dæktryksalarm | Så brugeren kan få advarsel om lavt dæktryk | 7 dages historisk data og seneste værdi |
| Bremsevæskelampe | Så brugeren kan få advarsel hvis bremsevæskelampen lyser i bilen | 7 dages historisk data og seneste værdi |
| Advarsel ved lavt olieniveau | Så brugeren kan få advarsel om lavt olieniveau | 7 dages historisk data og seneste værdi |
| Advarsel ved lav batterispænding på bilens batteri | Så brugeren kan få advarsel hvis bilens batterispænding er lav | 7 dages historisk data og seneste værdi |
| Advarsel ved ændring i bilens batterispænding | Så brugeren kan få advarsel hvis der er ændring i bilens batterispænding | 7 dages historisk data og seneste værdi |

## Teknisk hjælp af dit foretrukne værksted

Denne funktion sikrer at du kan få den rette rådgivning fra dit foretrukne værksted baseret på data direkte fra bilen

| Parameter | Formål med behandling | Opbevaring |
|-----------|-----------------------|------------|
| Bilens kilometerstand | Så brugerens foretrukne værksted kan rådgive om det bedste service baseret på bilens kilometerstand | 60 dages historisk data og seneste værdi |
| Bilens serviceinterval i dage | Så brugerens foretrukne værksted kan rådgive om det bedste service baseret på bilens serviceinterval | 60 dages historisk data og seneste værdi |
| Bilens serviceinterval i kilometer | Så brugerens foretrukne værksted kan rådgive om det bedste service baseret på bilens serviceinterval | 60 dages historisk data og seneste værdi |
| Antal dage siden sidste service | Så brugerens foretrukne værksted kan indkalde din bil når der er tid til service/ olieskift | 60 dages historisk data og seneste værdi |
| Antal kilometer siden sidste service | Så brugerens foretrukne værksted kan indkalde din bil når der er tid til service/ olieskift | 60 dages historisk data og seneste værdi |
| Antal kilometer til næste olieskift | Så brugerens foretrukne værksted kan indkalde din bil når der er tid til service/ olieskift | 60 dages historisk data og seneste værdi |
| Antal dage til næste olieskift | Så brugerens foretrukne værksted kan indkalde din bil når der er tid til service/ olieskift | 60 dages historisk data og seneste værdi |
| Bilens oliekvalitet (dårlig/god) | Så brugerens foretrukne værksted kan indkalde din bil når der er tid til service/ olieskift | 60 dages historisk data og seneste værdi |
| Kølervæskelampe | Så brugerens foretrukne værksted kan rådgive brugeren hvis der er en fejl på kølervæskesystemet | Gemmes indtil brugeren anmoder om sletning |
| Bremsesystemslampe | Så brugerens foretrukne værksted kan rådgive brugeren hvis der er en fejl på bremsesystemet | Gemmes indtil brugeren anmoder om sletning |
| Strømafbrydelse på OBD-enhed | Så brugerens foretrukne værksted kan rådgive brugeren hvis der er strømafbrydelse på OBD enheden i bilen | Gemmes indtil brugeren anmoder om sletning |
| Dæktryksalarm | Så brugerens foretrukne værksted kan rådgive brugeren hvis bilen mangler luft i et eller flere dæk | Gemmes indtil brugeren anmoder om sletning |
| Bremsevæskelampe | Så brugerens foretrukne værksted kan rådgive brugeren hvis bilen mangler bremsevæske | Gemmes indtil brugeren anmoder om sletning |
| Advarsel ved lavt olieniveau | Så brugerens foretrukne værksted kan rådgive brugeren hvis bilen mangler olie | Gemmes indtil brugeren anmoder om sletning |
| Advarsel ved lav batterispænding på bilens batteri | Så brugerens foretrukne værksted kan rådgive brugeren i tilfælde af batteri- og/eller startproblemer | Gemmes indtil brugeren anmoder om sletning |
| Advarsel ved ændring i bilens batterispænding | Så brugerens foretrukne værksted kan rådgive brugeren i tilfælde af batteri- og/eller startproblemer | Gemmes indtil brugeren anmoder om sletning |
| Fejlkoder fra bilen | Så brugerens foretrukne værksted kan rådgive brugeren om tekniske fejl på bilen | Gemmes indtil brugeren anmoder om sletning |
| Brugerens fulde navn | Så brugerens foretrukne værksted har kontaktoplysninger | Gemmes indtil brugeren anmoder om sletning |
| Brugerens telefonnummer | Så brugerens foretrukne værksted har kontaktoplysninger | Gemmes indtil brugeren anmoder om sletning |
| Brugerens email | Så brugerens foretrukne værksted har kontaktoplysninger | Gemmes indtil brugeren anmoder om sletning |
| Bilens stelnummer | Så brugerens foretrukne værksted kan identificere bilen | Gemmes indtil brugeren anmoder om sletning |
| Bilens registreringsnummer | Så brugerens foretrukne værksted kan identificere bilen | Gemmes indtil brugeren anmoder om sletning |
| Bruger ID | Så brugerens foretrukne værksted kan identificere bilen | Gemmes indtil brugeren anmoder om sletning |
| OBD-enheds ID  Så brugerens foretrukne værksted kan identificere bilen | Gemmes indtil brugeren anmoder om sletning |
| Bilens modelinformation | Så brugerens foretrukne værksted kan rådgive brugeren og booke korrekt service eller reparation hvis det er nødvendigt | Gemmes indtil brugeren anmoder om sletning |
| Brugerens chat historik med foretrukne værksted | Så brugerens foretrukne værksted kan få indblik i bilens historik og tidligere dialog for bedst muligt at kunne guide brugeren | Gemmes indtil brugeren anmoder om sletning |
| GPS status ok (ja/nej) | Så brugeres foretrukne værksted kan sikre at der er ikke er fejl på OBD-enheden i bilen | 7 dages historisk data og seneste værdi |
| GPRS status ok (ja/nej) | Så brugeres foretrukne værksted kan sikre at der er ikke er fejl på OBD-enheden i bilen | 7 dages historisk data og seneste værdi |
| OBD-enhed aktiveret (ja/nej) | Så brugeres foretrukne værksted kan sikre at der er ikke er fejl på OBD-enheden i bilen | Gemmes indtil brugeren anmoder om sletning |

## Accessorisk data

Data, som er teknisk nødvendige for at garantere sikker og effektiv udlæsning af data fra bilen

| Parameter | Formål med behandling | Opbevaring |
|-----------|-----------------------|------------|
| Bilens stelnummer | Anvendes til at sikre at den korrekte software indlæses på OBD-enheden | Altid |
| Bilens tekniske konfiguration | Anvendes til at sikre at den korrekte software indlæses på OBD-enheden | Altid |
| Scanning af bilens elektroniske konfiguration | Anvendes til at sikre at den korrekte software indlæses på OBD-enheden | Altid |
| CAN-Bus rå-data | Anvendes til fejlfinding | Altid |
| CAN-Bus aktivitet on/off | Anvendes til kvalitetssikring af indsamlet data | 7 dages historisk data og seneste værdi |

## Kørselshændelser

Brugeren får konkrete informationer om hændelser og konditioner for sine ture vist i sin app og opsummeret i et benchmark, hvorigennem brugeren kan følge sin forbedring til mere sikker kørsel. Opsamlet data vises i app'en og anvendes til konkret at vise brugeren de forbedringsmuligheder denne har for at køre mere sikkert.

| Parameter | Formål med behandling | Opbevaring |
|-----------|-----------------------|------------|
| Hastighed (med position) | Hastighed er kendt som den aller vigtigste faktor for trafiksikkerhed. Det er nødvendigt at bruge hastighed til at advisere brugere om, hvordan og hvor de kan forbedre deres kørsel | Gemmes indtil brugeren anmoder om sletning. Værdier +130 Km/h er reduceret til 130 km/h da hastigheder over dette niveau ikke er relevant. |
| Udendørs temperatur | Kørsel i kolde temperaturer er associeret med glatte og potentielt isede forhold. Glatte forhold grundet koldt vejr er associeret med adskillige uheld hvert år. Udendørs temperatur er en indikator for glatte forhold. Derfor er det nødvendigt at anvende temperatur for at advisere brugere om, hvordan de kan forbedre deres kørsel | Gemmes indtil brugeren anmoder om sletning |
| Køretøj acceleration over 0.2G (alle retninger), med position | Pludselige og ofte ændringer i retning (forhøjelse/nedsættelse af hastighed såvel som sving) er potentielt risikofyldte handlinger foretaget af chaufføren. Jævn kørsel er ofte sikker kørsel, derfor kan accelerationer anvendes til at rådgive brugere om, hvor og de kan forbedre deres kørsel | Gemmes indtil brugeren anmoder om sletning |
