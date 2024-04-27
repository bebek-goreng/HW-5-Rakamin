// Buat class dulu yang isinya properti member sama method rata-rata usia calon penghuni syurrgaaa
class ListMember {
    constructor() {
        this.members = []; //tampung disini ya gess ya
        this.startIndex = 2; //tabel no 1 aku isi karena jelek tampilannya kalau ga ada apa-apa, jadi aku mulai dari no 2 abwang
    }

    // Async like this?? aku bingung asyncnya harus ditaruh mana buat case hw ini soalnya harusnya tidak perlu pakai async buat case study ini, bener ga sih?
    async addMember(member) {
        try { //pakai try catch aja kali ya mas?? mungkin kalau ada saran lain bisa aku revisi 👍
            this.members.push(member); //push ke members diatas
            return Promise.resolve('Selamat kamu sudah jadi member calon penghuni surga');//ehehe nilai++ ga nih returnnya????
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // method rata-rata aku jadiin satu buat umur sama uang jajan
    average() {
        let totalUmur = 0;
        let totalUangSangu = 0;

        for (let member of this.members) {
            totalUmur += member.umur;
            totalUangSangu += member.uangSangu;
        }

        const hasilUmur = totalUmur / this.members.length;
        const hasilUangSangu = totalUangSangu / this.members.length;

        return { hasilUmur, hasilUangSangu };
    }

    // DOM (Document Object Mahen) time uhuyyy
    displayAverage() {
        // Ga tau kenapa aku suka makai return object yang bentuk begini daripada harus ditampung di variabel baru satu2 lagi
        const { hasilUmur, hasilUangSangu } = this.average();

        // Aku tambahin function apa method namanya yak? toFixed 2 karena kalau nolnya banyak jelek banget tampilannya mase
        document.querySelector('.usia').textContent = hasilUmur.toFixed(2);
        document.querySelector('.uangsangu').textContent = hasilUangSangu.toFixed(2);
    }

    // Async again :( aku belum terlalu paham kalau implementasi langsung, secara teori sih udah lumayan nangkep mas, harus ulik2 lageeehh
    async addMemberToTable(member, index) {
        try {
            // ngambil tablenya
            const tableBody = document.querySelector('table tbody');
            // Pakai method insertrow bawaan dari love language aing saat ini (javascript) :v
            const newRow = tableBody.insertRow();

            // Setelah insert row harus insert cell dongggg
            const cellNo = newRow.insertCell(0);
            const cellNama = newRow.insertCell(1);
            const cellUmur = newRow.insertCell(2);
            const cellUangSangu = newRow.insertCell(3);

            cellNo.textContent = index + this.startIndex; // Menggunakan startIndex untuk langsung nomor 2 karena member pertama adalah mahen 😎
            cellNama.textContent = member.capitalizedNama;
            cellUmur.textContent = member.umur;
            cellUangSangu.textContent = "Rp." + member.uangSangu;

            // Yang bagian nomornya aku bikin bold biar enak dilihat
            cellNo.style.fontWeight = 'bold';

            // Part of async
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formRegistrasi = document.getElementById('formRegistrasi');
    const listMembers = new ListMember(); //buat object baru dari class ListMember (calon penghuni surga) wkwk

    formRegistrasi.addEventListener('submit', async function (event) { //kita kasih method submit pakai ini, async lagi walaupun sebenernya ga perlu (kayaknya)
        event.preventDefault(); //kita stop event bawaannya kita buat sendiri

        // kita ambil value dari id dibawah ini 
        const nama = document.getElementById('nama').value;
        //Firts time nyobain regex expression, belum terlalu ngerti but its ok (ini buat bikin huruf setelah space jadi capital)
        const capitalizedNama = nama.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });

        const umur = parseInt(document.getElementById('umur').value);
        const uangSangu = parseInt(document.getElementById('uangsangu').value);

        // Aku dapet masukan dari sepuh beberapa waktu lalu, katanya kalau casenya ada lebih dari 3 atau 4 lebih baik pakai switch, is that true? btw validasi inputku mantab ga mas?? wkwk
        switch (true) {
            case !nama || !umur || !uangSangu:
                alert('Isi formulirmu tidak lengkap woyy!');
                return;
            case capitalizedNama.length < 10:
                alert('Nama harus memiliki minimal 10 karakter');
                return;
            case umur < 25:
                alert('Pendaftaran ditolak! Kamu masih bocil, sana main epep!!!');
                return;
            case uangSangu < 100000 || uangSangu > 1000000:
                if (uangSangu > 1000000) {
                    alert('Pendaftaran gagal! Uangmu kebanyakan');
                    return;
                } else if (uangSangu < 100000) {
                    alert('Pendaftaran gagal! Kamu masih miskin, lebih semangat kerjanya!!!');
                    return;
                }
            default:
                break;
            //di sini aku kosongi aja karena aku tidack butuhh block ini, ini block opsional kan mas default?? apakah harus ada isinya??
        }


        const member = { capitalizedNama, umur, uangSangu };

        try {
            // pakai await lagii arrrghh aing maung
            const message = await listMembers.addMember(member);
            await listMembers.addMemberToTable(member, listMembers.members.length - 1);
            listMembers.displayAverage();

            alert(message);

            formRegistrasi.reset();

        } catch (error) {
            console.error('Error:', error);
        }
    });
});