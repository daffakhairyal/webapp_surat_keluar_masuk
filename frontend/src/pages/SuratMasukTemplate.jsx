import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SuratMasukTemplate = () => {
  const { id } = useParams();
  const [suratMasuk, setSuratMasuk] = useState(null);

  useEffect(() => {
    const fetchSuratMasuk = async () => {
      try {
        const response = await fetch(`http://localhost:5000/surat_masuk/${id}`);
        const data = await response.json();
        console.log("Data surat masuk:", data);
        setSuratMasuk(data);
      } catch (error) {
        console.error("Error fetching surat masuk: ", error);
      }
    };

    fetchSuratMasuk();
  }, [id]);

  if (!suratMasuk) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };
  const informasiGabungan = `${suratMasuk.alamat_arsip_lemari_no}/${suratMasuk.alamat_arsip_map_no}/${suratMasuk.no_referensi_surat}/${suratMasuk.no_urut_surat_masuk}`;

  return (
    <div className="surat-masuk-template max-w-full mx-auto p-8 border border-black">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">SURAT MASUK</h1>
      </div>
      <div className="mb-4">
      <p>Nomor Surat:</p>
        <p>{informasiGabungan}</p>
      </div>
      <div className="mb-4">
        <p>Kepada Yth.,</p>
        <p>{suratMasuk.penerima_surat_nama}</p>
      </div>
      <div className="mb-4">
        <p>Dari:</p>
        <p>{suratMasuk.pembawa_surat_nama}</p>
      </div>
      <div className="mb-4">
        <p>Tanggal:</p>
        <p>{formatDate(suratMasuk.tanggal_surat_masuk)}</p>
      </div>
      <div className="mb-4">
        <p>Perihal:</p>
        <p>{suratMasuk.perihal_surat}</p>
      </div>
      <div className="mb-4">
        <p>Isi Surat:</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus cupiditate illo tenetur corrupti eveniet non repellat dignissimos consequatur? Quibusdam explicabo aliquid laborum? Deserunt alias labore tempore id facere. Ab, reiciendis? Cum earum quidem expedita fugiat optio dolorum eaque distinctio atque a sunt quasi repellendus harum quod beatae hic fugit rerum, deleniti, soluta quaerat id quo illo possimus quam quos? Porro nihil cumque ipsum impedit autem, quod, quia quo unde doloribus ab nobis voluptates eos. Velit tempore perferendis nobis quos incidunt veniam laudantium accusamus ullam, quas expedita voluptatem alias earum accusantium in reprehenderit eius at aperiam ex saepe. Culpa eos consequuntur ipsa tenetur exercitationem, repudiandae nihil qui nisi provident magnam molestias, modi tempora eum laudantium natus unde ab quas rem saepe magni, illo reprehenderit hic perspiciatis. Animi nulla maxime suscipit pariatur iusto, accusamus ipsam velit consectetur nihil modi repellendus eos laboriosam assumenda sit voluptatibus doloribus harum laborum omnis ut repellat a molestias ipsa error soluta? Delectus placeat, consequatur esse quis accusantium voluptates natus quas adipisci odio numquam ipsam quisquam ipsum deleniti in, ea dolores. Molestiae cumque minus facere quae ea veritatis, tempore reprehenderit assumenda voluptatem nihil, accusamus, ipsam velit mollitia quam corporis? Alias asperiores neque quod suscipit nostrum itaque sint!
        </p>
      </div>
      <div className="mt-8">
        <p>Yang bertanda tangan</p>
        <p>{suratMasuk.pembawa_surat_nama}</p>
      </div>
    </div>
  );
};

export default SuratMasukTemplate;
