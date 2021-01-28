# Instalar
npm i -g serverless

# sls inicializar
sls

# sempre fazer deploy do ambiente antes de tudo, para verificar se está com ambiente ok
sls deploy

# invocar AWS
sls invoke -f hello

#invocar local
sls invoke local -f hello -l

# configurar dashboard
sls

#logs

#fica ouvindo logs da função (ideal para monitorar as chamadas)
sls logs -f hello --tail

#invoka para ver no log
sls invoke -f hello

#Remove a Stack inteira
sls remove