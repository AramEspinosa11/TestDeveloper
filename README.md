# TestDeveloper
CRUD with Flask and React JS

***********Backend**********

Una vez que se clono el repositorio entra en la carpeta flask-server en la consola
ejecuta el comando py -m venv env

Despues activa el proyecto ejecutando venv\Scripts\activate

luego instala las librerias ejecutando los siguientes comandos en la consola:

pip install -U Flask-SQLAlchemy
pip install Flask-MySQLdb
pip install flask-marshmallow
pip install Flask-Cors
pip install flask-bcrypt
pip install flask-session

Para configurar la conexion a la base de datos en el archivo test.py agrega tu usuario, contraseña y la ruta del localhost donde creaste la base de datos
Ejemplo:      app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@127.0.0.1:3310/weport'

Una vez conectada la base de datos en la consolo ejecuta python test.py

***********Frontend**************

En la consola entra a la ruta del proyecto TestDeveloper y entra a la carpeta front

ejecuta el comando: npm install

despues ejecuta el comando: npm start para iniciar el servidor.

