MessageCenter Image
=============

Run `sudo mkosi` to build the image. This will take some time. To run the image, type `sudo systemd-nspawn -bi image.raw`. 
To exit the container, type Ctrl+] three times in a row.

## General dependencies:
* Ubuntu 18 (Bionic)
* Stored in vmimages folder at insekta host
* Install mkosi: sudo apt install mkosi
* Build image: sudo mkosi
* Python 3.5 required
* Adaption in mkosi in usr/bin necessary because of exception:  change line to cmdline = ["/bin/rm", "-rf"] + extra_packages
* Run image: sudo systemd-nspawn -bi image.raw
* View Service: http://localhost:8074/

## Application specific dependencies: 
* created deploy script
* dependencies: angular-client, nginx server, express serve
* Upload scenario: scp PSI-backup/PSI-CAD/insekta_page/scenario.html insekta@web.insekta-project.psi.h4q.it:/home/insekta/scenarios/myfirstexample/

## More documentation on mkosi:
* https://github.com/systemd/mkosi/blob/master/mkosi.md
* http://0pointer.net/blog/mkosi-a-tool-for-generating-os-images.html

