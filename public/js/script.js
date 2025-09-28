let profileMenu = document.getElementById("profileMenu");

function toggleMenu() {
    profileMenu.classList.toggle("open-menu");
}

let moreLink = document.getElementById("showMoreLink");
let sideActivity = document.getElementById("sidebarActivity");

function toggleActivity() {
    sideActivity.classList.toggle("open-activity");
    if(sideActivity.classList.contains("open-activity")){
        moreLink.innerHTML = 'Show Less <b>^</b>';
    }
    else{
        moreLink.innerHTML = 'Show More <b>v</b>';
    }
}


// Funciones para el modal de edición de perfil
function openEditProfileModal() {
    document.getElementById('editProfileModal').classList.add('active');
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('active');
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('editProfileModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeEditProfileModal();
    }
});

// Funciones para agregar/eliminar experiencias
let experienceCount = 1;

function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-item';
    newExperience.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="expCompany${experienceCount}">Company</label>
                <input type="text" id="expCompany${experienceCount}" placeholder="Company name">
            </div>
            <div class="form-group">
                <label for="expPosition${experienceCount}">Position</label>
                <input type="text" id="expPosition${experienceCount}" placeholder="Position title">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="expType${experienceCount}">Employment Type</label>
                <select id="expType${experienceCount}">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>
            <div class="form-group">
                <label for="expStartDate${experienceCount}">Start Date</label>
                <input type="text" id="expStartDate${experienceCount}" placeholder="MMM YYYY">
            </div>
            <div class="form-group">
                <label for="expEndDate${experienceCount}">End Date</label>
                <input type="text" id="expEndDate${experienceCount}" placeholder="MMM YYYY or Present">
            </div>
        </div>
        <div class="form-group">
            <label for="expDescription${experienceCount}">Description</label>
            <textarea id="expDescription${experienceCount}" placeholder="Describe your responsibilities and achievements"></textarea>
        </div>
        <button class="remove-item" onclick="removeExperience(this)">Remove Experience</button>
    `;
    container.appendChild(newExperience);
}

function removeExperience(button) {
    button.parentElement.remove();
}

// Funciones para agregar/eliminar educación
let educationCount = 1;

function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-item';
    newEducation.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="eduSchool${educationCount}">School</label>
                <input type="text" id="eduSchool${educationCount}" placeholder="School name">
            </div>
            <div class="form-group">
                <label for="eduDegree${educationCount}">Degree</label>
                <input type="text" id="eduDegree${educationCount}" placeholder="Degree and field of study">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="eduStartDate${educationCount}">Start Date</label>
                <input type="text" id="eduStartDate${educationCount}" placeholder="YYYY">
            </div>
            <div class="form-group">
                <label for="eduEndDate${educationCount}">End Date</label>
                <input type="text" id="eduEndDate${educationCount}" placeholder="YYYY">
            </div>
        </div>
        <button class="remove-item" onclick="removeEducation(this)">Remove Education</button>
    `;
    container.appendChild(newEducation);
}

function removeEducation(button) {
    button.parentElement.remove();
}

// Funciones para agregar/eliminar habilidades
function addSkill() {
    const skillInput = document.getElementById('newSkill');
    const skill = skillInput.value.trim();
    
    if (skill) {
        const container = document.getElementById('skillsContainer');
        const newSkill = document.createElement('div');
        newSkill.className = 'skill-tag';
        newSkill.innerHTML = `${skill} <span class="remove-tag" onclick="removeSkill(this)">×</span>`;
        container.appendChild(newSkill);
        skillInput.value = '';
    }
}

function removeSkill(element) {
    element.parentElement.remove();
}

// Funciones para agregar/eliminar idiomas
function addLanguage() {
    const languageInput = document.getElementById('newLanguage');
    const language = languageInput.value.trim();
    
    if (language) {
        const container = document.getElementById('languagesContainer');
        const newLanguage = document.createElement('div');
        newLanguage.className = 'language-tag';
        newLanguage.innerHTML = `${language} <span class="remove-tag" onclick="removeLanguage(this)">×</span>`;
        container.appendChild(newLanguage);
        languageInput.value = '';
    }
}

function removeLanguage(element) {
    element.parentElement.remove();
}

// Función para guardar cambios (simulación)
function saveProfileChanges() {
    // En una implementación real, aquí se enviarían los datos al servidor
    Swal.fire({
        title: '¡Éxito!',
        text: 'Los cambios de tu perfil se guardaron correctamente.',
        icon: 'success',
        timer: 2000, // 3 segundos
        showConfirmButton: false, // no muestra botón
        timerProgressBar: true // opcional: muestra barra de progreso
    });
    closeEditProfileModal();
}


