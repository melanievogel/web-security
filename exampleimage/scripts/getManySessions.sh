#!/bin/bash
 for i in $(seq 15 20); do curl "http://192.168.2.101:3000/session?id=$i"; echo ""; done
cat test/seesions | sed 's/{session://g | sed s/}//g'
