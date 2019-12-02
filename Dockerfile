FROM alpine:latest

MAINTAINER Shayan Shamskolahi "sh.shmss@gmail.com"

RUN apk add --no-cache python3-dev \
&& pip3 install --upgrade pip

COPY . /app

WORKDIR /app

RUN pip3 --no-cache-dir  install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]
