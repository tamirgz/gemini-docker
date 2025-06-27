FROM node:18-slim

RUN apt-get update && apt-get install -y bash curl git && rm -rf /var/lib/apt/lists/*

RUN npm install -g @google/gemini-cli

WORKDIR /workspace

COPY wrapper/package.json /workspace/wrapper/
COPY wrapper/gemini-wrapper.js /workspace/wrapper/
RUN cd /workspace/wrapper && npm install

COPY start.sh /workspace/

CMD ["/bin/bash", "/workspace/start.sh"]