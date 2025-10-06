// src/utils/uploadToPinata.js
export async function uploadToPinata(file) {
  // Directly put keys here (browser-safe only for testing, not for production)
  const PINATA_API_KEY = "74383e4bef3996e48989";
  const PINATA_SECRET_API_KEY = "0d6f76e7994886fadeeaca8c0019ebadace965be90537c21f95dbc6ee1a0aeee";

  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    throw new Error("Missing Pinata API credentials");
  }

  const formData = new FormData();
  formData.append("file", file);

  // Metadata
  formData.append(
    "pinataMetadata",
    JSON.stringify({ name: file.name || "uploaded_image" })
  );
  // Options
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Pinata upload failed:", errorText);
    throw new Error("Failed to upload image to Pinata");
  }

  const data = await res.json();
  return data.IpfsHash; // return hash only
}
