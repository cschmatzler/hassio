ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8


RUN npm install express

# Copy data for add-on
COPY run.sh
COPY ghoma.js
COPY ghoma_server.js

RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
