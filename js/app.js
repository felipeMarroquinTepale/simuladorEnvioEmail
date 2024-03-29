document.addEventListener('DOMContentLoaded',function(){
    const email = {
        email:'',
        cc:'',
        asunto:'',
        mensaje:''
    }

    //Seleccionar los elementos de la vista
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCc = document.querySelector('#cc');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    //asignar eventos
    inputEmail.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);
    formulario.addEventListener('submit',enviarEmail);
    inputCc.addEventListener('blur',validar);

    btnReset.addEventListener('click',function(e){
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario()

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent="Mensaje enviado correctamente";
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function resetFormulario(){
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();

    }


    function validar(e){
        // console.log(e.target.parentElement);


        if(e.target.value.trim() ==='' && e.target.name !== 'cc'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; //Detiene la ejecucion del codigo despues del if
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.name === 'cc' && e.target.value.trim()!== '' && !validarEmail(e.target.value)){
            mostrarAlerta('El campo cc no tiene un email valido',e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }


        limpiarAlerta(e.target.parentElement);




        //Asignar los valores
        email[e.target.name] = e.target.value.toLowerCase();
        console.log(email)


        if(email.cc === ''){
            delete email.cc
            //comprobar el objeto email
            comprobarEmail();
            return
        }
        //comprobar el objeto email
        comprobarEmail();
    }

    function comprobarEmail(){
        // if(email.cc !== ''){}
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        return;
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function mostrarAlerta(mensaje,referencia){
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }



        //Generar alerta en HTML
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');

        referencia.appendChild(error);

    }
});