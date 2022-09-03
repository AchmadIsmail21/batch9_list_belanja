// tangkap beberapa element html
let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

//tambahkan date ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString();

// data list belanja
let data_list_belanja = [];

// menambahkan event listener ke floating button
floating_button.addEventListener('click', () => {
  //atur style pada modal display menjadi flex
  if (modal.style.display == 'none') {
    showModal();
    return;
  } else {
    //sembunyikan kembali
    hideModal();
    return;
  }
});

//menambahkan event listener ke modal lg
modal_bg.addEventListener('click', () => {
  hideModal();
});

//tambahkan event listener submit ke addlist form
addlist_form.addEventListener('submit', (event) => {
  //stop form dari reload page
  event.preventDefault();

  // tangkap value dari masing masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  //push data ke data list belanja
  data_list_belanja.push({
    namaBarang: barang,
    hargaBarang: harga,
    tanggal: new Date().toLocaleDateString(),
  });
  console.info(data_list_belanja);

  //clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';

  renderToHtml();

  hideModal();
});

//show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}
//hide modal
function hideModal() {
  //sembunyikan kembali
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#f280b6';
  floating_button.style.transform = 'rotate(0deg)';
}
// function untuk render data array ke div root
function renderToHtml() {
  // reset halaman div root
  root.innerHTML = '';

  // perulangan
  data_list_belanja.forEach((elemen, index) => {
    root.innerHTML += `
    <div class="card">
      <small>${elemen.tanggal}</small>
      <div>
        ${elemen.namaBarang} <span>Rp. ${elemen.hargaBarang}</span>
      </div>
      <button onclick="deleteCard(${index})">Selesai</button>
    </div>`;
  });
}

//function delete ketika di tekan button selesai
function deleteCard(index) {
  data_list_belanja.splice(index, 1);

  renderToHtml();
}
