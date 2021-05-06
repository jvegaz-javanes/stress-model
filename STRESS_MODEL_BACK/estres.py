from flask import Flask,render_template, request,session,redirect,url_for,jsonify
from flask_mysqldb import MySQL
from flask_api import status
from flask_cors import CORS,cross_origin
from ibm_watson import ToneAnalyzerV3, LanguageTranslatorV3
from unidecode import unidecode
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import re
import MySQLdb.cursors
import json

authenticator = IAMAuthenticator('vP9U9uk7W3rUis4HW2QjN9gHCUpsAdFzdDJzuB75dDdN')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/453e6dd8-8533-4779-a007-70a0ad7926e8')
tone_analyzer.set_disable_ssl_verification(True)

authenticator2 = IAMAuthenticator('BVTXyGBSldqiCr8yA2s7Gpn1F79csMaVsIc3yB08X-Zj')
language_translator = LanguageTranslatorV3(
    version='2018-05-01',
    authenticator=authenticator2
)

language_translator.set_service_url('https://api.us-south.language-translator.watson.cloud.ibm.com/instances/f77d989e-bfba-4180-a539-9387c2c21db8')
language_translator.set_disable_ssl_verification(True)


app = Flask(__name__)
CORS(app, support_credentials=True)
app.secret_key = 'your secret key'

app.config['MYSQL_HOST']= 'sl-us-south-1-portal.46.dblayer.com'#localhost
app.config['MYSQL_USER']= 'admin'
app.config['MYSQL_PASSWORD']='AAMVVJMMAILDRHWT'
app.config['MYSQL_DB']='modeloEstres'
app.config['MYSQL_PORT']=22620
app.config['SQLALCHEMY_DATABASE_URI']="mysql://admin:AAMVVJMMAILDRHWT@sl-us-south-1-portal.45.dblayer.com:22620/compose"

mysql = MySQL(app)

rr=0

