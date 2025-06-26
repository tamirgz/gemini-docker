FROM node:18-slim

RUN apt-get update && apt-get install -y bash curl git

RUN npm install -g @google/gemini-cli

RUN mkdir -p /root/.gemini /workspace/wrapper

WORKDIR /workspace

COPY wrapper/package.json /workspace/wrapper/
COPY wrapper/gemini-wrapper.js /workspace/wrapper/
RUN cd /workspace/wrapper && npm install

VOLUME ["/root/.gemini", "/workspace"]

CMD ["bash"]