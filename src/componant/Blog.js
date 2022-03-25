import React, { Component } from "react";
import Blog2 from "./Blog2";


export default class Blog extends Component {
  state = {
    isim: "",
    soyisim: "",
    tcno: "",
    telefon: "",
    sehir: "",
    email: "",
    dtarih: "",
    cinsiyet: "",
    not: "",
    dosya: "",
    bool1: false,
    bool: false,
    text: "",
    data: [],
  };

  TCKimlikKOntrol = (deger) => {
    deger = deger.toString();
    var basamak = /^[0-9]{11}$/.test(deger);
    var toplamS = 0;
    for (var i = 0; i < 10; i++) {
      toplamS += Number(deger.substr(i, 1));
    }
    var kuralX = toplamS % 10 == deger.substr(10, 1);
    var basamak1 = "0" !== deger.substr(0, 1);
    var toplamC = 0;
    for (var i = 0; i < 9; i += 2) {
      toplamC += Number(deger.substr(i, 1));
    }
    var toplamT = 0;
    for (var i = 1; i < 9; i += 2) {
      toplamT += Number(deger.substr(i, 1));
    }
    var kuralY = (toplamC * 7 - toplamT) % 10 == deger.substr(9, 1);
    return basamak1 && basamak && kuralX && kuralY;
  };

  onSubmit = (e) => {
    this.setState({ bool1: true });
    e.preventDefault();
    setTimeout(() => {
      this.setState({ bool1: false });
    }, 3000);

    if (this.TCKimlikKOntrol(this.state.tcno)) {
      if (this.state.data.length > 0) {
        const neww = this.state.data.filter((item) => {
          return item.tcno.indexOf(this.state.tcno) !== -1;
        });

        if (neww.length == 0) {
          this.setState({ bool: true });
          this.state.data.push(this.state);
          this.setState({
            isim: "",
            soyisim: "",
            tcno: "",
            telefon: "",
            sehir: "",
            email: "",
            dtarih: "",
            cinsiyet: "",
            not: "",
            dosya: "",
          });
          document.getElementById("tcno").style.backgroundColor = "white";
          document.querySelector("input[name =cinsiyet]").checked = false;
          setTimeout(() => {
            this.setState({ bool1: false });
          }, 3000);
          setTimeout(() => {
            this.setState({ bool: false });
          }, 3000)
        } else {
          document.getElementById("tcno").style.backgroundColor = "rgb(255,153,153)"
          alert("bu tc ile giriş yapılmıştır");
          this.setState({ bool: false });
        }
      } else {
        this.setState({ bool: true });
        
        this.state.data.push(this.state);
        this.setState({
          isim: "",
          soyisim: "",
          tcno: "",
          telefon: "",
          sehir: "",
          email: "",
          dtarih: "",
          cinsiyet: "",
          not: "",
          dosya: "",
        });
        document.getElementById("tcno").style.backgroundColor = "white";
        document.querySelector("input[name =cinsiyet]").checked = false;
      }
    } else {
     
      document.getElementById("tcno").style.backgroundColor = "rgb(255,153,153)";
      this.setState({ bool: false });
    }
  };

  search = (e) => {
    this.setState({ text: e.target.value });
  };

  delete1 = (arr) => {
    this.setState({ data: arr });
  };

  update = (obj) => {
    let newarr1 = [];
    for (const key in obj) {
      newarr1.push(obj[key]);
    }
    this.setState({
      isim: newarr1[0],
      soyisim: newarr1[1],
      tcno: newarr1[2],
      telefon: newarr1[3],
      sehir: newarr1[4],
      email: newarr1[5],
      dtarih: newarr1[6],
      cinsiyet: newarr1[7],
      not: newarr1[8],
      dosya: newarr1[9],
    });

    const newarr2 = this.state.data.filter((par) => {
      return par.tcno !== newarr1[2];
    });
    this.setState({ data: newarr2 });
  };

