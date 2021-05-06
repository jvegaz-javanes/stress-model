FROM ubuntu:18.04


RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev
RUN pip3 install --upgrade pip

RUN apt-get install -y default-libmysqlclient-dev
RUN apt-get install libssl-dev

RUN apt-get install -y mysql-client

WORKDIR /backestres

COPY . .

RUN pip3 install -r requirements.txt

CMD ["python3","estres.py"]

EXPOSE 8001
