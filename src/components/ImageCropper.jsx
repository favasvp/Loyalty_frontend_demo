import { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import StyledButton from "../ui/StyledButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImageCropper = ({
  imageUrl,
  onCropComplete,
  onCancel,
  aspectRatio = 16 / 9,
}) => {
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 80,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
  };

  const completeCrop = () => {
    if (!crop || !imgRef.current || !canvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          onCropComplete(blob, croppedImageUrl);
        }
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Crop Image</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-80 overflow-hidden">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={16 / 9}
          circularCrop={false}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Crop preview"
            onLoad={onImageLoad}
            className="max-w-full"
          />
        </ReactCrop>
      </div>
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex justify-end gap-3 mt-4">
        <StyledButton name="Cancel" onClick={onCancel} variant="tertiary" />
        <StyledButton
          name="Apply Crop"
          onClick={completeCrop}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default ImageCropper;
