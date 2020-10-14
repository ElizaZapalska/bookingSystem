FROM python:3.7
RUN apt-get update && apt-get install -y libldap2-dev libsasl2-dev python3-dev
WORKDIR /app
RUN pip install pyOpenSSL==19.1.0
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run", "--host=0.0.0.0"]

