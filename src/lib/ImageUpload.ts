import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";
import { Dispatch, SetStateAction } from "react";

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const UploadImage = async (
  image: File,
  cropType: "Video" | "Square" | "Original",
  setProgress: Dispatch<SetStateAction<number>>
): Promise<UploadResponse | null> => {
  // State to keep track of the current upload progress (percentage)

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  // Extract the first file from the file input
  const file = image;
  // Retrieve authentication parameters for the upload.
  const response = await fetch("/api/upload-auth");
  if (!response.ok) {
    // If the server response is not successful, extract the error text for debugging.
    const errorText = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`
    );
  }
  const data = await response.json();
  const { signature, expire, token, publicKey } = data;
  // Call the ImageKit SDK upload function with the required parameters and callbacks.
  try {
    const uploadResponse = await upload({
      // Authentication parameters
      expire,
      token,
      signature,
      publicKey,
      file,
      transformation: {
        pre: `${
          cropType === "Video"
            ? "w-800 h-450"
            : cropType === "Square"
            ? "w-600 h-600"
            : "w-1920 h-1080"
        }`,
      },
      folder: "/tweet-images",
      fileName: file.name, // Optionally set a custom file name
      // Progress callback to update upload progress state
      onProgress: (event) => {
        setProgress((event.loaded / event.total) * 100);
      },
      // Abort signal to allow cancellation of the upload if needed.
      abortSignal: abortController.signal,
    });
    return uploadResponse;
  } catch (error) {
    // Handle specific error types provided by the ImageKit SDK.
    if (error instanceof ImageKitAbortError) {
      console.error(error);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error(error);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error(error);
    } else if (error instanceof ImageKitServerError) {
      console.error(error);
    } else {
      // Handle any other errors that may occur.
      throw error;
    }
  }
  return null;
};

export default UploadImage;
