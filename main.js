let currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(`${currentTheme}-theme`);

function toggleTheme() {
  const themeToggleButton = document.querySelector("#theme-toggle");

  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    themeToggleButton.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    themeToggleButton.textContent = "Light Mode";
  }
}

// Add an event listener to the button that switches the theme
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);

// Set the initial button text based on the current theme
const themeToggleButton = document.querySelector("#theme-toggle");
if (currentTheme === "dark") {
  themeToggleButton.textContent = "Light Mode";
} else {
  themeToggleButton.textContent = "Dark Mode";
}
// تعامل دکمه برای تغییر متن
const button = document.querySelector(".cta-btn");
const h1 = document.querySelector(".section-title");
const h2 = document.querySelector(".section-subtitle");

button.addEventListener("click", () => {
  h1.textContent = "Button Clicked!";
  h2.textContent = "Enjoy the Experience even more!";
});
// main.js
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("open");
});
//
//
//
// forms code// ========= ELEMENT REFERENCES =========
var form = document.getElementById("contactForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");
var addressInput = document.getElementById("address");
var phoneInput = document.getElementById("phone");
var ageInput = document.getElementById("age");
var isActiveInput = document.getElementById("isActive");
var jobInput = document.getElementById("job");
var isMarriedInput = document.getElementById("isMarried");
var hobbiesInput = document.getElementById("hobbies");
var skillsInput = document.getElementById("skills");
var languagesInput = document.getElementById("languages");
var downloadBtn = document.getElementById("downloadBtn");
// References for NEW simple fields
var eduDegreeInput = document.getElementById("edu_degree");
var eduInstitutionInput = document.getElementById("edu_institution");
var eduYearInput = document.getElementById("edu_year");
var expJobTitleInput = document.getElementById("exp_jobTitle");
var expCompanyInput = document.getElementById("exp_company");
var expYearsInput = document.getElementById("exp_years");
var projTitleInput = document.getElementById("proj_title");
var projDescriptionInput = document.getElementById("proj_description");
var projYearInput = document.getElementById("proj_year");
var certTitleInput = document.getElementById("cert_title");
var certIssuerInput = document.getElementById("cert_issuer");
var certYearInput = document.getElementById("cert_year");
// ========= INITIAL STATE =========
var formData = {
  name: "",
  email: "",
  message: "",
  address: "",
  phone: null,
  age: null,
  isActive: false,
  job: "",
  isMarried: false,
  hobbies: [],
  skills: [],
  languages: [],
  education: null,
  experience: null,
  project: null,
  certification: null,
};
// ========= HELPER FUNCTIONS =========
// Processes comma-separated string from an input element
var processCommaList = function (el) {
  if (!el || !el.value) return [];
  return el.value
    .split(",")
    .map(function (s) {
      return s.trim();
    }) // Remove whitespace
    .filter(Boolean); // Remove empty strings
};
// Creates a single data entry object from a map of input elements
// Returns null if all corresponding input fields are empty
// **FIX:** Removed constraint 'extends DataEntry'
var createSingleEntry = function (fields) {
  var _a;
  var entry = {};
  var hasValue = false;
  for (var key in fields) {
    var inputElement = fields[key];
    var value =
      (_a =
        inputElement === null || inputElement === void 0
          ? void 0
          : inputElement.value) === null || _a === void 0
        ? void 0
        : _a.trim();
    if (value) {
      // **FIX:** Use indexOf instead of includes for older JS compatibility
      var isNumericField =
        key.toLowerCase().indexOf("year") !== -1 ||
        key.toLowerCase().indexOf("years") !== -1;
      if (isNumericField) {
        var numValue = Number(value);
        entry[key] = isNaN(numValue) ? value : numValue;
      } else {
        entry[key] = value;
      }
      hasValue = true;
    } else {
      entry[key] = null;
    }
  }
  return hasValue ? entry : null;
};
// Formats a single data entry object for display
// **FIX:** Removed constraint 'extends DataEntry'
// **FIX:** Made T partial in FormatterMap to handle potential null properties better
var formatSingleEntry = function (
  entry,
  formatters, // Use the specific type T directly
  emptyText,
) {
  if (emptyText === void 0) {
    emptyText = "N/A";
  }
  if (!entry) return emptyText;
  var output = [];
  // Iterate over the keys DEFINED IN THE FORMATTERS map
  for (var key in formatters) {
    if (Object.prototype.hasOwnProperty.call(formatters, key)) {
      var formatter = formatters[key];
      if (formatter) {
        // Check if formatter function exists
        // Pass the value from the entry object (could be null/undefined)
        output.push(formatter(entry[key]));
      }
    }
  }
  return output.join(", ");
};
// ========= EVENT LISTENERS =========
if (form && downloadBtn) {
  // --- Form Submission ---
  form.addEventListener("submit", function (e) {
    var _a, _b, _c, _d, _e, _f, _g;
    e.preventDefault();
    var phoneValue = Number(
      phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value,
    );
    var ageValue = Number(
      ageInput === null || ageInput === void 0 ? void 0 : ageInput.value,
    );
    formData = {
      name:
        (_a =
          nameInput === null || nameInput === void 0
            ? void 0
            : nameInput.value.trim()) !== null && _a !== void 0
          ? _a
          : "",
      email:
        (_b =
          emailInput === null || emailInput === void 0
            ? void 0
            : emailInput.value.trim()) !== null && _b !== void 0
          ? _b
          : "",
      message:
        (_c =
          messageInput === null || messageInput === void 0
            ? void 0
            : messageInput.value.trim()) !== null && _c !== void 0
          ? _c
          : "",
      address:
        (_d =
          addressInput === null || addressInput === void 0
            ? void 0
            : addressInput.value.trim()) !== null && _d !== void 0
          ? _d
          : "",
      phone: isNaN(phoneValue) ? null : phoneValue,
      age: isNaN(ageValue) ? null : ageValue,
      isActive:
        (_e =
          isActiveInput === null || isActiveInput === void 0
            ? void 0
            : isActiveInput.checked) !== null && _e !== void 0
          ? _e
          : false,
      job:
        (_f =
          jobInput === null || jobInput === void 0
            ? void 0
            : jobInput.value.trim()) !== null && _f !== void 0
          ? _f
          : "",
      isMarried:
        (_g =
          isMarriedInput === null || isMarriedInput === void 0
            ? void 0
            : isMarriedInput.checked) !== null && _g !== void 0
          ? _g
          : false,
      hobbies: processCommaList(hobbiesInput),
      skills: processCommaList(skillsInput),
      languages: processCommaList(languagesInput),
      // Pass the specific interfaces as type arguments
      education: createSingleEntry({
        degree: eduDegreeInput,
        institution: eduInstitutionInput,
        year: eduYearInput,
      }),
      experience: createSingleEntry({
        jobTitle: expJobTitleInput,
        company: expCompanyInput,
        years: expYearsInput,
      }),
      project: createSingleEntry({
        title: projTitleInput,
        description: projDescriptionInput,
        year: projYearInput,
      }),
      certification: createSingleEntry({
        title: certTitleInput,
        issuer: certIssuerInput,
        year: certYearInput,
      }),
    };
    console.log("Form Data Submitted:");
    console.log(formData);
    alert("Form data captured (see console).");
  });
  // --- Download Button ---
  downloadBtn.addEventListener("click", function () {
    var _a, _b;
    var noteText = "\nForm Data:\n\nName: "
      .concat(formData.name || "N/A", "\nEmail: ")
      .concat(formData.email || "N/A", "\nMessage: ")
      .concat(formData.message || "N/A", "\nAddress: ")
      .concat(formData.address || "N/A", "\nPhone: ")
      .concat(
        (_a = formData.phone) !== null && _a !== void 0 ? _a : "N/A",
        "\nAge: ",
      )
      .concat(
        (_b = formData.age) !== null && _b !== void 0 ? _b : "N/A",
        "\nIs Active: ",
      )
      .concat(formData.isActive ? "Yes" : "No", "\nJob: ")
      .concat(formData.job || "N/A", "\nIs Married: ")
      .concat(formData.isMarried ? "Yes" : "No", "\nHobbies: ")
      .concat(formData.hobbies.join(", ") || "N/A", "\nSkills: ")
      .concat(formData.skills.join(", ") || "N/A", "\nLanguages: ")
      .concat(formData.languages.join(", ") || "N/A", "\n\nEducation:\n")
      .concat(
        formatSingleEntry(formData.education, {
          // Provide full type
          degree: function (d) {
            return "Degree: ".concat(d !== null && d !== void 0 ? d : "?");
          },
          institution: function (i) {
            return "Institution: ".concat(i !== null && i !== void 0 ? i : "?");
          },
          year: function (y) {
            return "Year: ".concat(y !== null && y !== void 0 ? y : "?");
          },
        }),
        "\n\nExperience:\n",
      )
      .concat(
        formatSingleEntry(formData.experience, {
          // Provide full type
          jobTitle: function (jt) {
            return "Title: ".concat(jt !== null && jt !== void 0 ? jt : "?");
          },
          company: function (c) {
            return "Company: ".concat(c !== null && c !== void 0 ? c : "?");
          },
          years: function (y) {
            return "Years: ".concat(y !== null && y !== void 0 ? y : "?");
          },
        }),
        "\n\nProject:\n",
      )
      .concat(
        formatSingleEntry(formData.project, {
          // Provide full type
          title: function (t) {
            return "Title: ".concat(t !== null && t !== void 0 ? t : "?");
          },
          description: function (d) {
            return "Desc: ".concat(d !== null && d !== void 0 ? d : "?");
          },
          year: function (y) {
            return "Year: ".concat(y !== null && y !== void 0 ? y : "?");
          },
        }),
        "\n\nCertification:\n",
      )
      .concat(
        formatSingleEntry(formData.certification, {
          // Provide full type
          title: function (t) {
            return "Title: ".concat(t !== null && t !== void 0 ? t : "?");
          },
          issuer: function (i) {
            return "Issuer: ".concat(i !== null && i !== void 0 ? i : "?");
          },
          year: function (y) {
            return "Year: ".concat(y !== null && y !== void 0 ? y : "?");
          },
        }),
        "\n                ",
      );
    // Create Blob and trigger download
    var blob = new Blob([noteText.trim()], {
      type: "text/plain;charset=utf-8",
    });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "form_data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
} else {
  console.error("Error: Could not find form or download button.");
  alert("Error: Essential form elements missing.");
}
