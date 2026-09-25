const API_URL = 'http://localhost:3000/api';

//Referencias a los elementos del DOM
const formAlumno = document.getElementById('formAlumno');
const tablaAlumnos = document.getElementById('tablaAlumnos');
const selectCursos = document.getElementById('id_curso_fk');
const btnRecargar = document.getElementById('btnRecargar');

// Event Listener Inicial
document.addEventListener('DOMContentLoaded', () => {
    cargarCursos();
    cargarAlumnos();
});

//Event Listener
btnRecargar.addEventListener('click', cargarAlumnos);

//CARGAR CURSOS DESDE EL BACKEND EN EL SELECT
async function cargarCursos() {
    try {
        const res = await fetch(`${API_URL}/cursos`);
        const cursos = await res.json();

        selectCursos.innerHTML = '<option value="">Seleccione un curso...</option>';
        cursos.forEach(curso => {
            selectCursos.innerHTML += `
                <option value="${curso.id_curso}">${curso.nombre_curso} (${curso.turno})</option>
            `;
        });
    } catch (error) {
        mostrarNotificacion('Error al conectar con la API de cursos', 'error');
    }
}

//CONSULTAR Y RENDERIZAR TABLA DE ALUMNOS (DQL / SELECT)
async function cargarAlumnos() {
    try {
        const res = await fetch(`${API_URL}/alumnos`);
        const alumnos = await res.json();

        if (alumnos.length === 0) {
            tablaAlumnos.innerHTML = `
                <tr>
                    <td colspan="7" class="py-3 text-muted">No hay alumnos registrados en la Base de Datos.</td>
                </tr>
            `;
            return;
        }

        //Inyección dinámica de HTML en el DOM
        tablaAlumnos.innerHTML = '';
        alumnos.forEach(alumno => {
            tablaAlumnos.innerHTML += `
                <tr>
                    <td class="fw-bold">${alumno.id_alumno}</td>
                    <td>${alumno.dni}</td>
                    <td>${alumno.apellido}, ${alumno.nombre}</td>
                    <td>${alumno.email}</td>
                    <td>${alumno.edad}</td>
                    <td><span class="badge bg-info text-dark">${alumno.curso}</span></td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="confirmarEliminacion(${alumno.id_alumno})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        tablaAlumnos.innerHTML = `
            <tr>
                <td colspan="7" class="py-3 text-danger">Error al cargar datos. Verifique que MAMP y Node.js estén corriendo.</td>
            </tr>
        `;
    }
}

//REGISTRAR ALUMNO (DML / INSERT VIA POST)
formAlumno.addEventListener('submit', async (e) => {
    e.preventDefault();

    //Captura de datos desde las cajas de texto
    const nuevoAlumno = {
        dni: document.getElementById('dni').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        edad: parseInt(document.getElementById('edad').value),
        id_curso_fk: document.getElementById('id_curso_fk').value
    };

    try {
        const res = await fetch(`${API_URL}/alumnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoAlumno)
        });

        const respuesta = await res.json();

        if (!res.ok) {
            throw new Error(respuesta.mensaje || 'Error al guardar el alumno');
        }

        //Éxito
        formAlumno.reset();
        cargarAlumnos();
        mostrarNotificacion('Alumno guardado exitosamente en MySQL', 'exito');

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error de inserción SQL',
            text: error.message,
            confirmColor: '#0d6efd'
        });
    }
});

//ELIMINAR ALUMNO (DML / DELETE) CON CONFIRMACIÓN MODAL

async function confirmarEliminacion(id) {
    const resultado = await Swal.fire({
        title: '¿Confirmar eliminación?',
        text: `Se borrará permanentemente el alumno con ID ${id} de la base de datos.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        try {
            const res = await fetch(`${API_URL}/alumnos/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (!res.ok) throw new Error(data.mensaje);

            cargarAlumnos();
            mostrarNotificacion('Registro eliminado de la base de datos', 'exito');
        } catch (error) {
            mostrarNotificacion(error.message, 'error');
        }
    }
}

//HELPER: NOTIFICACIONES TIPO TOAST CON TOASTIFY JS
function mostrarNotificacion(mensaje, tipo) {
    Toastify({
        text: mensaje,
        duration: 3500,
        gravity: "top",
        position: "right",
        style: {
            background: tipo === 'exito' 
                ? "linear-gradient(to right, #00b09b, #96c93d)" 
                : "linear-gradient(to right, #ff5f6d, #ffc371)",
            borderRadius: "6px"
        }
    }).showToast();
}