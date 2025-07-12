// ========= INTERFACE DEFINITION =========
// Represents a single education entry
interface EducationEntry {
  degree: string | null;
  institution: string | null;
  year: number | null;
}

// Represents a single experience entry
interface ExperienceEntry {
  jobTitle: string | null;
  company: string | null;
  years: number | null;
}

// Represents a single project entry
interface ProjectEntry {
  title: string | null;
  description: string | null;
  year: number | null;
}

// Represents a single certification entry
interface CertificationEntry {
  title: string | null;
  issuer: string | null;
  year: number | null;
}

// Main data structure for the form
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  address: string;
  phone: number | null;
  age: number | null;
  isActive: boolean;
  job: string;
  isMarried: boolean;
  hobbies: string[];
  skills: string[];
  languages: string[];
  // Simplified sections: single object or null
  education: EducationEntry | null;
  experience: ExperienceEntry | null;
  project: ProjectEntry | null; // Renamed for clarity
  certification: CertificationEntry | null; // Renamed for clarity
}

// ========= ELEMENT REFERENCES =========
const form = document.getElementById("contactForm") as HTMLFormElement | null;
const nameInput = document.getElementById("name") as HTMLInputElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const messageInput = document.getElementById(
  "message",
) as HTMLTextAreaElement | null;
const addressInput = document.getElementById(
  "address",
) as HTMLInputElement | null;
const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
const ageInput = document.getElementById("age") as HTMLInputElement | null;
const isActiveInput = document.getElementById(
  "isActive",
) as HTMLInputElement | null;
const jobInput = document.getElementById("job") as HTMLInputElement | null;
const isMarriedInput = document.getElementById(
  "isMarried",
) as HTMLInputElement | null;
const hobbiesInput = document.getElementById(
  "hobbies",
) as HTMLInputElement | null;
const skillsInput = document.getElementById(
  "skills",
) as HTMLInputElement | null;
const languagesInput = document.getElementById(
  "languages",
) as HTMLInputElement | null;
const downloadBtn = document.getElementById(
  "downloadBtn",
) as HTMLButtonElement | null;

// References for NEW simple fields
const eduDegreeInput = document.getElementById(
  "edu_degree",
) as HTMLInputElement | null;
const eduInstitutionInput = document.getElementById(
  "edu_institution",
) as HTMLInputElement | null;
const eduYearInput = document.getElementById(
  "edu_year",
) as HTMLInputElement | null;

const expJobTitleInput = document.getElementById(
  "exp_jobTitle",
) as HTMLInputElement | null;
const expCompanyInput = document.getElementById(
  "exp_company",
) as HTMLInputElement | null;
const expYearsInput = document.getElementById(
  "exp_years",
) as HTMLInputElement | null;

const projTitleInput = document.getElementById(
  "proj_title",
) as HTMLInputElement | null;
const projDescriptionInput = document.getElementById(
  "proj_description",
) as HTMLTextAreaElement | null;
const projYearInput = document.getElementById(
  "proj_year",
) as HTMLInputElement | null;

const certTitleInput = document.getElementById(
  "cert_title",
) as HTMLInputElement | null;
const certIssuerInput = document.getElementById(
  "cert_issuer",
) as HTMLInputElement | null;
const certYearInput = document.getElementById(
  "cert_year",
) as HTMLInputElement | null;

