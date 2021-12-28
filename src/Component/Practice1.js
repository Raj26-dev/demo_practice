import React, { useState } from "react";

const Practice1 = () => {
    const [file, setFile] = useState([]);

    function uploadSingleFile(e) {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file1);
      console.log(url);
      setFile([...file, URL.createObjectURL(e.target.files[0])]);
      console.log("file", file);
    }

    function upload(e) {
      e.preventDefault();
      console.log(file);
    }

    function deleteFile(e) {
      const s = file.filter((item, index) => index !== e);
      setFile(s);
      console.log(s);
    }

    return (
      <form>
        <div className="form-group preview">
          {file.length > 0 &&
            file.map((item, index) => {
              return (
                <div key={item}>
                  <img src={item} alt="" />
                  <button type="button" onClick={() => deleteFile(index)}>
                    delete
                  </button>
                </div>
              );
            })}
        </div>

        <div className="form-group">
          <input
            type="file"
            disabled={file.length === 5}
            className="form-control"
            onChange={uploadSingleFile}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={upload}
        >
          Upload
        </button>
      </form>
    );
//   const [file, setFile] = useState(null);

//   const uploadSingleFile = e => {
//     setFile(URL.createObjectURL(e.target.files[0]));
//   };
//   const upload = e => {
//     e.preventDefault();
//     console.log(file);
//   };
//   let imgPreview;
//   if (file) {
//     imgPreview = <img src={file} alt="" />;
//   }
//   return (
//     <div>
//       <form className="col-md-6 mx-auto">
//         <div className="form-group preview">
//           {imgPreview}
//         </div>

//         <div className="form-group">
//           <input
//             type="file"
//             className="form-control"
//             onChange={uploadSingleFile}
//           />
//         </div>
//         <button
//           type="button"
//           className="btn btn-primary btn-block"
//           onClick={upload}
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
};

export default Practice1;
