let globalData = [];

fetch("absensi/data_kehadiran_1000.json")
  .then((response) => response.json())
  .then((data) => {
    globalData = data;
    filterData(); // langsung tampilkan data awal
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
    document.getElementById("absensiTable").innerHTML = "<tr><td colspan='7'>Gagal memuat data.</td></tr>";
  });

function filterData() {
  const selectedKelas = document.getElementById("kelas").value;
  const selectedStatus = document.getElementById("status").value;

  let filteredData = globalData;

  if (selectedKelas) {
    filteredData = filteredData.filter(item => item.kelas === selectedKelas);
  }

  if (selectedStatus) {
    filteredData = filteredData.filter(item => item.status === selectedStatus);
  }

  renderTable(filteredData);
}

function renderTable(data) {
  const tbody = document.querySelector("#absensiTable tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nis}</td>
      <td>${item.nama}</td>
      <td>${item.kelas}</td>
      <td>${item.tanggal}</td>
      <td>${item.status}</td>
      <td>${item.waktu_absen || "-"}</td>
      <td>${item.keterangan || "-"}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("summary").innerHTML = `
    <strong>Total Data:</strong> ${data.length}<br>
    <strong>Hadir:</strong> ${data.filter(d => d.status === "Hadir").length} |
    <strong>Sakit:</strong> ${data.filter(d => d.status === "Sakit").length} |
    <strong>Izin:</strong> ${data.filter(d => d.status === "Izin").length}
  `;
}
