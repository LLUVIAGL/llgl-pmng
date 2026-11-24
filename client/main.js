// 1. ⚠️ IMPORTANTE: Reemplaza "TU_IP_PUBLICA" con la IP real de tu EC2.
// Puedes obtenerla en la consola de AWS o corriendo: curl ifconfig.me
const API_URL = 'http://52.91.220.110/:8089/people'; 

const findAll = async () => {
    let tbody = document.getElementById('tbody');
    
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        
        const result = await response.json();
        // Asumimos que tu backend devuelve { data: [...] }. Si devuelve el array directo, usa: let names = result;
        let names = result.data || []; 
        let content = '';

        names.forEach(itm => {
            content += `<tr><td>${itm.name}</td></tr>`;
        });

        tbody.innerHTML = content;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        tbody.innerHTML = '<tr><td>Error al cargar datos. Revisa la consola (F12).</td></tr>';
    }
}

const savePerson = async () => {
    const nameInput = document.getElementById('name');
    const person = {
        name: nameInput.value
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(person)
        });
        
        const result = await response.json();
        console.log("Persona guardada con éxito:", result);
        
        // ✨ Mejoras de experiencia de usuario:
        nameInput.value = ''; // Limpiar el campo de texto
        findAll(); // Recargar la tabla para ver el nuevo nombre al instante
        
    } catch (error) {
        console.error("Error al guardar la persona:", error);
    }
}

// Ejecutar la carga inicial cuando el script se ejecuta
(() => {
    findAll();
})();