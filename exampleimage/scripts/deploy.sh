#!/bin/bash
clientDir=${CLIENT_DIR:-angular-client}
serverDir=${SERVER_DIR:-express-server}
clientAdminDir=${CLIENT_ADMIN_DIR:-admin-client}
nodeVersion=${NODE_LINUX_VERSION:-node-v10.15.3-linux-x64}

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
# Delete old files
echo "#######################   DELETING OLD SERVERCONTENT    ###############"
rm mkosi.extra/var/www/html/*.js &&\
rm mkosi.extra/var/www/html/*.map &&\
rm mkosi.extra/var/www/html/*.html &&\
rm mkosi.extra/var/www/html/*.css

#Build Client
echo "########################  BAUE CLIENT  #############################"
pushd $clientDir &&\
	npm install &&\
	ng build --prod &&\
	popd &&\
	cp -r $clientDir/dist/* mkosi.extra/var/www/html/


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

#Build and run Image
echo "########################  BAUE IMAGE  #############################"
#For incremental build comment out the next line (do not remove the current image) and call sudo mkosi -i
rm -f image.raw
sudo mkosi
sudo systemd-nspawn -bi image.raw


#Client available at: localhost:8074/
#Server available at: localhost:3000
