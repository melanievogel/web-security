#!/bin/bash
COOKIE_IDS=(Bodschal, Hämmoridenpritschn, Rotzgloggn, Freindal, dreckata Drek, oide Schäsn, Knedlfressa, Saggrament, Aufmüpfiga, Schachtlhuba, Griggalheudda, Bruinschlanga, Lausbua, Hämmoridenpritschn, Lätschnbebbi, Besnbinda, Affnasch, Pfingsdochs, Badhur, Brunzer, Kircharutschn, Grischbal, Zefix, no amoi, klebrigs Biaschal, Großkopfada, mit deinen Badwandlfüaß, Rutschn, Fechtbruada, Schwobndeifi, Kirchalicht, Zuchtl, Schuibuamtratza, Eignbrödla, Schundnickl, Zefix, no amoi, Palmesel, Krautara, Rotzgloggn, Dipfalscheißa, Rotzgloggn, Schlampnschleppa, Bierdimpfl, hosd mi, Bierdimpfl, Palmesel, Hungaleida, Kittlschliaffa, Beißzanga, Bettbrunza, Saubreiß!
Gwampate Sau, Herrgoddsacklzementfixlujja, Goggolore, glei foid da Wadschnbam um, Stodara, greißlicha Uhu, Zwedschgarl, Blattada, Jochgeia, Zeeefix, hoid dei Babbn, Erzdepp, Bixlmadam, dreckata Drek, Beitlschneida, Besnbinda, Stodara, oide Rudschn, klebrigs Biaschal, Nasnboara, Oaschgsicht, fade Noggn, Katzlmacha, oida Daddara, i glaub, dir brennt da Huat, Britschn, Voglscheicha, Sautreiba, bsuffas Wagscheidl, Umstandskrama, Bixlmadam, Schdinkadores, Britschn, greißlicha Uhu, Hanswurst, Schbruchbeidl, hoit dei damische Goschn, glei foid da Wadschnbam um, Palmesel, Hämmoridenpritschn, Auftaklta, hoit dei damische Goschn, Saufbeitl, Gschaftlhuaba, Hundsgribbe, Bodschal, Fegeisen, Grischbal, Brunzer, Kaasloabe!
Betschwesta, Hornochs, oida Daggl, Krampfhenna, du Ams’l, du bleede, gscheate Ruam, Doafmatratzn, Rotzgloggn, hoid dei Babbn, gscherte Nuss, Voglscheicha, Luada, Rabenviech, Aushuifsbaya, glei foid da Wadschnbam um, Hämmoridenpritschn, oida Daggl, Ecknsteha, Freindal, Gschpusi, Bixlmadam, Drottl, Presssack, hoid dei Babbn, Schdehlratz, Fechtbruada, schdaubiga Bruada, Heislschlaicha, Fettl, Rabenviech, Knedlfressa, mogsd a Wadschn, Hubbfa, Halbkreisingeneur, oide Schäwan, kropfata Hamml, Besnbinda, Oaschgsicht, gscheate Ruam, Spinotfressa, Hampara, Himmeheagodna, Klugscheissa, Hodalumb, Blattada, du Ams’l, du bleede, Hodalumb, Blattada, Schdehlratz, Woibbadinga!
);

n=2
echo "const cookieIds = [" >> outputCookie.txt
len=${#COOKIE_IDS[@]}
echo $(($len-1))
for ((i = 0; i< ${#COOKIE_IDS[@]}; i++))
do
  if (($i == 0)) || (($i % n == 0))
  then
     HOCHK="'" 
     EIGSTR=$(echo ${COOKIE_IDS[$i]}${COOKIE_IDS[$i+1]} | base64)
     if (($i!=$(($len-1))))
     then HOCHKS="', "
     ALL=$HOCHK$EIGSTR$HOCHKS
     echo "$ALL" >> outputCookie.txt
     continue
     fi
     HOCHKS="'" 
     ALL=$HOCHK$EIGSTR$HOCHKS 
     echo "$ALL" >> outputCookie.txt
     continue
  fi
done
echo "]" >> outputCookie.txt
