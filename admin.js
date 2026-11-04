const body = document.getElementById("membersBody");
function renderMembers(){
  const members = JSON.parse(localStorage.getItem("eliteMembers") || "[]");
  body.innerHTML = "";
  members.forEach(member => {
    const row = document.createElement("tr");
    [member.name, member.phone, member.email, member.plan, member.createdAt].forEach(value => {
      const cell = document.createElement("td"); cell.textContent = value || ""; row.appendChild(cell);
    });
    body.appendChild(row);
  });
  document.getElementById("empty").textContent = members.length ? `${members.length} demande(s) enregistrée(s) sur cet appareil.` : "Aucune demande enregistrée pour le moment.";
}
document.getElementById("refresh").addEventListener("click", renderMembers);
document.getElementById("clear").addEventListener("click", () => {
  if(confirm("Effacer les demandes de démonstration de ce navigateur ?")) {
    localStorage.removeItem("eliteMembers"); renderMembers();
  }
});
renderMembers();