const anoAtual = new Date().getFullYear();

const anosIndividuais = [];

for (let ano = anoAtual; ano >= 2020; ano--) {
  anosIndividuais.push({
    label: String(ano),
    value: String(ano),
    tipo: "year",
  });
}

const DECADES_AND_CLASSICS = [
  { label: "Anos 2010 (2010-2019)", value: "2010", tipo: "decade" },
  { label: "Anos 2000 (2000-2009)", value: "2000", tipo: "decade" },
  { label: "Anos 90 (1990-1999)", value: "1990", tipo: "decade" },
  { label: "Anos 80 (1980-1989)", value: "1980", tipo: "decade" },
  { label: "Anos 70 (1970-1979)", value: "1970", tipo: "decade" },
  { label: "Anos 60 (1960-1969)", value: "1960", tipo: "decade" },
  { label: "Anos 50 (1950-1959)", value: "1950", tipo: "decade" },
  { label: "Clássicos até 1949", value: "1920", tipo: "classics" },
];

const YEARS = [...anosIndividuais, ...DECADES_AND_CLASSICS];

export { YEARS };