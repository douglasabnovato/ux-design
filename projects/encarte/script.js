/* ════════════════════════════════════════════════════════════════
   DADOS — 27 estados + principais cidades + guide shops
   ════════════════════════════════════════════════════════════════ */
const DATA = {
  AC: {
    label: "Acre",
    cities: {
      "Rio Branco": ["ABC Rio Branco — Centro", "ABC Rio Branco — Sobral"],
      "Cruzeiro do Sul": ["ABC Cruzeiro do Sul — Centro"],
    },
  },
  AL: {
    label: "Alagoas",
    cities: {
      Maceió: ["ABC Maceió — Pajuçara", "ABC Maceió — Farol"],
      Arapiraca: ["ABC Arapiraca — Centro"],
    },
  },
  AM: {
    label: "Amazonas",
    cities: {
      Manaus: [
        "ABC Manaus — Adrianópolis",
        "ABC Manaus — Ponta Negra",
        "ABC Manaus — Flores",
      ],
      Parintins: ["ABC Parintins — Centro"],
      Itacoatiara: ["ABC Itacoatiara — Centro"],
    },
  },
  AP: {
    label: "Amapá",
    cities: {
      Macapá: ["ABC Macapá — Centro", "ABC Macapá — Universidade"],
      Santana: ["ABC Santana — Centro"],
    },
  },
  BA: {
    label: "Bahia",
    cities: {
      Salvador: [
        "ABC Salvador — Barra",
        "ABC Salvador — Pituba",
        "ABC Salvador — Brotas",
      ],
      "Feira de Santana": [
        "ABC Feira de Santana — Centro",
        "ABC Feira de Santana — Tomba",
      ],
      "Vitória da Conquista": ["ABC Vitória da Conquista — Centro"],
      Ilhéus: ["ABC Ilhéus — Centro"],
      Camaçari: ["ABC Camaçari — Centro"],
    },
  },
  CE: {
    label: "Ceará",
    cities: {
      Fortaleza: [
        "ABC Fortaleza — Aldeota",
        "ABC Fortaleza — Messejana",
        "ABC Fortaleza — Centro",
      ],
      Caucaia: ["ABC Caucaia — Centro"],
      Sobral: ["ABC Sobral — Centro"],
      "Juazeiro do Norte": ["ABC Juazeiro do Norte — Centro"],
    },
  },
  DF: {
    label: "Distrito Federal",
    cities: {
      Brasília: [
        "ABC Brasília — Asa Norte",
        "ABC Brasília — Asa Sul",
        "ABC Brasília — Taguatinga",
      ],
      Ceilândia: ["ABC Ceilândia — Centro"],
      Taguatinga: ["ABC Taguatinga — Centro"],
    },
  },
  ES: {
    label: "Espírito Santo",
    cities: {
      Vitória: ["ABC Vitória — Praia do Canto", "ABC Vitória — Centro"],
      "Vila Velha": ["ABC Vila Velha — Itaparica", "ABC Vila Velha — Centro"],
      Serra: ["ABC Serra — Centro"],
      Cariacica: ["ABC Cariacica — Centro"],
    },
  },
  GO: {
    label: "Goiás",
    cities: {
      Goiânia: [
        "ABC Goiânia — Setor Bueno",
        "ABC Goiânia — Jardim Goiás",
        "ABC Goiânia — Centro",
      ],
      "Aparecida de Goiânia": ["ABC Aparecida — Centro"],
      Anápolis: ["ABC Anápolis — Centro"],
      "Rio Verde": ["ABC Rio Verde — Centro"],
    },
  },
  MA: {
    label: "Maranhão",
    cities: {
      "São Luís": ["ABC São Luís — Centro", "ABC São Luís — Cohama"],
      Imperatriz: ["ABC Imperatriz — Centro"],
      Timon: ["ABC Timon — Centro"],
    },
  },
  MT: {
    label: "Mato Grosso",
    cities: {
      Cuiabá: ["ABC Cuiabá — Centro", "ABC Cuiabá — CPA"],
      "Várzea Grande": ["ABC Várzea Grande — Centro"],
      Rondonópolis: ["ABC Rondonópolis — Centro"],
    },
  },
  MS: {
    label: "Mato Grosso do Sul",
    cities: {
      "Campo Grande": [
        "ABC Campo Grande — Centro",
        "ABC Campo Grande — Chácara Cachoeira",
      ],
      Dourados: ["ABC Dourados — Centro"],
      "Três Lagoas": ["ABC Três Lagoas — Centro"],
    },
  },
  MG: {
    label: "Minas Gerais",
    cities: {
      "Belo Horizonte": [
        "ABC BH — Savassi",
        "ABC BH — Pampulha",
        "ABC BH — Barreiro",
      ],
      Uberlândia: ["ABC Uberlândia — Centro", "ABC Uberlândia — Tibery"],
      Contagem: ["ABC Contagem — Centro"],
      "Juiz de Fora": [
        "ABC Juiz de Fora — Centro",
        "ABC Juiz de Fora — Santa Luzia",
      ],
      Betim: ["ABC Betim — Centro"],
      "Montes Claros": ["ABC Montes Claros — Centro"],
      "Ribeirão das Neves": ["ABC Ribeirão das Neves — Centro"],
    },
  },
  PA: {
    label: "Pará",
    cities: {
      Belém: ["ABC Belém — Nazaré", "ABC Belém — Pedreira"],
      Ananindeua: ["ABC Ananindeua — Centro"],
      Santarém: ["ABC Santarém — Centro"],
      Marabá: ["ABC Marabá — Folha 28"],
    },
  },
  PB: {
    label: "Paraíba",
    cities: {
      "João Pessoa": ["ABC João Pessoa — Miramar", "ABC João Pessoa — Centro"],
      "Campina Grande": ["ABC Campina Grande — Centro"],
      "Santa Rita": ["ABC Santa Rita — Centro"],
    },
  },
  PE: {
    label: "Pernambuco",
    cities: {
      Recife: [
        "ABC Recife — Boa Viagem",
        "ABC Recife — Espinheiro",
        "ABC Recife — Imbiribeira",
      ],
      Caruaru: ["ABC Caruaru — Centro"],
      Olinda: ["ABC Olinda — Centro"],
      Petrolina: ["ABC Petrolina — Centro"],
    },
  },
  PI: {
    label: "Piauí",
    cities: {
      Teresina: ["ABC Teresina — Centro", "ABC Teresina — Leste"],
      Parnaíba: ["ABC Parnaíba — Centro"],
    },
  },
  PR: {
    label: "Paraná",
    cities: {
      Curitiba: [
        "ABC Curitiba — Batel",
        "ABC Curitiba — Portão",
        "ABC Curitiba — Centro",
      ],
      Londrina: ["ABC Londrina — Centro", "ABC Londrina — Gleba Palhano"],
      Maringá: ["ABC Maringá — Centro", "ABC Maringá — Zona 7"],
      "Ponta Grossa": ["ABC Ponta Grossa — Centro"],
      Cascavel: ["ABC Cascavel — Centro"],
      "Foz do Iguaçu": ["ABC Foz do Iguaçu — Centro"],
    },
  },
  RJ: {
    label: "Rio de Janeiro",
    cities: {
      "Rio de Janeiro": [
        "ABC Rio — Barra da Tijuca",
        "ABC Rio — Botafogo",
        "ABC Rio — Tijuca",
      ],
      Niterói: ["ABC Niterói — Icaraí", "ABC Niterói — Centro"],
      "Duque de Caxias": ["ABC Duque de Caxias — Centro"],
      "Nova Iguaçu": ["ABC Nova Iguaçu — Centro"],
      "São Gonçalo": ["ABC São Gonçalo — Centro"],
      "Campos dos Goytacazes": ["ABC Campos — Centro"],
    },
  },
  RN: {
    label: "Rio Grande do Norte",
    cities: {
      Natal: ["ABC Natal — Ponta Negra", "ABC Natal — Candelária"],
      Mossoró: ["ABC Mossoró — Centro"],
      Parnamirim: ["ABC Parnamirim — Centro"],
    },
  },
  RO: {
    label: "Rondônia",
    cities: {
      "Porto Velho": ["ABC Porto Velho — Centro", "ABC Porto Velho — Olaria"],
      "Ji-Paraná": ["ABC Ji-Paraná — Centro"],
    },
  },
  RR: {
    label: "Roraima",
    cities: {
      "Boa Vista": ["ABC Boa Vista — Centro", "ABC Boa Vista — Caimbé"],
    },
  },
  RS: {
    label: "Rio Grande do Sul",
    cities: {
      "Porto Alegre": [
        "ABC POA — Moinhos de Vento",
        "ABC POA — Boa Vista",
        "ABC POA — Menino Deus",
      ],
      "Caxias do Sul": ["ABC Caxias — Centro", "ABC Caxias — Pioneiro"],
      Pelotas: ["ABC Pelotas — Centro"],
      Canoas: ["ABC Canoas — Centro"],
      "Santa Maria": ["ABC Santa Maria — Centro"],
      Gravataí: ["ABC Gravataí — Centro"],
    },
  },
  SC: {
    label: "Santa Catarina",
    cities: {
      Florianópolis: ["ABC Floripa — Trindade", "ABC Floripa — Kobrasol"],
      Joinville: ["ABC Joinville — Centro", "ABC Joinville — América"],
      Blumenau: ["ABC Blumenau — Centro"],
      Chapecó: ["ABC Chapecó — Centro"],
      Itajaí: ["ABC Itajaí — Centro"],
    },
  },
  SE: {
    label: "Sergipe",
    cities: {
      Aracaju: ["ABC Aracaju — Grageru", "ABC Aracaju — Centro"],
      Lagarto: ["ABC Lagarto — Centro"],
    },
  },
  SP: {
    label: "São Paulo",
    cities: {
      "São Paulo": [
        "ABC SP — Moema",
        "ABC SP — Tatuapé",
        "ABC SP — Santo André",
        "ABC SP — Lapa",
      ],
      Campinas: ["ABC Campinas — Cambuí", "ABC Campinas — Taquaral"],
      Santos: ["ABC Santos — Centro", "ABC Santos — Gonzaga"],
      "Ribeirão Preto": [
        "ABC Ribeirão — Centro",
        "ABC Ribeirão — Nova Aliança",
      ],
      Sorocaba: ["ABC Sorocaba — Centro"],
      Osasco: ["ABC Osasco — Centro"],
      "São Bernardo do Campo": ["ABC SBC — Centro"],
      "São José dos Campos": ["ABC SJC — Centro"],
    },
  },
  TO: {
    label: "Tocantins",
    cities: {
      Palmas: ["ABC Palmas — Centro", "ABC Palmas — Plano Diretor Sul"],
      Araguaína: ["ABC Araguaína — Centro"],
    },
  },
};

