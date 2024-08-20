FROM ubuntu:24.04

COPY html/ /var/www/html/

RUN chown www-data /var/www/html/videos

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    apache2 php8.3 php8.3-mysql libapache2-mod-php8.3 php-mysql

RUN sed -i 's/upload_max_filesize.*/upload_max_filesize = 16M/' /etc/php/8.3/apache2/php.ini
RUN sed -i 's/post_max_size.*/post_max_size = 16M/' /etc/php/8.3/apache2/php.ini

RUN a2enmod headers
RUN a2enmod php8.3

#RUN echo "LoadModule headers_module /usr/lib/apache2/modules/mod_headers.so" >> /etc/apache2/apache2.conf
#RUN echo "Header set Access-Control-Allow-Origin 'http://localhost:3000'" >> /etc/apache2/apache2.conf

RUN echo "<IfModule mod_headers.c>" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Origin 'http://localhost:3000'" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Headers 'Content-Type'" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Methods 'GET, POST'" >> /etc/apache2/apache2.conf
RUN echo "</IfModule>" >> /etc/apache2/apache2.conf

RUN service apache2 restart

CMD ["apachectl", "-D", "FOREGROUND"]
