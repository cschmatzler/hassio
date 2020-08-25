ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8


RUN npm install express

# Copy data for add-on
COPY run.sh \
COPY ghoma.js \
COPY ghoma_server.js \

RUN chmod a+x /run.sh
RUN chmod a+x /ghoma_server.js

CMD [ "/run.sh" ]
