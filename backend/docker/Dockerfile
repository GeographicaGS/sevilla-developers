from geographica/nodejs

# environment
ENV ROOTDIR /app
ENV APPFOLDER src/sevilla-developers

COPY $APPFOLDER $ROOTDIR

WORKDIR $ROOTDIR

RUN npm install --no-bin-links && npm install -g nodemon

EXPOSE 3000

CMD node bin/www