@app.route('/inicio',methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    # Output message if something goes wrong...
    msg = ''
    # Check if "username" and "password" POST requests exist (user submitted form)
    # Create variables for easy access
    details = request.form
    print('==================================',details)
    print('-----------------------------',details['fname'])
    username = details['fname']
    password = details['lname']
    print(username)
    print(password)
    print('SELECT * FROM usuario WHERE email = %s AND passwd = %s' % (username, password))
    # Check if account exists using MySQL
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM usuario WHERE email = %s AND passwd = %s", (username, password))
    # Fetch one record and return result
    account = cursor.fetchone()
    cursor.close()
    print(account)
    # If account exists in accounts table in out database
    if (account != None):
        # Create session data, we can access this data in other routes
        session['loggedin'] = True
        session['id'] = account['idUsuario']
        session['username'] = account['nombre']
        session['is_admin'] = account['admin']
        global rr
        rr=int(session['id'])
        is_admin()
        print(rr)
        # Redirect to home page
        #msg= str(status.HTTP_200_OK)
        return ("200")
    else:
        # Account doesnt exist or username/password incorrect
        #msg = str(status.HTTP_400_BAD_REQUEST)#en terminal imprime 200 ¿xq?
        return ("403")
    # Show the login form with message (if any)



@app.route('/loogout',methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redirect to login page
   return str(status.HTTP_200_OK)

@app.route('/summit',methods=["POST"])
@cross_origin(supports_credentials=True)
def summit_json():
    data = request.form
    print(data)
    nombre = data['nom']
    sector = data['sec']
    correo = data['mail']
    correo2 = data['mail2']
    password1 = data['pass']
    password2 = data['pass2']
    print(nombre,sector,correo,correo2,password1,password2)
    if ((correo == correo2) and (password1 == password2)) :

        if (not validate_email(correo)):
            return str(status.HTTP_400_BAD_REQUEST)

        print("son iguales")
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO usuario(nombre, email,passwd,sector,admin) VALUES (%s, %s, %s, %s, 0);", (nombre, correo,password1,sector))
        mysql.connection.commit()
        cur.close()

        return str(status.HTTP_200_OK)

    else:
        #redirigir al formulario??
        return str(status.HTTP_400_BAD_REQUEST)


@app.route('/Encuesta1', methods=["POST"])
@cross_origin(supports_credentials=True)
def insert_encuesta():
    print("prueba")

    data = request.form
    print(data)
    print(session)
    numero = int(data['num'])
    respuesta = data['resp']
    respuesta=json.loads(respuesta)
    #respuesta=str(respuesta.split(":")[1])

    print(rr,numero,respuesta["inlineRadioOptions"])

    check = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    check.execute("select * from respuestas where idUsuario=%s and idPregunta=%s;",(rr,numero))
    response = check.fetchone()
    print(response)
    check.close()

    cur=mysql.connection.cursor()
    if(response==None):
        x=cur.execute("INSERT INTO respuestas (idUsuario,idPregunta,respuesta) VALUES (%s,%s,%s);",(rr,numero,respuesta["inlineRadioOptions"]))
        y=mysql.connection.commit()
        print("------",x,"-----------",y)
    else:
        x=cur.execute("UPDATE respuestas set respuesta=%s where idUsuario=%s and idPregunta=%s;",(respuesta["inlineRadioOptions"],rr,numero))
        y=mysql.connection.commit()
        print("------",x,"-----------",y)
    cur.close()
    #msg ="200"
    msg= str(status.HTTP_200_OK)
    return("200")

@app.route('/inyeccion',methods=['POST'])
def inyeccion():

    data = request.form
    text = data['texto']
    text=inyeccion_traductor(text)
    print(text)
    tone_analysis = tone_analyzer.tone(
    {'text': text},
    content_type='application/json',
    content_language='en',
    accept_language='en'
    ).get_result()
    emociones="Your emotions are:"+tone_analysis["document_tone"]["tones"][0]["tone_id"]+" and "+tone_analysis["document_tone"]["tones"][1]["tone_id"]+"..."
    emociones=inyeccion_traductor_esp(emociones)
    promedio_encuesta=int(res_encuesta())

    if promedio_encuesta>0 and promedio_encuesta<=2.5:
        emociones=emociones+"Esta bien sentirse mal en el trabajo a veces. Trata de hablar con tu gerente sobre tu estado, te recomendamos meterte a estos links:\nAlgunas veces nuestra relación con nuestro equipo de trabajo no es la mejor por diversas razones, por eso mismo tenemos que encontrar la raíz, para que puedas comunicar lo que sientes, en ocasiones es complicado, pero es hora de hablar y de querer mejorar."
    elif promedio_encuesta>2.5 and promedio_encuesta<=5:
        emociones=emociones+"Trata de comunicarte más con tus compañeros de equipo y gerente. Siempre es bueno conocer mas personas. Un buen ambiente en oficinas te ayuda a desempeñarte mas.\n Actualmente una buena comunicación con nuestro equipo de trabajo es fundamental para que lleguemos a nuestras metas y objetivos, tanto grupalmente como individualmente, por eso mismo es bueno conocernos entre todos y tener una buena relación."
    elif promedio_encuesta>5 and promedio_encuesta<=8:
        emociones=emociones+"Siempre es bueno tener una buena relación con tu equipo de oficina. Dialogar sobre tus deberes y platicar sobre inconformidades o para llevar una mayor experiencia laboral.\nEs importante tener una buena relación con nuestro equipo de trabajo para que se puedan dar retroalimentación tanto positiva como negativa y así mejorar su experiencia laboral, les será de bastante ayuda "
    else:
        emociones=emociones+"Es primordial tener una buena relación con nuestro equipo de trabajo, sin embargo, también es importante tener una relación fuera, ya que pueden ser un gran apoyo en nuestras vidas.\nSigue esforzandote y siendo un trabajador de alto rendimiento"

    emociones=json.dumps(emociones)
    return(emociones)

def inyeccion_traductor(text):
    print(text)
    translation = language_translator.translate(
    text=text,
    model_id='es-en').get_result()
    #print(json.dumps(translation, indent=2, ensure_ascii=False))
    traduccion=translation["translations"][0]["translation"]
    print(traduccion)
    return(traduccion)

def inyeccion_traductor_esp(text):
    print(text)
    translation = language_translator.translate(
    text=text,
    model_id='en-es').get_result()
    #print(json.dumps(translation, indent=2, ensure_ascii=False))
    traduccion=translation["translations"][0]["translation"]
    return(traduccion)


@app.route('/resultado',methods=["POST"])
def res_encuesta():
    numero=str(rr)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT AVG(respuesta) AS avg FROM respuestas WHERE idUsuario= %s ;",(numero))
    fetchdata = cursor.fetchone()
    cursor.close()
    print("------------------------------------",fetchdata['avg'])
    return(fetchdata['avg'])

@app.route('/promdep',methods=["POST"])
def prom_dep():
    if(is_admin()):
        x=res_depar()
        x=str(x)
        print("----------------",x)
        print(type(x))
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT AVG(respuesta) AS avg FROM respuestas R JOIN usuario U ON R.idUsuario=U.idUsuario WHERE sector = '%s';"%(x))
        fetchdata = cursor.fetchone()
        mysql.connection.commit()
        cursor.close()
        avg=str(fetchdata['avg'])
        avg2=float(fetchdata['avg'])
        """if avg2<=6:
            avg="El promedio de tu departamento es: "+avg+"\nEste promedio es alarmante es necesario tomar medidas."
        elif avg2>6 and avg2<=8:
            avg="El promedio de tu departamento es: "+avg+"\nSe tiene que mejorar la comunicación en tu departamento, es necesario crear dinamicas de comunicaciones y mejorar este aspecto."
        else:
            avg="El promedio de tu departamento es: "+avg+"\nSiempre es bueno tener comunicacion con tu departamento, sigue con un buen trabajo."
            """
        avg2=json.dumps(avg2)
        print(avg)
        return(avg)

    return("No eres admin")

def res_depar():
    numero=str(rr)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM usuario WHERE idUsuario= %s ;"%(numero))
    account = cursor.fetchone()
    sector= str(account['sector'])
    print ("--------------",sector)
    print(type(sector))
    cursor.close()
    return(sector)

def is_admin():
    if(rr==1):
        print("User is Admin")
        return True
    print("User is not Admin")
    return False

def validate_email(email):
    valid_email='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    if(re.search(valid_email,email)):
        print("Valid Email")
        return True
    else:
        print("Invalid Email")
        return False

@app.route('/activo',methods=["POST"])
def activo1():
    print(session['id'],session['username'])
    print(session)
    print(rr)
    return("200")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)
    #app.run(debug=True,port=8001)
