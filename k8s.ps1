docker build -t identityprovider . # Builda o projeto e gera a imagem
docker tag identityprovider lfmaker/identity-provider # Tagea a imagem
docker push lfmaker/identity-provider # envia a imagem para o docker hub - precisa ter um repositorio lá
kubectl delete rc identity-provider-controller
kubectl create -f deployment.yaml # cria um deployment no kubernetes de acordo com o deployment.yaml
kubectl get deployment,po # lista todos os pods do deployment
kubectl delete services identity-provider-controller # deleta o service e sua exposicao para recriar
kubectl expose rc identity-provider-controller --type="LoadBalancer" # expoe o deploy para a rede externa - só da para criar uma vez, para criar novamente precisa deletar o service
kubectl get svc # lista todos services e seus respectivos ips internos e externos