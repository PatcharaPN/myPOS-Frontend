const ImageCircleSelector = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="image-drag-wrapper">
      <div className="image-upload-section">
        <div className="image-input-border">
          <div className="upload-text">
            <p>Drag image here</p> <br /> <p>or</p> <br />{" "}
            <p style={{ color: "#7F5AF0" }}>Browse Image</p>
          </div>
          <input type="file" onChange={onChange} />
        </div>
        <p style={{ fontWeight: "500" }}>File (Max: 15MB)</p>
      </div>
    </div>
  );
};

export default ImageCircleSelector;