/* ════════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════════ */
const state = {
  step: 1,
  progress: 0,
  validEmail: false,
  data: {
    state: "",
    city: "",
    guide_shop: "",
    name: "",
    lastname: "",
    email: "",
    tel: "",
    privacyPolicy: true,
    marketingConsent: true,
    firstName: "",
    lastName: "",
    idLead: "",
    recordtypeDevName: "Expansao",
    company: "ABC",
    company2: "ABC Expansão",
    owner: "00GbJ0000062OFjUAM",
    canalDeEntrada: "Landing Page Encarte",
  },
};

/* ════════════════════════════════════════════════════════════════
   STEP ICONS (SVG inline)
   ════════════════════════════════════════════════════════════════ */
const ICONS = {
  1: `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <path d="M15 3C9.477 3 5 7.477 5 13c0 6.627 10 17 10 17s10-10.373 10-17c0-5.523-4.477-10-10-10z" stroke="#c8102e" stroke-width="1.6" stroke-linejoin="round"/>
        <circle cx="15" cy="13" r="3" stroke="#c8102e" stroke-width="1.6"/>
      </svg>`,
  2: `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <rect x="4" y="5" width="22" height="20" rx="3" stroke="#c8102e" stroke-width="1.6"/>
        <path d="M9 10h12M9 15h8M9 20h5" stroke="#c8102e" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`,
  3: `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <path d="M6 15l6 6 12-12" stroke="#1a6b3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
};

const STEP_CONTENT = {
  1: {
    title: "Ofertas exclusivas na sua região",
    subtitle: "Selecione sua localização para continuar",
  },
  2: {
    title: "Quase lá! Preencha seus dados",
    subtitle: "Cadastro rápido — menos de 1 minuto",
  },
  3: {
    title: "É hora de economizar!",
    subtitle: "Seus dados foram enviados com sucesso",
  },
};

/* ════════════════════════════════════════════════════════════════
   DOM REFS
   ════════════════════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);
const elState = $("state");
const elCity = $("city");
const elShop = $("guide_shop");
const elName = $("name");
const elLastname = $("lastname");
const elTel = $("tel");
const elEmail = $("email");
const elPrivacy = $("privacyPolicy");
const elMarketing = $("marketingConsent");
const elBtnNext1 = $("btnNext1");
const elBtnBack = $("btnBack");
const elBtnSubmit = $("btnSubmit");
const elBtnReset = $("btnReset");
const elBtnDownloadAgain = $("btnDownloadAgain");
const elProgress = $("progressFill");
const elProgressLabel = $("progressLabel");
const elStepIcon = $("stepIcon");
const elStepTitle = $("stepTitle");
const elStepSub = $("stepSubtitle");

/* ════════════════════════════════════════════════════════════════
   POPULATE STATES
   ════════════════════════════════════════════════════════════════ */
function populateStates() {
  Object.entries(DATA)
    .sort((a, b) => a[1].label.localeCompare(b[1].label))
    .forEach(([uf, info]) => {
      const opt = document.createElement("option");
      opt.value = uf;
      opt.textContent = `${uf} — ${info.label}`;
      elState.appendChild(opt);
    });
}

/* ════════════════════════════════════════════════════════════════
   CLEAR SELECT
   ════════════════════════════════════════════════════════════════ */
function clearSelect(el, placeholder) {
  el.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
}

/* ════════════════════════════════════════════════════════════════
   PROGRESS
   ════════════════════════════════════════════════════════════════ */
function setProgress(pct, done = false) {
  state.progress = pct;
  elProgress.style.width = pct + "%";
  elProgressLabel.textContent = pct + "%";
  if (done) {
    elProgress.classList.add("done");
    elProgressLabel.classList.add("done");
  } else {
    elProgress.classList.remove("done");
    elProgressLabel.classList.remove("done");
  }
}

function updateStep1Progress() {
  const { state: s, city, guide_shop } = state.data;
  const filled = [s, city, guide_shop].filter((v) => v).length;
  setProgress(filled > 0 ? Math.round((filled / 3) * 85) : 0);
}

function updateStep2Progress() {
  const { name, lastname, email, tel } = state.data;
  const ok =
    name && lastname && email && state.validEmail && tel && tel.length === 11;
  setProgress(ok ? 95 : 90);
}

/* ════════════════════════════════════════════════════════════════
   STEP NAVIGATION
   ════════════════════════════════════════════════════════════════ */
function showStep(n) {
  [1, 2, 3].forEach((i) => {
    $("step" + i).classList.toggle("active", i === n);
  });
  state.step = n;
  elStepIcon.innerHTML = ICONS[n];
  elStepTitle.textContent = STEP_CONTENT[n].title;
  elStepSub.textContent = STEP_CONTENT[n].subtitle;

  // icon bg on step 3
  elStepIcon.style.background =
    n === 3 ? "var(--success-bg)" : "var(--red-light)";
}

/* ════════════════════════════════════════════════════════════════
   HANDLERS — STEP 1
   ════════════════════════════════════════════════════════════════ */
elState.addEventListener("change", () => {
  const uf = elState.value;
  state.data.state = uf;
  state.data.city = "";
  state.data.guide_shop = "";

  clearSelect(elCity, "Selecione");
  clearSelect(elShop, "Selecione");
  elCity.disabled = true;
  elShop.disabled = true;

  if (uf && DATA[uf]) {
    Object.keys(DATA[uf].cities)
      .sort()
      .forEach((city) => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        elCity.appendChild(opt);
      });
    elCity.disabled = false;
  }
  updateStep1Progress();
  checkStep1();
});

elCity.addEventListener("change", () => {
  const city = elCity.value;
  state.data.city = city;
  state.data.guide_shop = "";

  clearSelect(elShop, "Selecione");
  elShop.disabled = true;

  const uf = state.data.state;
  if (uf && city && DATA[uf]?.cities[city]) {
    DATA[uf].cities[city].forEach((shop) => {
      const opt = document.createElement("option");
      opt.value = shop;
      opt.textContent = shop;
      elShop.appendChild(opt);
    });
    elShop.disabled = false;
  }
  updateStep1Progress();
  checkStep1();
});

elShop.addEventListener("change", () => {
  state.data.guide_shop = elShop.value;
  updateStep1Progress();
  checkStep1();
});

function checkStep1() {
  const ok = !!(state.data.state && state.data.city && state.data.guide_shop);
  elBtnNext1.disabled = !ok;
}

elBtnNext1.addEventListener("click", () => {
  showStep(2);
  setProgress(90);
  elName.focus();
});

/* ════════════════════════════════════════════════════════════════
   HANDLERS — STEP 2
   ════════════════════════════════════════════════════════════════ */
elBtnBack.addEventListener("click", () => {
  showStep(1);
  updateStep1Progress();
});

elName.addEventListener("input", () => {
  state.data.name = elName.value.trim();
  updateStep2Progress();
  checkStep2();
});

elLastname.addEventListener("input", () => {
  state.data.lastname = elLastname.value.trim();
  updateStep2Progress();
  checkStep2();
});

// Email validation
elEmail.addEventListener("input", () => {
  const val = elEmail.value;
  state.data.email = val;
  const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  state.validEmail = rx.test(val);
  elEmail.classList.toggle("valid", state.validEmail && val.length > 0);
  elEmail.classList.toggle("invalid", !state.validEmail && val.length > 3);
  updateStep2Progress();
  checkStep2();
});

// Tel mask
elTel.addEventListener("input", () => {
  let nums = elTel.value.replace(/\D/g, "").slice(0, 11);
  let fmt = nums;
  if (nums.length > 2) fmt = `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length > 7)
    fmt = `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  elTel.value = fmt;
  state.data.tel = nums;
  updateStep2Progress();
  checkStep2();
});

elPrivacy.addEventListener("change", () => {
  state.data.privacyPolicy = elPrivacy.checked;
  updateStep2Progress();
  checkStep2();
});

elMarketing.addEventListener("change", () => {
  state.data.marketingConsent = elMarketing.checked;
});

function checkStep2() {
  const { name, lastname, email, tel, privacyPolicy } = state.data;
  const ok = !!(
    name &&
    lastname &&
    email &&
    state.validEmail &&
    tel &&
    tel.length === 11 &&
    privacyPolicy
  );
  elBtnSubmit.disabled = !ok;
}

/* ════════════════════════════════════════════════════════════════
   SUBMIT — download + step 3
   ════════════════════════════════════════════════════════════════ */
$("mainForm").addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

elBtnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  if (elBtnSubmit.disabled) return;

  // Derive firstName / lastName / idLead
  const fullName = state.data.name;
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.includes(" ")
    ? fullName.split(" ").slice(1).join(" ")
    : state.data.lastname;
  const idLead =
    firstName + state.data.lastname.replace(/\s/g, "") + state.data.tel;

  state.data.firstName = firstName;
  state.data.lastName = state.data.lastname || lastName;
  state.data.idLead = idLead;

  // Loading state
  elBtnSubmit.classList.add("loading");
  elBtnSubmit.disabled = true;

  // Simula envio (substitua pelo fetch real)
  setTimeout(() => {
    console.log("Payload:", JSON.stringify(state.data, null, 2));

    // Download automático
    triggerDownload();

    // Avança para step 3
    showStep(3);
    setProgress(100, true);
    elBtnSubmit.classList.remove("loading");
  }, 900);
}

/* ════════════════════════════════════════════════════════════════
   DOWNLOAD
   ════════════════════════════════════════════════════════════════ */
function triggerDownload() {
  const link = document.createElement("a");
  link.href = "encarte/novidades.png";
  link.download = "encarte-abc-novidades.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

elBtnDownloadAgain.addEventListener("click", triggerDownload);

/* ════════════════════════════════════════════════════════════════
   RESET
   ════════════════════════════════════════════════════════════════ */
function resetAll() {
  state.data = {
    state: "",
    city: "",
    guide_shop: "",
    name: "",
    lastname: "",
    email: "",
    tel: "",
    privacyPolicy: true,
    marketingConsent: true,
    firstName: "",
    lastName: "",
    idLead: "",
    recordtypeDevName: "Expansao",
    company: "ABC",
    company2: "ABC Expansão",
    owner: "00GbJ0000062OFjUAM",
    canalDeEntrada: "Landing Page Encarte",
  };
  state.validEmail = false;

  elState.value = "";
  clearSelect(elCity, "Selecione");
  elCity.disabled = true;
  clearSelect(elShop, "Selecione");
  elShop.disabled = true;

  elName.value = "";
  elLastname.value = "";
  elTel.value = "";
  elEmail.value = "";
  elEmail.classList.remove("valid", "invalid");
  elPrivacy.checked = true;
  elMarketing.checked = true;

  elBtnNext1.disabled = true;
  elBtnSubmit.disabled = true;

  showStep(1);
  setProgress(0);
}

elBtnReset.addEventListener("click", resetAll);

/* ════════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  populateStates();
  showStep(1);
  setProgress(0);
});
