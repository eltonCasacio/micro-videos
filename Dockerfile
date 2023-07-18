FROM node:14.15.4-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list && \
    apt update && apt upgrade && apt install -y \
    git \
    ca-certificates \
    default-jre

# ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]