  render() {
    const onChance = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    const newarr = this.state.data.filter((item) => {
      return (
        item.isim.toUpperCase().indexOf(this.state.text.toUpperCase()) != -1 ||
        item.soyisim.toUpperCase().indexOf(this.state.text.toUpperCase()) !=
          -1 ||
        item.tcno.toUpperCase().indexOf(this.state.text.toUpperCase()) != -1
      );
    });

    return (
      <div className="container ms-3 ">
        <form onSubmit={this.onSubmit.bind(this)}>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="6">
                  <div className="form-floating ">
                    <input
                      onChange={this.search}
                      type="search"
                      className="form-control"
                      id="arama"
                      placeholder="Arama"
                      name="arama"
                      autoComplete="off"
                    />
                    <label htmlFor="arama">Arama</label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-md-3 p-1">
                  <div className="form-floating">
                    <input
                      onChange={onChance}
                      type="text"
                      className="form-control "
                      id="isim"
                      placeholder="İsim"
                      name="isim"
                      value={this.state.isim}
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="isim">İsim</label>
                  </div>
                </td>

                <td className="col-md-3 p-1">
                  <div className="form-floating ">
                    <input
                      autoComplete="off"
                      onChange={onChance}
                      type="text"
                      className="form-control m"
                      id="soyisim"
                      placeholder="Soyisim"
                      name="soyisim"
                      value={this.state.soyisim}
                      required
                    />
                    <label htmlFor="soyisim">Soyisim</label>
                  </div>
                </td>

                <td rowSpan="6">
                  {
                    <Blog2
                      update={this.update}
                      delete1={this.delete1}
                      data={newarr}
                    />
                  }
                </td>
              </tr>
              <tr>
                <td className="col-md-3  p-1">
                  <div className="form-floating ">
                    <input
                      onChange={onChance}
                      autoComplete="off"
                      type="number"
                      className="form-control"
                      id="tcno"
                      placeholder="TC Kimlik No:"
                      name="tcno"
                      value={this.state.tcno}
                      required
                    />
                    <label htmlFor="tcno">TC Kimlik No:</label>
                  </div>
                </td>

                <td className="col-md-3 p-1">
                  <div className="form-floating ">
                    <input
                      onChange={onChance}
                      autoComplete="off"
                      type="tel"
                      className="form-control"
                      id="telefon"
                      placeholder="Telefon No:"
                      name="telefon"
                      value={this.state.telefon}
                    />
                    <label htmlFor="telefon">Telefon No:</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-md-3 p-1">
                  <div className="form-floating">
                    <select
                      value={this.state.sehir}
                      onChange={onChance}
                      className="form-select"
                      id="sehir"
                      placeholder="Şehir"
                      name="sehir"
                      aria-label="Floating label select example">
                      <option>Bir şehir seçiniz...</option>
                      <option>ADANA</option>
                      <option>ADIYAMAN</option>
                      <option>AFYONKARAHİSAR</option>
                      <option>AĞRI</option>
                      <option>AKSARAY</option>
                      <option>AMASYA</option>
                      <option>ANKARA</option>
                      <option>ANTALYA</option>
                      <option>ARDAHAN</option>
                      <option>ARTVİN</option>
                      <option>AYDIN</option>
                      <option>BALIKESİR</option>
                      <option>BARTIN</option>
                      <option>BATMAN</option>
                      <option>BAYBURT</option>
                      <option>BİLECİK</option>
                      <option>BİNGÖL</option>
                      <option>BİTLİS</option>
                      <option>BOLU</option>
                      <option>BURDUR</option>
                      <option>BURSA</option>
                      <option>ÇANAKKALE</option>
                      <option>ÇANKIRI</option>
                      <option>ÇORUM</option>
                      <option>DENİZLİ</option>
                      <option>DİYARBAKIR</option>
                      <option>DÜZCE</option>
                      <option>EDİRNE</option>
                      <option>ELAZIĞ</option>
                      <option>ERZİNCAN</option>
                      <option>ERZURUM</option>
                      <option>ESKİŞEHİR</option>
                      <option>GAZİANTEP</option>
                      <option>GİRESUN</option>
                      <option>GÜMÜŞHANE</option>
                      <option>HAKKARİ</option>
                      <option>HATAY</option>
                      <option>IĞDIR</option>
                      <option>ISPARTA</option>
                      <option>İSTANBUL</option>
                      <option>İZMİR</option>
                      <option>KAHRAMANMARAŞ</option>
                      <option>KARABÜK</option>
                      <option>KARAMAN</option>
                      <option>KARS</option>
                      <option>KASTAMONU</option>
                      <option>KAYSERİ</option>
                      <option>KIRIKKALE</option>
                      <option>KIRKLARELİ</option>
                      <option>KIRŞEHİR</option>
                      <option>KİLİS</option>
                      <option>KOCAELİ</option>
                      <option>KONYA</option>
                      <option>KÜTAHYA</option>
                      <option>MALATYA</option>
                      <option>MANİSA</option>
                      <option>MARDİN</option>
                      <option>MERSİN</option>
                      <option>MUĞLA</option>
                      <option>MUŞ</option>
                      <option>NEVŞEHİR</option>
                      <option>NİĞDE</option>
                      <option>ORDU</option>
                      <option>OSMANİYE</option>
                      <option>RİZE</option>
                      <option>SAKARYA</option>
                      <option>SAMSUN</option>
                      <option>SİİRT</option>
                      <option>SİNOP</option>
                      <option>SİVAS</option>
                      <option>ŞANLIURFA</option>
                      <option>ŞIRNAK</option>
                      <option>TEKİRDAĞ</option>
                      <option>TOKAT</option>
                      <option>TRABZON</option>
                      <option>TUNCELİ</option>
                      <option>UŞAK</option>
                      <option>VAN</option>
                      <option>YALOVA</option>
                      <option>YOZGAT</option>
                      <option>ZONGULDAK</option>
                    </select>
                    <label htmlFor="sehir">Şehir</label>
                  </div>
                </td>

                <td className="col-md-3 p-1">
                  <div className="form-floating ">
                    <input
                      onChange={onChance}
                      autoComplete="off"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email Adresi"
                      name="email"
                      value={this.state.email}
                    />
                    <label htmlFor="email">Email Adresi</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-md-3 p-1">
                  <div className="form-floating ">
                    <input
                      onChange={onChance}
                      type="date"
                      className="form-control"
                      id="dtarih"
                      placeholder="Doğum Tarihi"
                      name="dtarih"
                      value={this.state.dtarih}
                    />
                    <label htmlFor="dtarih">Doğum Tarihi</label>
                  </div>
                </td>

                <td className="col-md-3 p-1">
                  <div
                    style={{
                      border: "1px solid rgb(212, 215, 216)",
                      padding: "14px 0 14px 3px",
                      marginTop: "1px",
                      borderRadius: "3px",
                      display: "flex",
                    }}
                  >
                    <span className=" form-check-inline p-0 m-0 ms-2">
                      Cinsiyet:
                    </span>
                    <div className="form-check form-check-inline ms-2">
                      <input
                        onChange={onChance}
                        className="form-check-input"
                        type="radio"
                        name="cinsiyet"
                        id="cinsiyet1"
                        value="Bayan"
                        required
                      />
                      <label className="form-check-label" htmlFor="cinsiyet1">
                        Bayan
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        onChange={onChance}
                        className="form-check-input"
                        type="radio"
                        name="cinsiyet"
                        id="cinsiyet2"
                        value="Bay"
                        required
                      />
                      <label className="form-check-label" htmlFor="cinsiyet2">
                        Bay
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-md-3 p-1">
                  <div className="form-floating">
                    <textarea
                      onChange={onChance}
                      autoComplete="off"
                      className="form-control"
                      placeholder="Not"
                      style={{ resize: "none" }}
                      id="not"
                      name="not"
                      value={this.state.not}
                    ></textarea>
                    <label htmlFor="not">Not</label>
                  </div>
                </td>

                <td className="col-md-3 p-1">
                  <div
                    style={{
                      border: "1px solid rgb(212, 215, 216)",
                      padding: "15px 0 13px 0",
                      marginTop: "1px",
                      borderRadius: "3px",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      className="form-floating ms-2  mt-0"
                      style={{ width: "200px" }}
                    >
                      <input
                        onChange={onChance}
                        type="file"
                        id="dosya"
                        name="dosya"
                        value={this.state.dosya}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-md-3  p-1">
                  <button
                    type="submit"
                    className="btn btn-success col-12 btn-lg"
                  >
                    Kaydet
                  </button>
                </td>

                <td className="col-md-3 p-1">
                  <button
                    onClick={() => {
                      this.setState({
                        isim: "",
                        soyisim: "",
                        tcno: "",
                        telefon: "",
                        sehir: "",
                        email: "",
                        dtarih: "",
                        cinsiyet: "",
                        not: "",
                        dosya: "",
                      });
                      document.querySelector("input[name =cinsiyet]").checked=false;
                      document.getElementById("tcno").style.backgroundColor="white";

                    }}
                    className="btn btn-info col-12 btn-lg"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div style={{ textAlign: "left" }}>
          {(this.state.bool1==true&&this.state.bool==true)
            ? "kaydedildi"
            : ""}
        </div>
      </div>
    );
  }
}