// ========= INITIAL STATE =========
let formData: ContactFormData = {
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
const processCommaList = (el: HTMLInputElement | null): string[] => {
  if (!el || !el.value) return [];
  return el.value
    .split(",")
    .map((s) => s.trim()) // Remove whitespace
    .filter(Boolean); // Remove empty strings
};

// Type for the input structure of createSingleEntry
type InputFieldMap = {
  [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
};

// Creates a single data entry object from a map of input elements
// Returns null if all corresponding input fields are empty
// **FIX:** Removed constraint 'extends DataEntry'
const createSingleEntry = <T>(fields: InputFieldMap): T | null => {
  const entry: Partial<T> = {};
  let hasValue = false;

  for (const key in fields) {
    const inputElement = fields[key];
    const value = inputElement?.value?.trim();

    if (value) {
      // **FIX:** Use indexOf instead of includes for older JS compatibility
      const isNumericField =
        key.toLowerCase().indexOf("year") !== -1 ||
        key.toLowerCase().indexOf("years") !== -1;

      if (isNumericField) {
        const numValue = Number(value);
        entry[key as keyof T] = isNaN(numValue)
          ? (value as any)
          : (numValue as any);
      } else {
        entry[key as keyof T] = value as any;
      }
      hasValue = true;
    } else {
      entry[key as keyof T] = null as any;
    }
  }
  return hasValue ? (entry as T) : null;
};

// Type for the formatter functions map used in formatSingleEntry
type FormatterMap<T> = {
  [K in keyof T]?: (value: T[K] | null | undefined) => string; // Make formatters optional
};

// Formats a single data entry object for display
// **FIX:** Removed constraint 'extends DataEntry'
// **FIX:** Made T partial in FormatterMap to handle potential null properties better
const formatSingleEntry = <T>(
  entry: T | null,
  formatters: FormatterMap<T>, // Use the specific type T directly
  emptyText: string = "N/A",
): string => {
  if (!entry) return emptyText;
  const output: string[] = [];
  // Iterate over the keys DEFINED IN THE FORMATTERS map
  for (const key in formatters) {
    if (Object.prototype.hasOwnProperty.call(formatters, key)) {
      const formatter = formatters[key as keyof T];
      if (formatter) {
        // Check if formatter function exists
        // Pass the value from the entry object (could be null/undefined)
        output.push(formatter(entry[key as keyof T]));
      }
    }
  }
  return output.join(", ");
};

// ========= EVENT LISTENERS =========
if (form && downloadBtn) {
  // --- Form Submission ---
  form.addEventListener("submit", (e: Event): void => {
    e.preventDefault();

    const phoneValue = Number(phoneInput?.value);
    const ageValue = Number(ageInput?.value);

    formData = {
      name: nameInput?.value.trim() ?? "",
      email: emailInput?.value.trim() ?? "",
      message: messageInput?.value.trim() ?? "",
      address: addressInput?.value.trim() ?? "",
      phone: isNaN(phoneValue) ? null : phoneValue,
      age: isNaN(ageValue) ? null : ageValue,
      isActive: isActiveInput?.checked ?? false,
      job: jobInput?.value.trim() ?? "",
      isMarried: isMarriedInput?.checked ?? false,
      hobbies: processCommaList(hobbiesInput),
      skills: processCommaList(skillsInput),
      languages: processCommaList(languagesInput),

      // Pass the specific interfaces as type arguments
      education: createSingleEntry<EducationEntry>({
        degree: eduDegreeInput,
        institution: eduInstitutionInput,
        year: eduYearInput,
      }),
      experience: createSingleEntry<ExperienceEntry>({
        jobTitle: expJobTitleInput,
        company: expCompanyInput,
        years: expYearsInput,
      }),
      project: createSingleEntry<ProjectEntry>({
        title: projTitleInput,
        description: projDescriptionInput,
        year: projYearInput,
      }),
      certification: createSingleEntry<CertificationEntry>({
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
  downloadBtn.addEventListener("click", (): void => {
    const noteText = `
Form Data:

Name: ${formData.name || "N/A"}
Email: ${formData.email || "N/A"}
Message: ${formData.message || "N/A"}
Address: ${formData.address || "N/A"}
Phone: ${formData.phone ?? "N/A"}
Age: ${formData.age ?? "N/A"}
Is Active: ${formData.isActive ? "Yes" : "No"}
Job: ${formData.job || "N/A"}
Is Married: ${formData.isMarried ? "Yes" : "No"}
Hobbies: ${formData.hobbies.join(", ") || "N/A"}
Skills: ${formData.skills.join(", ") || "N/A"}
Languages: ${formData.languages.join(", ") || "N/A"}

Education:
${formatSingleEntry<EducationEntry>(formData.education, {
  // Provide full type
  degree: (d) => `Degree: ${d ?? "?"}`,
  institution: (i) => `Institution: ${i ?? "?"}`,
  year: (y) => `Year: ${y ?? "?"}`,
})}

Experience:
${formatSingleEntry<ExperienceEntry>(formData.experience, {
  // Provide full type
  jobTitle: (jt) => `Title: ${jt ?? "?"}`,
  company: (c) => `Company: ${c ?? "?"}`,
  years: (y) => `Years: ${y ?? "?"}`,
})}

Project:
${formatSingleEntry<ProjectEntry>(formData.project, {
  // Provide full type
  title: (t) => `Title: ${t ?? "?"}`,
  description: (d) => `Desc: ${d ?? "?"}`,
  year: (y) => `Year: ${y ?? "?"}`,
})}

Certification:
${formatSingleEntry<CertificationEntry>(formData.certification, {
  // Provide full type
  title: (t) => `Title: ${t ?? "?"}`,
  issuer: (i) => `Issuer: ${i ?? "?"}`,
  year: (y) => `Year: ${y ?? "?"}`,
})}
                `;

    // Create Blob and trigger download
    const blob = new Blob([noteText.trim()], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
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
