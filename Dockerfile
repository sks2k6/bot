FROM quay.io/eypzgod/izumi:latest
RUN git clone https://github.com/Akshay-Eypz/izumi-bot /root/bot/
WORKDIR /root/bot/
RUN yarn install --network-concurrency 1
RUN yarn global add pm2@6.0.5
CMD ["pm2-runtime", "ecosystem.config.js"]
