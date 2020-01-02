#!/bin/bash
clientDir=${CLIENT_DIR:-angular-client}
serverDir=${SERVER_DIR:-express-server}
clientAdminDir=${CLIENT_ADMIN_DIR:-admin-client}
nodeVersion=${NODE_LINUX_VERSION:-node-v10.15.3-linux-x64}
zipInsektLoc=${ZIP_INSEKTA_LOC:-/home/insekta/scenarios/myfirstexample/messagerCenter.zip} 

if [ -d mkosi.extra/etc/$nodeVersion ]; then 
	echo "Node already downloaded" 
else 
	echo "################### Node locally not installed; Download Node... ##################" 
	pushd mkosi.extra/etc &&\
		wget https://nodejs.org/dist/v10.15.3/$nodeVersion.tar.gz &&\ 
		tar -xvf $nodeVersion.tar.gz && \ 
		rm $nodeVersion.tar.gz &&\ 
		popd 
fi	


#Build Client
echo "########################  BAUE CLIENT  #############################"
pushd $clientDir &&\
	npm install&&\
	ng build --prod &&\
	popd &&\
	cp $clientDir/dist/* mkosi.extra/var/www/html/ 


#Build Server
echo "########################  BAUE SERVER  #############################"
pushd $serverDir &&\
	npm install &&\
	popd &&\
	cp -r $serverDir/* mkosi.extra/var/www/express-server/ &&\
	chmod +x mkosi.extra/var/www/express-server/server.js 

#Build Admin client
echo "########################  BAUE ADMIN CLIENT  ########################"
pushd $clientAdminDir &&\
	npm install &&\
	popd &&\
	cp -r $clientAdminDir/* mkosi.extra/opt/admin-client &&\
	chmod +x mkosi.extra/opt/admin-client/admin-client.js 

echo "########################  CONFIG PHP  #############################"
sudo apt install php-fpm php-mysql
sudo cp ./default mkosi.extra/etc/nginx/sites-available/default
sudo cp ./default mkosi.extra/etc/nginx/sites-enabled/default
cp ./private.php mkosi.extra/var/www/html/


#Build and run Image
echo "########################  LADE IMAGE HOCH  #############################"
zip -r dist/messageCenter.zip mkosi.default mkosi.extra mkosi.postinst &&\
scp dist/messageCenter.zip insekta@web.insekta-project.psi.h4q.it:$zipInsektLoc
