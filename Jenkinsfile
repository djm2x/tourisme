#!groovy

node {
  def APP_NAME = 'tourisme'
  def DOMAINE = 'dev-solus.com'
  def DOMAINE_PREFIX = ''
  def SUB_DOMAINE = 'tourisme'
  def APP_PORT = '3000'
  def EXPOSED_PORT = '3050'

  def DOCKER_FILE = 'Dockerfile'
  def DOCKER_FILE_SSR = 'Dockerfile.ssr'

  def app

    stage('Cloning Git') {
      def commit = checkout scm
      //  env.BRANCH_NAME = commit.GIT_BRANCH.replace('origin/', '')
      // sh "echo ${commit}"
    }

    stage('Building image') {
      sh "docker rmi --force ${APP_NAME}"

      app = docker.build("${APP_NAME}", "-t ${APP_NAME} -f ${DOCKER_FILE_SSR} ./")

      // sh "echo ${app}"
      // -p ${EXPOSED_PORT}:${APP_PORT} \

    }

    stage('Docker Run') {
      sh "docker rm --force ${APP_NAME}"

      sh """docker run -d \
      --restart unless-stopped \
      --network proxy \
      --volume /home/dev/volumes/${APP_NAME}/data:/api/data \
      --label traefik.enable=true \
      --label traefik.http.routers.${APP_NAME}.tls=true \
      --label traefik.http.routers.${APP_NAME}.tls.certresolver=letsencrypt \
      --label traefik.http.routers.${APP_NAME}.rule='Host(`${SUB_DOMAINE}.${DOMAINE}`)'\
      --label traefik.http.services.${APP_NAME}.loadbalancer.server.port=${APP_PORT} \
      --name ${APP_NAME} \
      ${APP_NAME}"""

      // sh "docker system prune -a -f"
    }
}

