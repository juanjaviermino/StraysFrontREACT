import React, {Fragment} from 'react'

function About () {
    return(
        <Fragment>
            <h1 className='p-3'>About</h1>
            <p className='text-info'>Bienvenido a mi aplicación web que representa una emocionante colaboración entre tecnologías 
                punteras para brindarte una experiencia excepcional. En el lado del front-end, he utilizado React, 
                una biblioteca de JavaScript ampliamente aclamada por su capacidad para crear interfaces de usuario 
                interactivas y dinámicas. En el backend, he confiado en Flask, un microframework de Python, para 
                ofrecer una sólida estructura de servidor y gestionar las solicitudes entrantes de manera eficiente. 
                Para almacenar y administrar nuestros datos, utilicé MongoDB, una base de datos NoSQL altamente 
                escalable y flexible. Esta aplicación tiene como objetivo principal proporcionar una funcionalidad de 
                CRUD (Crear, Leer, Actualizar y Eliminar) como parte de la clase de de Ingeniería Web en la 
                Universidad de las Américas (UDLA).</p>
            <p className='text-info'> La aplicación es un testimonio de cómo las últimas tecnologías pueden converger para crear soluciones 
                web modernas y efectivas. React, conocida por su enfoque en componentes reutilizables y su capacidad para 
                gestionar estados de manera eficiente, forma la columna vertebral de nuestra interfaz de usuario. Por otro 
                lado, Flask, con su simplicidad y facilidad de configuración, se encarga de manejar las solicitudes y 
                proporcionar una infraestructura de servidor sólida. MongoDB, como la elección de base de datos, brinda 
                flexibilidad en el almacenamiento de datos y escalabilidad, lo que es esencial para manejar los requerimientos 
                cambiantes de nuestra aplicación. </p>
        </Fragment>
    );
}

export default About;