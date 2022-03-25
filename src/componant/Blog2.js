import React, { Component } from "react";

export default class Blog2 extends Component {
  delete = (x, e) => {
    e.preventDefault();
    const newarr = this.props.data.filter((par) => {
      return par.tcno !== x;
    });
    this.props.delete1(newarr);
  };

  forceUpdate = (y, e) => {
    e.preventDefault();
    const newarrup = this.props.data.filter((par) => {
      return par.tcno == y;
    });

    this.props.update(...newarrup);
  };

  render() {
    return (
      <div style={{ overflow: "auto", height: "380px" }}>
        <table
          className="table table-hover"
          style={{ textAlign: "left", fontSize: "11px", fontWeight: "bold" }}
        >
          <thead>
            <tr>
              <td>NO:</td>
              <td>İSİM</td>
              <td>SOYİSİM</td>
              <td>TC No</td>
              <td> DELETE // GÜNCELLE</td>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((item, i) => {
              return (
                <tr key={i}>
                  <td style={{ verticalAlign: "middle" }}>{i + 1}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.isim}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.soyisim}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.tcno}</td>
                  <td
                    style={{ verticalAlign: "middle" }}
                    className="col-md-3 p-1"
                  >
                    <div className="d-grid d-md-block">
                      <button
                        onClick={this.delete.bind(this, item.tcno)}
                        className="btn btn-primary btn-danger me-2 p-1 pt-0"
                        type="button"
                      >
                        Sil
                      </button>
                      <button
                        onClick={this.forceUpdate.bind(this, item.tcno)}
                        className="btn btn-primary btn-warning p-1 pt-0 "
                        type="button"
                      >
                        Güncelle
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
