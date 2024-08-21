FROM ubuntu:24.04

COPY html/ /var/www/html/

# enable saving of files by the server
RUN chown www-data:www-data /var/www/html/videos
RUN chown www-data:www-data /var/www/html/thumbnails
RUN chown www-data:www-data /var/www/html/avatars

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    apache2 php8.3 php8.3-mysql libapache2-mod-php8.3 php-mysql ffmpeg

# increase the max filesize for POST requests to 16MB
RUN sed -i 's/upload_max_filesize.*/upload_max_filesize = 16M/' /etc/php/8.3/apache2/php.ini
RUN sed -i 's/post_max_size.*/post_max_size = 16M/' /etc/php/8.3/apache2/php.ini

# enable error logging
RUN sed -i 's@log_errors.*@log_errors = On@' /etc/php/8.3/apache2/php.ini
RUN sed -i 's@error_log.*@error_log = /dev/stderr@' /etc/php/8.3/apache2/php.ini

RUN a2enmod php8.3

# CORS settings for the frontent docker image to be able to talk to the backend docker image
RUN a2enmod headers
RUN echo "<IfModule mod_headers.c>" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Origin 'http://localhost:3000'" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Headers 'Content-Type'" >> /etc/apache2/apache2.conf
RUN echo "  Header add Access-Control-Allow-Methods 'GET, POST'" >> /etc/apache2/apache2.conf
RUN echo "</IfModule>" >> /etc/apache2/apache2.conf

RUN service apache2 restart

# stock command to run continuously so the docker container doesn't exit.
CMD ["apachectl", "-D", "FOREGROUND"]
