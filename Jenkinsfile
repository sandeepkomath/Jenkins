/* groovylint-disable LineLength */
pipeline {
    agent any
    stages {
        stage('Docker Build') {
            steps {
                sh 'docker build -f containerfile -t sandtest/frontend:jen1 .'
            }
        }
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: '63b57e8e-7c81-4176-ab51-bb1326af7c4e', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    sh "docker login docker.io -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh 'docker push sandtest/frontend:jen1'
                }
            }
        }
        stage('Docker Run') {
            agent any
            steps {
                sh 'docker run -d -p 12000:12000 sandtest/frontend:jen1s'
                }
            }
        }
    }

    
