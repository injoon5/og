import Head from "next/head";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [title, setTitle] = useState("");
  const [subheading, setSubheading] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageUrl(
      `/api/og/?title=${encodeURIComponent(
        title
      )}&subheading=${encodeURIComponent(subheading)}`
    );
    console.log(imageUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subheading:
          <input
            type="text"
            value={subheading}
            onChange={(e) => setSubheading(e.target.value)}
          />
        </label>
          <br />
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            width={1200}
            height={630}
            alt="Generated image"
          />
        <code>{imageUrl}</code>
        </div>
      )}
    </div>
  );
}
