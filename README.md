Thought for 2 seconds## Vérification des variables d'environnement

Merci d'avoir ajouté les variables d'environnement PORT et MONGODB_URI à votre projet Vercel. Maintenant, nous pouvons continuer avec des instructions plus détaillées pour tester et déployer l'application bancaire.

## Guide détaillé pour tester l'application

### Test local de l'application

Une fois que vous avez lancé l'application avec Docker Compose (`docker-compose up -d`), vous pouvez effectuer les tests suivants pour vérifier que toutes les fonctionnalités fonctionnent correctement:

1. **Créer un compte**:

1. Remplissez le formulaire "Créer un compte" avec:

1. Numéro de compte: "ACC001"
2. Nom du titulaire: "Jean Dupont"
3. Solde initial: 1000

2. Cliquez sur "Créer"
3. Vérifiez que le compte apparaît dans la liste des comptes

2. **Consulter un compte**:

1. Dans le formulaire "Opérations sur un compte", entrez:

1. Numéro de compte: "ACC001"

2. Cliquez sur "Consulter"
3. Vérifiez que les détails du compte s'affichent dans la section "Résultat"

3. **Déposer de l'argent**:

1. Dans le formulaire "Opérations sur un compte", entrez:

1. Numéro de compte: "ACC001"
2. Montant: 500

2. Cliquez sur "Déposer"
3. Vérifiez que le solde est maintenant de 1500 €

4. **Retirer de l'argent**:

1. Dans le formulaire "Opérations sur un compte", entrez:

1. Numéro de compte: "ACC001"
2. Montant: 200

2. Cliquez sur "Retirer"
3. Vérifiez que le solde est maintenant de 1300 €

5. **Tester les validations**:

1. Essayez de retirer plus d'argent que le solde disponible
2. Essayez de créer un compte avec un numéro qui existe déjà
3. Vérifiez que les messages d'erreur appropriés s'affichent

6. **Supprimer un compte**:

1. Dans le formulaire "Opérations sur un compte", entrez:

1. Numéro de compte: "ACC001"

2. Cliquez sur "Supprimer"
3. Vérifiez que le compte a été supprimé de la liste

### Vérification des logs Docker

Pour vérifier que tout fonctionne correctement au niveau des conteneurs:

```shellscript
# Vérifier les logs de l'application
docker logs app-bancaire

# Vérifier les logs de MongoDB
docker logs mongo

# Vérifier que les conteneurs sont en cours d'exécution
docker ps
```

## Instructions détaillées pour Docker Hub

### Préparation de l'image pour Docker Hub

Avant de pousser l'image vers Docker Hub, assurez-vous qu'elle est optimisée:

```shellscript
# Construire l'image avec un tag spécifique
docker build -t application-bancaire:v1.0 .

# Vérifier la taille de l'image
docker images | grep application-bancaire
```

### Processus complet pour Docker Hub

1. **Créer un repository sur Docker Hub**:

