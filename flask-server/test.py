from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from functools import wraps
from flask_session import Session

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'weport-test'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@127.0.0.1:3310/weport'  # Reemplaza con tus propios datos
db = SQLAlchemy(app)

app.config['SESSION_TYPE'] = 'filesystem'  # Almacenamiento en el sistema de archivos
app.config['SESSION_PERMANENT'] = False  # Las sesiones no son permanentes
app.config['SESSION_USE_SIGNER'] = True 

Session(app)

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()

class User_role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100))

class Id_status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(100))

class User_admin(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    type_id  = db.Column(db.Integer, db.ForeignKey('user_role.id'))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class User_info(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    type_id = db.Column(db.Integer, db.ForeignKey('user_role.id'))
    status = db.Column(db.Integer)
    nombre = db.Column(db.String(100))
    apellidos = db.Column(db.String(100))
    telefono = db.Column(db.String(100))
    tipo_sangre	= db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    email = db.Column(db.String(100), unique=True)
    fecha_nacimiento = db.Column(db.String(100))
    nombre_contacto_emergencia = db.Column(db.String(100))
    telefono_contacto_emergencia = db.Column(db.String(100))

class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    status = db.Column(db.Integer)
    date_created = db.Column(db.String(100))
    date_deleted = db.Column(db.String(100))


class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombres = db.Column(db.String(100))
    a_paterno = db.Column(db.String(100))
    a_materno = db.Column(db.String(100))
    type_id = db.Column(db.Integer)


@app.route('/getuser', methods=['GET'])
def getuser():
    try:

        users = User_info.query.filter_by(status="1").all()

        user_list = []

        # Convierte los resultados en un formato JSON
        for user in users:
            user_data = {
                'id': user.id,
                'nombre': user.nombre,
                'apellidos': user.apellidos,
                'telefono': user.telefono,
            }
            user_list.append(user_data)

        return jsonify({"users": user_list})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/getuserdeleted', methods=['GET'])
def getuserdeleted():
    try:

        users = User_info.query.filter_by(status="2").all()

        user_list = []

        # Convierte los resultados en un formato JSON
        for user in users:
            user_data = {
                'id': user.id,
                'nombre': user.nombre,
                'apellidos': user.apellidos,
                'telefono': user.telefono,
                'email': user.email,
            }
            user_list.append(user_data)

        return jsonify({"users": user_list})
    except Exception as e:
        return jsonify({"error": str(e)})

# Ruta para verificar la sesión
@app.route('/check-session', methods=['GET'])
def check_session():
    if 'user_id' in session and session['user_id']:
        return jsonify({"sessionExists": True, "user_id": session['user_id']})
    else:
        return jsonify({"sessionExists": False})

@app.route('/signup', methods=['POST'])
def signup():
    try:
        email = request.json["email"]
        password = request.json["password"]

        user_exist = User_admin.query.filter_by(email=email).first()

        if user_exist:
            return jsonify({"error": "El correo ya fue utilizado"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User_admin(type_id="1", email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/login', methods=['POST'])
def login_user():
    try:
        email = request.json["email"]
        password = request.json["password"]

        user = User_admin.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"Error":"Acceso no autorizado"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"Error": "No autorizado"}), 401


        session['user_id'] = user.id

        return jsonify({
            "message": session['user_id'],
            "email": user.email
        })

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/logout', methods=['POST'])
def logout_user():
    try:
        # Verificar si el usuario está autenticado
        if 'user_id' in session:
            # Eliminar la información de sesión para cerrar la sesión
            session.pop('user_id', None)
            return jsonify({"message": "Sesión cerrada exitosamente"})
        else:
            return jsonify({"message": "No hay una sesión activa"}), 401
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/getuserselected/<int:user_id>', methods=['GET'])
def getuserselected(user_id):
    try:
        # Realiza una consulta para obtener toda la información del usuario con el ID especificado
        user = User_info.query.filter_by(id=user_id).first()

        if user:
            user_data = {
                'id' : user.id,
                'nombre' : user.nombre,
                'apellidos' : user.apellidos,
                'telefono' : user.telefono,
                'tipo_sangre' : user.tipo_sangre,
                'direccion' : user.direccion,
                'email' : user.email,
                'fecha_nacimiento' : user.fecha_nacimiento,
                'nombre_contacto_emergencia' : user.nombre_contacto_emergencia,
                'telefono_contacto_emergencia' : user.telefono_contacto_emergencia
            }

            return jsonify({"users": user_data})
        else:
            return jsonify({"message": "Usuario no encontrado"})
    except Exception as e:
        return jsonify({"error": str(e)})



@app.route('/useradd', methods=['POST'])
def useradd():
    try:
        type_id = '1'
        status = '1'
        nombre = request.json['nombre']
        apellidos = request.json['apellidos']
        telefono = request.json['telefono']
        tipo_sangre	= request.json['tipo_sangre']
        direccion = request.json['direccion']
        email = request.json['email']
        fecha_nacimiento = request.json['fecha_nacimiento']
        nombre_contacto_emergencia = request.json['nombre_contacto_emergencia']
        telefono_contacto_emergencia = request.json['telefono_contacto_emergencia']
    
        new_user = User_info(type_id=type_id, status=status, nombre=nombre, apellidos=apellidos, telefono=telefono, tipo_sangre=tipo_sangre, direccion=direccion, email=email, fecha_nacimiento=fecha_nacimiento, nombre_contacto_emergencia=nombre_contacto_emergencia, telefono_contacto_emergencia=telefono_contacto_emergencia )
        db.session.add(new_user)
        db.session.commit()
    
        return jsonify({"success": "Registro agregado exitosamente"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})

@app.route('/updateuser/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        # Obtén el usuario que deseas actualizar según su ID
        user = User_info.query.get(user_id)

        if not user:
            return jsonify({"message": "Usuario no encontrado"})

        # Obtén los datos actualizados del usuario desde la solicitud JSON
        updated_data = request.json

        # Actualiza los campos del usuario con los datos proporcionados
        for key, value in updated_data.items():
            setattr(user, key, value)

        # Guarda los cambios en la base de datos
        db.session.commit()

        return jsonify({"message": "Usuario actualizado exitosamente"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})

@app.route('/deleteuser/<int:user_id>', methods=['PUT'])
def delete_user(user_id):
    try:
        # Obtén el usuario que deseas actualizar según su ID
        user = User_info.query.get(user_id)

        if not user:
            return jsonify({"message": "Usuario no encontrado"})

        # Obtén los datos actualizados del usuario desde la solicitud JSON
        updated_data = {
            'status' : '2'
        }

        # Actualiza los campos del usuario con los datos proporcionados
        for key, value in updated_data.items():
            setattr(user, key, value)

        # Guarda los cambios en la base de datos
        db.session.commit()

        return jsonify({"message": "Usuario eliminado exitosamente"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
