import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SuratKeluarTemplate = () => {
  const { id } = useParams();
  const [suratKeluar, setSuratKeluar] = useState(null);

  useEffect(() => {
    const fetchSuratKeluar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/surat_keluar/${id}`);
        console.log("Data surat keluar:", response.data);
        setSuratKeluar(response.data);
      } catch (error) {
        console.error("Error fetching surat keluar: ", error);
      }
    };

    fetchSuratKeluar();
  }, [id]);

  if (!suratKeluar) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };
  const informasiGabungan = `${suratKeluar.alamat_arsip_lemari_no}/${suratKeluar.alamat_arsip_map_no}/${suratKeluar.no_referensi_surat}/${suratKeluar.no_urut_surat_keluar}`;

  return (
    <div className="surat-keluar-template max-w-full mx-auto p-8 border border-black">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">SURAT KELUAR</h1>
      </div>
      <div className="mb-4">
      <p>Nomor Surat:</p>
        <p>{informasiGabungan}</p>
      </div>
      <div className="mb-4">
        <p>Kepada Yth.,</p>
        <p>{suratKeluar.penerima_surat_nama}</p>
      </div>
      <div className="mb-4">
        <p>Dari:</p>
        <p>{suratKeluar.pembawa_surat_nama}</p>
      </div>
      <div className="mb-4">
        <p>Tanggal:</p>
        <p>{formatDate(suratKeluar.tanggal_surat_keluar)}</p>
      </div>
      <div className="mb-4">
        <p>Perihal:</p>
        <p>{suratKeluar.perihal_surat}</p>
      </div>
      <div className="mb-4">
        <p>Isi Surat:</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus cupiditate illo tenetur corrupti eveniet non repellat dignissimos consequatur? Quibusdam explicabo aliquid laborum? Deserunt alias labore tempore id facere. Ab, reiciendis? Cum earum quidem expedita fugiat optio dolorum eaque distinctio atque a sunt quasi repellendus harum quod beatae hic fugit rerum, deleniti, soluta quaerat id quo illo possimus quam quos? Porro nihil cumque ipsum impedit autem, quod, quia quo unde doloribus ab nobis voluptates eos. Velit tempore perferendis nobis quos incidunt veniam laudantium accusamus ullam, quas expedita voluptatem alias earum accusantium in reprehenderit eius at aperiam ex saepe. Culpa eos consequuntur ipsa tenetur exercitationem, repudiandae nihil qui nisi provident magnam molestias, modi tempora eum laudantium natus unde ab quas rem saepe magni, illo reprehenderit hic perspiciatis. Animi nulla maxime suscipit pariatur iusto, accusamus ipsam velit consectetur nihil modi repellendus eos laboriosam assumenda sit voluptatibus doloribus harum laborum omnis ut repellat a molestias ipsa error soluta? Delectus placeat, consequatur esse quis accusantium voluptates natus quas adipisci odio numquam ipsam quisquam ipsum deleniti in, ea dolores. Molestiae cumque minus facere quae ea veritatis, tempore reprehenderit assumenda voluptatem nihil, accusamus, ipsam velit mollitia quam corporis? Alias asperiores neque quod suscipit nostrum itaque sint!
        </p>
      </div>
      <div className="mt-8">
        <p>Yang bertanda tangan</p>
        <p>{suratKeluar.pembawa_surat_nama}</p>
      </div>
    </div>
  );
};

export default SuratKeluarTemplate;