1. Connectez-vous à [Docker Hub](https://hub.docker.com/)
2. Cliquez sur "Create Repository"
3. Nommez-le "application-bancaire"
4. Choisissez "Public" ou "Private" selon vos besoins
5. Cliquez sur "Create"

2. **Tagger l'image avec plusieurs versions**:

```shellscript
# Tagger avec latest
docker tag application-bancaire:v1.0 esscraye/application-bancaire:latest

# Tagger avec un numéro de version
docker tag application-bancaire:v1.0 esscraye/application-bancaire:v1.0
```

3. **Pousser les images vers Docker Hub**:

```shellscript
# Pousser la version latest
docker push esscraye/application-bancaire:latest

# Pousser la version spécifique
docker push esscraye/application-bancaire:v1.0
```

4. **Vérifier sur Docker Hub**:

1. Visitez `https://hub.docker.com/r/esscraye/application-bancaire`
2. Vérifiez que les deux tags (latest et v1.0) sont présents

## Test sur une autre machine

Pour tester l'image sur une autre machine, suivez ces étapes détaillées:

```shellscript
# 1. Installer Docker si ce n'est pas déjà fait
# Pour Ubuntu:
# sudo apt update
# sudo apt install docker.io docker-compose

# 2. Créer un fichier docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3'
services:
  app:
    image: esscraye/application-bancaire:latest
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/banque
    depends_on:
      - mongo
    restart: always

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: always

volumes:
  mongo-data:
EOF

# 3. Lancer l'application
docker-compose up -d

# 4. Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps
```

## Comparaison avec d'autres méthodes de déploiement

Pour mieux comprendre les avantages des conteneurs, voici une comparaison avec d'autres méthodes de déploiement:

```mermaid
Comparaison des méthodes de déploiement.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-r4m2{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-r4m2 .error-icon{fill:#552222;}#mermaid-diagram-r4m2 .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-r4m2 .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-r4m2 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-r4m2 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-r4m2 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-r4m2 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-r4m2 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-r4m2 .marker{fill:#666;stroke:#666;}#mermaid-diagram-r4m2 .marker.cross{stroke:#666;}#mermaid-diagram-r4m2 svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-r4m2 p{margin:0;}#mermaid-diagram-r4m2 .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-r4m2 .cluster-label text{fill:#333;}#mermaid-diagram-r4m2 .cluster-label span{color:#333;}#mermaid-diagram-r4m2 .cluster-label span p{background-color:transparent;}#mermaid-diagram-r4m2 .label text,#mermaid-diagram-r4m2 span{fill:#000000;color:#000000;}#mermaid-diagram-r4m2 .node rect,#mermaid-diagram-r4m2 .node circle,#mermaid-diagram-r4m2 .node ellipse,#mermaid-diagram-r4m2 .node polygon,#mermaid-diagram-r4m2 .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-r4m2 .rough-node .label text,#mermaid-diagram-r4m2 .node .label text{text-anchor:middle;}#mermaid-diagram-r4m2 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-r4m2 .node .label{text-align:center;}#mermaid-diagram-r4m2 .node.clickable{cursor:pointer;}#mermaid-diagram-r4m2 .arrowheadPath{fill:#333333;}#mermaid-diagram-r4m2 .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-r4m2 .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-r4m2 .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-r4m2 .edgeLabel p{background-color:white;}#mermaid-diagram-r4m2 .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-r4m2 .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-r4m2 .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-r4m2 .cluster text{fill:#333;}#mermaid-diagram-r4m2 .cluster span{color:#333;}#mermaid-diagram-r4m2 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-r4m2 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-r4m2 .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-r4m2 .marker,#mermaid-diagram-r4m2 marker,#mermaid-diagram-r4m2 marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4m2 .label,#mermaid-diagram-r4m2 text,#mermaid-diagram-r4m2 text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-r4m2 .background,#mermaid-diagram-r4m2 rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-r4m2 .entityBox,#mermaid-diagram-r4m2 .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-r4m2 .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-r4m2 .label-container,#mermaid-diagram-r4m2 rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4m2 line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r4m2 :root{--mermaid-font-family:var(--font-geist-sans);}Déploiement traditionnelInstallation manuelleDépendances spécifiques àl&#39;OSConfiguration manuelleMachines virtuellesImage complète de l&#39;OSRessources importantesDémarrage lentConteneurs DockerLéger et portableDémarrage rapideIsolation des processusPartage du noyau OS
```

## Troubleshooting

Voici quelques problèmes courants et leurs solutions:

1. **Problème**: L'application ne démarre pas
**Solution**: Vérifiez les logs avec `docker logs app-bancaire`
2. **Problème**: Impossible de se connecter à MongoDB
**Solution**: Vérifiez que le conteneur MongoDB est en cours d'exécution et que l'URL de connexion est correcte
3. **Problème**: L'image est trop volumineuse
**Solution**: Utilisez une image de base plus légère comme `node:18-alpine` et optimisez le Dockerfile
4. **Problème**: Les modifications de code ne sont pas prises en compte
**Solution**: Reconstruisez l'image avec `docker-compose up -d --build`
5. **Problème**: Erreur "port already in use"
**Solution**: Changez le port dans docker-compose.yml ou arrêtez le service qui utilise ce port

## Sécurité et bonnes pratiques

Pour une application en production, considérez ces bonnes pratiques:

1. **Sécurité**:

1. Utilisez des secrets Docker pour les informations sensibles
2. Limitez les privilèges des conteneurs
3. Scannez régulièrement les images pour les vulnérabilités

2. **Performance**:

1. Utilisez des volumes pour la persistance des données
2. Configurez des limites de ressources pour les conteneurs
3. Utilisez un réseau dédié pour la communication inter-conteneurs

3. **Maintenance**:

1. Mettez en place une stratégie de sauvegarde pour MongoDB
2. Automatisez les mises à jour des images
3. Utilisez des health checks pour surveiller l'état des conteneurs

## Conclusion

Cette application bancaire conteneurisée démontre efficacement l'utilisation de Docker pour créer, déployer et partager une application complète avec sa base de données. Les conteneurs offrent une solution élégante aux problèmes de déploiement et de gestion des dépendances, tout en facilitant la collaboration entre les équipes de développement et d'opérations.

En suivant ce guide, vous avez appris à:

1. Créer une application Node.js avec MongoDB
2. Conteneuriser l'application avec Docker
3. Utiliser Docker Compose pour orchestrer plusieurs conteneurs
4. Publier et partager votre image sur Docker Hub
5. Déployer l'application sur différentes machines

Ces compétences sont essentielles dans le développement moderne et constituent une base solide pour des déploiements plus complexes avec des outils comme Kubernetes.

