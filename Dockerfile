FROM ubuntu:24.04

#COPY html/ /var/www/html/
COPY php.ini /usr/local/etc/php/conf.d/php.ini

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    apache2 php8.3 php8.3-mysql libapache2-mod-php8.3

RUN a2enmod php8.3
# RUN systemctl restart apache2

# RUN docker-php-ext-install mysqli pdo pdo_mysql gd
RUN apt-get install php-mysql

# preventing exiting of container
# CMD apachectl -D FOREGROUND
CMD ["apachectl", "-D", "FOREGROUND"]
