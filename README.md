# The Pon5 Project

A simple sample website for uploading and viewing videos

<img src="https://github.com/user-attachments/assets/35239314-4e33-4652-8b67-723cf118c43c" alt="card cart example" width="700"/>
<img src="https://github.com/user-attachments/assets/85197d1a-655f-41e4-a373-8f4b585d20f6" alt="video example" width="700"/>
<img src="https://github.com/user-attachments/assets/4aceec15-5868-4b5a-9707-9b84e16d1461" alt="upload error example" width="700"/>

<img src="https://github.com/user-attachments/assets/fe3b977f-f749-415b-919a-36faed0e4fa6" alt="submit button disable example" width="700"/>
<img src="https://github.com/user-attachments/assets/7e669adc-8291-4ad6-8a39-3a6f76196011" alt="new video example" width="700"/>

## Technology:
- Procedural PHP
- React JS
- MySQL
- Apache2
- Docker
- ffmpeg

## Features:
- Video IDs hashed to prevent sequential scraping
- Video upload timestamps recorded and displayed
- Video authors stored and displayed 
- Default uploader is "anonymous", allowing unauthed users to upload

## Code Sample Points:
### Docker
- Dockerized the application for ease and reliability of development
- Apache2 and PHP config settings set via shell in Docker RUN commands (Dockerfile)
- Docker compose file includes a phpMyAdmin image for manual schema generation and database debugging
### SQL
- SQL schema for MySQL read from prepared file (schema/pon5_db.sql)
- SQL statements using procedural PHP mysqli
### PHP
- Procedural handling for simple POST and GET requests
- Uses hash_pbkdf2 for hashing video IDs
- Calls ffmpeg on saved videos to generate thumbnails
### React
- Videos and thumbnails served as files from Apache/PHP
- Video info fetched from a PHP GET request and displayed
- Re-usable video cards for displaying thumbnails and video info
- Basic routing between urls in a single-page application
- Navbar with responsive and clickable icons
- Input checks on upload form performed by PHP with errors parsed and displayed by React without
  disrupting form inputs. Spinner enabled and "submit" button disabled while waiting for the POST response.

## To run, use:
```
docker compose --profile react up --build
```
