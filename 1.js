var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var form = document.getElementById("contactForm");
var downloadBtn = document.getElementById("downloadBtn");
// Basic Info Inputs
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");
var addressInput = document.getElementById("address");
var phoneInput = document.getElementById("phone");
var ageInput = document.getElementById("age");
// Status Inputs
var isActiveInput = document.getElementById("isActive");
var isMarriedInput = document.getElementById("isMarried");
// Professional Inputs
var jobInput = document.getElementById("job");
var skillsInput = document.getElementById("skills");
// Interests Inputs
var hobbiesInput = document.getElementById("hobbies");
var languagesInput = document.getElementById("languages");
// Section Input Groups
var inputGroups = {
    education: {
        degree: document.getElementById("edu_degree"),
        institution: document.getElementById("edu_institution"),
        year: document.getElementById("edu_year"),
    },
    experience: {
        jobTitle: document.getElementById("exp_jobTitle"),
        company: document.getElementById("exp_company"),
        years: document.getElementById("exp_years"),
    },
    project: {
        title: document.getElementById("proj_title"),
        description: document.getElementById("proj_description"),
        year: document.getElementById("proj_year"),
    },
    certification: {
        title: document.getElementById("cert_title"),
        issuer: document.getElementById("cert_issuer"),
        year: document.getElementById("cert_year"),
    },
};
// ========= HELPER FUNCTIONS =========
var parseInputValue = function (el, type) {
    if (!el)
        return null;
    var value = el.value.trim();
    if (!value)
        return null;
    switch (type) {
        case "number":
            var num = Number(value);
            return isNaN(num) ? null : num;
        case "boolean":
            return el.checked;
        case "array":
            return value
                .split(",")
                .map(function (s) { return s.trim(); })
                .filter(Boolean);
        default:
            return value;
    }
};
var createSectionEntry = function (inputs) {
    var entry = {};
    var hasValue = false;
    for (var key in inputs) {
        if (inputs.hasOwnProperty(key)) {
            var el = inputs[key];
            var isNumber = key.toLowerCase().includes("year");
            var parsedValue = parseInputValue(el, isNumber ? "number" : "string");
            entry[key] = parsedValue;
            if (parsedValue !== null)
                hasValue = true;
        }
    }
    return hasValue ? entry : null;
};
var formatSection = function (entry, labels, emptyText) {
    var _a;
    if (emptyText === void 0) { emptyText = "N/A"; }
    if (!entry)
        return emptyText;
    var output = [];
    for (var key in labels) {
        if (labels.hasOwnProperty(key)) {
            output.push("".concat(labels[key], ": ").concat((_a = entry[key]) !== null && _a !== void 0 ? _a : "?"));
        }
    }
    return output.join("\n");
};
// ========= INITIAL STATE =========
var initialFormData = {
    name: "",
    email: "",
    message: "",
    address: "",
    phone: null,
    age: null,
    isActive: false,
    isMarried: false,
    job: "",
    skills: [],
    hobbies: [],
    languages: [],
    education: null,
    experience: null,
    project: null,
    certification: null,
};
var formData = __assign({}, initialFormData);
// ========= EVENT HANDLERS =========
var handleSubmit = function (e) {
    e.preventDefault();
    // Process basic fields
    formData = __assign(__assign({}, initialFormData), { name: parseInputValue(nameInput, "string") || "", email: parseInputValue(emailInput, "string") || "", message: parseInputValue(messageInput, "string") || "", address: parseInputValue(addressInput, "string") || "", phone: parseInputValue(phoneInput, "number"), age: parseInputValue(ageInput, "number"), isActive: parseInputValue(isActiveInput, "boolean") || false, isMarried: parseInputValue(isMarriedInput, "boolean") || false, job: parseInputValue(jobInput, "string") || "", skills: parseInputValue(skillsInput, "array") || [], hobbies: parseInputValue(hobbiesInput, "array") || [], languages: parseInputValue(languagesInput, "array") || [], education: createSectionEntry(inputGroups.education), experience: createSectionEntry(inputGroups.experience), project: createSectionEntry(inputGroups.project), certification: createSectionEntry(inputGroups.certification) });
    console.log("Form Data Submitted:", formData);
    alert("Form data captured successfully!");
};
var downloadData = function () {
    var _a, _b;
    var sectionLabels = {
        education: { degree: "Degree", institution: "Institution", year: "Year" },
        experience: { jobTitle: "Job Title", company: "Company", years: "Years" },
        project: { title: "Title", description: "Description", year: "Year" },
        certification: { title: "Title", issuer: "Issuer", year: "Year" },
    };
    var content = "\n=== FORM DATA SUMMARY ===\n\nPersonal Information:\n--------------------\nName: ".concat(formData.name || "N/A", "\nEmail: ").concat(formData.email || "N/A", "\nAddress: ").concat(formData.address || "N/A", "\nPhone: ").concat((_a = formData.phone) !== null && _a !== void 0 ? _a : "N/A", "\nAge: ").concat((_b = formData.age) !== null && _b !== void 0 ? _b : "N/A", "\n\nStatus:\n-------\nActive: ").concat(formData.isActive ? "Yes" : "No", "\nMarried: ").concat(formData.isMarried ? "Yes" : "No", "\n\nProfessional:\n------------\nJob: ").concat(formData.job || "N/A", "\nSkills: ").concat(formData.skills.join(", ") || "None", "\n\nInterests:\n----------\nHobbies: ").concat(formData.hobbies.join(", ") || "None", "\nLanguages: ").concat(formData.languages.join(", ") || "None", "\n\nEducation:\n---------\n").concat(formatSection(formData.education, sectionLabels.education), "\n\nExperience:\n----------\n").concat(formatSection(formData.experience, sectionLabels.experience), "\n\nProjects:\n--------\n").concat(formatSection(formData.project, sectionLabels.project), "\n\nCertifications:\n--------------\n").concat(formatSection(formData.certification, sectionLabels.certification), "\n").trim();
    // Create and trigger download
    var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "form-data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
// ========= EVENT LISTENERS =========
if (form && downloadBtn) {
    form.addEventListener("submit", handleSubmit);
    downloadBtn.addEventListener("click", downloadData);
}
else {
    console.error("Error: Could not find required form elements");
    alert("Error: Form elements missing. Please check the page.");
}
